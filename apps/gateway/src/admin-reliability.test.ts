import { afterEach, expect, it, vi } from "vitest";

import { buildGatewayApp } from "./app.js";

const apps: ReturnType<typeof buildGatewayApp>[] = [];
afterEach(async () => {
  vi.unstubAllGlobals();
  await Promise.all(apps.splice(0).map((app) => app.close()));
});

function stub(role: "admin" | "manager") {
  const upstream: string[] = [];
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: unknown) => {
      if (String(url).endsWith("/auth/me")) {
        return new Response(JSON.stringify({ user: { id: "u", login: role, displayName: "X", role, city: "Воронеж", analysisPrompt: "" } }));
      }
      upstream.push(String(url));
      return new Response(JSON.stringify({ sources: [], alerts: [], running: false }));
    }),
  );
  const app = buildGatewayApp();
  apps.push(app);
  return { app, upstream };
}

it.each(["/api/v1/admin/sources/health", "/api/v1/admin/quality", "/api/v1/admin/narration"])("forbids %s to managers", async (url) => {
  const { app, upstream } = stub("manager");
  const response = await app.inject({ method: "GET", url, headers: { cookie: "pr_session=m" } });
  expect(response.statusCode).toBe(403);
  expect(upstream).toEqual([]);
});

it("forbids starting a quality run to managers", async () => {
  const { app, upstream } = stub("manager");
  const response = await app.inject({ method: "POST", url: "/api/v1/admin/quality/run", headers: { cookie: "pr_session=m" } });
  expect(response.statusCode).toBe(403);
  expect(upstream).toEqual([]);
});

it("proxies source health to admins", async () => {
  const { app, upstream } = stub("admin");
  const response = await app.inject({ method: "GET", url: "/api/v1/admin/sources/health", headers: { cookie: "pr_session=a" } });
  expect(response.statusCode).toBe(200);
  expect(upstream.some((url) => url.endsWith("/health/sources"))).toBe(true);
});

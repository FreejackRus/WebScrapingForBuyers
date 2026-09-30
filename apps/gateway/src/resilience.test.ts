import http from "node:http";
import type { AddressInfo } from "node:net";

import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { buildGatewayApp } from "./app.js";
import { UserCache } from "./user-cache.js";

const user = { id: "u1", login: "m", displayName: "M", role: "manager", city: "Воронеж", analysisPrompt: "p" };
const cookie = { cookie: "pr_session=abc" };

const servers: http.Server[] = [];
const apps: ReturnType<typeof buildGatewayApp>[] = [];

function listen(handler: http.RequestListener): Promise<string> {
  return new Promise((resolve) => {
    const server = http.createServer(handler).listen(0, "127.0.0.1", () => {
      servers.push(server);
      resolve(`http://127.0.0.1:${(server.address() as AddressInfo).port}`);
    });
  });
}

async function gateway(env: { identity: string; search: string }) {
  process.env.IDENTITY_URL = env.identity;
  process.env.SEARCH_URL = env.search;
  process.env.ANALYSIS_URL = env.search;
  const app = buildGatewayApp();
  apps.push(app);
  return `http://127.0.0.1:${new URL(await app.listen({ port: 0, host: "127.0.0.1" })).port}`;
}

const okIdentity: http.RequestListener = (_req, res) => {
  res.setHeader("content-type", "application/json");
  res.end(JSON.stringify({ user }));
};

beforeEach(() => {
  delete process.env.IDENTITY_URL;
  delete process.env.SEARCH_URL;
  delete process.env.ANALYSIS_URL;
});
afterEach(async () => {
  await Promise.all(apps.splice(0).map((app) => app.close()));
  await Promise.all(servers.splice(0).map((server) => new Promise((resolve) => { server.closeAllConnections(); server.close(resolve); })));
});

describe("gateway resilience", () => {
  it("survives the search service dropping the event stream", async () => {
    const identity = await listen(okIdentity);
    const search = await listen((_req, res) => {
      res.writeHead(200, { "content-type": "text/event-stream" });
      res.write('data: {"type":"source","data":{"source":"A","status":"loading"}}\n\n');
      setTimeout(() => res.socket?.destroy(), 50);
    });
    const base = await gateway({ identity, search });

    const response = await fetch(`${base}/api/v1/searches/x/events`, { headers: cookie });
    expect(response.status).toBe(200);
    await response.text().catch(() => undefined);

    const health = await fetch(`${base}/api/v1/health`);
    expect(health.status).toBe(200);
  });

  it("asks identity once for repeated requests with the same session", async () => {
    let lookups = 0;
    const identity = await listen((req, res) => {
      lookups += 1;
      okIdentity(req, res);
    });
    const search = await listen((_req, res) => {
      res.setHeader("content-type", "application/json");
      res.end("[]");
    });
    const base = await gateway({ identity, search });

    for (let i = 0; i < 3; i += 1) {
      expect((await fetch(`${base}/api/v1/sources`, { headers: cookie })).status).toBe(200);
    }
    expect(lookups).toBe(1);
  });

  it("answers 503 instead of crashing when identity is unreachable", async () => {
    const search = await listen((_req, res) => res.end("[]"));
    const base = await gateway({ identity: "http://127.0.0.1:1", search });
    const response = await fetch(`${base}/api/v1/sources`, { headers: cookie });
    expect(response.status).toBe(503);
  });

  it("answers 502 when an upstream service is down", async () => {
    const identity = await listen(okIdentity);
    const base = await gateway({ identity, search: "http://127.0.0.1:1" });
    const response = await fetch(`${base}/api/v1/sources`, { headers: cookie });
    expect(response.status).toBe(502);
  });
});

describe("UserCache", () => {
  it("expires entries and evicts the oldest above the cap", () => {
    let now = 0;
    const cache = new UserCache(1000, 2, () => now);
    cache.set("a", user as never);
    cache.set("b", user as never);
    cache.set("c", user as never);
    expect(cache.get("a")).toBeUndefined();
    expect(cache.get("b")).toBeDefined();
    now = 1500;
    expect(cache.get("b")).toBeUndefined();
  });
});

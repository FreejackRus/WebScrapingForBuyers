import http from "node:http";
import type { AddressInfo } from "node:net";

import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { buildGatewayApp } from "./app.js";
import { SearchHistory } from "./search-history.js";

const users: Record<string, object> = {
  a: { id: "u1", login: "a", displayName: "A", role: "manager", city: "Воронеж", analysisPrompt: "p" },
  b: { id: "u2", login: "b", displayName: "B", role: "manager", city: "Воронеж", analysisPrompt: "p" },
};
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

const product = { id: "p", brand: "Logitech", model: "G102", name: "мышь Logitech G102", mpn: "", category: "Мыши", characteristics: {} };

async function start() {
  const identity = await listen((req, res) => {
    const who = /pr_session=(\w)/.exec(req.headers.cookie ?? "")?.[1] ?? "a";
    res.setHeader("content-type", "application/json");
    res.end(JSON.stringify({ user: users[who] }));
  });
  const search = await listen((_req, res) => {
    res.statusCode = 201;
    res.setHeader("content-type", "application/json");
    res.end(JSON.stringify({ id: "s1", query: "мышь Logitech G102", product, status: "running", offers: [], sources: [] }));
  });
  process.env.IDENTITY_URL = identity;
  process.env.SEARCH_URL = search;
  process.env.ANALYSIS_URL = search;
  const app = buildGatewayApp({ history: new SearchHistory() });
  apps.push(app);
  return `http://127.0.0.1:${new URL(await app.listen({ port: 0, host: "127.0.0.1" })).port}`;
}

const as = (who: string) => ({ cookie: `pr_session=${who}` });
const asJson = (who: string) => ({ ...as(who), "content-type": "application/json" });

beforeEach(() => {
  delete process.env.IDENTITY_URL;
  delete process.env.SEARCH_URL;
  delete process.env.ANALYSIS_URL;
});
afterEach(async () => {
  await Promise.all(apps.splice(0).map((app) => app.close()));
  await Promise.all(servers.splice(0).map((s) => new Promise((resolve) => { s.closeAllConnections(); s.close(resolve); })));
});

describe("search history routes", () => {
  it("remembers a started search per user, lets the user delete and clear it", async () => {
    const base = await start();
    await fetch(`${base}/api/v1/searches`, { method: "POST", headers: asJson("a"), body: JSON.stringify({ query: "мышь Logitech G102" }) });

    const mine = (await (await fetch(`${base}/api/v1/history`, { headers: as("a") })).json()) as { history: { id: string; query: string }[] };
    expect(mine.history).toMatchObject([{ id: "s1", query: "мышь Logitech G102" }]);
    const theirs = (await (await fetch(`${base}/api/v1/history`, { headers: as("b") })).json()) as { history: unknown[] };
    expect(theirs.history).toEqual([]);

    expect((await fetch(`${base}/api/v1/history/s1`, { method: "DELETE", headers: as("b") })).status).toBe(404);
    expect((await fetch(`${base}/api/v1/history/s1`, { method: "DELETE", headers: as("a") })).status).toBe(200);
    await fetch(`${base}/api/v1/searches`, { method: "POST", headers: asJson("a"), body: JSON.stringify({ query: "мышь Logitech G102" }) });
    expect((await fetch(`${base}/api/v1/history`, { method: "DELETE", headers: as("a") })).status).toBe(200);
    const after = (await (await fetch(`${base}/api/v1/history`, { headers: as("a") })).json()) as { history: unknown[] };
    expect(after.history).toEqual([]);
  });

  it("requires a session", async () => {
    const identity = await listen((_req, res) => { res.statusCode = 401; res.end("{}"); });
    process.env.IDENTITY_URL = identity;
    const app = buildGatewayApp({ history: new SearchHistory() });
    apps.push(app);
    const response = await app.inject({ method: "GET", url: "/api/v1/history", headers: { cookie: "pr_session=x" } });
    expect(response.statusCode).toBe(401);
  });
});

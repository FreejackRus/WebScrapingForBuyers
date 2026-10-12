import http from "node:http";
import type { AddressInfo } from "node:net";

import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { buildGatewayApp } from "./app.js";
import { BasketStore } from "./basket-store.js";
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


async function start() {
  const identity = await listen((req, res) => {
    const who = /pr_session=(\w)/.exec(req.headers.cookie ?? "")?.[1] ?? "a";
    res.setHeader("content-type", "application/json");
    res.end(JSON.stringify({ user: users[who] }));
  });
  const search = await listen((req, res) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      res.setHeader("content-type", "application/json");
      res.end(JSON.stringify({ path: req.url, body: body ? JSON.parse(body) : null }));
    });
  });
  process.env.IDENTITY_URL = identity;
  process.env.SEARCH_URL = search;
  process.env.ANALYSIS_URL = search;
  const app = buildGatewayApp({ history: new SearchHistory(), basket: new BasketStore() });
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

const offer = { source: "NETLAB", seller: "NETLAB", title: "Мышь Logitech G102", price: 1500, priceCondition: "Публичная цена", availability: "В наличии", condition: "new", url: "https://netlab.ru/p/1" };

describe("basket routes", () => {
  it("adds, merges, updates, removes and isolates users", async () => {
    const base = await start();
    const add = await fetch(`${base}/api/v1/basket`, { method: "POST", headers: asJson("a"), body: JSON.stringify({ query: "g102", offer }) });
    expect(add.status).toBe(201);
    const { item } = (await add.json()) as { item: { id: string; quantity: number } };
    expect(item.quantity).toBe(1);
    await fetch(`${base}/api/v1/basket`, { method: "POST", headers: asJson("a"), body: JSON.stringify({ query: "g102", quantity: 2, offer }) });
    let list = (await (await fetch(`${base}/api/v1/basket`, { headers: as("a") })).json()) as { items: Array<{ quantity: number }> };
    expect(list.items).toHaveLength(1);
    expect(list.items[0]!.quantity).toBe(3);
    expect(((await (await fetch(`${base}/api/v1/basket`, { headers: as("b") })).json()) as { items: unknown[] }).items).toEqual([]);

    const patch = await fetch(`${base}/api/v1/basket/${item.id}`, { method: "PATCH", headers: asJson("a"), body: JSON.stringify({ quantity: 7 }) });
    expect(patch.status).toBe(200);
    expect((await fetch(`${base}/api/v1/basket/${item.id}`, { method: "PATCH", headers: asJson("a"), body: JSON.stringify({ quantity: 0 }) })).status).toBe(400);

    const justify = (await (await fetch(`${base}/api/v1/basket/justify`, { method: "POST", headers: as("a") })).json()) as { path: string; body: { items: Array<{ quantity: number }> } };
    expect(justify.path).toBe("/justify-basket");
    expect(justify.body.items[0]!.quantity).toBe(7);

    expect((await fetch(`${base}/api/v1/basket/${item.id}`, { method: "DELETE", headers: as("b") })).status).toBe(404);
    expect((await fetch(`${base}/api/v1/basket/${item.id}`, { method: "DELETE", headers: as("a") })).status).toBe(200);
    list = (await (await fetch(`${base}/api/v1/basket`, { headers: as("a") })).json()) as { items: Array<{ quantity: number }> };
    expect(list.items).toEqual([]);
    expect((await fetch(`${base}/api/v1/basket/justify`, { method: "POST", headers: as("a") })).status).toBe(400);
  });

  it("rejects bad offers and non-web links", async () => {
    const base = await start();
    const bad = await fetch(`${base}/api/v1/basket`, { method: "POST", headers: asJson("a"), body: JSON.stringify({ offer: { ...offer, url: "javascript:alert(1)" } }) });
    expect(bad.status).toBe(400);
    const big = await fetch(`${base}/api/v1/basket`, { method: "POST", headers: asJson("a"), body: JSON.stringify({ offer: { ...offer, title: "x".repeat(20_000) } }) });
    expect(big.status).toBe(413);
  });

  it("proxies the bulk request split", async () => {
    const base = await start();
    const response = (await (await fetch(`${base}/api/v1/request/split`, { method: "POST", headers: asJson("a"), body: JSON.stringify({ text: "мышь 5 шт" }) })).json()) as { path: string; body: unknown };
    expect(response).toEqual({ path: "/split-request", body: { text: "мышь 5 шт" } });
  });
});

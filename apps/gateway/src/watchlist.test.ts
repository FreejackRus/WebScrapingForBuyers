import http from "node:http";
import { mkdtempSync } from "node:fs";
import type { AddressInfo } from "node:net";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { buildGatewayApp, parseNewWatch } from "./app.js";
import { checkIntervalHours, checkWatchItem } from "./watchlist-checker.js";
import { WatchlistStore } from "./watchlist.js";

const product = { id: "p", brand: "Logitech", model: "G102", name: "мышь Logitech G102", mpn: "", category: "Мыши", characteristics: { источник: "typed" } };
const watch = { query: "g102", product, channel: "marketplace" as const, price: 1000, inStock: true };
const servers: http.Server[] = [];

function listen(handler: http.RequestListener): Promise<string> {
  return new Promise((resolve) => {
    const server = http.createServer(handler).listen(0, "127.0.0.1", () => {
      servers.push(server);
      resolve(`http://127.0.0.1:${(server.address() as AddressInfo).port}`);
    });
  });
}

afterEach(() => {
  for (const server of servers.splice(0)) server.close();
});

describe("WatchlistStore", () => {
  it("caps items per user, keeps users apart and persists", async () => {
    const file = join(mkdtempSync(join(tmpdir(), "wl-")), "w.json");
    const store = new WatchlistStore(file, 2, Date.now, 0);
    expect(store.add("u1", watch)).toBeDefined();
    expect(store.add("u1", { ...watch, product: { ...product, id: "q" } })).toBeDefined();
    expect(store.add("u1", { ...watch, product: { ...product, id: "r" } })).toBeUndefined();
    // Watching the same product again replaces the old item instead of filling the list.
    expect(store.add("u1", { ...watch, price: 900 })?.baseline.price).toBe(900);
    expect(store.list("u2")).toEqual([]);
    await store.flush();
    expect(new WatchlistStore(file).list("u1")).toHaveLength(2);
  });
});

describe("checkWatchItem", () => {
  it("runs a search with the stored product and records the change", async () => {
    let posted: { product?: { characteristics: Record<string, string> } } = {};
    let polls = 0;
    const search = await listen((req, res) => {
      res.setHeader("content-type", "application/json");
      if (req.method === "POST") {
        let body = "";
        req.on("data", (chunk) => (body += chunk));
        req.on("end", () => {
          posted = JSON.parse(body);
          res.statusCode = 201;
          res.end(JSON.stringify({ id: "s1", status: "running", offers: [] }));
        });
        return;
      }
      polls += 1;
      res.end(JSON.stringify({
        id: "s1",
        status: "complete",
        offers: [{ id: "o", source: "Ozon", price: 900, availability: "В наличии", demo: false }],
      }));
    });
    const store = new WatchlistStore();
    const item = store.add("u1", watch)!;
    const checked = await checkWatchItem(store, search, "u1", item, Date.now, { pollMs: 1 });
    expect(posted.product?.characteristics.источник).toBe("watchlist");
    expect(polls).toBe(1);
    expect(checked?.change).toBe("cheaper");
    expect(checked?.last?.price).toBe(900);
  });

  it("keeps the item and stores the error when search fails", async () => {
    const search = await listen((_req, res) => {
      res.statusCode = 422;
      res.end(JSON.stringify({ error: "нет" }));
    });
    const store = new WatchlistStore();
    const item = store.add("u1", watch)!;
    const checked = await checkWatchItem(store, search, "u1", item);
    expect(checked?.checkError).toBe("нет");
    expect(checked?.change).toBeNull();
  });
});

describe("watchlist routes", () => {
  it("adds, lists and deletes items of the signed-in user", async () => {
    const identity = await listen((_req, res) => {
      res.setHeader("content-type", "application/json");
      res.end(JSON.stringify({ user: { id: "u1", login: "a", displayName: "A", role: "manager", city: "Воронеж", analysisPrompt: "" } }));
    });
    process.env.IDENTITY_URL = identity;
    const app = buildGatewayApp({ watchlistScheduler: false });
    const headers = { cookie: "pr_session=a" };
    const created = await app.inject({ method: "POST", url: "/api/v1/watchlist", headers, payload: watch });
    expect(created.statusCode).toBe(201);
    const id = created.json<{ id: string }>().id;
    expect((await app.inject({ method: "GET", url: "/api/v1/watchlist", headers })).json<{ items: unknown[] }>().items).toHaveLength(1);
    expect((await app.inject({ method: "POST", url: "/api/v1/watchlist", headers, payload: { ...watch, price: -1 } })).statusCode).toBe(400);
    expect((await app.inject({ method: "DELETE", url: `/api/v1/watchlist/${id}`, headers })).statusCode).toBe(200);
    expect((await app.inject({ method: "DELETE", url: `/api/v1/watchlist/${id}`, headers })).statusCode).toBe(404);
    await app.close();
  });

  it("validates the body and reads the interval", () => {
    expect(parseNewWatch({ ...watch, channel: "x" })).toBeUndefined();
    expect(parseNewWatch(watch)?.inStock).toBe(true);
    expect(checkIntervalHours(undefined)).toBe(24);
    expect(checkIntervalHours("0")).toBe(0);
    expect(checkIntervalHours("6")).toBe(6);
  });
});

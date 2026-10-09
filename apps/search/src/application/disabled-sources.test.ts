import type { Product } from "@peremena/contracts";
import { afterEach, describe, expect, it, vi } from "vitest";

import { buildSearchApp } from "../app.js";
import type { SourceAdapter } from "../domain/source-adapter.js";
import { SearchService } from "./search-service.js";

const product = { id: "cpu", name: "Intel Core i5-12400F", brand: "Intel", model: "12400F", mpn: "", category: "Процессор", characteristics: {} } satisfies Product;
const apps: ReturnType<typeof buildSearchApp>[] = [];
afterEach(async () => Promise.all(apps.splice(0).map((app) => app.close())));

function setup(name = "DNS") {
  const dns = { name, search: vi.fn(async () => []) } satisfies SourceAdapter;
  const active = { name: "NETLAB", search: vi.fn(async () => []) } satisfies SourceAdapter;
  return { dns, active, service: new SearchService([dns, active]) };
}

async function finish(service: SearchService, id: string) {
  if (service.get(id)?.status === "complete") return;
  await new Promise<void>((resolve) => {
    const off = service.subscribe(id, (event) => {
      if (event.type === "complete") { off(); resolve(); }
    });
  });
}

describe("temporarily disabled DNS", () => {
  it.each(["DNS", " dns ", "ДНС", "dns-shop"])("excludes adapter alias %s from default collection", async (name) => {
    const { dns, active, service } = setup(name);
    expect(service.listSources()).toEqual(["NETLAB"]);
    const snapshot = service.start("12400F", product);
    await finish(service, snapshot.id);
    expect(dns.search).not.toHaveBeenCalled();
    expect(active.search).toHaveBeenCalledOnce();
    expect(service.get(snapshot.id)?.sources.map((state) => state.source)).toEqual(["NETLAB"]);
  });

  it("ignores stale explicit DNS selection in mixed searches and last-good cache", async () => {
    const { dns, active, service } = setup();
    const legacyCache = (service as unknown as { lastGoodReal: Map<string, unknown[]> }).lastGoodReal;
    legacyCache.set(`dns\0${product.mpn}\0${product.model}`.toLocaleLowerCase("ru"), [{ id: "old-dns", source: "DNS" }]);
    const snapshot = service.start("12400F", product, [" dns ", "NETLAB"]);
    await finish(service, snapshot.id);
    expect(dns.search).not.toHaveBeenCalled();
    expect(active.search).toHaveBeenCalledOnce();
    expect(service.get(snapshot.id)?.offers).toEqual([]);
    expect(service.resolveSources(["DNS", "ДНС", "dns-shop"])).toEqual([]);
  });

  it.each([true, false])("lists disabled metadata even when adapter configured=%s", async (configured) => {
    const { dns, active } = setup();
    const app = buildSearchApp({ sources: configured ? [dns, active] : [active] });
    apps.push(app);
    const response = await app.inject({ method: "GET", url: "/sources" });
    expect(response.json()).toEqual({ sources: ["NETLAB"], disabledSources: [{ name: "DNS", reason: "Временно недоступен" }] });
  });

  it("rejects DNS-only requests before collecting and defaults to active sources", async () => {
    const { dns, active } = setup();
    const app = buildSearchApp({ sources: [dns, active] });
    apps.push(app);
    const blocked = await app.inject({ method: "POST", url: "/searches", payload: { query: "12400F", product, sources: ["DNS"] } });
    expect(blocked.statusCode).toBe(400);
    expect(blocked.json()).toEqual({ error: "DNS временно недоступен. Выберите другой источник." });
    const started = await app.inject({ method: "POST", url: "/searches", payload: { query: "12400F", product } });
    expect(started.statusCode).toBe(201);
    expect(started.json().sources.map((state: { source: string }) => state.source)).toEqual(["NETLAB"]);
    expect(dns.search).not.toHaveBeenCalled();
  });

  it("rejects default search when DNS is the only configured adapter", async () => {
    const { dns } = setup();
    const app = buildSearchApp({ sources: [dns] });
    apps.push(app);
    const response = await app.inject({ method: "POST", url: "/searches", payload: { query: "12400F", product } });
    expect(response.statusCode).toBe(400);
    expect(response.json()).toEqual({ error: "Нет доступных источников для поиска" });
    expect(dns.search).not.toHaveBeenCalled();
  });
});

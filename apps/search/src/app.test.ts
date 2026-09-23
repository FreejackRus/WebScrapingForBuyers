import type { Offer, Product, SearchSnapshot } from "@peremena/contracts";
import { afterEach, describe, expect, it } from "vitest";

import { buildSearchApp } from "./app.js";
import type { SourceAdapter } from "./domain/source-adapter.js";
import { McpMarketplaceAdapter } from "./infrastructure/sources/mcp-marketplace-adapter.js";

function mergeSnapshotOffers(current: SearchSnapshot | undefined, incoming: SearchSnapshot): SearchSnapshot {
  if (!current || current.id !== incoming.id) return incoming;
  const ids = new Set(incoming.offers.map((offer) => offer.id));
  return {
    ...incoming,
    offers: [...incoming.offers, ...current.offers.filter((offer) => !ids.has(offer.id))],
  };
}

class TestSource implements SourceAdapter {
  readonly name = "TEST";

  async search(product: Product): Promise<Offer[]> {
    return [
      {
        id: "test-offer",
        source: this.name,
        seller: this.name,
        title: product.name,
        mpn: product.mpn,
        price: 1_000,
        priceCondition: "Обычная цена",
        currency: "RUB",
        availability: "В наличии",
        warranty: "12 месяцев",
        condition: "new",
        match: "exact",
        url: "https://example.com/product",
        fetchedAt: new Date().toISOString(),
        demo: true,
      },
    ];
  }
}

const apps: ReturnType<typeof buildSearchApp>[] = [];
afterEach(async () => Promise.all(apps.splice(0).map((app) => app.close())));

describe("search", () => {
  it("suggests catalog products", async () => {
    const app = buildSearchApp({ sources: [new TestSource()] });
    apps.push(app);
    const response = await app.inject({
      method: "POST",
      url: "/suggestions",
      payload: { query: "мышь Logitech" },
    });
    expect(response.statusCode).toBe(200);
    expect(response.json().products.length).toBeGreaterThan(1);
  });

  it("collects offers", async () => {
    const app = buildSearchApp({ sources: [new TestSource()] });
    apps.push(app);
    const created = await app.inject({
      method: "POST",
      url: "/searches",
      payload: { query: "MX Master", productId: "logitech-mx-master-3s-graphite" },
    });
    await new Promise((resolve) => setTimeout(resolve, 0));
    const snapshot = await app.inject({
      method: "GET",
      url: `/searches/${created.json().id}`,
    });
    expect(snapshot.json()).toMatchObject({ status: "complete", offers: [{ price: 1_000 }] });
  });

  it("exports collected offers to Excel", async () => {
    const app = buildSearchApp({ sources: [new TestSource()] });
    apps.push(app);
    const created = await app.inject({
      method: "POST",
      url: "/searches",
      payload: { query: "M185", productId: "logitech-m185-grey" },
    });
    await new Promise((resolve) => setTimeout(resolve, 0));
    const response = await app.inject({
      method: "GET",
      url: `/searches/${created.json().id}/export.xlsx`,
    });
    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toContain("spreadsheetml");
    expect(response.rawPayload.byteLength).toBeGreaterThan(1_000);
  });

  it("keeps REAL Wildberries offers after POST created snapshot and SSE merge", async () => {
    const adapter = new McpMarketplaceAdapter(
      {
        callTool: async () => ({
          items: [
            {
              nm_id: 1_317_494_381,
              name: "Проводная игровая мышь G102 LightSync Black",
              brand: "Logitech",
              price_rub: 1_344,
            },
          ],
        }),
      },
      { name: "Wildberries", tool: "wb_search", host: "wildberries.ru", kind: "wb" },
    );
    const app = buildSearchApp({ sources: [adapter] });
    apps.push(app);
    const createdResponse = await app.inject({
      method: "POST",
      url: "/searches",
      payload: { query: "G102", productId: "logitech-g102-black" },
    });
    expect(createdResponse.statusCode).toBe(201);
    const created = createdResponse.json() as SearchSnapshot;
    expect(created.offers).toEqual([]);
    await new Promise((resolve) => setTimeout(resolve, 0));
    const snapshotResponse = await app.inject({
      method: "GET",
      url: `/searches/${created.id}`,
    });
    const snapshot = snapshotResponse.json() as SearchSnapshot;
    const merged = mergeSnapshotOffers(created, snapshot);
    const wildberries = merged.offers.filter((offer) => offer.source === "Wildberries" && !offer.demo);
    expect(snapshot.status).toBe("complete");
    expect(wildberries.length).toBeGreaterThanOrEqual(1);
    expect(wildberries[0]).toMatchObject({
      source: "Wildberries",
      price: 1_344,
      demo: false,
    });
    const wiped = mergeSnapshotOffers(merged, created);
    expect(wiped.offers.filter((offer) => offer.source === "Wildberries" && !offer.demo)).toHaveLength(
      wildberries.length,
    );
  });

  it("keeps last good REAL Wildberries offers after a later 429", async () => {
    let fail = false;
    const adapter: SourceAdapter = {
      name: "Wildberries",
      async search(product) {
        if (fail) throw new Error("WB rate-limited (429). Подождите и повторите поиск.");
        return [
          {
            id: "wb-real-1",
            source: "Wildberries",
            seller: "WB",
            title: product.name,
            price: 1_344,
            priceCondition: "Публичная цена",
            currency: "RUB",
            availability: "В наличии",
            condition: "new",
            match: "probable",
            url: "https://www.wildberries.ru/catalog/1/detail.aspx",
            fetchedAt: new Date().toISOString(),
            demo: false,
          },
        ];
      },
    };
    const app = buildSearchApp({ sources: [adapter] });
    apps.push(app);
    const first = await app.inject({
      method: "POST",
      url: "/searches",
      payload: { query: "G102", productId: "logitech-g102-black" },
    });
    await new Promise((resolve) => setTimeout(resolve, 0));
    const firstSnap = (await app.inject({
      method: "GET",
      url: `/searches/${first.json().id}`,
    })).json() as SearchSnapshot;
    expect(firstSnap.offers.filter((offer) => offer.source === "Wildberries" && !offer.demo)).toHaveLength(1);

    fail = true;
    const second = await app.inject({
      method: "POST",
      url: "/searches",
      payload: { query: "G102", productId: "logitech-g102-black" },
    });
    await new Promise((resolve) => setTimeout(resolve, 0));
    const secondSnap = (await app.inject({
      method: "GET",
      url: `/searches/${second.json().id}`,
    })).json() as SearchSnapshot;
    const reused = secondSnap.offers.filter((offer) => offer.source === "Wildberries" && !offer.demo);
    expect(reused).toHaveLength(1);
    expect(reused[0]).toMatchObject({ price: 1_344, demo: false });
    const wb = secondSnap.sources.find((source) => source.source === "Wildberries");
    expect(wb).toMatchObject({ status: "error" });
    expect(wb?.message).toMatch(/WB rate-limited/);
    expect(wb?.message).toMatch(/последние удачные/);
  });
});

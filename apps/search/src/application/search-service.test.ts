import type { Offer, Product } from "@peremena/contracts";
import { describe, expect, it } from "vitest";

import type { SourceAdapter } from "../domain/source-adapter.js";
import { SearchService } from "./search-service.js";

const product: Product = { id: "p", name: "Logitech K380", brand: "Logitech", model: "K380", mpn: "920-007584" } as Product;

function offer(source: string, price = 1000): Offer {
  return {
    id: `${source}-${price}`,
    source,
    seller: source,
    title: "Logitech K380",
    price,
    priceCondition: "Обычная цена",
    currency: "RUB",
    availability: "В наличии",
    condition: "new",
    match: "exact",
    url: "https://example.com",
    fetchedAt: new Date().toISOString(),
    demo: false,
  } as Offer;
}

function source(name: string, behaviour: () => Promise<Offer[]>): SourceAdapter {
  return { name, search: behaviour };
}

async function finish(service: SearchService, id: string): Promise<void> {
  await new Promise<void>((resolve) => {
    const off = service.subscribe(id, (event) => {
      if (event.type === "complete") {
        off();
        resolve();
      }
    });
  });
}

const retention = { ttlMs: 1000, maxSearches: 2, maxLastGood: 2 };

describe("SearchService retention", () => {
  it("drops finished searches after the TTL", async () => {
    let now = 0;
    const service = new SearchService([source("A", async () => [offer("A")])], retention, () => now);
    const first = service.start("q", product);
    await finish(service, first.id);
    now = 5000;
    service.start("q2", product);
    expect(service.get(first.id)).toBeUndefined();
  });

  it("evicts the oldest finished search above the cap", async () => {
    const service = new SearchService([source("A", async () => [offer("A")])], retention, () => 0);
    const ids: string[] = [];
    for (let i = 0; i < 2; i += 1) {
      const snap = service.start(`q${i}`, product);
      ids.push(snap.id);
      await finish(service, snap.id);
    }
    const third = service.start("q3", product);
    expect(service.get(ids[0]!)).toBeUndefined();
    expect(service.get(ids[1]!)).toBeDefined();
    expect(service.get(third.id)).toBeDefined();
  });

  it("never drops a search that is still running", async () => {
    let release: () => void = () => {};
    const slow = source("SLOW", () => new Promise<Offer[]>((resolve) => (release = () => resolve([]))));
    const service = new SearchService([slow], { ...retention, maxSearches: 1 }, () => 0);
    const running = service.start("q", product);
    service.start("q2", product);
    expect(service.get(running.id)).toBeDefined();
    release();
  });
});

describe("SearchService last-good fallback", () => {
  it("reuses the last real offers when a source fails", async () => {
    let fail = false;
    const flaky = source("A", async () => {
      if (fail) throw new Error("boom");
      return [offer("A")];
    });
    const service = new SearchService([flaky]);
    const ok = service.start("q", product);
    await finish(service, ok.id);
    fail = true;
    const second = service.start("q", product);
    await finish(service, second.id);
    const snap = service.get(second.id)!;
    expect(snap.offers).toHaveLength(1);
    expect(snap.sources[0]?.status).toBe("error");
  });

  it("caps remembered result sets", async () => {
    const names = ["A", "B", "C"];
    const service = new SearchService(names.map((n) => source(n, async () => [offer(n)])), retention);
    const snap = service.start("q", product);
    await finish(service, snap.id);
    expect((service as unknown as { lastGoodReal: Map<string, Offer[]> }).lastGoodReal.size).toBe(2);
  });
});

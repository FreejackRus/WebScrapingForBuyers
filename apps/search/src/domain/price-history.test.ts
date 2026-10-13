import type { Offer } from "@peremena/contracts";
import { describe, expect, it } from "vitest";

import { isRealArticle, priceHistoryKey, priceHistoryPoint } from "./price-history.js";

function offer(patch: Partial<Offer>): Offer {
  return {
    id: Math.random().toString(36),
    source: "Ozon",
    seller: "s",
    title: "t",
    price: 1000,
    priceCondition: "",
    currency: "RUB",
    availability: "В наличии",
    condition: "new",
    match: "exact",
    url: "https://example.com",
    fetchedAt: "2026-10-01T00:00:00.000Z",
    demo: false,
    ...patch,
  } as Offer;
}

describe("priceHistoryKey", () => {
  it("prefers a real article, compact and lowercase", () => {
    expect(priceHistoryKey({ mpn: "CF-283A", brand: "HP", model: "83A" })).toBe("mpn:cf283a");
  });
  it("falls back to brand+model when the mpn is not an article", () => {
    expect(isRealArticle("512")).toBe(false);
    expect(priceHistoryKey({ mpn: "512", brand: "Samsung", model: "990 PRO 1 ТБ" })).toBe("model:samsung990pro1тб");
    expect(priceHistoryKey({ mpn: "", brand: "", model: "x" })).toBeUndefined();
  });
});

describe("priceHistoryPoint", () => {
  it("takes minimums per channel over good rows only", () => {
    const point = priceHistoryPoint("q", [
      offer({ price: 900, availability: "Под заказ" }),
      offer({ price: 1000 }),
      offer({ price: 100, priceAnomaly: "too_low" }),
      offer({ price: 200, demo: true }),
      offer({ price: 300, assessment: { group: "needs_review" } as NonNullable<Offer["assessment"]> }),
      offer({ price: 1500, source: "NETLAB" }),
    ], "2026-10-02T00:00:00.000Z");
    expect(point).toMatchObject({
      at: "2026-10-02T00:00:00.000Z",
      query: "q",
      marketplace: { min: 900, inStockMin: 1000, count: 2 },
      distributor: { min: 1500, inStockMin: 1500, count: 1 },
    });
  });
  it("skips demo-only searches", () => {
    expect(priceHistoryPoint("q", [offer({ demo: true })], "x")).toBeUndefined();
  });
});

describe("previous listing prices", () => {
  it("marks only rows whose listing price moved by at least 1 %", async () => {
    const { markPreviousPrices, offerPriceKey } = await import("./price-history.js");
    const row = (url: string, price: number) => ({ id: url, source: "OZON", url, price } as import("@peremena/contracts").Offer);
    const offers = [row("a", 900), row("b", 1_005), row("c", 500)];
    const marked = markPreviousPrices(offers, { [offerPriceKey(row("a", 0))]: 1_000, [offerPriceKey(row("b", 0))]: 1_000 });
    expect(marked).toBe(1);
    expect(offers.map((offer) => offer.previousPrice)).toEqual([1_000, undefined, undefined]);
  });
});

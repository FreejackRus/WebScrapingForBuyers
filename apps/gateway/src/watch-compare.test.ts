import type { Offer } from "@peremena/contracts";
import { describe, expect, it } from "vitest";

import { compareWatch, watchedPrice } from "./watch-compare.js";

const row = (patch: Partial<Offer>): Offer =>
  ({ id: "x", source: "Ozon", seller: "", title: "", price: 1000, priceCondition: "", currency: "RUB", availability: "В наличии", condition: "new", match: "exact", url: "", fetchedAt: "", demo: false, ...patch }) as Offer;

describe("watchedPrice", () => {
  it("takes the cheapest in-stock good row of the channel", () => {
    expect(watchedPrice([
      row({ price: 500, availability: "Под заказ" }),
      row({ price: 900 }),
      row({ price: 100, priceAnomaly: "too_low" }),
      row({ price: 200, demo: true }),
      row({ price: 300, source: "NETLAB" }),
    ], "marketplace")).toEqual({ price: 900, inStock: true });
  });
  it("falls back to any good row, marked not in stock", () => {
    expect(watchedPrice([row({ price: 500, availability: "Нет в наличии" })], "marketplace")).toEqual({ price: 500, inStock: false });
    expect(watchedPrice([row({})], "distributor")).toBeUndefined();
  });
});

describe("compareWatch", () => {
  it("reports stock changes first, then moves of at least 2%", () => {
    expect(compareWatch({ price: 1000, inStock: false }, { price: 1200, inStock: true })).toBe("back_in_stock");
    expect(compareWatch({ price: 1000, inStock: true }, { price: 800, inStock: false })).toBe("out_of_stock");
    expect(compareWatch({ price: 1000, inStock: true }, { price: 980, inStock: true })).toBe("cheaper");
    expect(compareWatch({ price: 1000, inStock: true }, { price: 1020, inStock: true })).toBe("pricier");
    expect(compareWatch({ price: 1000, inStock: true }, { price: 1010, inStock: true })).toBe("same");
  });
});

import type { Offer } from "@peremena/contracts";
import { describe, expect, it } from "vitest";

import { modelGroups } from "./index";

describe("modelGroups", () => {
  const row = (id: string, modelKey: string | undefined, price: number, extra: Partial<Offer> = {}): Offer => ({
    id, source: "Ozon", seller: "Ozon", title: id, price, priceCondition: "", currency: "RUB", availability: "В наличии",
    condition: "new", match: "probable", url: "https://example.test", fetchedAt: "2026-10-28T10:00:00Z", demo: false,
    ...(modelKey ? { modelKey } : {}), ...extra,
  });

  it("lists the models largest first with the lowest per-unit price", () => {
    const groups = modelGroups([
      row("a", "K380", 1200), row("b", "K380", 900), row("c", "K380S", 3000, { unitPrice: 1500, packQuantity: 2 }), row("d", undefined, 10),
    ]);
    expect(groups).toEqual([{ key: "K380", count: 2, fromPrice: 900 }, { key: "K380S", count: 1, fromPrice: 1500 }]);
  });

  it("shows nothing for a single model and ignores demo or anomalous rows", () => {
    expect(modelGroups([row("a", "K380", 1000), row("b", "K380S", 5, { priceAnomaly: "too_low" })])).toEqual([]);
  });
});

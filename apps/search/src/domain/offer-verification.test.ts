import type { Offer } from "@peremena/contracts";
import { describe, expect, it } from "vitest";

import { applyCardFacts } from "./offer-verification.js";
import { productFromQuery } from "./product-from-query.js";

const query = "монитор dell p2423d";
const product = productFromQuery(query, "query");
const row = {
  id: "o", source: "Ozon", seller: "X", title: "Dell 23.8\" Монитор (Dell P2423D 2K), IPS", price: 23_271, priceCondition: "",
  currency: "RUB", availability: "В наличии", condition: "new", match: "probable", url: "https://www.ozon.ru/product/1/", fetchedAt: "", demo: false,
} as Offer;
const at = "2026-10-12T12:00:00.000Z";

describe("applyCardFacts", () => {
  it("confirms a price within 3%", () => {
    expect(applyCardFacts(row, { title: row.title, price: 23_900, available: true }, product, query, at).verification?.status).toBe("confirmed");
  });

  it("takes the card price when it differs and keeps the listed one", () => {
    const checked = applyCardFacts(row, { title: row.title, price: 24_268, priceBasis: "без Ozon Карты" }, product, query, at);
    expect(checked).toMatchObject({ price: 24_268, verification: { status: "price_changed", listedPrice: 23_271 } });
    expect(checked.verification?.note).toContain("без Ozon Карты");
  });

  it("marks a sold-out card", () => {
    expect(applyCardFacts(row, { available: false }, product, query, at)).toMatchObject({
      availabilityStatus: "out_of_stock",
      verification: { status: "unavailable" },
    });
  });

  it("sends a card that shows another model to review", () => {
    const checked = applyCardFacts(row, { title: "Монитор Dell P2723QE 27\"", specs: "Модель P2723QE" }, product, query, at);
    expect(checked).toMatchObject({ assessment: { group: "needs_review" }, verification: { status: "mismatch" } });
  });

  it("accepts a model named only in the characteristics", () => {
    const checked = applyCardFacts(row, { title: "Монитор 23.8\" 2K IPS", specs: "Модель Dell P2423D", price: 23_271 }, product, query, at);
    expect(checked.verification?.status).toBe("confirmed");
  });
});

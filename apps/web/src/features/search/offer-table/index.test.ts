import type { Offer } from "@peremena/contracts";
import { describe, expect, it } from "vitest";

import { buildOfferTablePage } from "./index";

const baseOffer: Offer = {
  id: "offer",
  source: "source",
  seller: "",
  title: "Product",
  price: 100,
  priceCondition: "public",
  currency: "RUB",
  availability: "В наличии",
  condition: "new",
  match: "exact",
  url: "https://example.test/product",
  fetchedAt: "2026-10-07T00:00:00Z",
  demo: false,
};

describe("buildOfferTablePage", () => {
  it("separates every review offer before paginating primary offers", () => {
    const reviewOffers = Array.from({ length: 8 }, (_, index) => ({
      ...baseOffer,
      id: `review-${index}`,
      assessment: { group: "needs_review" as const, reasons: ["Нужно проверить модель"] },
    }));
    const primaryOffers = [
      { ...baseOffer, id: "legacy" },
      { ...baseOffer, id: "match", title: "Other product", assessment: { group: "match" as const, reasons: [] } },
    ];

    const page = buildOfferTablePage([...reviewOffers, ...primaryOffers], undefined, 1);

    expect(page.rows.map((offer) => offer.id)).toEqual(["legacy", "match"]);
    expect(page.total).toBe(2);
    expect(page.pageCount).toBe(1);
    expect(page.reviewRows).toHaveLength(8);
  });

  it("keeps an all-review result out of the primary total without losing its rows", () => {
    const offers = Array.from({ length: 9 }, (_, index) => ({
      ...baseOffer,
      id: `review-${index}`,
      assessment: { group: "needs_review" as const, reasons: ["Нужно уточнение"] },
    }));

    const page = buildOfferTablePage(offers, undefined, 1);

    expect(page.rows).toEqual([]);
    expect(page.total).toBe(0);
    expect(page.reviewRows).toHaveLength(9);
  });
});

describe("offer grouping", () => {
  it("folds the same listing from several sellers under its best row", () => {
    const base = { priceCondition: "", currency: "RUB" as const, availability: "В наличии", condition: "new" as const, match: "exact" as const, url: "u", fetchedAt: "", demo: false, source: "Wildberries" };
    const offers = [
      { ...base, id: "a", seller: "A", title: "Мышь беспроводная M240 Silent (910-007119)", price: 1540, procurementRank: 1 },
      { ...base, id: "b", seller: "B", title: "Мышь беспроводная M240 SILENT (910-007119)", price: 1576, procurementRank: 2 },
      { ...base, id: "c", seller: "C", title: "Мышь M240 белая", price: 1600, procurementRank: 3 },
    ];
    const page = buildOfferTablePage(offers, undefined, 1);
    expect(page.rows.map((row) => row.id)).toEqual(["a", "c"]);
    expect(page.grouped.a?.map((row) => row.id)).toEqual(["b"]);
    expect(page).toMatchObject({ total: 2, offerCount: 3 });
  });
});

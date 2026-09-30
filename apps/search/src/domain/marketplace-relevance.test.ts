import type { Product } from "@peremena/contracts";
import { describe, expect, it } from "vitest";

import { assessMarketplaceOfferRelevance } from "./marketplace-relevance.js";

const k380: Product = {
  id: "p",
  brand: "Logitech",
  model: "K380",
  name: "Клавиатура Logitech K380",
  mpn: "920-007584",
  category: "клавиатура",
  characteristics: {},
} as Product;

describe("marketplace relevance (domain)", () => {
  it("keeps a listing that names the model", () => {
    const verdict = assessMarketplaceOfferRelevance("Клавиатура Logitech K380 Bluetooth", undefined, undefined, k380);
    expect(verdict.kind).toBe("strong");
  });

  it("drops a rival SKU of the same brand", () => {
    const verdict = assessMarketplaceOfferRelevance("Клавиатура Logitech K120 проводная", undefined, undefined, k380);
    expect(verdict.kind).toBe("drop");
  });

  it("drops an unrelated product", () => {
    const verdict = assessMarketplaceOfferRelevance("Кофемашина DeLonghi Magnifica", undefined, undefined, k380);
    expect(verdict.kind).toBe("drop");
  });
});

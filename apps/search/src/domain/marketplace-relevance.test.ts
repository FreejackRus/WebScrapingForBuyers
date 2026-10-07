import type { Product } from "@peremena/contracts";
import { describe, expect, it } from "vitest";

import { assessMarketplaceOfferRelevance, productIdentityTokens } from "./marketplace-relevance.js";

const k380: Product = {
  id: "p",
  brand: "Logitech",
  model: "K380",
  name: "Клавиатура Logitech K380",
  mpn: "920-007584",
  category: "клавиатура",
  characteristics: {},
} as Product;

const legionGo: Product = {
  id: "legion-go",
  brand: "Lenovo",
  model: "Legion Go",
  name: "Lenovo Legion Go",
  mpn: "",
  category: "Игровые консоли",
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

  it("keeps the short Go model qualifier and drops Legion laptops", () => {
    expect(productIdentityTokens(legionGo).strong).toEqual(expect.arrayContaining(["legion", "go"]));
    expect(
      assessMarketplaceOfferRelevance(
        "Портативная игровая консоль Lenovo Legion Go 16/512 ГБ",
        undefined,
        undefined,
        legionGo,
      ).kind,
    ).toBe("strong");
    expect(
      assessMarketplaceOfferRelevance(
        'Ноутбук игровой Lenovo Legion 7 16IAX10, 16", RTX 5070',
        undefined,
        undefined,
        legionGo,
      ).kind,
    ).toBe("drop");
  });

  it("drops accessories that put their type before the Legion Go identity", () => {
    for (const title of [
      "Портативный коннектор JSAUX для зарядки контроллеров Lenovo Legion Go - GP0503",
      "Наклейки на корпус Lenovo Legion Go, Алмазная крошка, Miuko",
      "Жесткий чехол для Lenovo Legion Go",
    ]) {
      expect(assessMarketplaceOfferRelevance(title, undefined, undefined, legionGo, "ozon").kind).toBe("drop");
    }
  });
});

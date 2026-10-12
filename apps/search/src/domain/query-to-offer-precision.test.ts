import { describe, expect, it } from "vitest";

import { assessMarketplaceOfferRelevance } from "./marketplace-relevance.js";
import { assessOffer } from "./offer-assessment.js";
import { productFromQuery } from "./product-from-query.js";

/** End to end: the raw typed query, parsed as in production, against marketplace titles. */
function kind(query: string, title: string): string {
  return assessMarketplaceOfferRelevance(title, undefined, undefined, productFromQuery(query, "query")).kind;
}

describe("typed query → offer precision", () => {
  it.each([
    ["990 pro 2тб", "SSD Samsung 990 PRO 2 ТБ NVMe M.2", "strong"],
    ["990 pro 2тб", "SSD Samsung 990 PRO 1ТБ, NVMe", "drop"],
    ["990 pro 2тб", "SSD Samsung 990 PRO 4TB", "drop"],
    ["samsung 990 pro 2tb", "SSD Samsung 990 PRO (1TB)", "drop"],
    ["4060 8gb", "Видеокарта MSI GeForce RTX 4060 VENTUS 2X 8G", "strong"],
    ["4060 8gb", "Видеокарта Palit RTX4060 8 ГБ для компьютера", "strong"],
    ["4060 8gb", "Игровой ПК Ryzen 5 RTX 4060 8GB", "drop"],
    ["4060 8gb", "Видеокарта RTX 4060 Ti 16GB", "drop"],
    ["rtx 4060", "Видеокарта RTX 4060 Ti 8GB", "drop"],
    ["rtx 4060 ti", "Видеокарта RTX 4060 Ti 8GB", "strong"],
    ["legion go", "Игровая консоль Lenovo Legion Go 1TB", "strong"],
    ["legion go", "Lenovo Legion Go S", "drop"],
    ["legion go", "Чехол для Lenovo Legion Go", "drop"],
  ])("%s ← %s → %s", (query, title, expected) => {
    expect(kind(query, title)).toBe(expected);
  });

  it("keeps the product category for GPU numbers and SSD series typed without a type word", () => {
    expect(productFromQuery("4060 8gb", "query").category).toBe("Видеокарты");
    expect(productFromQuery("990 pro 2тб", "query").category).toBe("SSD");
    expect(productFromQuery("игровой пк 4060 8gb", "query").category).not.toBe("Видеокарты");
  });

  it("does not read pack sizes, revisions or series numbers as a variant suffix", () => {
    expect(kind("rtx 4060", "Видеокарта MSI RTX 4060 2X 8G")).toBe("strong");
    expect(kind("картридж pantum tl-5120", "Картридж Pantum TL-5120 2 шт")).not.toBe("drop");
    expect(kind("Xeon E5-2697 v4", "Процессор Intel Xeon E5-2697 v4 2.3GHz")).toBe("strong");
  });

  describe("assessment keeps listings that name the model in their own words", () => {
    const offer = (title: string) => ({
      id: "x", source: "T", seller: "T", title, price: 1000, priceCondition: "", currency: "RUB" as const,
      availability: "В наличии", condition: "new" as const, match: "probable" as const, url: "https://t", fetchedAt: "", demo: false,
    });
    const assessed = (query: string, title: string) => assessOffer(productFromQuery(query, "query"), offer(title), query);

    it.each([
      ["оперативная память ddr5 32gb kingston fury", "Оперативная память Kingston FURY Beast DDR5 32GB 5600"],
      ["ибп apc back-ups 650", "ИБП APC Back-UPS 650VA BX650MI-GR"],
      ["сервер lenovo thinksystem sr650 v2", "Сервер Lenovo ThinkSystem SR650 V2 8SFF"],
      ["kyocera 302n494021", "Узел проявки Kyocera 302N494021 DV-1150"],
    ])("%s ← %s", (query, title) => {
      expect(assessed(query, title)).not.toBeNull();
    });

    it("does not accept an older server generation or a third-party article", () => {
      expect(assessed("сервер lenovo thinksystem sr650 v2", "Сервер Lenovo ThinkSystem SR650 (7X06A0B3EA)")).toBeNull();
      expect(assessed("tl-5120 оригинальный", "Картридж N-TL-5120 для принтера Pantum BP5100 3K с чипом")).toBeNull();
      expect(assessed("tl-5120 оригинальный", "Картридж Pantum TL-5120 оригинальный")).not.toBeNull();
    });

    it("reads GPU names typed without a type word as graphics cards", () => {
      expect(productFromQuery("rx 7800 xt", "query").category).toBe("Видеокарты");
    });
  });
});

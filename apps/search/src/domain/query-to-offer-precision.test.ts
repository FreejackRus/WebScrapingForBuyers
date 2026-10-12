import { describe, expect, it } from "vitest";

import { assessMarketplaceOfferRelevance } from "./marketplace-relevance.js";
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
});

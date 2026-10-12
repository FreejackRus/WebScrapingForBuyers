import { describe, expect, it } from "vitest";

import { productFromQuery } from "./product-from-query.js";
import { mergeUnderstanding, needsUnderstanding } from "./query-understanding.js";

describe("mergeUnderstanding", () => {
  const query = "нужно 5 штук мышек logitech m240 для бухгалтерии";
  const base = productFromQuery(query, "query");

  it("takes the typed model, brand and quantity and builds a clean search name", () => {
    const merged = mergeUnderstanding(base, { productType: "мышь", brand: "Logitech", model: "M240", quantity: 5 }, query);
    expect(merged).toMatchObject({ brand: "Logitech", model: "M240", name: "мышь Logitech M240", category: "Мыши" });
    expect(merged.characteristics).toMatchObject({ количество: "5", "разбор запроса": "AI" });
  });

  it("ignores a model or brand the buyer did not type", () => {
    const merged = mergeUnderstanding(base, { brand: "Apple", model: "Magic Mouse 2" }, query);
    expect(merged.model).toBe(base.model);
    expect(merged.brand).toBe(base.brand);
  });

  it("asks AI only for long or unrecognised requests", () => {
    expect(needsUnderstanding("i5-12400f", productFromQuery("i5-12400f", "query"))).toBe(false);
    expect(needsUnderstanding(query, base)).toBe(true);
  });
});

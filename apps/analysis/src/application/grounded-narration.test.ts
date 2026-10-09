import type { Offer } from "@peremena/contracts";
import { describe, expect, it } from "vitest";
import { groundedOfferFacts, validateGroundedNarration } from "./grounded-narration.js";
const offer: Offer = { id: "cpu", source: "NETLAB", seller: "NETLAB", title: "Intel 12400F BOX", price: 13445, currency: "RUB", priceCondition: "Обычная", availability: "склад: более 50 шт.", availabilityStatus: "in_stock", condition: "new", match: "exact", url: "https://netlab.ru/product/1", fetchedAt: "2026-10-09", demo: false };
describe("grounded explanation, fail closed", () => {
  it("accepts extractive card facts tied to cited offer", () => {
    const facts = groundedOfferFacts([offer]);
    expect(facts.length).toBeGreaterThan(0);
    expect(validateGroundedNarration(facts.join("\n"), ["cpu"], [offer])).toBe(true);
  });
  it.each(["Официальная гарантия 3 года.", "В BOX входит лицензионное ПО.", "В наличии 100 штук.", "Intel 12400F BOX — 1 000 ₽.", "Другой процессор — 13 445 ₽.", "Купить: https://evil.test/1", "Купить: https://netlab.ru/product/1", "Ссылка [товар](javascript:alert(1))", "Привезём завтра.", "Это лучший и самый надёжный продавец."])("rejects unsupported assertion %s", (summary) => {
    expect(validateGroundedNarration(summary, ["cpu"], [offer])).toBe(false);
  });
  it("rejects unknown or duplicate citation IDs", () => {
    expect(validateGroundedNarration("Сравните предложения в таблице.", ["missing"], [offer])).toBe(false);
    expect(validateGroundedNarration("Сравните предложения в таблице.", ["cpu", "cpu"], [offer])).toBe(false);
  });
  it("does not accept a fact from an uncited row", () => {
    expect(validateGroundedNarration(groundedOfferFacts([offer])[0]!, [], [offer])).toBe(false);
  });
  it("accepts bounded neutral explanation without inventing facts", () => {
    expect(validateGroundedNarration("Сравните предложения в таблице.", undefined, [offer])).toBe(true);
  });
  it("does not turn absent warranty into promise", () => {
    expect(groundedOfferFacts([offer]).join(" ")).toMatch(/Гарантия.*не указана/i);
  });
});

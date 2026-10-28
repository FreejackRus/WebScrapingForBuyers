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

// Owner's approval 2026-10-28: free prose, every fact checked against the cited rows.
describe("grounded explanation, fact by fact", () => {
  const wb: Offer = { ...offer, id: "wb", source: "Wildberries", seller: "Wildberries", title: "Клавиатура Logitech K380 серая", price: 2273, availability: "В наличии", availabilityStatus: "in_stock", condition: "new" };
  const avito: Offer = { ...offer, id: "avito", source: "Авито", seller: "Авито", title: "Клавиатура logitech k380", price: 989, availability: "Неизвестно", availabilityStatus: "unknown", condition: "unknown" };
  const rows = [wb, avito];

  it.each([
    "Лучший вариант — Wildberries за 2 273 ₽: товар новый и в наличии. На Авито K380 дешевле, 989 ₽, но наличие не подтверждено.",
    "Wildberries дороже Авито на 1 284 ₽, зато наличие подтверждено.",
    "Разница между Wildberries и Авито — 57 %.",
    "Сравнил 2 предложения: Wildberries надёжнее по наличию".replace("надёжнее", "лучше"),
  ])("accepts %s", (summary) => {
    expect(validateGroundedNarration(summary, ["wb", "avito"], rows)).toBe(true);
  });

  it.each([
    ["price attached to the wrong shop", "На Авито K380 стоит 2 273 ₽."],
    ["price nobody has", "Wildberries продаёт K380 за 1 990 ₽."],
    ["shop that is not cited", "На Ozon K380 есть за 2 273 ₽."],
    ["stock that is not confirmed", "На Авито K380 в наличии."],
    ["a new item nobody claimed", "На Авито новая K380."],
    ["delivery promise", "Wildberries привезёт K380 завтра."],
    ["discount without an old price", "На Wildberries скидка на K380."],
    ["invented quantity", "На Wildberries осталось 7 штук."],
    ["wrong percentage", "Авито дешевле на 80 %."],
  ])("rejects %s", (_reason, summary) => {
    expect(validateGroundedNarration(summary, ["wb", "avito"], rows)).toBe(false);
  });

  it("allows facts only from cited rows", () => {
    expect(validateGroundedNarration("Wildberries продаёт K380 за 2 273 ₽.", ["avito"], rows)).toBe(false);
    expect(validateGroundedNarration("Наличие подтверждайте перед закупкой.", [], [])).toBe(false);
    expect(validateGroundedNarration("Лучший вариант по цене — WB.", ["avito"], rows)).toBe(false);
  });
});


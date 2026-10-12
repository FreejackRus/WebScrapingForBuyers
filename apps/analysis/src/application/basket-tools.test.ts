import type { BasketItem } from "@peremena/contracts";
import { describe, expect, it } from "vitest";

import type { AnalysisNarrator } from "../domain/analysis-narrator.js";
import { basketTemplate, justifyBasket, positionIsGrounded, splitRequest, splitRequestFallback } from "./basket-tools.js";

const fake = (answer: unknown): AnalysisNarrator => ({
  name: "test-llm",
  summarize: async () => ({ summary: "", warnings: [] }),
  askJson: async () => answer,
});

const item = (id: string, price: number, quantity: number): BasketItem => ({
  id, addedAt: "2026-10-12T00:00:00.000Z", query: "ssd 990 pro", quantity,
  offer: { source: "NETLAB", seller: "NETLAB", title: `Samsung 990 PRO ${id}`, price, priceCondition: "Публичная цена", availability: "В наличии", condition: "new", url: `https://shop/${id}` },
});

describe("splitRequestFallback", () => {
  it("splits lines, numbered items and «;», reading «N шт»", () => {
    expect(splitRequestFallback("1. Мышь Logitech M240 — 5 шт\n2) SSD Samsung 990 PRO 2TB 3 шт.; ИБП APC BX750MI")).toEqual([
      { query: "Мышь Logitech M240", quantity: 5 },
      { query: "SSD Samsung 990 PRO 2TB", quantity: 3 },
      { query: "ИБП APC BX750MI", quantity: 1 },
    ]);
  });

  it("reads a leading quantity and skips empty lines", () => {
    expect(splitRequestFallback("\n10 шт клавиатура Defender\n\n")).toEqual([{ query: "клавиатура Defender", quantity: 10 }]);
  });
});

describe("positionIsGrounded", () => {
  const source = "Нужно 5 мышек Logitech M240 и монитор Dell P2422H";
  it("accepts words from the text", () => {
    expect(positionIsGrounded({ query: "Logitech M240", quantity: 5 }, source)).toBe(true);
  });
  it("rejects invented models and bad quantities", () => {
    expect(positionIsGrounded({ query: "Apple Magic Mouse", quantity: 1 }, source)).toBe(false);
    expect(positionIsGrounded({ query: "Dell P2422H", quantity: 0 }, source)).toBe(false);
    expect(positionIsGrounded({ query: "Dell P2422H", quantity: 1.5 }, source)).toBe(false);
  });
});

describe("splitRequest", () => {
  const source = "Добрый день! Нужно: мышь Logitech M240 5 шт; монитор Dell P2422H 2 шт";
  it("keeps grounded AI positions and drops invented ones", async () => {
    const result = await splitRequest(source, fake({ items: [{ query: "мышь Logitech M240", quantity: 5 }, { query: "Apple iPhone 15", quantity: 1 }] }));
    expect(result).toEqual({ ai: true, items: [{ query: "мышь Logitech M240", quantity: 5 }] });
  });
  it("falls back without AI", async () => {
    const result = await splitRequest(source, undefined);
    expect(result.ai).toBe(false);
    expect(result.items.map((p) => p.quantity)).toContain(2);
  });
});

describe("justifyBasket", () => {
  const items = [item("a", 35_234, 2), item("b", 1_000, 3)];
  it("template lists totals", () => {
    const text = basketTemplate(items).replace(/[\u00a0\u202f]/g, " ");
    expect(text).toContain("73 468 ₽");
    expect(text).toContain("Позиций: 2, единиц: 5");
  });
  it("accepts grounded AI text", async () => {
    const memo = "Закупаем две позиции у поставщика NETLAB, общая сумма заявки составляет 73 468 ₽, позиции в наличии.";
    expect(await justifyBasket(items, fake({ memo }))).toMatchObject({ ai: true, text: memo });
  });
  it("rejects invented numbers", async () => {
    const result = await justifyBasket(items, fake({ memo: "Закупаем у поставщика NETLAB всего на сумму 99 999 ₽, позиции в наличии на складе." }));
    expect(result.ai).toBe(false);
    const small = await justifyBasket(items, fake({ memo: "Закупаем у поставщика NETLAB 17 штук на сумму 73 468 ₽, позиции в наличии." }));
    expect(small.ai).toBe(false);
  });
});

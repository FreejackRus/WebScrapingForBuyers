import type { BasketItem, Offer } from "@peremena/contracts";
import { describe, expect, it } from "vitest";

import { basketCsv, basketTotal, toBasketOffer } from "./lib";

const item = (title: string, price: number, quantity: number): BasketItem => ({
  id: title, addedAt: "2026-10-12T09:00:00.000Z", query: "мышь", quantity,
  offer: { source: "NETLAB", seller: "NETLAB", title, price, priceCondition: "Публичная цена", availability: "В наличии", condition: "new", url: "https://netlab.ru/1" },
});

describe("basket csv", () => {
  it("has BOM, «;» separator, the agreed columns, totals and a neutralised formula", () => {
    const csv = basketCsv([item("Мышь \"G102\"", 1500.5, 2), item("=HYPERLINK(1)", 100, 1)]);
    expect(csv.startsWith("﻿")).toBe(true);
    const lines = csv.slice(1).trim().split("\r\n");
    expect(lines[0]).toBe('"Товар";"Артикул";"Поставщик";"Продавец";"Цена";"Кол-во";"Сумма";"Наличие";"Условия цены";"Ссылка";"Запрос";"Добавлено"');
    expect(lines[1]).toContain('"Мышь ""G102""";"";"NETLAB";"NETLAB";"1500,5";"2";"3001"');
    expect(lines[2]).toContain(`"'=HYPERLINK(1)"`);
    expect(lines[3]).toContain('"Итого";"3101"');
    expect(basketTotal([item("a", 10, 3)])).toBe(30);
  });

  it("keeps only the snapshot fields of an offer", () => {
    const offer = { id: "x", source: "Ozon", seller: "S", title: "T", price: 5, priceCondition: "p", currency: "RUB", availability: "a", condition: "new", match: "exact", url: "https://o", fetchedAt: "", demo: false, verification: { status: "confirmed", checkedAt: "", note: "ok" } } as Offer;
    expect(toBasketOffer(offer)).toEqual({ source: "Ozon", seller: "S", title: "T", price: 5, priceCondition: "p", availability: "a", condition: "new", url: "https://o", verificationNote: "ok" });
  });
});

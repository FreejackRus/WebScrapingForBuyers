import type { Offer } from "@peremena/contracts";
import { describe, expect, it } from "vitest";

import { applyTableFilter, sortOffers } from "./index";

function offer(id: string, availability: string): Offer {
  return {
    id,
    source: "Ozon",
    seller: "Ozon",
    title: "Кабель HDMI",
    price: 100,
    priceCondition: "Обычная цена",
    currency: "RUB",
    availability,
    condition: "new",
    match: "exact",
    url: "https://ozon.ru/1",
    fetchedAt: "2026-10-05T10:00:00Z",
    demo: false,
  };
}

describe("applyTableFilter · inStockOnly", () => {
  it("keeps only confirmed stock", () => {
    const rows = [offer("a", "В наличии"), offer("b", "В наличии: 12"), offer("c", "Неизвестно"), offer("d", "Под заказ")];
    expect(applyTableFilter(rows, { inStockOnly: true }).map((o) => o.id)).toEqual(["a", "b"]);
  });
});

it("includes NETLAB warehouse quantities and excludes zero or uncertain stock", () => {
  const rows = [offer("warehouse", "склад: более 50 шт."), offer("remote", "удалённый склад: 1–20 шт."), offer("zero", "склад: 0 шт."), offer("ask", "Уточнить")];
  expect(applyTableFilter(rows, { inStockOnly: true }).map(o => o.id)).toEqual(["warehouse", "remote"]);
});

it("uses normalized availability when source wording is ambiguous", () => {
  const rows: Offer[] = [
    { ...offer("available", "Уточнить на сайте"), availabilityStatus: "in_stock" },
    { ...offer("soldout", "В наличии"), availabilityStatus: "out_of_stock" },
    { ...offer("ordered", "В наличии у поставщика"), availabilityStatus: "on_order" },
  ];
  expect(applyTableFilter(rows, { inStockOnly: true }).map(o => o.id)).toEqual(["available"]);
});

it("keeps late matching offers visible with dynamic stock and packaging predicates", () => {
  const rows = [offer("one", "склад: более 50 шт."), offer("late", "склад: более 50 шт.")].map(row => ({...row,title:"Intel 12400F BOX",availability:"склад: более 50 шт."}));
  expect(applyTableFilter(rows,{inStockOnly:true,packaging:"BOX"}).map(row=>row.id)).toEqual(["one","late"]);
});

it("filters by the selected product conditions", () => {
  const rows: Offer[] = [
    { ...offer("new", "В наличии"), condition: "new" },
    { ...offer("display", "В наличии"), condition: "display" },
    { ...offer("unknown", "В наличии"), condition: "unknown" },
  ];

  expect(applyTableFilter(rows, { conditions: ["display", "unknown"] }).map((row) => row.id)).toEqual([
    "display",
    "unknown",
  ]);
});

it("uses the server procurement rank by default and preserves old snapshot order", () => {
  const ranked = [
    { ...offer("later", "В наличии"), procurementRank: 20 },
    { ...offer("first", "В наличии"), procurementRank: 10 },
    offer("legacy-a", "В наличии"),
    offer("legacy-b", "В наличии"),
  ];

  expect(sortOffers(ranked).map((row) => row.id)).toEqual(["first", "later", "legacy-a", "legacy-b"]);
  expect(sortOffers(ranked.slice(2)).map((row) => row.id)).toEqual(["legacy-a", "legacy-b"]);
});

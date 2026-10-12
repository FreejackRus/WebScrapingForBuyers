import type { Offer } from "@peremena/contracts";
import { describe, expect, it } from "vitest";

import { assignProcurementRanks, normalizeOfferCondition } from "./procurement-rank.js";

function offer(id: string, patch: Partial<Offer> = {}): Offer {
  return {
    id,
    source: "Ozon",
    seller: "Ozon",
    title: `Intel Core i5-12400F ${id}`,
    price: 10_000,
    priceCondition: "Публичная цена",
    currency: "RUB",
    availability: "В наличии",
    condition: "new",
    match: "exact",
    url: `https://example.test/${id}`,
    fetchedAt: new Date(0).toISOString(),
    demo: false,
    ...patch,
  } as Offer;
}

function order(rows: Offer[]): string[] {
  assignProcurementRanks(rows);
  return [...rows].sort((a, b) => a.procurementRank! - b.procurementRank!).map((row) => row.id);
}

describe("procurement rank", () => {
  it("puts the requested model before a cheaper doubtful card", () => {
    expect(
      order([
        offer("doubtful-cheap", { match: "doubtful", price: 5_000 }),
        offer("exact", { price: 11_000 }),
        offer("analog", { match: "analog", price: 9_000 }),
      ]),
    ).toEqual(["exact", "analog", "doubtful-cheap"]);
  });

  it("orders stock: confirmed, unknown, on order, absent; then price", () => {
    expect(
      order([
        offer("absent", { availability: "Нет в наличии", price: 1_000 }),
        offer("unknown", { availability: "Неизвестно", price: 2_000 }),
        offer("stock-dear", { price: 9_000 }),
        offer("stock-cheap", { price: 8_000 }),
      ]),
    ).toEqual(["stock-cheap", "stock-dear", "unknown", "absent"]);
  });

  it("reads used, display and refurbished wording next to punctuation", () => {
    expect(normalizeOfferCondition(offer("u", { title: "Intel i5-12400F Б/У, гарантия 14 дней" }))).toBe("used");
    expect(normalizeOfferCondition(offer("u2", { title: "Процессор (б/у) Intel i5-12400F" }))).toBe("used");
    expect(normalizeOfferCondition(offer("d", { title: "Intel i5-12400F С витрины. Протестирован" }))).toBe("display");
    expect(normalizeOfferCondition(offer("r", { title: "Intel i5-12400F Refurbished" }))).toBe("refurbished");
    expect(normalizeOfferCondition(offer("n", { title: "Intel i5-12400F BOX" }))).toBe("new");
  });

  it("does not claim «new» for NETLAB without title evidence", () => {
    expect(normalizeOfferCondition(offer("nl", { source: "NETLAB" }))).toBe("unknown");
  });
});

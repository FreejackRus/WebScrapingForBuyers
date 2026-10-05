import type { Offer } from "@peremena/contracts";
import { describe, expect, it } from "vitest";

import { applyTableFilter } from "./index";

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

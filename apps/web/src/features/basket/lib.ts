import type { BasketItem, BasketOffer, Offer, Product } from "@peremena/contracts";

export const lineTotal = (item: BasketItem) => item.offer.price * item.quantity;
export const basketTotal = (items: BasketItem[]) => items.reduce((sum, item) => sum + lineTotal(item), 0);

/** The fields a basket line keeps; the search snapshot behind the row may expire. */
export function toBasketOffer(offer: Offer): BasketOffer {
  return {
    source: offer.source,
    seller: offer.seller,
    title: offer.title,
    price: offer.price,
    priceCondition: offer.priceCondition,
    availability: offer.availability,
    condition: offer.condition,
    url: offer.url,
    ...(offer.mpn ? { mpn: offer.mpn } : {}),
    ...(offer.verification?.note ? { verificationNote: offer.verification.note } : {}),
  };
}

export const normalizeQuery = (query: string) => query.toLocaleLowerCase("ru").replace(/\s+/g, " ").trim();

/** Same shape the search box builds for a typed query, so «Найти» from a bulk request behaves like typing it. */
export function productFromQuery(query: string): Product {
  const name = query.trim().replace(/\s+/g, " ");
  return {
    id: `typed-${name.toLocaleLowerCase("ru").slice(0, 48)}`,
    brand: "—",
    model: name,
    name,
    mpn: "",
    category: "Каталог",
    characteristics: { источник: "typed" },
  };
}

export const BASKET_CSV_COLUMNS = [
  "Товар", "Артикул", "Поставщик", "Продавец", "Цена", "Кол-во", "Сумма", "Наличие", "Условия цены", "Ссылка", "Запрос", "Добавлено",
] as const;

/** Excel cell: quoted, and a leading = + - @ is neutralised so a shop title can't become a formula. */
function csvCell(value: string | number): string {
  let text = typeof value === "number" ? String(value).replace(".", ",") : value;
  if (typeof value === "string" && /^[=+\-@\t\r]/.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
}

const addedDate = (iso: string) => {
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? iso : date.toLocaleString("ru-RU");
};

/** CSV that Russian Excel opens by double click: UTF-8 BOM, «;» separator, CRLF. */
export function basketCsv(items: BasketItem[]): string {
  const rows = items.map((item) => [
    item.offer.title,
    item.offer.mpn ?? "",
    item.offer.source,
    item.offer.seller,
    item.offer.price,
    item.quantity,
    lineTotal(item),
    item.offer.availability,
    item.offer.priceCondition,
    item.offer.url,
    item.query,
    addedDate(item.addedAt),
  ]);
  const lines = [BASKET_CSV_COLUMNS as readonly (string | number)[], ...rows].map((row) => row.map(csvCell).join(";"));
  lines.push(["", "", "", "", "", "Итого", basketTotal(items), "", "", "", "", ""].map(csvCell).join(";"));
  return `﻿${lines.join("\r\n")}\r\n`;
}

export function downloadBasketCsv(items: BasketItem[]): void {
  const blob = new Blob([basketCsv(items)], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `korzina-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1_000);
}

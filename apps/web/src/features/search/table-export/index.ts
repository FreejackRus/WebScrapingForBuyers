import type { Offer } from "@peremena/contracts";

/** Excel cell: quoted, and a leading = + - @ is neutralised so a shop title can't become a formula. */
function cell(value: string | number): string {
  let text = typeof value === "number" ? String(value).replace(".", ",") : value;
  if (typeof value === "string" && /^[=+\-@\t\r]/u.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
}

export const TABLE_CSV_COLUMNS = ["Поставщик", "Продавец", "Товар", "Артикул", "Цена, ₽", "Условие цены", "Наличие", "Соответствие", "Доставка", "Гарантия", "Ссылка"] as const;

/** Exactly the rows the buyer sees (tab + filters), as CSV for Russian Excel: BOM, «;», CRLF. */
export function offersTableCsv(offers: Offer[], matchLabel: (offer: Offer) => string): string {
  const rows = offers.map((offer) => [
    offer.source,
    offer.seller && offer.seller !== offer.source ? offer.seller : "",
    offer.title,
    offer.mpn ?? "",
    offer.price,
    offer.priceCondition ?? "",
    offer.availability,
    matchLabel(offer),
    offer.delivery ?? "",
    offer.warranty ?? "",
    offer.url,
  ]);
  const lines = [TABLE_CSV_COLUMNS as readonly (string | number)[], ...rows].map((row) => row.map(cell).join(";"));
  return `﻿${lines.join("\r\n")}\r\n`;
}

export function downloadOffersCsv(offers: Offer[], matchLabel: (offer: Offer) => string, name: string): void {
  const blob = new Blob([offersTableCsv(offers, matchLabel)], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  const slug = name.toLocaleLowerCase("ru").replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/gu, "").slice(0, 40) || "poisk";
  link.download = `${slug}-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1_000);
}

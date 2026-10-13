import { offerAvailabilityStatus, type Offer, type OfferTableFilter } from "@peremena/contracts";

export const matchLabels = {
  exact: "Точное",
  probable: "Вероятное",
  analog: "Аналог",
  doubtful: "Сомнительное",
};

/** Shown next to a price search marked as implausibly low. */
export const PRICE_ANOMALY_LABEL = "Цена под сомнением";
export const PRICE_ANOMALY_HINT =
  "Цена намного ниже остальных предложений — возможна ошибка площадки, деталь или аксессуар вместо товара. В лучшую цену не входит, проверьте на сайте.";

/** Short badge for a top row re-checked on its product card. */
export const verificationLabels: Record<NonNullable<Offer["verification"]>["status"], string> = {
  confirmed: "✓ Проверено",
  price_changed: "Цена обновлена",
  unavailable: "Нет в наличии",
  mismatch: "Не та модель?",
};

export const conditionLabels: Record<Offer["condition"], string> = {
  new: "Новый товар",
  refurbished: "Восстановленный",
  used: "Б/у",
  display: "Витринный",
  unknown: "Состояние не указано",
};

export const matchRank: Record<Offer["match"], number> = {
  exact: 0,
  probable: 1,
  analog: 2,
  doubtful: 3,
};

export type OfferSortColumn =
  | "source"
  | "title"
  | "match"
  | "price"
  | "availability"
  | "conditions"
  | "fetched";
export type OfferSortDirection = "asc" | "desc";
export interface OfferSort {
  column: OfferSortColumn;
  direction: OfferSortDirection;
}

export function applyTableFilter(offers: Offer[], filter?: OfferTableFilter) {
  if (!filter) return offers;
  return offers.filter((offer) => {
    if (filter.packaging && !new RegExp(`(?:^|[^a-z0-9])${filter.packaging}(?=$|[^a-z0-9])`,"iu").test(offer.title)) return false;
    if (filter.realOnly && offer.demo) return false;
    if (filter.cheaperOnly && !(offer.previousPrice && offer.price < offer.previousPrice)) return false;
    if (filter.sources?.length) {
      const hay = `${offer.source} ${offer.seller ?? ""}`.toLocaleLowerCase("ru");
      const matched = filter.sources.some((source) => hay.includes(source.toLocaleLowerCase("ru")));
      if (!matched) return false;
    }
    if (filter.maxPrice != null && offer.price > filter.maxPrice) return false;
    if (filter.inStockOnly && offerAvailabilityStatus(offer) !== "in_stock") return false;
    if (filter.conditions?.length && !filter.conditions.includes(offer.condition)) return false;
    if (filter.titleExcludeAny?.length) {
      const hay = offer.title.toLocaleLowerCase("ru");
      if (filter.titleExcludeAny.some((token) => hay.includes(token.toLocaleLowerCase("ru")))) {
        return false;
      }
    }
    if (filter.titleIncludeAny?.length) {
      const hay = offer.title.toLocaleLowerCase("ru");
      const matched = filter.titleIncludeAny.some((token) =>
        hay.includes(token.toLocaleLowerCase("ru")),
      );
      if (!matched) return false;
    }
    if (filter.selectedOfferIds !== undefined) {
      if (!filter.selectedOfferIds.includes(offer.id)) return false;
    }
    return true;
  });
}

export function filterOffers(offers: Offer[], needle: string, tableFilter?: OfferTableFilter) {
  const scoped = applyTableFilter(offers, tableFilter);
  const query = needle.trim().toLocaleLowerCase("ru");
  if (!query) return scoped;
  return scoped.filter((offer) =>
    [offer.source, offer.seller, offer.title, offer.mpn, offer.availability, offer.delivery, offer.warranty].some(
      (value) => value?.toLocaleLowerCase("ru").includes(query),
    ),
  );
}

function compareText(left: string, right: string) {
  return left.localeCompare(right, "ru");
}

function offerSortValue(offer: Offer, column: OfferSortColumn): string | number {
  if (column === "source") return `${offer.source} ${offer.seller}`;
  if (column === "title") return offer.title;
  if (column === "match") return matchRank[offer.match];
  if (column === "price") return offer.price;
  if (column === "availability") {
    const statusRank = { in_stock: 0, on_order: 1, out_of_stock: 2, unknown: 3 } as const;
    return statusRank[offerAvailabilityStatus(offer)];
  }
  if (column === "conditions") return `${offer.delivery ?? ""} ${offer.warranty ?? ""}`;
  return Date.parse(offer.fetchedAt) || 0;
}

export function sortOffers(offers: Offer[], sort?: OfferSort) {
  if (!sort) {
    return offers.some((offer) => offer.procurementRank != null)
      ? [...offers].sort((left, right) => (left.procurementRank ?? Number.MAX_SAFE_INTEGER) - (right.procurementRank ?? Number.MAX_SAFE_INTEGER))
      : offers;
  }
  const sign = sort.direction === "asc" ? 1 : -1;
  return [...offers].sort((left, right) => {
    const a = offerSortValue(left, sort.column);
    const b = offerSortValue(right, sort.column);
    if (typeof a === "number" && typeof b === "number") return (a - b) * sign;
    return compareText(String(a), String(b)) * sign;
  });
}

export function nextOfferSort(current: OfferSort | undefined, column: OfferSortColumn): OfferSort | undefined {
  if (current?.column !== column) return { column, direction: "asc" };
  if (current.direction === "asc") return { column, direction: "desc" };
  return undefined;
}


export interface OfferGroup {
  lead: Offer;
  /** Same item from other sellers or at other prices, in the table order. */
  others: Offer[];
}

/** «Мышь беспроводная M240 Silent (910-007119)» from five sellers is one item: same words, same condition. */
export function offerGroupKey(offer: Offer): string {
  const words = offer.title
    .toLocaleLowerCase("ru")
    .replace(/ё/g, "е")
    .replace(/[^a-zа-я0-9]+/giu, " ")
    .trim();
  return `${words}|${offer.condition}`;
}

/** Groups an already ordered list; the first row of each item leads its group, so order is kept. */
export function groupSameOffers(offers: Offer[]): OfferGroup[] {
  const groups = new Map<string, OfferGroup>();
  for (const offer of offers) {
    const key = offerGroupKey(offer);
    const group = groups.get(key);
    if (group) group.others.push(offer);
    else groups.set(key, { lead: offer, others: [] });
  }
  return [...groups.values()];
}


/**
 * Key facts read from a listing title, for comparing rows at a glance: «2 ТБ», «DDR5», «NVMe»,
 * «2×16 ГБ», «BOX». Only what the title literally says; nothing is guessed.
 */
export function titleSpecs(title: string): string[] {
  const text = title.replace(/\u00a0/g, " ");
  const specs: string[] = [];
  const kit = /(\d+)\s*[x×х*]\s*(\d+)\s*(gb|гб|g)(?![a-zа-яё])/iu.exec(text);
  if (kit) specs.push(`${kit[1]}×${kit[2]} ГБ`);
  else {
    const capacity = /(?<![\d.,])(\d+(?:[.,]\d+)?)\s*(tb|тб|gb|гб)(?![a-zа-яё])/iu.exec(text);
    if (capacity) specs.push(`${capacity[1]!.replace(".", ",")} ${/t|т/i.test(capacity[2]!) ? "ТБ" : "ГБ"}`);
  }
  const ddr = /(?<![a-zа-яё])(g?ddr\s?\d[xX]?)/iu.exec(text);
  if (ddr) specs.push(ddr[1]!.replace(/\s/g, "").toUpperCase());
  if (/nvme/i.test(text)) specs.push("NVMe");
  else if (/(?<![a-z])sata/i.test(text)) specs.push("SATA");
  const frequency = /(\d{3,4})\s*(?:mhz|мгц|mt\/s)/iu.exec(text);
  if (frequency) specs.push(`${frequency[1]} МГц`);
  const yieldPages = /(\d+(?:[\s.,]?\d{3})?|\d+[kк])\s*(?:стр|pages)/iu.exec(text);
  if (yieldPages) specs.push(`ресурс ${yieldPages[1]!.replace(/[kк]$/iu, " 000")}`);
  if (/(?<![a-z])box(?![a-z])/i.test(text)) specs.push("BOX");
  else if (/(?<![a-z])oem(?![a-z])/i.test(text)) specs.push("OEM");
  return specs;
}

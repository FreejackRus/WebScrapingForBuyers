import type { Offer, OfferTableFilter } from "@peremena/contracts";

export const matchLabels = {
  exact: "Точное",
  probable: "Вероятное",
  analog: "Аналог",
  doubtful: "Сомнительное",
};

export const conditionLabels: Record<Offer["condition"], string> = {
  new: "Новый товар",
  refurbished: "Восстановленный",
  used: "Б/у",
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
    if (filter.realOnly && offer.demo) return false;
    if (filter.sources?.length) {
      const hay = offer.source.toLocaleLowerCase("ru");
      const matched = filter.sources.some((source) => hay.includes(source.toLocaleLowerCase("ru")));
      if (!matched) return false;
    }
    if (filter.maxPrice != null && offer.price > filter.maxPrice) return false;
    if (filter.selectedOfferIds?.length && !filter.selectedOfferIds.includes(offer.id)) return false;
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
  if (column === "availability") return offer.availability;
  if (column === "conditions") return `${offer.delivery ?? ""} ${offer.warranty ?? ""}`;
  return Date.parse(offer.fetchedAt) || 0;
}

export function sortOffers(offers: Offer[], sort?: OfferSort) {
  if (!sort) return offers;
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

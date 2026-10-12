import {
  offerAvailabilityStatus,
  offerChannel,
  type Offer,
  type OfferChannel,
  type PriceChannelStats,
  type PriceHistoryPoint,
  type Product,
} from "@peremena/contracts";

function compact(value: string): string {
  return value.toLocaleLowerCase("ru").replace(/[^\p{L}\p{N}]+/gu, "");
}

/**
 * A maker article, not a placeholder: has a digit, a sensible length and is not just a
 * number (typed queries sometimes put a capacity like "512" into mpn).
 */
export function isRealArticle(mpn: string): boolean {
  const value = compact(mpn);
  return value.length >= 4 && value.length <= 40 && /\d/u.test(value) && /\p{L}/u.test(value);
}

/**
 * Identity of a product across searches: the article when there is one, else brand+model.
 * Lowercase and without separators, so "HP 85A" and "hp-85a" share one series.
 */
export function priceHistoryKey(product: Pick<Product, "mpn" | "brand" | "model">): string | undefined {
  if (isRealArticle(product.mpn)) return `mpn:${compact(product.mpn)}`;
  const model = compact(`${product.brand}${product.model}`);
  return model.length >= 3 ? `model:${model}` : undefined;
}

/** Rows whose price a buyer could actually act on: real, plausible, matching the request. */
export function isHistoryRow(offer: Offer): boolean {
  return !offer.demo && offer.priceAnomaly !== "too_low" && offer.assessment?.group !== "needs_review" && offer.price > 0;
}

function channelStats(offers: Offer[], channel: OfferChannel): PriceChannelStats {
  const rows = offers.filter((offer) => offerChannel(offer) === channel);
  const min = (list: Offer[]) => (list.length ? Math.min(...list.map((offer) => offer.price)) : null);
  return {
    min: min(rows),
    inStockMin: min(rows.filter((offer) => offerAvailabilityStatus(offer) === "in_stock")),
    count: rows.length,
  };
}

/** Point of a completed search, or undefined when it has no usable real rows (demo-only, empty). */
export function priceHistoryPoint(query: string, offers: Offer[], at: string): PriceHistoryPoint | undefined {
  const good = offers.filter(isHistoryRow);
  if (good.length === 0) return undefined;
  return { at, query, marketplace: channelStats(good, "marketplace"), distributor: channelStats(good, "distributor") };
}

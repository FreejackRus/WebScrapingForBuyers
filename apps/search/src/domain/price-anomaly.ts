import type { Offer } from "@peremena/contracts";

/** Below this share of the median the price is treated as broken, not as a deal. */
export const TOO_LOW_SHARE = 0.1;
/** With fewer comparable prices a median says nothing. */
const MIN_COMPARABLE = 4;

function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid]! : (sorted[mid - 1]! + sorted[mid]!) / 2;
}

/**
 * Marks offers whose price is below a tenth of the median for the same search.
 *
 * Real discounts rarely go below ~30% of the typical price; parser slips land far
 * lower (Ozon "2 939 ₽" read as 2 ₽ in September 2026). The median is taken over
 * strong matches (exact/probable) when there are enough, so accessories that
 * slipped into the results cannot drag it down. Recomputed from scratch on every
 * call because the median moves as sources arrive.
 */
export function flagPriceAnomalies(offers: Offer[]): void {
  const priced = offers.filter((offer) => !offer.demo && offer.price > 0);
  const strong = priced.filter((offer) => offer.match === "exact" || offer.match === "probable");
  const basis = strong.length >= MIN_COMPARABLE ? strong : priced;
  const threshold = basis.length >= MIN_COMPARABLE ? median(basis.map((offer) => offer.price)) * TOO_LOW_SHARE : 0;
  for (const offer of offers) {
    if (!offer.demo && offer.price < threshold) offer.priceAnomaly = "too_low";
    else delete offer.priceAnomaly;
  }
}

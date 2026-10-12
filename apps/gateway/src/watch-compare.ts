import { offerAvailabilityStatus, offerChannel, type Offer, type OfferChannel, type WatchChange, type WatchPrice } from "@peremena/contracts";

/** Below this relative move a price is "the same": sources round and jitter by a few roubles. */
export const CHANGE_THRESHOLD = 0.02;

/** Rows whose price a buyer could act on (same rule as the price history in search). */
function isGoodRow(offer: Offer): boolean {
  return !offer.demo && offer.priceAnomaly !== "too_low" && offer.assessment?.group !== "needs_review" && offer.price > 0;
}

/**
 * Current price of a watched product in one channel: cheapest in-stock good row,
 * else the cheapest good row at all (then it is not in stock). Undefined: nothing usable.
 */
export function watchedPrice(offers: Offer[], channel: OfferChannel): { price: number; inStock: boolean } | undefined {
  const rows = offers.filter((offer) => isGoodRow(offer) && offerChannel(offer) === channel);
  if (rows.length === 0) return undefined;
  const inStock = rows.filter((offer) => offerAvailabilityStatus(offer) === "in_stock");
  const pool = inStock.length > 0 ? inStock : rows;
  return { price: Math.min(...pool.map((offer) => offer.price)), inStock: inStock.length > 0 };
}

/** Stock changes win over price moves: a buyer cares first whether it can be bought at all. */
export function compareWatch(baseline: Pick<WatchPrice, "price" | "inStock">, current: Pick<WatchPrice, "price" | "inStock">): WatchChange {
  if (!baseline.inStock && current.inStock) return "back_in_stock";
  if (baseline.inStock && !current.inStock) return "out_of_stock";
  if (baseline.price <= 0) return "same";
  const delta = (current.price - baseline.price) / baseline.price;
  if (delta <= -CHANGE_THRESHOLD) return "cheaper";
  if (delta >= CHANGE_THRESHOLD) return "pricier";
  return "same";
}

import type { Offer, Product } from "@peremena/contracts";

/**
 * Remembers the prices of the buyer's previous search for the same product (in this browser),
 * so a repeated search shows «было 12 990 ₽» next to rows whose price moved.
 */
const PREFIX = "price-radar:last-prices:";
const MAX_PRODUCTS = 60;

export interface PriceMemory {
  savedAt: string;
  prices: Record<string, number>;
}

export const productMemoryKey = (product: Pick<Product, "mpn" | "name">) =>
  (product.mpn?.trim() || product.name).toLocaleLowerCase("ru").replace(/\s+/gu, " ").trim();
export const offerMemoryKey = (offer: Pick<Offer, "source" | "url">) => `${offer.source}|${offer.url}`;

export function readPriceMemory(product: Pick<Product, "mpn" | "name">): PriceMemory | undefined {
  try {
    const raw = localStorage.getItem(PREFIX + productMemoryKey(product));
    const parsed = raw ? (JSON.parse(raw) as PriceMemory) : undefined;
    return parsed && typeof parsed.savedAt === "string" && parsed.prices && typeof parsed.prices === "object" ? parsed : undefined;
  } catch {
    return undefined;
  }
}

export function savePriceMemory(product: Pick<Product, "mpn" | "name">, offers: Offer[], now = new Date()): void {
  const prices = Object.fromEntries(offers.filter((offer) => !offer.demo && offer.price > 0).map((offer) => [offerMemoryKey(offer), offer.price]));
  if (Object.keys(prices).length === 0) return;
  try {
    localStorage.setItem(PREFIX + productMemoryKey(product), JSON.stringify({ savedAt: now.toISOString(), prices } satisfies PriceMemory));
    // Keep storage small: drop the oldest remembered products.
    const keys = Array.from({ length: localStorage.length }, (_, index) => localStorage.key(index) ?? "").filter((key) => key.startsWith(PREFIX));
    if (keys.length > MAX_PRODUCTS) {
      keys
        .map((key) => ({ key, at: (JSON.parse(localStorage.getItem(key) ?? "{}") as Partial<PriceMemory>).savedAt ?? "" }))
        .sort((a, b) => a.at.localeCompare(b.at))
        .slice(0, keys.length - MAX_PRODUCTS)
        .forEach(({ key }) => localStorage.removeItem(key));
    }
  } catch {
    /* private mode or quota */
  }
}

/** Previous price of this row, when it differs by at least 1 %. */
export function previousPrice(memory: PriceMemory | undefined, offer: Offer): number | undefined {
  const before = memory?.prices[offerMemoryKey(offer)];
  if (!before || before <= 0) return undefined;
  return Math.abs(offer.price - before) / before >= 0.01 ? before : undefined;
}

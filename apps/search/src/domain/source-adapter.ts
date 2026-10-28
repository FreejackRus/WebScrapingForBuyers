import type { Offer, Product } from "@peremena/contracts";

export interface SourceAdapter {
  readonly name: string;
  search(product: Product, signal?: AbortSignal): Promise<Offer[]>;
  /**
   * Optional: maker articles this source's catalogue knows for the product (e.g. NETLAB price list:
   * «samsung 990 pro 2тб» → MZ-V9P2T0BW). Used to search the other sources by the exact article.
   */
  articlesFor?(product: Product, query: string): Promise<string[]>;
}

const RAW_FOUND = Symbol("rawFound");

/**
 * Lets an adapter that drops rows itself (marketplace relevance) say how many the source
 * really returned, so «найдено 38, подошло 4» stays true. Plain arrays report their length.
 */
export function withRawFound(offers: Offer[], found: number): Offer[] {
  Object.defineProperty(offers, RAW_FOUND, { value: Math.max(found, offers.length), enumerable: false });
  return offers;
}

export function rawFoundOf(offers: Offer[]): number {
  const found = (offers as Offer[] & { [RAW_FOUND]?: number })[RAW_FOUND];
  return typeof found === "number" ? found : offers.length;
}

/**
 * Most offers one source may add to a search table, after relevance sorting.
 * Raised from 12 on 2026-10-06: managers saw too few rows when only 2 sources answered.
 */
export const OFFERS_PER_SOURCE = 30;

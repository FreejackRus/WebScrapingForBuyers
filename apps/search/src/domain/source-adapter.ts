import type { Offer, Product } from "@peremena/contracts";

export interface SourceAdapter {
  readonly name: string;
  search(product: Product, signal?: AbortSignal): Promise<Offer[]>;
}

/**
 * Most offers one source may add to a search table, after relevance sorting.
 * Raised from 12 on 2026-10-06: managers saw too few rows when only 2 sources answered.
 */
export const OFFERS_PER_SOURCE = 30;

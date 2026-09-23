import type { Offer, Product } from "@peremena/contracts";

export interface SourceAdapter {
  readonly name: string;
  search(product: Product, signal?: AbortSignal): Promise<Offer[]>;
}

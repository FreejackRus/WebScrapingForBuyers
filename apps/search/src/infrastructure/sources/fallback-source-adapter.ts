import type { Offer, Product } from "@peremena/contracts";

import type { SourceAdapter } from "../../domain/source-adapter.js";
import {
  isAntibotTransportError,
  isMcpUnavailableError,
  isWbStaleCatalogMiss,
} from "./mcp-marketplace-adapter.js";

export class FallbackSourceAdapter implements SourceAdapter {
  constructor(
    readonly name: string,
    private readonly adapters: SourceAdapter[],
  ) {}

  async search(product: Product, signal?: AbortSignal): Promise<Offer[]> {
    const errors: string[] = [];
    for (const adapter of this.adapters) {
      try {
        const offers = await adapter.search(product, signal);
        if (offers.length > 0) return offers;
        // Live empty MCP is not a second catalog hit. After a stale
        // search-goods miss we already threw, so this path is live-empty.
        if (this.name === "Wildberries" && errors.length === 0) return [];
      } catch (error) {
        const message = error instanceof Error ? error.message : "неизвестная ошибка";
        errors.push(message);
        if (isAntibotTransportError(message)) {
          break;
        }
        // Live MCP empty/filter is not "MCP down". Stale search-goods
        // (fallback + чужая категория) is a catalog miss — one HTTP try.
        if (
          this.name === "Wildberries" &&
          !isMcpUnavailableError(message) &&
          !isWbStaleCatalogMiss(message)
        ) {
          break;
        }
      }
    }
    if (errors.length > 0) throw new Error(errors.join(" → fallback: "));
    return [];
  }
}

export function mergeSourceFallbacks(groups: SourceAdapter[][]): SourceAdapter[] {
  const byName = new Map<string, SourceAdapter[]>();
  for (const source of groups.flat()) {
    const adapters = byName.get(source.name) ?? [];
    adapters.push(source);
    byName.set(source.name, adapters);
  }
  return [...byName].map(([name, adapters]) =>
    adapters.length === 1 ? adapters[0]! : new FallbackSourceAdapter(name, adapters),
  );
}

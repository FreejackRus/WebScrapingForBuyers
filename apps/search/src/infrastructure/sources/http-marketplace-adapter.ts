import { createHash } from "node:crypto";

import type { MatchKind, Offer, Product } from "@peremena/contracts";

import type { SourceAdapter } from "../../domain/source-adapter.js";
import {
  WB_CATALOG_UNAVAILABLE_403,
  WB_DEFAULT_DEST,
  assessMarketplaceOfferRelevance,
  marketplaceSearchQueries,
  preferRelevantOffers,
} from "./mcp-marketplace-adapter.js";
import { assertWbCatalogAllowed, noteWbRateLimited, presentWbRateLimited } from "./wb-rate-limit.js";

const browserHeaders = {
  Accept: "application/json,text/plain,*/*",
  "Accept-Language": "ru-RU,ru;q=0.9",
  Origin: "https://www.wildberries.ru",
  Referer: "https://www.wildberries.ru/catalog/0/search.aspx",
  "User-Agent":
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
};

/** Same catalog host MCP uses. Stop after 403/429 — that is IP, not dest. */
export const WB_HTTP_SEARCH_VERSIONS = ["v9", "v14", "v5"] as const;

export function wbHttpSearchUrl(query: string, version: (typeof WB_HTTP_SEARCH_VERSIONS)[number]): string {
  const params = new URLSearchParams({
    appType: "1",
    curr: "rub",
    dest: WB_DEFAULT_DEST,
    locale: "ru",
    query,
    resultset: "catalog",
    page: "1",
    spp: "30",
  });
  return `https://search.wb.ru/exactmatch/ru/common/${version}/search?${params.toString()}`;
}

export class WildberriesHttpAdapter implements SourceAdapter {
  readonly name = "Wildberries";

  async search(product: Product, signal?: AbortSignal): Promise<Offer[]> {
    assertWbCatalogAllowed();
    const query = marketplaceSearchQueries(product, "wb")[0] ?? product.name;
    let lastStatus: number | undefined;
    for (const version of WB_HTTP_SEARCH_VERSIONS) {
      const response = await fetch(wbHttpSearchUrl(query, version), {
        headers: browserHeaders,
        redirect: "follow",
        ...(signal ? { signal } : {}),
      });
      lastStatus = response.status;
      if (response.status === 403) {
        noteWbRateLimited();
        throw new Error(WB_CATALOG_UNAVAILABLE_403);
      }
      if (response.status === 429) {
        noteWbRateLimited();
        throw new Error(presentWbRateLimited("HTTP 429"));
      }
      if (!response.ok) continue;
      const payload = (await response.json()) as {
        data?: { products?: Array<Record<string, unknown>> };
        products?: Array<Record<string, unknown>>;
      };
      const products = payload.data?.products ?? payload.products ?? [];
      const offers = products
        .map((item, index) => toWbOffer(item, product, index))
        .filter((offer): offer is Offer => offer !== undefined)
        .sort(preferRelevantOffers)
        .slice(0, 12);
      if (offers.length > 0) return offers;
    }
    if (lastStatus && lastStatus >= 400) {
      throw new Error(`Wildberries HTTP ${lastStatus}`);
    }
    return [];
  }
}

export function createHttpMarketplaceSources(): SourceAdapter[] {
  if (process.env.HTTP_MARKETPLACE_ENABLED === "false") return [];
  return [new WildberriesHttpAdapter()];
}

export function toWbOffer(item: Record<string, unknown>, product: Product, index: number): Offer | undefined {
  const title = typeof item.name === "string" && item.name.trim() ? item.name.trim() : undefined;
  const price = wbCatalogPrice(item);
  if (!title || price === undefined) return undefined;
  const id = item.id ?? item.nm_id ?? index;
  const offerBrand = typeof item.brand === "string" && item.brand.trim() ? item.brand.trim() : undefined;
  const entity = typeof item.entity === "string" && item.entity.trim() ? item.entity.trim() : undefined;
  const supplier = typeof item.supplier === "string" && item.supplier.trim() ? item.supplier.trim() : undefined;
  const url = `https://www.wildberries.ru/catalog/${String(id)}/detail.aspx`;
  const relevance = assessMarketplaceOfferRelevance(
    entity ? `${title} ${entity}` : title,
    undefined,
    url,
    product,
    "wb",
    offerBrand,
    supplier,
  );
  if (relevance.kind === "drop") return undefined;
  const haystack = title.toLocaleLowerCase("ru");
  const mpn = product.mpn.trim().toLocaleLowerCase("ru");
  const model = product.model.trim().toLocaleLowerCase("ru");
  const match: MatchKind =
    relevance.kind === "weak" || relevance.rejectUrl
      ? "doubtful"
      : mpn && haystack.includes(mpn)
        ? "exact"
        : model && haystack.includes(model)
          ? "probable"
          : "doubtful";
  return {
    id: `wb-http-${createHash("sha256").update(`${id}:${price}`).digest("hex").slice(0, 10)}`,
    source: "Wildberries",
    seller: typeof item.supplier === "string" ? item.supplier : "Wildberries",
    title,
    ...(match === "exact" || match === "probable" ? { mpn: product.mpn } : {}),
    price,
    priceCondition: "Публичная цена",
    currency: "RUB",
    availability: "В наличии",
    condition: "new",
    match,
    url,
    fetchedAt: new Date().toISOString(),
    demo: false,
  };
}

export function wbCatalogPrice(item: Record<string, unknown>): number | undefined {
  const sizes = item.sizes;
  if (Array.isArray(sizes)) {
    for (const size of sizes) {
      if (!size || typeof size !== "object" || Array.isArray(size)) continue;
      const price = (size as { price?: Record<string, unknown> }).price;
      if (!price || typeof price !== "object") continue;
      for (const key of ["product", "total", "basic"] as const) {
        const value = price[key];
        if (typeof value === "number" && Number.isFinite(value) && value > 0) {
          return Math.round(value / 100);
        }
      }
    }
  }
  for (const key of ["salePriceU", "priceU"] as const) {
    const value = item[key];
    if (typeof value === "number" && Number.isFinite(value) && value > 0) {
      return Math.round(value / 100);
    }
  }
  return undefined;
}

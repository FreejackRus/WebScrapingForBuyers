import { createHash } from "node:crypto";

import type { MatchKind, Offer, Product } from "@peremena/contracts";

import { OFFERS_PER_SOURCE, type SourceAdapter } from "../../domain/source-adapter.js";
import { assessMarketplaceOfferRelevance, marketplaceSearchQueries, preferRelevantOffers } from "./mcp-marketplace-adapter.js";

/**
 * Ситилинк through the office agent (scripts/office-agent). Qrator blocks the server's
 * datacenter IP; from the office IP a plain headless Chrome passes, so the agent runs
 * there and the server reaches it over a reverse SSH tunnel. When the agent is down
 * (the office machine is off) this adapter fails and the MCP connector is tried next.
 */
export interface CitilinkAgentItem {
  id?: string;
  title: string;
  url: string;
  price: number;
  clubPrice?: number;
  inStock?: boolean;
}

export function toCitilinkOffer(item: CitilinkAgentItem, product: Product, fetchedAt: string): Offer | undefined {
  if (!item?.title || !item.url || !Number.isFinite(item.price) || item.price <= 0) return undefined;
  if (!/^https:\/\/www\.citilink\.ru\/product\//u.test(item.url)) return undefined;
  const relevance = assessMarketplaceOfferRelevance(item.title, undefined, item.url, product, "citilink");
  if (relevance.kind === "drop") return undefined;
  const haystack = item.title.toLocaleLowerCase("ru");
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
  const digest = createHash("sha256").update(`citilink:${item.id ?? item.url}:${item.price}`).digest("hex").slice(0, 10);
  return {
    id: `citilink-${digest}`,
    source: "Ситилинк",
    seller: "Ситилинк",
    title: item.title,
    ...(match === "exact" || match === "probable" ? { mpn: product.mpn } : {}),
    price: item.price,
    // The club price needs a loyalty card; the company pays the regular one.
    priceCondition: item.clubPrice ? `Публичная цена (клубная ${item.clubPrice.toLocaleString("ru-RU")} ₽)` : "Публичная цена",
    currency: "RUB",
    availability: item.inStock === true ? "В наличии" : item.inStock === false ? "Нет в наличии" : "Неизвестно",
    condition: "new",
    match,
    url: item.url,
    fetchedAt,
    demo: false,
  };
}

export class CitilinkAgentAdapter implements SourceAdapter {
  readonly name = "Ситилинк";

  constructor(
    private readonly baseUrl: string,
    private readonly token = "",
    private readonly timeoutMs = 45_000,
  ) {}

  async search(product: Product, signal?: AbortSignal): Promise<Offer[]> {
    const query = marketplaceSearchQueries(product, "citilink")[0] ?? product.name;
    const url = `${this.baseUrl.replace(/\/$/u, "")}/citilink/search?${new URLSearchParams({ q: query, limit: String(OFFERS_PER_SOURCE) })}`;
    const timeout = AbortSignal.timeout(this.timeoutMs);
    let response: Response;
    try {
      response = await fetch(url, {
        headers: this.token ? { "x-agent-token": this.token } : {},
        signal: signal ? AbortSignal.any([signal, timeout]) : timeout,
      });
    } catch (error) {
      throw new Error(`Ситилинк: офисный агент недоступен (${error instanceof Error ? error.message : String(error)})`);
    }
    const body = (await response.json().catch(() => ({}))) as { items?: CitilinkAgentItem[]; fetchedAt?: string; error?: string };
    if (!response.ok) throw new Error(`Ситилинк: офисный агент ответил ${response.status}${body.error ? ` — ${body.error}` : ""}`);
    const fetchedAt = body.fetchedAt ?? new Date().toISOString();
    return (body.items ?? [])
      .flatMap((item) => toCitilinkOffer(item, product, fetchedAt) ?? [])
      .sort(preferRelevantOffers)
      .slice(0, OFFERS_PER_SOURCE);
  }
}

export function createCitilinkAgentSources(): SourceAdapter[] {
  const url = process.env.CITILINK_AGENT_URL?.trim();
  return url ? [new CitilinkAgentAdapter(url, process.env.OFFICE_AGENT_TOKEN?.trim() ?? "")] : [];
}

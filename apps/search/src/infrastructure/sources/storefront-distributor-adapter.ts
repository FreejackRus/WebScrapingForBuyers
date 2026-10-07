import { createHash } from "node:crypto";

import type { MatchKind, Offer, Product, ProductCondition } from "@peremena/contracts";

import { assessMarketplaceOfferRelevance } from "../../domain/marketplace-relevance.js";
import { OFFERS_PER_SOURCE, type SourceAdapter } from "../../domain/source-adapter.js";
import { preferRelevantOffers } from "./mcp-marketplace-adapter.js";

/**
 * Public storefront search of distributors without a partner API.
 * Server-rendered HTML, plain HTTPS, no antibot on 2026-10-07, search path
 * allowed by robots.txt. Prices are the site's public prices, not B2B.
 *
 * Not wired on purpose: Регард, Онлайнтрейд, ТоргPC (robots.txt disallows
 * search), Хардпрайс (aggregator, not a supplier). See docs/DISTRIBUTORS.md.
 */
export type StorefrontKind = "srvtrade" | "servermall";

export interface StorefrontCard {
  title: string;
  url: string;
  price?: number;
  brand?: string;
  mpn?: string;
  availability?: string;
  condition: ProductCondition;
  imageUrl?: string;
}

interface StorefrontSpec {
  name: string;
  origin: string;
  searchPath: string;
  priceCondition: string;
  parse: (html: string, origin: string) => StorefrontCard[];
}

const browserHeaders = {
  Accept: "text/html,application/xhtml+xml",
  "Accept-Language": "ru-RU,ru;q=0.9",
  "User-Agent":
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
};

const ENTITIES: Record<string, string> = {
  amp: "&",
  quot: '"',
  "#39": "'",
  apos: "'",
  lt: "<",
  gt: ">",
  nbsp: " ",
};

function decodeEntities(value: string): string {
  return value.replace(/&(#\d+|#x[0-9a-f]+|[a-z]+);/gi, (whole, name: string) => {
    const lower = name.toLowerCase();
    if (lower in ENTITIES) return ENTITIES[lower]!;
    if (lower.startsWith("#x")) return String.fromCodePoint(Number.parseInt(lower.slice(2), 16));
    if (lower.startsWith("#")) return String.fromCodePoint(Number.parseInt(lower.slice(1), 10));
    return whole;
  });
}

/** Tag-free, entity-decoded, whitespace-collapsed text. */
export function htmlText(fragment: string): string {
  return decodeEntities(fragment.replace(/<[^>]*>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

/** «244 364 р.» → 244364; «Цену уточняйте» → undefined. */
export function parseRubPrice(text: string): number | undefined {
  const digits = htmlText(text).replace(/[\s  ]/g, "").match(/\d+(?:[.,]\d+)?/);
  if (!digits) return undefined;
  const value = Math.round(Number(digits[0].replace(",", ".")));
  return Number.isFinite(value) && value > 0 ? value : undefined;
}

function absoluteUrl(href: string | undefined, origin: string): string | undefined {
  if (!href) return undefined;
  try {
    return new URL(decodeEntities(href), origin).toString();
  } catch {
    return undefined;
  }
}

function httpsImage(src: string | undefined, origin: string): string | undefined {
  const url = absoluteUrl(src, origin);
  return url?.startsWith("https://") ? url : undefined;
}

function firstMatch(block: string, pattern: RegExp): string | undefined {
  return pattern.exec(block)?.[1];
}

function splitCards(html: string, marker: RegExp): string[] {
  const starts: number[] = [];
  for (const match of html.matchAll(new RegExp(marker.source, "g"))) {
    if (match.index !== undefined) starts.push(match.index);
  }
  return starts.map((start, index) => html.slice(start, starts[index + 1] ?? html.length));
}

/** srv-trade.ru `/search/?q=` — Bitrix search cards. */
export function parseSrvTradeSearch(html: string, origin = "https://srv-trade.ru"): StorefrontCard[] {
  // Empty result still renders «Популярные товары» with the same card markup.
  if (/товаров\s+не\s+найдено/i.test(html)) return [];
  const popular = html.search(/Популярные\s+товары/i);
  const scope = popular >= 0 ? html.slice(0, popular) : html;
  const cards: StorefrontCard[] = [];
  for (const block of splitCards(scope, /class="search-cards__item search-card"/)) {
    const nameMatch = /class="search-card__name"[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/.exec(block)
      ?? /href="([^"]+)"[^>]*class="search-card__name"[^>]*>([\s\S]*?)<\/a>/.exec(block);
    const title = nameMatch ? htmlText(nameMatch[2] ?? "") : "";
    const url = absoluteUrl(nameMatch?.[1], origin);
    if (!title || !url) continue;
    const brand = htmlText(firstMatch(block, /class="search-card__brand"[^>]*>([\s\S]*?)<\/div>/) ?? "");
    const part = htmlText(firstMatch(block, /class="search-card__part"[^>]*>([\s\S]*?)<\/div>/) ?? "");
    const mpn = part.replace(/^Парт\.?\s*номер:\s*/i, "").trim();
    const priceText = firstMatch(block, /class="search-card__price[^"]*"[^>]*>([\s\S]*?)<\/div>/) ?? "";
    const price = /уточня/i.test(priceText) ? undefined : parseRubPrice(priceText);
    const availability = htmlText(firstMatch(block, /class="search-card__stock"[^>]*>([\s\S]*?)<\/div>/) ?? "");
    const imageUrl = httpsImage(firstMatch(block, /class="search-card__image"[\s\S]*?<img[^>]*\ssrc="([^"]+)"/), origin);
    cards.push({
      title,
      url,
      condition: "new",
      ...(price !== undefined ? { price } : {}),
      ...(brand ? { brand } : {}),
      ...(mpn ? { mpn } : {}),
      ...(availability ? { availability } : {}),
      ...(imageUrl ? { imageUrl } : {}),
    });
  }
  return cards;
}

/** servermall.ru `/search/?q=` — product cards carry the price in `data-price`. */
export function parseServermallSearch(html: string, origin = "https://servermall.ru"): StorefrontCard[] {
  const cards: StorefrontCard[] = [];
  for (const block of splitCards(html, /<div class="product-card product-card_new\b/)) {
    const title = htmlText(firstMatch(block, /class="product-card__model[^"]*--title[^"]*"[^>]*>([\s\S]*?)<\/span>/) ?? "");
    const url = absoluteUrl(firstMatch(block, /<a href="(\/catalog\/[^"]+)"/), origin);
    if (!title || !url) continue;
    const rawPrice = firstMatch(block.slice(0, 400), /data-price="(\d+(?:\.\d+)?)"/);
    const price = rawPrice ? parseRubPrice(rawPrice) : undefined;
    const type = htmlText(firstMatch(block, /class="product-card__type"[^>]*>([\s\S]*?)<\/span>/) ?? "");
    const condition: ProductCondition = /refurb|восстан/i.test(type)
      ? "refurbished"
      : /б\/у|used/i.test(type)
        ? "used"
        : "new";
    const availability = htmlText(firstMatch(block, /class="product-card__stock-text"[^>]*>([\s\S]*?)<\/span>/) ?? "");
    const imageUrl = httpsImage(
      firstMatch(block, /<img[^>]*fetchpriority="high"[^>]*\ssrc="?([^"\s>]+)/) ??
        firstMatch(block, /class="product-card__image[\s\S]*?<img(?![^>]*product-card__label)[^>]*\ssrc="?([^"\s>]+)/),
      origin,
    );
    cards.push({
      title,
      url,
      condition,
      ...(price !== undefined ? { price } : {}),
      ...(availability ? { availability } : {}),
      ...(imageUrl ? { imageUrl } : {}),
    });
  }
  return cards;
}

const STOREFRONTS: Record<StorefrontKind, StorefrontSpec> = {
  srvtrade: {
    name: "СРВТрейд",
    origin: "https://srv-trade.ru",
    searchPath: "/search/",
    priceCondition: "Цена на сайте, не B2B",
    parse: parseSrvTradeSearch,
  },
  servermall: {
    name: "Servermall",
    origin: "https://servermall.ru",
    searchPath: "/search/",
    priceCondition: "Цена на сайте (базовая конфигурация), не B2B",
    parse: parseServermallSearch,
  },
};

/** Part number finds the exact item on both sites; fall back to brand+model, then name. */
export function storefrontQuery(product: Product): string {
  const pick = (value: string) => value.replace(/\s+/g, " ").trim();
  return (
    pick(product.mpn) ||
    pick([product.brand, product.model].filter(Boolean).join(" ")) ||
    pick(product.name)
  );
}

export function storefrontSearchUrl(kind: StorefrontKind, query: string): string {
  const spec = STOREFRONTS[kind];
  return `${spec.origin}${spec.searchPath}?${new URLSearchParams({ q: query }).toString()}`;
}

export function toStorefrontOffer(
  card: StorefrontCard,
  product: Product,
  kind: StorefrontKind,
): Offer | undefined {
  if (card.price === undefined) return undefined;
  const spec = STOREFRONTS[kind];
  const relevance = assessMarketplaceOfferRelevance(
    card.title,
    card.mpn,
    card.url,
    product,
    kind,
    card.brand,
    spec.name,
  );
  if (relevance.kind === "drop") return undefined;
  const norm = (value: string | undefined) => (value ?? "").trim().toLocaleLowerCase("ru");
  const haystack = norm(`${card.title} ${card.mpn ?? ""}`);
  const mpn = norm(product.mpn);
  const model = norm(product.model);
  const match: MatchKind =
    relevance.kind === "weak" || relevance.rejectUrl
      ? "doubtful"
      : mpn && (norm(card.mpn) === mpn || haystack.includes(mpn))
        ? "exact"
        : model && haystack.includes(model)
          ? "probable"
          : "doubtful";
  return {
    id: `${kind}-${createHash("sha256").update(`${card.url}:${card.price}`).digest("hex").slice(0, 10)}`,
    source: spec.name,
    seller: spec.name,
    title: card.title,
    ...(card.mpn ? { mpn: card.mpn } : match === "exact" ? { mpn: product.mpn } : {}),
    price: card.price,
    priceCondition: spec.priceCondition,
    currency: "RUB",
    availability: card.availability || "Уточнять у поставщика",
    condition: card.condition,
    match,
    url: card.url,
    ...(card.imageUrl ? { imageUrl: card.imageUrl } : {}),
    fetchedAt: new Date().toISOString(),
    demo: false,
  };
}

export class StorefrontDistributorAdapter implements SourceAdapter {
  readonly name: string;

  constructor(
    private readonly kind: StorefrontKind,
    private readonly fetchImpl: typeof fetch = fetch,
  ) {
    this.name = STOREFRONTS[kind].name;
  }

  async search(product: Product, signal?: AbortSignal): Promise<Offer[]> {
    const query = storefrontQuery(product);
    if (!query) return [];
    const response = await this.fetchImpl(storefrontSearchUrl(this.kind, query), {
      headers: browserHeaders,
      redirect: "follow",
      ...(signal ? { signal } : {}),
    });
    if (!response.ok) throw new Error(`${this.name}: HTTP ${response.status}`);
    const html = await response.text();
    return STOREFRONTS[this.kind]
      .parse(html, STOREFRONTS[this.kind].origin)
      .map((card) => toStorefrontOffer(card, product, this.kind))
      .filter((offer): offer is Offer => offer !== undefined)
      .sort(preferRelevantOffers)
      .slice(0, OFFERS_PER_SOURCE);
  }
}

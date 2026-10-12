import type { Offer } from "@peremena/contracts";

import type { CardFacts, CardVerifier } from "../../domain/offer-verification.js";
import { MarketplaceMcpClient, type MarketplaceToolCaller } from "./mcp-marketplace-adapter.js";
import { htmlText } from "./storefront-distributor-adapter.js";

type Json = Record<string, unknown>;

const isObject = (value: unknown): value is Json => typeof value === "object" && value !== null && !Array.isArray(value);
const positive = (value: unknown): number | undefined => (typeof value === "number" && Number.isFinite(value) && value > 0 ? value : undefined);

/** Ozon characteristics: [{ title: { textRs: [{ content }] }, values: [{ text }] }] → «Тип Монитор; Модель P2423D». */
export function flattenOzonCharacteristics(raw: unknown): string {
  if (!Array.isArray(raw)) return "";
  return raw
    .flatMap((entry) => {
      if (!isObject(entry)) return [];
      const title = isObject(entry.title) && Array.isArray(entry.title.textRs)
        ? entry.title.textRs.map((part) => (isObject(part) && typeof part.content === "string" ? part.content : "")).join("")
        : "";
      const values = Array.isArray(entry.values)
        ? entry.values.map((value) => (isObject(value) && typeof value.text === "string" ? value.text : "")).filter(Boolean).join(", ")
        : "";
      return values ? [`${title} ${values}`.trim()] : [];
    })
    .join("; ");
}

/**
 * Ozon product card through marketplace-mcp `ozon_card`. The search lists the
 * Ozon-card (bank card) price; a company pays the regular one, so that is checked.
 */
export function ozonCardFacts(payload: Json): CardFacts | undefined {
  if (payload.status && payload.status !== "success") return undefined;
  const price = positive(payload.price) ?? positive(payload.card_price);
  const facts: CardFacts = {
    ...(typeof payload.title === "string" && payload.title.trim() ? { title: payload.title.trim() } : {}),
    ...(price !== undefined ? { price } : {}),
    ...(typeof payload.is_available === "boolean" ? { available: payload.is_available } : {}),
    ...(positive(payload.price) !== undefined
      ? { priceBasis: "без Ozon Карты", priceCondition: "Обычная цена без Ozon Карты (проверено на карточке)" }
      : {}),
  };
  const specs = flattenOzonCharacteristics(payload.characteristics);
  if (specs) facts.specs = specs;
  return facts.title || facts.price || facts.available !== undefined ? facts : undefined;
}

export class OzonCardVerifier implements CardVerifier {
  constructor(private readonly client: MarketplaceToolCaller) {}

  supports(offer: Offer): boolean {
    return offer.source === "Ozon" && /^https:\/\/(?:www\.)?ozon\.ru\/product\//.test(offer.url);
  }

  async fetch(offer: Offer): Promise<CardFacts | undefined> {
    const url = offer.url.split("?")[0]!;
    return ozonCardFacts(await this.client.callTool("ozon_card", { sku_or_path: url }));
  }
}

const SCHEMA_AVAILABLE = /schema\.org\/(?:InStock|InStoreOnly|OnlineOnly|LimitedAvailability)/i;
const SCHEMA_UNAVAILABLE = /schema\.org\/(?:OutOfStock|SoldOut|Discontinued)/i;

function availabilityOf(value: unknown): boolean | undefined {
  if (typeof value !== "string") return undefined;
  if (SCHEMA_AVAILABLE.test(value)) return true;
  if (SCHEMA_UNAVAILABLE.test(value)) return false;
  return undefined;
}

function findLdProduct(value: unknown): Json | undefined {
  if (Array.isArray(value)) {
    for (const item of value) {
      const found = findLdProduct(item);
      if (found) return found;
    }
    return undefined;
  }
  if (!isObject(value)) return undefined;
  if (value["@type"] === "Product") return value;
  for (const nested of Object.values(value)) {
    const found = findLdProduct(nested);
    if (found) return found;
  }
  return undefined;
}

/**
 * Product card facts from schema.org markup, which both storefronts publish:
 * Servermall as JSON-LD, СРВТрейд as microdata (itemprop="price", schema.org/InStock).
 */
export function schemaOrgCardFacts(html: string): CardFacts | undefined {
  for (const match of html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)) {
    let parsed: unknown;
    try {
      parsed = JSON.parse(match[1]!);
    } catch {
      continue;
    }
    const product = findLdProduct(parsed);
    if (!product) continue;
    const offer = Array.isArray(product.offers) ? product.offers[0] : product.offers;
    const price = isObject(offer) ? positive(Number(offer.price)) : undefined;
    const available = isObject(offer) ? availabilityOf(offer.availability) : undefined;
    return {
      ...(typeof product.name === "string" ? { title: htmlText(product.name) } : {}),
      ...(price !== undefined ? { price } : {}),
      ...(available !== undefined ? { available } : {}),
    };
  }
  const price = positive(Number(/itemprop="price"[^>]*content="([\d.]+)"/i.exec(html)?.[1]));
  const availability = /itemprop="availability"[^>]*href="([^"]+)"|href="([^"]*schema\.org\/[A-Za-z]+)"[^>]*itemprop="availability"/i.exec(html);
  const available = availabilityOf(availability?.[1] ?? availability?.[2]);
  const heading = /<h1[^>]*>([\s\S]*?)<\/h1>/i.exec(html)?.[1];
  const title = heading ? htmlText(heading) : "";
  if (price === undefined && available === undefined && !title) return undefined;
  return {
    ...(title ? { title } : {}),
    ...(price !== undefined ? { price } : {}),
    ...(available !== undefined ? { available } : {}),
  };
}

const STOREFRONT_HOSTS: Record<string, RegExp> = {
  "СРВТрейд": /^https:\/\/(?:www\.)?srv-trade\.ru\/catalog\//,
  Servermall: /^https:\/\/(?:www\.)?servermall\.ru\/catalog\//,
};

/** Distributor storefront product page over plain HTTPS (no antibot there on 2026-10-12). */
export class StorefrontCardVerifier implements CardVerifier {
  constructor(private readonly fetchImpl: typeof fetch = fetch) {}

  supports(offer: Offer): boolean {
    return STOREFRONT_HOSTS[offer.source]?.test(offer.url) === true;
  }

  async fetch(offer: Offer, signal?: AbortSignal): Promise<CardFacts | undefined> {
    const response = await this.fetchImpl(offer.url, {
      headers: {
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "ru-RU,ru;q=0.9",
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
      },
      redirect: "follow",
      ...(signal ? { signal } : {}),
    });
    // The card is gone: the item is no longer sold there.
    if (response.status === 404 || response.status === 410) return { available: false };
    if (!response.ok) return undefined;
    return schemaOrgCardFacts(await response.text());
  }
}

/** Card checks available in this deployment. WB card API answers 403 and Avito cards come back empty (2026-10-12). */
export function createCardVerifiersFromEnv(): CardVerifier[] {
  if (/^(?:0|false|no|off)$/i.test(process.env.VERIFY_TOP_CARDS?.trim() ?? "")) return [];
  const verifiers: CardVerifier[] = [new StorefrontCardVerifier()];
  const endpoint = process.env.MARKETPLACE_MCP_URL;
  const token = process.env.MARKETPLACE_MCP_TOKEN;
  const tenant = process.env.MARKETPLACE_MCP_TENANT;
  if (endpoint && token && tenant) verifiers.push(new OzonCardVerifier(new MarketplaceMcpClient(endpoint, token, tenant)));
  return verifiers;
}

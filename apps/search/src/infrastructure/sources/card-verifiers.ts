import type { Offer } from "@peremena/contracts";

import type { CardFacts, CardVerifier } from "../../domain/offer-verification.js";
import { MarketplaceMcpClient, type MarketplaceToolCaller } from "./mcp-marketplace-adapter.js";

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
    ...(positive(payload.price) !== undefined ? { priceBasis: "без Ozon Карты" } : {}),
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

/** Card checks available in this deployment. WB card API answers 403 and Avito cards come back empty (2026-10-12). */
export function createCardVerifiersFromEnv(): CardVerifier[] {
  const endpoint = process.env.MARKETPLACE_MCP_URL;
  const token = process.env.MARKETPLACE_MCP_TOKEN;
  const tenant = process.env.MARKETPLACE_MCP_TENANT;
  if (!endpoint || !token || !tenant) return [];
  if (/^(?:0|false|no|off)$/i.test(process.env.VERIFY_TOP_CARDS?.trim() ?? "")) return [];
  return [new OzonCardVerifier(new MarketplaceMcpClient(endpoint, token, tenant))];
}

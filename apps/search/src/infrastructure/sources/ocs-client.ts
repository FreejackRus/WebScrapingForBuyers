import { createHash } from "node:crypto";

import type { MatchKind, Offer, Product } from "@peremena/contracts";

/**
 * OCS Distribution Partners Connector (REST).
 * Interactive docs (partner key required): https://testconnector.b2b.ocs.ru/docs/index.html
 * Prod host: https://connector.b2b.ocs.ru
 * Auth header: X-API-Key (issued by api@ocs.ru / B2B manager; IP allowlist common).
 * Rate limit (3rd-party notes): ~200 req/h.
 * Exact catalog/search paths are behind partner OpenAPI — set OCS_SEARCH_PATH after
 * opening the interactive docs (examples seen in integrators: catalog/products, content/products).
 */
export const OCS_API_URL_DEFAULT = "https://connector.b2b.ocs.ru";
export const OCS_API_URL_TEST = "https://testconnector.b2b.ocs.ru";

export interface OcsConfig {
  apiKey: string;
  baseUrl?: string;
  /** Path relative to base, must start with /. Required for live search. */
  searchPath?: string;
  shipmentCity?: string;
  location?: string;
}

function baseOf(config: OcsConfig): string {
  return (config.baseUrl?.trim() || OCS_API_URL_DEFAULT).replace(/\/$/, "");
}

function asArray(value: unknown): unknown[] {
  if (Array.isArray(value)) return value;
  if (value && typeof value === "object") return [value];
  return [];
}

function deepFindArray(payload: unknown, keys: string[]): unknown[] {
  if (!payload || typeof payload !== "object") return [];
  const row = payload as Record<string, unknown>;
  for (const key of keys) {
    if (key in row) {
      const arr = asArray(row[key]);
      if (arr.length > 0) return arr;
    }
  }
  for (const value of Object.values(row)) {
    if (value && typeof value === "object") {
      const nested = deepFindArray(value, keys);
      if (nested.length > 0) return nested;
    }
  }
  return [];
}

function num(...values: unknown[]): number | undefined {
  for (const value of values) {
    if (typeof value === "number" && Number.isFinite(value) && value > 0) return value;
    if (typeof value === "string") {
      const n = Number(value.replace(/\s/g, "").replace(",", "."));
      if (Number.isFinite(n) && n > 0) return n;
    }
  }
  return undefined;
}

function str(...values: unknown[]): string | undefined {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return undefined;
}

interface OcsProduct {
  id: string;
  title: string;
  mpn?: string;
  brand?: string;
  price?: number;
  qty?: number;
  url?: string;
}

function parseProduct(raw: unknown): OcsProduct | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const row = raw as Record<string, unknown>;
  const id = str(row.id, row.productId, row.itemId, row.article, row.sku, row.code);
  const title = str(row.name, row.title, row.productName, row.description);
  if (!id || !title) return undefined;
  const price = num(
    row.price,
    row.dealerPrice,
    row.priceValue,
    nested(row, "price", "value"),
    nested(row, "prices", "dealer"),
  );
  const qty = num(row.quantity, row.qty, row.stock, row.available, nested(row, "availability", "quantity"));
  const product: OcsProduct = { id, title };
  const mpn = str(row.partNumber, row.mpn, row.vendorCode, row.manufacturerCode, row.article);
  if (mpn) product.mpn = mpn;
  const brand = str(row.brand, row.producer, row.manufacturer);
  if (brand) product.brand = brand;
  if (price !== undefined) product.price = price;
  if (qty !== undefined) product.qty = Math.round(qty);
  const url = str(row.url, row.link, row.productUrl);
  if (url) product.url = url;
  return product;
}

function nested(obj: Record<string, unknown>, a: string, b: string): unknown {
  const mid = obj[a];
  if (!mid || typeof mid !== "object") return undefined;
  return (mid as Record<string, unknown>)[b];
}

function matchKind(item: OcsProduct, product: Product): MatchKind {
  const hay = `${item.title} ${item.mpn ?? ""} ${item.brand ?? ""}`.toLocaleLowerCase("ru");
  const mpn = product.mpn.trim().toLocaleLowerCase("ru");
  const model = product.model.trim().toLocaleLowerCase("ru");
  if (mpn && hay.includes(mpn)) return "exact";
  if (model && hay.includes(model)) return "probable";
  return "doubtful";
}

function buildSearchUrl(config: OcsConfig, product: Product): URL {
  const path = config.searchPath?.trim();
  if (!path || !path.startsWith("/")) {
    throw new Error(
      "OCS: set OCS_SEARCH_PATH from partner OpenAPI (https://testconnector.b2b.ocs.ru/docs/), e.g. /v2/catalog/products",
    );
  }
  const url = new URL(path, `${baseOf(config)}/`);
  const q = [product.brand, product.model, product.mpn].filter(Boolean).join(" ").trim() || product.name;
  // Common query param names across partner docs / integrators.
  if (!url.searchParams.has("q") && !url.searchParams.has("search") && !url.searchParams.has("query")) {
    url.searchParams.set("search", q);
  }
  if (config.shipmentCity && !url.searchParams.has("shipmentcity")) {
    url.searchParams.set("shipmentcity", config.shipmentCity);
  }
  if (config.location && !url.searchParams.has("locations")) {
    url.searchParams.set("locations", config.location);
  }
  return url;
}

export async function searchOcs(
  config: OcsConfig,
  product: Product,
  signal?: AbortSignal,
): Promise<Offer[]> {
  const url = buildSearchUrl(config, product);
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "X-API-Key": config.apiKey,
      "X-API-key": config.apiKey,
    },
    ...(signal ? { signal } : {}),
  });
  const text = await response.text();
  if (response.status === 401 || response.status === 403) {
    throw new Error(`OCS auth failed HTTP ${response.status} — check key / IP allowlist (api@ocs.ru)`);
  }
  if (!response.ok) {
    throw new Error(`OCS HTTP ${response.status}: ${text.slice(0, 240)}`);
  }
  let payload: unknown;
  try {
    payload = JSON.parse(text) as unknown;
  } catch {
    throw new Error("OCS: response is not JSON — verify OCS_SEARCH_PATH against partner OpenAPI");
  }

  const rows = deepFindArray(payload, [
    "products",
    "items",
    "result",
    "results",
    "data",
    "content",
    "catalog",
  ]);
  const products = rows.map(parseProduct).filter((item): item is OcsProduct => item !== undefined);
  const fetchedAt = new Date().toISOString();

  const offers: Offer[] = [];
  for (const item of products) {
    if (item.price === undefined || !(item.price > 0)) continue;
    const offer: Offer = {
      id: `ocs-${createHash("sha256").update(`${item.id}:${item.price}`).digest("hex").slice(0, 10)}`,
      source: "OCS",
      seller: "OCS",
      title: item.brand ? `${item.brand} ${item.title}` : item.title,
      price: Math.round(item.price),
      priceCondition: "B2B OCS",
      currency: "RUB",
      availability: item.qty !== undefined && item.qty > 0 ? `В наличии: ${item.qty}` : "Уточнять",
      condition: "new",
      match: matchKind(item, product),
      url: item.url ?? "https://b2b.ocs.ru/",
      fetchedAt,
      demo: false,
    };
    if (item.mpn) offer.mpn = item.mpn;
    offers.push(offer);
  }
  return offers.slice(0, 12);
}

export function ocsConfigFromEnv(): OcsConfig | undefined {
  const apiKey = process.env.OCS_API_KEY?.trim();
  if (!apiKey) return undefined;
  const config: OcsConfig = { apiKey };
  const baseUrl = process.env.OCS_API_URL?.trim();
  if (baseUrl) config.baseUrl = baseUrl;
  const searchPath = process.env.OCS_SEARCH_PATH?.trim();
  if (searchPath) config.searchPath = searchPath;
  const shipmentCity = process.env.OCS_SHIPMENT_CITY?.trim();
  if (shipmentCity) config.shipmentCity = shipmentCity;
  const location = process.env.OCS_LOCATION?.trim();
  if (location) config.location = location;
  return config;
}

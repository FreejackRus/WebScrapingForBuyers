import { createHash } from "node:crypto";

import type { MatchKind, Offer, Product } from "@peremena/contracts";

/**
 * NETLAB NLDealer REST (preferred over SOAP for search).
 * Docs:
 * - https://www.netlab.ru/nldealer/docs/web_services_netlab_how_to_start.pdf
 * - https://www.netlab.ru/nldealer/docs/web_services_netlab_documentation_1.0.pdf
 * Auth: separate API user in NLDealer (not personal cabinet login).
 * Token: GET /rest/authentication/token.json?username=&password=
 * Search: GET /rest/catalogsZip/getGoodsSearch/{keywords}.json?oauth_token=
 * Keywords: up to 5 words joined by `:`.
 * Optional public price XML (no search): http://www.netlab.ru/products/pricexml.zip
 */
export const NETLAB_BASE_DEFAULT = "http://services.netlab.ru";

export interface NetlabConfig {
  username: string;
  password: string;
  baseUrl?: string;
  /** Optional warehouse / price-column hint for logging only. */
  clientCode?: string;
}

interface NetlabGoods {
  id: string;
  title: string;
  mpn?: string;
  brand?: string;
  price?: number;
  qty?: number;
  url?: string;
}

function baseOf(config: NetlabConfig): string {
  return (config.baseUrl?.trim() || NETLAB_BASE_DEFAULT).replace(/\/$/, "");
}

async function fetchJson(url: string, signal?: AbortSignal): Promise<unknown> {
  const response = await fetch(url, {
    headers: { Accept: "application/json" },
    ...(signal ? { signal } : {}),
  });
  const text = await response.text();
  if (!response.ok) {
    throw new Error(`NETLAB HTTP ${response.status}: ${text.slice(0, 240)}`);
  }
  try {
    return JSON.parse(text) as unknown;
  } catch {
    throw new Error(`NETLAB: invalid JSON from ${url}`);
  }
}

function nested(data: unknown, ...keys: string[]): unknown {
  let cur: unknown = data;
  for (const key of keys) {
    if (!cur || typeof cur !== "object") return undefined;
    cur = (cur as Record<string, unknown>)[key];
  }
  return cur;
}

export async function netlabAuthenticate(config: NetlabConfig, signal?: AbortSignal): Promise<string> {
  const base = baseOf(config);
  const url = `${base}/rest/authentication/token.json?username=${encodeURIComponent(config.username)}&password=${encodeURIComponent(config.password)}`;
  const payload = await fetchJson(url, signal);
  const code = nested(payload, "status", "code") ?? nested(payload, "code");
  if (code !== undefined && Number(code) !== 200 && String(code) !== "200") {
    const message = nested(payload, "status", "message") ?? nested(payload, "message") ?? "auth failed";
    throw new Error(`NETLAB auth: ${String(message)}`);
  }
  const token =
    nested(payload, "data", "token") ??
    nested(payload, "token") ??
    nested(payload, "return", "data", "token");
  if (typeof token !== "string" || !token.trim()) {
    throw new Error("NETLAB auth: empty token");
  }
  return token.trim();
}

function searchKeywords(product: Product): string {
  const parts = [product.brand, product.model, product.mpn]
    .map((value) => value?.trim())
    .filter((value): value is string => Boolean(value))
    .map((value) => value.replace(/[:/\\?&#]/g, " ").replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .slice(0, 5);
  if (parts.length === 0) {
    return product.name.trim().split(/\s+/).slice(0, 5).join(":");
  }
  return parts.join(":");
}

function asArray(value: unknown): unknown[] {
  if (Array.isArray(value)) return value;
  if (value && typeof value === "object") return [value];
  return [];
}

function propertyMap(raw: unknown): Record<string, string> {
  const list = nested(raw, "properties", "property") ?? nested(raw, "property") ?? nested(raw, "properties");
  const out: Record<string, string> = {};
  for (const entry of asArray(list)) {
    if (!entry || typeof entry !== "object") continue;
    const row = entry as Record<string, unknown>;
    const name = String(row.name ?? row.Name ?? "").trim();
    const value = String(row.value ?? row.Value ?? "").trim();
    if (name) out[name.toLocaleLowerCase("ru")] = value;
  }
  return out;
}

function pickNumber(...values: Array<string | undefined>): number | undefined {
  for (const raw of values) {
    if (!raw) continue;
    const n = Number(String(raw).replace(/\s/g, "").replace(",", "."));
    if (Number.isFinite(n) && n > 0) return n;
  }
  return undefined;
}

function parseGoods(raw: unknown): NetlabGoods | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const row = raw as Record<string, unknown>;
  const id = String(row.id ?? row.uid ?? row.goodsId ?? "").trim();
  const props = propertyMap(raw);
  const title =
    props["наименование"] ||
    props["name"] ||
    props["название"] ||
    String(row.name ?? row.title ?? "").trim();
  if (!id || !title) return undefined;
  const mpn = props["partnumber"] || props["артикул"] || props["pn"] || props["производитель артикул"];
  const brand = props["бренд"] || props["производитель"] || props["brand"];
  const price = pickNumber(
    props["цена"],
    props["price"],
    props["цена дилера"],
    props["закупочная цена"],
    typeof row.price === "number" ? String(row.price) : undefined,
  );
  const qty = pickNumber(props["количество"], props["остаток"], props["qty"], props["available"]);
  const goodsRow: NetlabGoods = { id, title };
  if (mpn) goodsRow.mpn = mpn;
  if (brand) goodsRow.brand = brand;
  if (price !== undefined) goodsRow.price = price;
  if (qty !== undefined) goodsRow.qty = Math.round(qty);
  return goodsRow;
}

export async function netlabGoodsSearch(
  config: NetlabConfig,
  token: string,
  keywords: string,
  signal?: AbortSignal,
): Promise<NetlabGoods[]> {
  const base = baseOf(config);
  const descr = encodeURIComponent(keywords);
  const url = `${base}/rest/catalogsZip/getGoodsSearch/${descr}.json?oauth_token=${encodeURIComponent(token)}`;
  const payload = await fetchJson(url, signal);
  const list =
    nested(payload, "data", "goodsList", "goods") ??
    nested(payload, "data", "goods") ??
    nested(payload, "goodsList", "goods") ??
    nested(payload, "goods");
  return asArray(list)
    .map(parseGoods)
    .filter((item): item is NetlabGoods => item !== undefined)
    .slice(0, 24);
}

export async function netlabGoodsByUid(
  config: NetlabConfig,
  token: string,
  goodsId: string,
  signal?: AbortSignal,
): Promise<NetlabGoods | undefined> {
  const base = baseOf(config);
  const url = `${base}/rest/catalogsZip/goodsByUid/${encodeURIComponent(goodsId)}.json?oauth_token=${encodeURIComponent(token)}`;
  const payload = await fetchJson(url, signal);
  const goods =
    nested(payload, "data", "goodsList", "goods") ??
    nested(payload, "data", "goods") ??
    nested(payload, "goods");
  const first = asArray(goods)[0] ?? goods;
  return parseGoods(first);
}

function matchKind(item: NetlabGoods, product: Product): MatchKind {
  const hay = `${item.title} ${item.mpn ?? ""} ${item.brand ?? ""}`.toLocaleLowerCase("ru");
  const mpn = product.mpn.trim().toLocaleLowerCase("ru");
  const model = product.model.trim().toLocaleLowerCase("ru");
  if (mpn && hay.includes(mpn)) return "exact";
  if (model && hay.includes(model)) return "probable";
  return "doubtful";
}

export async function searchNetlab(
  config: NetlabConfig,
  product: Product,
  signal?: AbortSignal,
): Promise<Offer[]> {
  const token = await netlabAuthenticate(config, signal);
  const keywords = searchKeywords(product);
  if (!keywords.trim()) return [];
  let goods = await netlabGoodsSearch(config, token, keywords, signal);

  // Enrich missing prices via goodsByUid (search payload sometimes omits dealer price).
  const enriched: NetlabGoods[] = [];
  for (const item of goods.slice(0, 12)) {
    if (item.price !== undefined) {
      enriched.push(item);
      continue;
    }
    try {
      const detail = await netlabGoodsByUid(config, token, item.id, signal);
      enriched.push(detail ? { ...item, ...detail, title: detail.title || item.title } : item);
    } catch {
      enriched.push(item);
    }
  }
  goods = enriched;

  const fetchedAt = new Date().toISOString();
  const offers: Offer[] = [];
  for (const item of goods) {
    if (item.price === undefined || !(item.price > 0)) continue;
    const offer: Offer = {
      id: `netlab-${createHash("sha256").update(`${item.id}:${item.price}`).digest("hex").slice(0, 10)}`,
      source: "NETLAB",
      seller: "NETLAB",
      title: item.brand ? `${item.brand} ${item.title}` : item.title,
      price: Math.round(item.price),
      priceCondition: config.clientCode ? `B2B NETLAB (${config.clientCode})` : "B2B NETLAB",
      currency: "RUB",
      availability: item.qty !== undefined && item.qty > 0 ? `В наличии: ${item.qty}` : "Уточнять",
      condition: "new",
      match: matchKind(item, product),
      url: item.url ?? "https://www.netlab.ru/",
      fetchedAt,
      demo: false,
    };
    if (item.mpn) offer.mpn = item.mpn;
    offers.push(offer);
  }
  return offers.slice(0, 12);
}

export function netlabConfigFromEnv(): NetlabConfig | undefined {
  const username = process.env.NETLAB_API_LOGIN?.trim();
  const password = process.env.NETLAB_API_PASSWORD?.trim();
  if (!username || !password) return undefined;
  const config: NetlabConfig = { username, password };
  const baseUrl = process.env.NETLAB_API_URL?.trim();
  if (baseUrl) config.baseUrl = baseUrl;
  const clientCode = process.env.NETLAB_CLIENT_CODE?.trim();
  if (clientCode) config.clientCode = clientCode;
  return config;
}

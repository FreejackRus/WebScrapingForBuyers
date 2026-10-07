import { createHash } from "node:crypto";
import { createInflateRaw } from "node:zlib";

import type { MatchKind, Offer, Product } from "@peremena/contracts";

import { assessMarketplaceOfferRelevance } from "../../domain/marketplace-relevance.js";
import type { SourceAdapter } from "../../domain/source-adapter.js";
import { preferRelevantOffers } from "./mcp-marketplace-adapter.js";

/**
 * NETLAB dealer price list (public link, refreshed hourly by NETLAB):
 * https://www.netlab.ru/products/pricexml.zip — one windows-1251 XML, ~67k
 * offers, prices in USD with the day's rate inside the file. Format:
 * http://www.netlab.ru/products/NL_XML_Price.doc.
 *
 * No credentials: the partner REST API stays available via NETLAB_TRANSPORT=api.
 * The file is downloaded at most once per NETLAB_PRICE_TTL_MIN (default 60) and
 * kept as a compact in-memory index; each search is a linear scan of it.
 * Distributor rows are not capped: every matching price-list line is returned.
 */

export const NETLAB_PRICE_URL_DEFAULT = "https://www.netlab.ru/products/pricexml.zip";
export const NETLAB_PRICE_COLUMNS = ["R", "B", "C", "D", "E", "F"] as const;
export type NetlabPriceColumn = (typeof NETLAB_PRICE_COLUMNS)[number];

export interface NetlabFeedItem {
  id: string;
  name: string;
  pn: string;
  vendor: string;
  model: string;
  url: string;
  picture?: string;
  /** USD by column R, B..F. */
  prices: Partial<Record<NetlabPriceColumn, number>>;
  count: string;
  remote: string;
  transit: string;
  transitDate: string;
  warranty: string;
  outOfProduction: boolean;
}

export interface NetlabFeed {
  date: string;
  usdRate: number;
  items: NetlabFeedItem[];
  loadedAt: number;
}

const ENTITIES: Record<string, string> = { amp: "&", quot: '"', apos: "'", lt: "<", gt: ">", nbsp: " " };
function decodeXml(value: string): string {
  return value
    .replace(/&(#\d+|#x[0-9a-f]+|[a-z]+);/gi, (whole, name: string) => {
      const lower = name.toLowerCase();
      if (lower in ENTITIES) return ENTITIES[lower]!;
      if (lower.startsWith("#x")) return String.fromCodePoint(Number.parseInt(lower.slice(2), 16));
      if (lower.startsWith("#")) return String.fromCodePoint(Number.parseInt(lower.slice(1), 10));
      return whole;
    })
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * V8 keeps a substring as a slice of its parent, so ~10 short fields per offer
 * would pin every decoded multi-MB chunk of the 120 MB XML in memory. Copy them.
 */
function detached(value: string): string {
  return value.length === 0 ? "" : Buffer.from(value, "utf8").toString("utf8");
}

function tag(block: string, name: string): string {
  const match = new RegExp(`<${name}>([^<]*)</${name}>`).exec(block);
  return match ? detached(decodeXml(match[1] ?? "")) : "";
}

export function parseNetlabOffer(block: string): NetlabFeedItem | undefined {
  const rawId = /<offer\s+id="(\d+)"/.exec(block)?.[1];
  const id = rawId ? detached(rawId) : undefined;
  const name = tag(block, "name");
  if (!id || !name) return undefined;
  const prices: Partial<Record<NetlabPriceColumn, number>> = {};
  for (const column of NETLAB_PRICE_COLUMNS) {
    const value = Number(tag(block, `price${column}`).replace(",", "."));
    if (Number.isFinite(value) && value > 0) prices[column] = value;
  }
  const picture = tag(block, "picture");
  return {
    id,
    name,
    pn: tag(block, "PN"),
    vendor: tag(block, "Vendor"),
    model: tag(block, "Model"),
    url: tag(block, "url") || `http://serv.netlab.ru/descr.asp?id=${id}`,
    ...(picture.startsWith("https://") ? { picture } : {}),
    prices,
    count: tag(block, "count"),
    remote: tag(block, "remote"),
    transit: tag(block, "transit"),
    transitDate: tag(block, "transitdate"),
    warranty: tag(block, "warranty"),
    outOfProduction: tag(block, "OutOfProd") === "true",
  };
}

/** Streams the XML text: header (date, USD rate) + one callback per <offer>. */
export class NetlabXmlCollector {
  private buffer = "";
  date = "";
  usdRate = 0;
  readonly items: NetlabFeedItem[] = [];

  push(text: string): void {
    this.buffer += text;
    if (!this.usdRate) {
      const rate = /<currency\s+id="USD"\s+rate="([\d.,]+)"/.exec(this.buffer)?.[1];
      if (rate) this.usdRate = Number(rate.replace(",", "."));
      const date = /<xml_catalog\s+date="([^"]+)"/.exec(this.buffer)?.[1];
      if (date) this.date = date;
    }
    let end = this.buffer.indexOf("</offer>");
    while (end >= 0) {
      const start = this.buffer.lastIndexOf("<offer ", end);
      if (start >= 0) {
        const item = parseNetlabOffer(this.buffer.slice(start, end));
        if (item) this.items.push(item);
      }
      this.buffer = this.buffer.slice(end + "</offer>".length);
      end = this.buffer.indexOf("</offer>");
    }
    // Keep the tail small while still waiting for the header or the next offer.
    if (this.usdRate && this.buffer.length > 1_000_000) {
      const lastOpen = this.buffer.lastIndexOf("<offer ");
      this.buffer = lastOpen >= 0 ? this.buffer.slice(lastOpen) : "";
    }
  }
}

/** First (and only) entry of a zip archive as a stream of decoded text chunks. */
export async function inflateFirstZipEntry(zip: Buffer, onText: (text: string) => void): Promise<void> {
  if (zip.readUInt32LE(0) !== 0x04034b50) throw new Error("NETLAB: прайс не похож на zip");
  const method = zip.readUInt16LE(8);
  const nameLength = zip.readUInt16LE(26);
  const extraLength = zip.readUInt16LE(28);
  const dataStart = 30 + nameLength + extraLength;
  const decoder = new TextDecoder("windows-1251");
  if (method === 0) {
    const size = zip.readUInt32LE(18);
    onText(decoder.decode(zip.subarray(dataStart, dataStart + size)));
    return;
  }
  if (method !== 8) throw new Error(`NETLAB: неподдерживаемое сжатие zip (${method})`);
  await new Promise<void>((resolve, reject) => {
    const inflate = createInflateRaw();
    inflate.on("data", (chunk: Buffer) => {
      try {
        onText(decoder.decode(chunk, { stream: true }));
      } catch (error) {
        reject(error);
      }
    });
    inflate.on("end", () => {
      onText(decoder.decode());
      resolve();
    });
    inflate.on("error", reject);
    inflate.end(zip.subarray(dataStart));
  });
}

export async function downloadNetlabFeed(
  url: string,
  fetchImpl: typeof fetch = fetch,
  signal?: AbortSignal,
): Promise<NetlabFeed> {
  const response = await fetchImpl(url, { redirect: "follow", ...(signal ? { signal } : {}) });
  if (!response.ok) throw new Error(`NETLAB: прайс HTTP ${response.status}`);
  const zip = Buffer.from(await response.arrayBuffer());
  const collector = new NetlabXmlCollector();
  await inflateFirstZipEntry(zip, (text) => collector.push(text));
  if (!collector.usdRate) throw new Error("NETLAB: в прайсе нет курса USD");
  if (collector.items.length === 0) throw new Error("NETLAB: прайс пустой");
  return { date: collector.date, usdRate: collector.usdRate, items: collector.items, loadedAt: Date.now() };
}

const STOCK_LABEL: Record<string, string> = { "*": "1–20 шт.", "**": "21–50 шт.", "***": "более 50 шт." };

export function netlabAvailability(item: Pick<NetlabFeedItem, "count" | "remote" | "transit" | "transitDate">): string {
  const parts: string[] = [];
  if (STOCK_LABEL[item.count]) parts.push(`склад: ${STOCK_LABEL[item.count]}`);
  if (STOCK_LABEL[item.remote]) parts.push(`удалённый склад: ${STOCK_LABEL[item.remote]}`);
  if (STOCK_LABEL[item.transit]) parts.push(`в пути: ${STOCK_LABEL[item.transit]}${item.transitDate ? ` (${item.transitDate})` : ""}`);
  return parts.length > 0 ? parts.join("; ") : "Нет в наличии";
}

function normalizeCode(value: string): string {
  return value.toLocaleLowerCase("ru").replace(/[^a-zа-яё0-9]/giu, "");
}

function identityTokens(value: string): string[] {
  return (value.toLocaleLowerCase("ru").match(/[a-zа-яё0-9]+/giu) ?? []).filter((token) => /\d/.test(token) && token.length >= 2);
}

/** Cheap pre-filter before the shared relevance check: part number or model digits must appear. */
export function isNetlabCandidate(item: NetlabFeedItem, product: Product): boolean {
  const mpn = normalizeCode(product.mpn);
  const haystack = normalizeCode(`${item.pn} ${item.name} ${item.model}`);
  if (mpn.length >= 4 && haystack.includes(mpn)) return true;
  const tokens = identityTokens(`${product.model} ${product.mpn}`);
  if (tokens.length === 0) return false;
  const words = new Set(identityTokens(`${item.pn} ${item.name} ${item.model}`));
  // Whole tokens only: «G102» must not match the switch «SG1024».
  return tokens.every((token) => words.has(token));
}

export function toNetlabOffer(
  item: NetlabFeedItem,
  product: Product,
  feed: Pick<NetlabFeed, "usdRate" | "date">,
  column: NetlabPriceColumn,
): Offer | undefined {
  const usd = item.prices[column];
  if (usd === undefined) return undefined;
  const relevance = assessMarketplaceOfferRelevance(item.name, item.pn, item.url, product, "netlab", item.vendor, "NETLAB");
  if (relevance.kind === "drop") return undefined;
  const mpn = normalizeCode(product.mpn);
  const model = product.model.trim().toLocaleLowerCase("ru");
  const match: MatchKind =
    relevance.kind === "weak" || relevance.rejectUrl
      ? "doubtful"
      : mpn && normalizeCode(item.pn) === mpn
        ? "exact"
        : mpn && normalizeCode(item.name).includes(mpn)
          ? "exact"
          : model && item.name.toLocaleLowerCase("ru").includes(model)
            ? "probable"
            : "doubtful";
  const price = Math.round(usd * feed.usdRate);
  return {
    id: `netlab-${createHash("sha256").update(`${item.id}:${column}:${price}`).digest("hex").slice(0, 10)}`,
    source: "NETLAB",
    seller: "NETLAB",
    title: item.name,
    ...(item.pn ? { mpn: item.pn } : {}),
    price,
    priceCondition: `Прайс NETLAB, колонка ${column}: $${usd} по курсу ${feed.usdRate} (${feed.date})`,
    currency: "RUB",
    availability: netlabAvailability(item),
    ...(item.warranty ? { warranty: item.warranty } : {}),
    condition: "new",
    match,
    url: item.url,
    ...(item.picture ? { imageUrl: item.picture } : {}),
    fetchedAt: new Date().toISOString(),
    demo: false,
  };
}

export interface NetlabFeedOptions {
  url?: string;
  column?: NetlabPriceColumn;
  ttlMs?: number;
  fetchImpl?: typeof fetch;
  now?: () => number;
}

export function netlabFeedOptionsFromEnv(): NetlabFeedOptions {
  const column = process.env.NETLAB_PRICE_COLUMN?.trim().toUpperCase();
  const ttlMin = Number(process.env.NETLAB_PRICE_TTL_MIN);
  return {
    url: process.env.NETLAB_PRICE_URL?.trim() || NETLAB_PRICE_URL_DEFAULT,
    column: (NETLAB_PRICE_COLUMNS as readonly string[]).includes(column ?? "") ? (column as NetlabPriceColumn) : "R",
    ttlMs: Number.isFinite(ttlMin) && ttlMin > 0 ? ttlMin * 60_000 : 60 * 60_000,
  };
}

export class NetlabPriceFeedAdapter implements SourceAdapter {
  readonly name = "NETLAB";
  private feed: NetlabFeed | undefined;
  private loading: Promise<NetlabFeed> | undefined;
  private readonly url: string;
  private readonly column: NetlabPriceColumn;
  private readonly ttlMs: number;
  private readonly fetchImpl: typeof fetch;
  private readonly now: () => number;

  constructor(options: NetlabFeedOptions = {}) {
    this.url = options.url ?? NETLAB_PRICE_URL_DEFAULT;
    this.column = options.column ?? "R";
    this.ttlMs = options.ttlMs ?? 60 * 60_000;
    this.fetchImpl = options.fetchImpl ?? fetch;
    this.now = options.now ?? Date.now;
  }

  /** Fresh feed, or the previous one if a refresh fails (stale beats empty). */
  async load(): Promise<NetlabFeed> {
    if (this.feed && this.now() - this.feed.loadedAt < this.ttlMs) return this.feed;
    if (!this.loading) {
      this.loading = downloadNetlabFeed(this.url, this.fetchImpl)
        .then((feed) => {
          this.feed = { ...feed, loadedAt: this.now() };
          return this.feed;
        })
        .finally(() => {
          this.loading = undefined;
        });
    }
    try {
      return await this.loading;
    } catch (error) {
      if (this.feed) return this.feed;
      throw error;
    }
  }

  async search(product: Product): Promise<Offer[]> {
    const feed = await this.load();
    return feed.items
      .filter((item) => isNetlabCandidate(item, product))
      .map((item) => toNetlabOffer(item, product, feed, this.column))
      .filter((offer): offer is Offer => offer !== undefined)
      .sort(preferRelevantOffers);
  }
}

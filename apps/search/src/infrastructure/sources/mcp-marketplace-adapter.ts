import { createHash } from "node:crypto";

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import type { MatchKind, Offer, Product } from "@peremena/contracts";

import type { SourceAdapter } from "../../domain/source-adapter.js";
import { assertWbCatalogAllowed, noteWbRateLimited, presentWbRateLimited } from "./wb-rate-limit.js";

type JsonObject = Record<string, unknown>;

export type MarketplaceKind =
  | "wb"
  | "yandex"
  | "ozon"
  | "dns"
  | "megamarket"
  | "citilink"
  | "avito"
  | "aliexpress";

interface MarketplaceSource {
  name: string;
  tool: string;
  host: string;
  kind: MarketplaceKind;
}

/** WB dest for Moscow; required by wb_search for valid prices/stocks. */
export const WB_DEFAULT_DEST = "-1257786";

/** Avito `/all` (вся Россия). MCP default AVITO_LOCATION_ID is Moscow 637640. */
export const AVITO_LOCATION_ALL = "660311";

/** Avito «Товары для компьютера» — slug `/tovary_dlya_kompyutera`. */
export const AVITO_CATEGORY_COMPUTER = "101";

/** One extra Avito page only when the first page is this small. */
const AVITO_SMALL_PAGE = 5;

export function avitoCategoryId(product?: Product): string | undefined {
  if (!product) return undefined;
  const category = product.category.trim().toLocaleLowerCase("ru");
  if (category.includes("мыш") || category.includes("клавиатур")) return AVITO_CATEGORY_COMPUTER;
  return undefined;
}

/**
 * ru-marketplace-mcp 2.4.2 tool args. Extra keys raise Pydantic
 * unexpected_keyword_argument (extra='forbid' on FastMCP validate_call).
 * Avito accepts query, page, location_id, category_id.
 */
export function marketplaceToolArguments(
  kind: MarketplaceKind,
  query: string,
  options?: { page?: number; product?: Product },
): JsonObject {
  const page = options?.page ?? 1;
  switch (kind) {
    case "wb":
      return { query, dest: WB_DEFAULT_DEST, page: 1 };
    case "yandex":
      return { query, page: 1, limit: 12 };
    case "ozon":
      return { query, page: 1 };
    case "avito": {
      const args: JsonObject = { query, page, location_id: AVITO_LOCATION_ALL };
      const categoryId = avitoCategoryId(options?.product);
      if (categoryId) args.category_id = categoryId;
      return args;
    }
    case "dns":
    case "megamarket":
    case "citilink":
    case "aliexpress":
      return { query };
  }
}

const cdpWarmupHost: Record<MarketplaceKind, string> = {
  wb: "wildberries.ru",
  yandex: "market.yandex.ru",
  ozon: "ozon.ru",
  dns: "dns-shop.ru",
  megamarket: "megamarket.ru",
  citilink: "citilink.ru",
  avito: "avito.ru",
  aliexpress: "aliexpress.ru",
};

/**
 * Admin-facing text. Managers never see this: gateway presentSnapshot
 * strips source.message. Do not retry 429/Qrator/cdp_blocked here —
 * MCP already retries Yandex 302 and forbids HTTP-status retries on WB.
 */
export function presentMarketplaceError(kind: MarketplaceKind, raw: string): string {
  const parsed = parseConnectorError(raw);
  const body = parsed?.message ?? raw;
  if (kind === "wb" && isAntibotTransportError(body)) {
    if (/\b403\b/.test(body) && !/\b429\b/.test(body)) {
      if (!/не мусорный fallback/i.test(body)) noteWbRateLimited();
      return presentWbCatalogUnavailable(body);
    }
    if (!/^(WB rate-limited|WB: лимит)/i.test(body)) noteWbRateLimited();
    return presentWbRateLimited(body);
  }
  if (kind === "avito" && isAvitoPowError(body)) {
    const handoff = body.match(/handoff_expires_at[=: ]\S+/i)?.[0];
    return (
      "Avito HTTP 439 (firewallPow / PoW) на js/items — срыв уже прогретой сессии, " +
      "не вечный блок DC-IP. MCP греет curl-сессию и на JSON 439 делает один локальный firewallPow. Не долбить. " +
      (handoff
        ? `Вкладка оставлена для VNC (${handoff}). Пройти PoW в headed Chrome и повторить поиск один раз.`
        : "Если в VNC на вкладке avito.ru виден PoW — пройти и повторить поиск один раз.")
    );
  }
  if (kind === "yandex" && /http 302|\b302\b/i.test(body)) {
    return `Яндекс 302 без окна проверки (тихий редирект по IP/капче). ${vncWarmupHint(kind)}`;
  }
  if (kind === "megamarket" && isMegamarketWafError(body)) {
    return `Мегамаркет HTTP 405 (nginx WAF/антибот). Не долбить поиск. ${vncWarmupHint(kind)}`;
  }
  if (isAntibotTransportError(body)) {
    return `${body} ${vncWarmupHint(kind)}`;
  }
  if (parsed?.message) return parsed.message;
  return raw;
}

export function vncWarmupHint(kind: MarketplaceKind): string {
  return (
    `Повтор поиска блок не снимает. VNC: ssh -L 5901:127.0.0.1:5901, ` +
    `открыть ${cdpWarmupHost[kind]} в headed Chrome профиля chrome-headed ` +
    `(см. docs/CHROME_VNC.md).`
  );
}

/** Avito 439 = firewallPow (not captcha, not 429). Do not solve PoW. */
export function isAvitoPowError(raw: string): boolean {
  return /http 439|439 firewall|firewallpow|firewall.?pow/i.test(raw);
}

/** Megamarket nginx 405 is WAF, not a retryable method mismatch. */
export function isMegamarketWafError(raw: string): boolean {
  return /http 405|405 nginx|method not allowed/i.test(raw);
}

/** Firewall / CDP / Qrator / ServicePipe / WB 429 / Avito 439 / WAF 405 — do not retry. */
export function isAntibotTransportError(raw: string): boolean {
  return (
    isAvitoPowError(raw) ||
    isMegamarketWafError(raw) ||
    /429|rate-limited|лимит запросов|cdp_blocked|qrator|servicepipe|cloudflare|firewallcaptcha|firewall|проблема с ip|execution context was destroyed|navblocked|handoff_expires_at|http 403|\b403\b|не мусорный fallback|http 302|\b302\b|http 401|401 |html doctype|text\/html|<!doctype|x5sec|punish\?|login.?wall/i.test(
      raw,
    )
  );
}

/** HTTP fallback for WB only when MCP itself is down — not after a live empty catalog. */
export function isMcpUnavailableError(raw: string): boolean {
  return /connection refused|econnrefused|enotfound|mcp.*unavailable|fetch failed|socket hang up|econnreset|network error/i.test(
    raw,
  );
}

/**
 * Streamable HTTP session died on the server (restart/rebuild) while search still
 * holds the old mcp-session-id. SDK surfaces it as StreamableHTTPError with -32600.
 */
export function isMcpSessionLostError(error: unknown): boolean {
  const raw = error instanceof Error ? error.message : String(error);
  return /session not found|error code.?-32600|"code"\s*:\s*-32600/i.test(raw);
}

/**
 * MCP 2.4.2 wb_search: v9 403/empty → search-goods.wildberries.ru id-list
 * (`fallback: true` in logs, warning on meta). That list is stale and is not
 * the search.aspx SERP. One HTTP catalog attempt is allowed; do not map junk
 * as «отсеяны по модели».
 */
/** Thrown on stale search-goods miss; keep phrases for isWbStaleCatalogMiss. */
export const WB_STALE_CATALOG_MISS = "WB: каталог недоступен, чужая категория.";

export const WB_CATALOG_UNAVAILABLE_403 = "WB: каталог недоступен (403).";

export function isWbStaleCatalogMiss(raw: string): boolean {
  return /search-goods fallback|карточки чужой категории|каталог MCP недоступен|каталог недоступен, чужая категория/i.test(
    raw,
  );
}

export function presentWbCatalogUnavailable(raw?: string): string {
  if (raw && /не мусорный fallback/i.test(raw)) return WB_CATALOG_UNAVAILABLE_403;
  return WB_CATALOG_UNAVAILABLE_403;
}

/** One pause before a single Avito 439 retry. MCP already navigates avito.ru/. */
export function avitoPowRetryDelayMs(): number {
  const raw = Number(process.env.AVITO_POW_RETRY_MS);
  return Number.isFinite(raw) && raw >= 0 ? raw : 2_500;
}

function parseConnectorError(raw: string): { message?: string } | undefined {
  const trimmed = raw.trim();
  if (!trimmed.startsWith("{")) return undefined;
  try {
    const value: unknown = JSON.parse(trimmed);
    if (!isObject(value)) return undefined;
    const message = typeof value.message === "string" ? value.message : undefined;
    return message ? { message } : undefined;
  } catch {
    return undefined;
  }
}

export interface MarketplaceToolCaller {
  callTool(name: string, args: JsonObject): Promise<JsonObject>;
}

export class MarketplaceMcpClient implements MarketplaceToolCaller {
  private client?: Client;
  private connection?: Promise<Client>;
  private sessionEpoch = 0;

  constructor(
    private readonly endpoint: string,
    private readonly token: string,
    private readonly tenant: string,
  ) {}

  async callTool(name: string, args: JsonObject): Promise<JsonObject> {
    const epoch = this.sessionEpoch;
    try {
      return await this.invoke(name, args);
    } catch (error) {
      if (!isMcpSessionLostError(error)) throw error;
      // Parallel source calls share this client; only one resets per epoch.
      if (epoch === this.sessionEpoch) {
        this.sessionEpoch += 1;
        await this.reset();
      } else {
        await this.connect();
      }
      return await this.invoke(name, args);
    }
  }

  private async invoke(name: string, args: JsonObject): Promise<JsonObject> {
    const client = await this.connect();
    const result = await client.callTool({ name, arguments: args });
    if (result.isError) {
      const message = extractText(result.content) ?? `MCP tool ${name} завершился ошибкой`;
      throw new Error(message);
    }
    if (isObject(result.structuredContent)) return result.structuredContent;
    const text = extractText(result.content);
    if (!text) throw new Error(`MCP tool ${name} вернул пустой ответ`);
    const parsed: unknown = JSON.parse(text);
    if (!isObject(parsed)) throw new Error(`MCP tool ${name} вернул неверный формат`);
    return parsed;
  }

  private connect(): Promise<Client> {
    if (this.client) return Promise.resolve(this.client);
    if (!this.connection) {
      this.connection = this.open().catch((error) => {
        delete this.connection;
        throw error;
      });
    }
    return this.connection;
  }

  private async reset(): Promise<void> {
    const stale = this.client;
    delete this.client;
    delete this.connection;
    if (!stale) return;
    try {
      await stale.close();
    } catch {
      // Stale transport may already be dead after marketplace-mcp restart.
    }
  }

  private async open(): Promise<Client> {
    const client = new Client({ name: "peremena-price-radar", version: "0.1.0" });
    const transport = new StreamableHTTPClientTransport(new URL(this.endpoint), {
      requestInit: {
        headers: {
          Authorization: `Bearer ${this.token}`,
          "X-MCP-Tenant": this.tenant,
        },
      },
    });
    // SDK 1.29 transport types are not exactOptionalPropertyTypes-clean,
    // although the runtime transport implements the expected interface.
    await client.connect(transport as unknown as Parameters<Client["connect"]>[0]);
    this.client = client;
    return client;
  }
}

export class McpMarketplaceAdapter implements SourceAdapter {
  readonly name: string;

  constructor(
    private readonly client: MarketplaceToolCaller,
    private readonly source: MarketplaceSource,
  ) {
    this.name = source.name;
  }

  async search(product: Product): Promise<Offer[]> {
    const leftover: JsonObject[] = [];
    try {
      if (this.source.kind === "wb") assertWbCatalogAllowed();
      const queries = marketplaceSearchQueries(product, this.source.kind);
      // WB/Avito: title first, then one brand+model. Extra MPN variants
      // double-hit the catalog/API (WB 429, Avito 439).
      const limit =
        this.source.kind === "wb" || this.source.kind === "avito"
          ? Math.min(2, queries.length)
          : queries.length;
      let wbHealthyItems = 0;
      let avitoPowRetried = false;
      for (let index = 0; index < limit; index += 1) {
        const query = queries[index]!;
        try {
          const before = leftover.length;
          const offers = await this.fetchMappedOffers(query, product, leftover, (count) => {
            if (this.source.kind === "wb") wbHealthyItems += count;
          });
          const pageItems = leftover.length - before;
          if (offers.length > 0) {
            if (
              this.source.kind === "avito" &&
              offers.length < 12 &&
              pageItems > 0 &&
              pageItems <= AVITO_SMALL_PAGE
            ) {
              try {
                const more = await this.fetchMappedOffers(
                  query,
                  product,
                  leftover,
                  () => undefined,
                  2,
                );
                return mergeUniqueOffers(offers, more).slice(0, 12);
              } catch (extraPageError) {
                const extraRaw =
                  extraPageError instanceof Error ? extraPageError.message : String(extraPageError);
                if (isAntibotTransportError(extraRaw)) return offers;
                throw extraPageError;
              }
            }
            return offers;
          }
          if ((this.source.kind === "wb" || this.source.kind === "avito") && index + 1 < limit) {
            continue;
          }
          if (this.source.kind === "wb") {
            throw new Error(
              wbHealthyItems === 0
                ? "WB: пустой ответ каталога. Повторите поиск."
                : `WB: нет подходящих карточек (${wbHealthyItems} отсеяны).`,
            );
          }
        } catch (error) {
          const raw = error instanceof Error ? error.message : String(error);
          if (this.source.kind === "avito" && isAvitoPowError(raw) && !avitoPowRetried) {
            // MCP 2.4.2 has no extra 439 flag: avito_search already opens
            // avito.ru/ then fetch(js/items). One more shot reuses warmed cookies.
            avitoPowRetried = true;
            this.logMap(query, [], []);
            const wait = avitoPowRetryDelayMs();
            if (wait > 0) await new Promise((resolve) => setTimeout(resolve, wait));
            const offers = await this.fetchMappedOffers(query, product, leftover, () => undefined);
            if (offers.length > 0) return offers;
            throw new Error("Avito: пустой ответ после повторного avito_search. Повторите поиск один раз.");
          }
          if (isAntibotTransportError(raw) || !isRetryableEmptySearch(raw)) throw error;
          this.logMap(query, [], []);
        }
      }
      if (this.source.kind === "citilink") {
        const cardOffers = await this.fetchCitilinkCards(leftover, product);
        if (cardOffers.length > 0) return cardOffers;
        if (leftover.length === 0) {
          throw new Error("Ситилинк: пустой каталог после живого ответа MCP. Повторите поиск один раз.");
        }
      }
      return [];
    } catch (error) {
      const raw = error instanceof Error ? error.message : String(error);
      throw new Error(presentMarketplaceError(this.source.kind, raw));
    }
  }

  private async fetchMappedOffers(
    query: string,
    product: Product,
    leftover: JsonObject[],
    noteItems: (count: number) => void,
    page = 1,
  ): Promise<Offer[]> {
    const payload = await this.client.callTool(
      this.source.tool,
      marketplaceToolArguments(this.source.kind, query, { page, product }),
    );
    const blocked = marketplacePayloadBlockReason(payload);
    if (blocked) throw new Error(blocked);
    const items = marketplacePayloadItems(payload);
    if (this.source.kind === "wb" && isWbStaleCatalogPayload(payload, items, product)) {
      this.logMap(query, items, []);
      throw new Error(WB_STALE_CATALOG_MISS);
    }
    leftover.push(...items);
    noteItems(items.length);
    const offers = this.mapItems(items, product);
    this.logMap(query, items, offers);
    return offers;
  }

  private mapItems(items: JsonObject[], product: Product): Offer[] {
    return items
      .map((item, index) => this.toOffer(item, product, index))
      .filter((offer): offer is Offer => offer !== undefined)
      .sort(preferRelevantOffers)
      .slice(0, 12);
  }

  private logMap(query: string, items: JsonObject[], offers: Offer[]): void {
    const mappedTitles = new Set(offers.map((offer) => offer.title));
    const droppedTitles = items
      .map((item) => firstString(item.title, item.name))
      .filter((title): title is string => typeof title === "string" && !mappedTitles.has(title))
      .slice(0, 28);
    console.info(
      JSON.stringify({
        msg: "marketplace_map",
        source: this.source.kind,
        tool: this.source.tool,
        query,
        items: items.length,
        mapped: offers.length,
        dropped: Math.max(0, items.length - offers.length),
        ...(droppedTitles.length > 0 ? { dropped_titles: droppedTitles } : {}),
      }),
    );
  }

  private async fetchCitilinkCards(items: JsonObject[], product: Product): Promise<Offer[]> {
    const urls = citilinkIdentityUrls(items, product);
    const offers: Offer[] = [];
    for (const url of urls.slice(0, 3)) {
      try {
        const payload = await this.client.callTool("citilink_card", { product_url: url });
        const offer = this.toOffer(
          {
            ...payload,
            url: firstString(payload.url) ?? url,
          },
          product,
          offers.length,
        );
        if (offer) offers.push(offer);
      } catch {
        // Card miss is not a source error: search already returned a payload.
      }
    }
    this.logMap("citilink_card", urls.map((url) => ({ url })), offers);
    return offers.sort(preferRelevantOffers).slice(0, 12);
  }

  private toOffer(item: JsonObject, product: Product, index: number): Offer | undefined {
    const title = firstString(item.title, item.name);
    const price = marketplaceItemPrice(item);
    if (!title || price === undefined) return undefined;
    const offerMpn = firstString(item.mpn, item.article, item.vendor_code);
    const explicitUrl = firstString(item.url, item.link, item.product_url);
    const offerBrand = firstString(item.brand, item.brand_name);
    const offerEntity = firstString(item.entity, item.subject, item.subj_name, item.subject_name);
    const sellerHint = isObject(item.seller)
      ? firstString(item.seller.name)
      : firstString(item.seller, item.supplier);
    const relevance = assessMarketplaceOfferRelevance(
      offerEntity ? `${title} ${offerEntity}` : title,
      offerMpn,
      explicitUrl,
      product,
      this.source.kind,
      offerBrand,
      sellerHint,
    );
    if (relevance.kind === "drop") return undefined;
    const oldPrice = firstPrice(
      item.price_old_rub,
      item.price_original_rub,
      item.price_original,
    );
    const sourceId =
      firstString(item.nm_id, item.sku, item.product_id, item.id, item.offer_id) ?? String(index);
    const url = relevance.rejectUrl
      ? marketplaceSearchUrl(this.source, product)
      : offerUrl(this.source, item, sourceId, product);
    const match =
      relevance.kind === "weak" || relevance.rejectUrl
        ? "doubtful"
        : matchKind(title, offerMpn, product);
    const inStock = firstBoolean(item.in_stock, item.is_available);
    const delivery = firstString(item.delivery);
    const digest = createHash("sha256")
      .update(`${this.source.name}:${sourceId}:${price}`)
      .digest("hex")
      .slice(0, 10);
    const mappedMpn =
      offerMpn ?? (match === "exact" || match === "probable" ? product.mpn : undefined);

    return {
      id: `${this.source.kind}-${digest}`,
      source: this.source.name,
      seller: sellerHint ?? this.source.name,
      title,
      ...(mappedMpn ? { mpn: mappedMpn } : {}),
      price,
      ...(oldPrice !== undefined && oldPrice > price ? { oldPrice } : {}),
      priceCondition: marketplacePriceCondition(item, this.source.kind),
      currency: "RUB",
      availability:
        inStock === true ? "В наличии" : inStock === false ? "Нет в наличии" : firstString(item.stock) ?? "Неизвестно",
      ...(delivery ? { delivery } : {}),
      condition: "new",
      match,
      url,
      fetchedAt: new Date().toISOString(),
      demo: false,
    };
  }
}

export function createMarketplaceSourcesFromEnv(): SourceAdapter[] {
  const endpoint = process.env.MARKETPLACE_MCP_URL;
  const token = process.env.MARKETPLACE_MCP_TOKEN;
  const tenant = process.env.MARKETPLACE_MCP_TENANT;
  if (!endpoint || !token || !tenant) return [];
  const sources: MarketplaceSource[] = [
    { name: "Wildberries", tool: "wb_search", host: "wildberries.ru", kind: "wb" },
    { name: "Яндекс Маркет", tool: "yandex_search", host: "market.yandex.ru", kind: "yandex" },
    { name: "Ozon", tool: "ozon_search", host: "ozon.ru", kind: "ozon" },
    { name: "DNS", tool: "dns_search", host: "dns-shop.ru", kind: "dns" },
    { name: "Мегамаркет", tool: "megamarket_search", host: "megamarket.ru", kind: "megamarket" },
    { name: "Ситилинк", tool: "citilink_search", host: "citilink.ru", kind: "citilink" },
    { name: "Авито", tool: "avito_search", host: "avito.ru", kind: "avito" },
    { name: "AliExpress", tool: "aliexpress_search", host: "aliexpress.ru", kind: "aliexpress" },
  ];
  const enabled = (process.env.MARKETPLACE_SOURCES ?? sources.map((source) => source.kind).join(","))
    .split(",")
    .map((value) => value.trim().toLocaleLowerCase("ru"))
    .filter(Boolean);
  const aliases: Record<string, MarketplaceSource["kind"]> = {
    wildberries: "wb",
    wb: "wb",
    yandex_market: "yandex",
    yandex: "yandex",
    ozon: "ozon",
    dns: "dns",
    megamarket: "megamarket",
    citilink: "citilink",
    avito: "avito",
    aliexpress: "aliexpress",
    ali: "aliexpress",
  };
  const allowed = new Set(enabled.map((value) => aliases[value] ?? (value as MarketplaceSource["kind"])));
  // One Streamable HTTP session for all marketplace tools — after marketplace-mcp
  // restart a single reconnect recovers every source instead of N stale sessions.
  const client = new MarketplaceMcpClient(endpoint, token, tenant);
  return sources
    .filter((source) => allowed.has(source.kind))
    .map((source) => new McpMarketplaceAdapter(client, source));
}

const GENERIC_PRODUCT_TOKENS = new Set([
  "black",
  "white",
  "grey",
  "gray",
  "graphite",
  "and",
  "the",
  "для",
  "мышь",
  "мыши",
  "клавиатура",
  "клавиатуры",
  "проводная",
  "беспроводная",
  "чёрный",
  "черный",
  "белый",
  "серый",
  // Marketing suffixes: "Pro" matches Roborock Q8 Max Pro on a Legion Pro 5 query.
  "pro",
  "plus",
  "max",
  "ultra",
  "mini",
  "lite",
  "air",
  "gen",
  "gen2",
  "new",
  "wifi",
  "rgb",
  "usb",
]);

type OfferRelevance = { kind: "drop" } | { kind: "weak"; rejectUrl?: boolean } | { kind: "strong"; rejectUrl?: boolean };

function tokenizeProduct(value: string): string[] {
  return value.toLocaleLowerCase("ru").match(/[a-zа-яё0-9]+/giu) ?? [];
}

function isIdentityToken(token: string): boolean {
  if (GENERIC_PRODUCT_TOKENS.has(token)) return false;
  if (token.length >= 3) return true;
  return token.length >= 2 && /\d/.test(token);
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function tokenIn(haystack: string, token: string): boolean {
  if (!token) return false;
  return new RegExp(`(?:^|[^a-zа-яё0-9])${escapeRegExp(token)}(?:$|[^a-zа-яё0-9])`, "iu").test(haystack);
}

function compactAlnum(value: string): string {
  return value.toLocaleLowerCase("ru").replace(/[^a-zа-яё0-9]+/giu, "");
}

/** Fold Cyrillic lookalikes used in WB titles (К380 / к-380) onto Latin SKUs. */
function compactIdentity(value: string): string {
  return compactAlnum(value).replaceAll("к", "k");
}

/** Word-boundary first. Model SKUs (k380, g102) also match k-380 / k380s / К 380. Short tokens like 3s stay strict so SNV3S does not hit. */
function identityTokenIn(haystack: string, token: string): boolean {
  if (tokenIn(haystack, token)) return true;
  const compactTok = compactIdentity(token);
  if (compactTok.length >= 4 && /\d/.test(compactTok)) {
    return compactIdentity(haystack).includes(compactTok);
  }
  return false;
}

function tokensIn(haystack: string, tokens: string[]): string[] {
  return tokens.filter((token) => identityTokenIn(haystack, token));
}

const FOREIGN_CATEGORY_MARKERS = [
  "ssd",
  "nvme",
  "накопитель",
  "холодильник",
  "holodilnik",
  "стиральн",
  "телевизор",
  "смартфон",
  "indesit",
  "кофе",
  "coffee",
  "бад",
  "витамин",
  "носк",
  "socks",
  "кроссов",
  "sneaker",
  "кеды",
  "обувь",
  "корм",
  "кошк",
  "котят",
  "коврик",
  "футболк",
  "трусы",
  "колгот",
  "хобби",
  "творчеств",
  "jersey",
  "jersy",
  "подгузник",
  "салфетк",
  "кресло",
  "рыбалк",
  "аргинин",
  "аминокислот",
  "наматрас",
  "пюре",
  "перчатк",
  "удобрен",
  "аэрогрил",
  "полотенц",
  "батончик",
  "пылесос",
  "пылесборник",
  "планшет",
  "проектор",
  "сканер",
  "графическ",
];

function categorySelfTokens(product: Product): string[] {
  const tokens = new Set<string>();
  const category = product.category.trim().toLocaleLowerCase("ru");
  if (category.includes("мыш")) {
    tokens.add("мышь");
    tokens.add("мыши");
    tokens.add("mouse");
  }
  if (category.includes("клавиатур")) {
    tokens.add("клавиатур");
    tokens.add("keyboard");
  }
  if (category.includes("ноутбук")) {
    tokens.add("ноутбук");
    tokens.add("laptop");
    tokens.add("notebook");
  }
  for (const token of tokenizeProduct(product.name)) {
    if (token === "мышь" || token === "мыши" || token === "mouse") tokens.add(token);
    if (token.startsWith("клавиатур") || token === "keyboard") tokens.add(token);
  }
  return [...tokens];
}

function hasSelfCategory(product: Product, hay: string): boolean {
  return categorySelfTokens(product).some((token) => tokenIn(hay, token) || (token.length >= 6 && hay.includes(token)));
}

function hasForeignCategoryMarker(hay: string): boolean {
  return FOREIGN_CATEGORY_MARKERS.some((marker) =>
    marker.length >= 4 ? hay.includes(marker) : tokenIn(hay, marker),
  );
}

function hasForeignCategoryClash(product: Product, hay: string): boolean {
  if (categorySelfTokens(product).length === 0) return false;
  if (!hasForeignCategoryMarker(hay)) return false;
  return !hasSelfCategory(product, hay);
}

function oppositeCategoryMarkers(product: Product): string[] {
  const category = `${product.category} ${product.name}`.toLocaleLowerCase("ru");
  if (category.includes("клавиатур") || category.includes("keyboard")) {
    return ["мышь", "мыши", "мышка", "mouse"];
  }
  if (category.includes("мыш") || category.includes("mouse")) {
    return ["клавиатур", "keyboard"];
  }
  return [];
}

function hasOppositeCategory(product: Product, hay: string): boolean {
  if (hasSelfCategory(product, hay)) return false;
  return oppositeCategoryMarkers(product).some(
    (marker) => tokenIn(hay, marker) || (marker.length >= 6 && hay.includes(marker)),
  );
}

function brandIdentityTokens(product: Product): string[] {
  const tokens = new Set<string>();
  for (const token of tokenizeProduct(product.brand)) {
    if (!isIdentityToken(token)) continue;
    tokens.add(token);
    if (token === "logitech") {
      tokens.add("логитек");
      tokens.add("логитеч");
    }
  }
  return [...tokens];
}

function productModelStems(product: Product): string[] {
  const stems = new Set<string>();
  for (const token of [...tokenizeProduct(product.model), ...tokenizeProduct(product.name)]) {
    const compact = compactIdentity(token);
    if (compact.length >= 3 && /\d/.test(compact)) stems.add(compact);
  }
  return [...stems];
}

/** "pro 5" → pro5. Used only to drop rival SKUs, not to widen family cards. */
function productPhraseStems(product: Product): string[] {
  const stems = new Set<string>();
  const tokens = [...tokenizeProduct(product.model), ...tokenizeProduct(product.name)];
  for (let index = 0; index < tokens.length - 1; index += 1) {
    const word = compactIdentity(tokens[index]!);
    const digits = compactIdentity(tokens[index + 1]!);
    if (/^[a-zа-яё]{1,8}$/.test(word) && /^\d{1,4}[a-z]?$/.test(digits)) {
      stems.add(`${word}${digits}`);
    }
  }
  return [...stems];
}

function skuStemsIn(hay: string): string[] {
  const stems = new Set<string>();
  const tokens = tokenizeProduct(hay);
  for (const token of tokens) {
    const compact = compactIdentity(token);
    if (/^[a-z]{1,3}\d{2,4}[a-z]?$/.test(compact)) stems.add(compact.replace(/s$/, ""));
  }
  for (let index = 0; index < tokens.length - 1; index += 1) {
    const letter = compactIdentity(tokens[index]!);
    const digits = compactIdentity(tokens[index + 1]!);
    if (/^[a-z]{1,3}$/.test(letter) && /^\d{2,4}$/.test(digits)) stems.add(`${letter}${digits}`);
  }
  return [...stems];
}

function hasRivalModelSku(product: Product, hay: string): boolean {
  const ours = [...new Set([...productModelStems(product), ...productPhraseStems(product)])];
  if (ours.length === 0) return false;
  const compactHay = compactIdentity(hay);
  if (ours.some((stem) => compactHay.includes(stem))) return false;
  return skuStemsIn(hay).some(
    (stem) => !ours.some((our) => stem === our || our.startsWith(stem) || stem.startsWith(our)),
  );
}

/** Brand + own category, no rival SKU (K120 vs K380) and no coffee/mice swap.
 * Compact SKUs (k380, g102) may omit the token on WB. Phrase models (MX Master 3S)
 * still need mx/master/3s — «Мышь Logitech» is not that mouse. */
function isProductFamilyCard(product: Product, hay: string): boolean {
  if (!productModelStems(product).some((stem) => stem.length >= 4)) return false;
  if (!hasSelfCategory(product, hay)) return false;
  if (hasForeignCategoryMarker(hay) || hasOppositeCategory(product, hay)) return false;
  if (hasRivalModelSku(product, hay)) return false;
  return brandIdentityTokens(product).some((token) => identityTokenIn(hay, token));
}

export function productIdentityTokens(product: Product): { strong: string[]; weak: string[] } {
  const strong = new Set<string>();
  const weak = new Set<string>();
  for (const token of tokenizeProduct(product.model)) {
    if (isIdentityToken(token)) strong.add(token);
  }
  // Digit tokens from the current title (k380), not leftover mouse SKUs.
  for (const token of tokenizeProduct(product.name)) {
    if (isIdentityToken(token) && /\d/.test(token)) strong.add(token);
  }
  const mpn = product.mpn.trim().toLocaleLowerCase("ru");
  if (mpn.length >= 3) {
    strong.add(mpn);
    const compact = compactAlnum(mpn);
    if (compact.length >= 3) strong.add(compact);
    for (const token of tokenizeProduct(mpn)) {
      if (token.length >= 5) strong.add(token);
    }
  }
  for (const token of brandIdentityTokens(product)) {
    weak.add(token);
  }
  return { strong: [...strong], weak: [...weak] };
}

/**
 * MCP scrapers (Citilink especially) may return homepage/promo cards when
 * search HTML is stale or blocked. Drop a different category (SSD, fridge,
 * coffee, socks, hobby, feed) for a mouse query. Token overlap uses word
 * boundaries so "3s" does not keep Kingston SNV3S. WB catalog URLs never
 * carry G102/MPN — do not drop a priced WB card just because the path is
 * /catalog/<id>. Strong tokens come from the selected product (k380, mx,
 * master, 3s, g102, MPN) — never a leftover mouse list. Brand + own
 * category (Logitech + клавиатура) is the same family even without a
 * literal k380 — WB titles are often «клавиатура logitech», «K 380»,
 * «К380s». Rival SKUs (K120) and coffee/mice still drop. Graphite vs
 * Pale Grey MX Master 3S is the same model — keep it.
 */
export function assessMarketplaceOfferRelevance(
  title: string,
  offerMpn: string | undefined,
  explicitUrl: string | undefined,
  product: Product,
  kind?: MarketplaceKind,
  offerBrand?: string,
  offerSeller?: string,
): OfferRelevance {
  const { strong, weak } = productIdentityTokens(product);
  const titleHay = `${title} ${offerMpn ?? ""} ${offerBrand ?? ""}`.toLocaleLowerCase("ru");
  const urlHay = (explicitUrl ?? "").toLocaleLowerCase("ru");
  const sellerHay = (offerSeller ?? "").toLocaleLowerCase("ru");
  const identityHay = `${titleHay} ${urlHay}`;
  const categoryHay = `${identityHay} ${sellerHay}`;
  const strongHits = tokensIn(identityHay, strong);
  const weakHits = tokensIn(identityHay, weak);
  const familyCard = isProductFamilyCard(product, titleHay);
  if (hasOppositeCategory(product, identityHay) && strongHits.length === 0) return { kind: "drop" };
  if (hasForeignCategoryMarker(categoryHay) && strongHits.length === 0) return { kind: "drop" };
  if (hasForeignCategoryClash(product, identityHay)) return { kind: "drop" };
  if (hasRivalModelSku(product, titleHay)) return { kind: "drop" };

  if (strongHits.length === 0 && weakHits.length === 0 && !familyCard) {
    if (kind === "wb" && strong.length === 0 && hasSelfCategory(product, titleHay)) return { kind: "weak" };
    return { kind: "drop" };
  }
  if (strongHits.length === 0 && strong.length > 0 && !familyCard) return { kind: "drop" };

  const productPage = /\/product\/|\/catalog\/\d+|\/tovary\//i.test(urlHay);
  const urlHasIdentity = tokensIn(urlHay, [...strong, ...weak]).length > 0;
  if (kind !== "wb" && productPage && !urlHasIdentity) {
    const titleStrong = tokensIn(titleHay, strong);
    const titleWeak = tokensIn(titleHay, weak);
    const sameCategory = hasSelfCategory(product, titleHay);
    if (titleStrong.length === 0 && !sameCategory && !familyCard) return { kind: "drop" };
    if (titleStrong.length === 0 && titleWeak.length === 0 && !familyCard) return { kind: "drop" };
    if (titleStrong.length === 0 && strong.length > 0 && !familyCard) return { kind: "drop" };
    return { kind: titleStrong.length > 0 ? "strong" : "weak", rejectUrl: true };
  }

  if (strongHits.length === 0) return { kind: "weak" };
  return { kind: "strong" };
}

export function marketplaceSearchQueries(product: Product, kind: MarketplaceKind): string[] {
  const name = collapseWs(product.name);
  const brandModel = collapseWs([product.brand, product.model].filter(Boolean).join(" "));
  const mpnBrandModel = collapseWs([product.mpn, product.brand, product.model].filter(Boolean).join(" "));
  const mpn = collapseWs(product.mpn);
  const preferTitle = kind === "citilink" || kind === "wb" || kind === "avito";
  // WB/Avito: never lead with Pale Grey MPN. Title, then brand+model.
  const ordered = preferTitle
    ? kind === "citilink"
      ? [name, brandModel, mpnBrandModel, mpn]
      : [name, brandModel]
    : [mpnBrandModel, name, brandModel];
  const seen = new Set<string>();
  const queries: string[] = [];
  for (const query of ordered) {
    const key = query.toLocaleLowerCase("ru");
    if (!query || seen.has(key)) continue;
    seen.add(key);
    queries.push(query);
  }
  return queries;
}

function collapseWs(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

export function isRetryableEmptySearch(raw: string): boolean {
  if (isAntibotTransportError(raw)) return false;
  return /zero product tiles|matched nothing|parser.?drift|dom shape moved/i.test(raw);
}

function citilinkIdentityUrls(items: JsonObject[], product: Product): string[] {
  const { strong } = productIdentityTokens(product);
  const urls: string[] = [];
  const seen = new Set<string>();
  for (const item of items) {
    const title = firstString(item.title, item.name) ?? "";
    const url = firstString(item.url, item.link, item.product_url);
    if (!url?.includes("/product/") || seen.has(url)) continue;
    const hay = `${title} ${url}`.toLocaleLowerCase("ru");
    if (tokensIn(hay, strong).length === 0) continue;
    seen.add(url);
    urls.push(url);
  }
  return urls;
}

export function preferRelevantOffers(left: Offer, right: Offer): number {
  const rank = (match: MatchKind) =>
    match === "exact" ? 0 : match === "probable" ? 1 : match === "analog" ? 2 : 3;
  return rank(left.match) - rank(right.match);
}

function mergeUniqueOffers(left: Offer[], right: Offer[]): Offer[] {
  const seen = new Set(left.map((offer) => offer.url || offer.id));
  const extra = right.filter((offer) => !seen.has(offer.url || offer.id));
  return [...left, ...extra].sort(preferRelevantOffers);
}

function marketplaceSearchUrl(source: MarketplaceSource, product: Product): string {
  const text = product.mpn || `${product.brand} ${product.model}`.trim() || product.model;
  if (source.kind === "ozon") return `https://www.ozon.ru/search/?text=${encodeURIComponent(text)}`;
  if (source.kind === "yandex") {
    return `https://market.yandex.ru/search?text=${encodeURIComponent(product.mpn || `${product.brand} ${product.model}`)}`;
  }
  if (source.kind === "dns") {
    return `https://www.dns-shop.ru/search/?q=${encodeURIComponent(text)}`;
  }
  if (source.kind === "citilink") {
    const q = product.name.trim() || text;
    return `https://www.citilink.ru/search/?text=${encodeURIComponent(q)}`;
  }
  if (source.kind === "avito") {
    const q = product.name.trim() || `${product.brand} ${product.model}`.trim() || product.model;
    const category = avitoCategoryId(product);
    return category
      ? `https://www.avito.ru/all/tovary_dlya_kompyutera?cd=1&q=${encodeURIComponent(q)}`
      : `https://www.avito.ru/all?q=${encodeURIComponent(q)}`;
  }
  if (source.kind === "aliexpress") {
    return `https://aliexpress.ru/wholesale?SearchText=${encodeURIComponent(text)}`;
  }
  return `https://${source.host}/search?q=${encodeURIComponent(text)}`;
}

function offerUrl(source: MarketplaceSource, item: JsonObject, sourceId: string, product: Product): string {
  const explicit = firstString(item.url, item.link, item.product_url);
  if (explicit?.startsWith("http")) return explicit;
  if (source.kind === "wb") return `https://www.wildberries.ru/catalog/${sourceId}/detail.aspx`;
  return marketplaceSearchUrl(source, product);
}

function matchKind(title: string, offerMpn: string | undefined, product: Product): MatchKind {
  const haystack = title.toLocaleLowerCase("ru");
  const mpn = product.mpn.trim().toLocaleLowerCase("ru");
  const model = product.model.trim().toLocaleLowerCase("ru");
  if (mpn && (offerMpn?.toLocaleLowerCase("ru") === mpn || haystack.includes(mpn))) return "exact";
  if (model && haystack.includes(model)) return "probable";
  return "doubtful";
}

function extractText(content: unknown): string | undefined {
  if (!Array.isArray(content)) return undefined;
  const part = content.find(
    (entry): entry is { type: "text"; text: string } =>
      isObject(entry) && entry.type === "text" && typeof entry.text === "string",
  );
  return part?.text;
}

function isObject(value: unknown): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function firstString(...values: unknown[]): string | undefined {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) return value.trim();
    if (typeof value === "number") return String(value);
  }
  return undefined;
}

function firstBoolean(...values: unknown[]): boolean | undefined {
  return values.find((value): value is boolean => typeof value === "boolean");
}

/** HTML doctype / 439 page must not become a silent empty «Готово». */
export function marketplacePayloadBlockReason(payload: JsonObject): string | undefined {
  const blob = JSON.stringify(payload);
  const status = payload.status ?? payload.status_code ?? payload.http_status;
  if (status === 439 || isAvitoPowError(blob)) return "HTTP 439 firewallPow";
  if (status === 405 || isMegamarketWafError(blob)) return "HTTP 405 nginx";
  if (/<!doctype|<\s*html[\s>]|text\/html/i.test(blob)) {
    return "HTML doctype instead of catalog JSON";
  }
  return undefined;
}

export function marketplacePayloadItems(payload: JsonObject): JsonObject[] {
  const nested = isObject(payload.result) ? payload.result : undefined;
  const data = isObject(payload.data) ? payload.data : undefined;
  const candidates = [
    payload.items,
    nested?.items,
    data?.items,
    payload.products,
    data?.products,
    nested?.products,
  ];
  for (const value of candidates) {
    if (Array.isArray(value)) return value.filter(isObject);
  }
  return [];
}

/** MCP 2.4.2 flags the search-goods path in meta.warnings; logs also set fallback. */
export function isWbSearchGoodsFallback(payload: JsonObject): boolean {
  if (payload.fallback === true) return true;
  const meta = isObject(payload.meta) ? payload.meta : undefined;
  const warnings = meta?.warnings;
  const warningText = [
    typeof payload.warning === "string" ? payload.warning : "",
    Array.isArray(warnings)
      ? warnings.filter((value): value is string => typeof value === "string").join(" ")
      : "",
  ].join(" ");
  if (/fallback|legacy id path|search-goods/i.test(warningText)) return true;
  const total = payload.total_ids ?? payload.total;
  return payload.page_size === 30 && (total === 2000 || total === "2000");
}

/**
 * v9 403 + search-goods: either junk cards, or no_results after card/v4 403
 * (`total_ids` still 2000). That is not a live empty SERP.
 */
export function isWbStaleCatalogPayload(
  payload: JsonObject,
  items: JsonObject[],
  product: Product,
): boolean {
  if (isWbSearchGoodsFallback(payload) && items.length === 0) return true;
  if (isWbSearchGoodsFallback(payload) && wbItemsClashSelectedCategory(items, product)) return true;
  const total = payload.total_ids ?? payload.total;
  return payload.status === "no_results" && typeof total === "number" && total >= 100;
}

/** Official SERP for a keyboard/mouse query never comes back as only diapers/SSD. */
export function wbItemsClashSelectedCategory(items: JsonObject[], product: Product): boolean {
  if (categorySelfTokens(product).length === 0) return false;
  const titled = items.filter((item) => firstString(item.title, item.name));
  if (titled.length < 3) return false;
  return !titled.some((item) => {
    const title = firstString(item.title, item.name) ?? "";
    const entity = firstString(item.entity, item.subject, item.subj_name, item.subject_name) ?? "";
    return hasSelfCategory(product, `${title} ${entity}`.toLocaleLowerCase("ru"));
  });
}

function kopeckPrice(...values: unknown[]): number | undefined {
  for (const value of values) {
    if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) continue;
    return value >= 1000 ? Math.round(value / 100) : Math.round(value);
  }
  return undefined;
}

function sizesPrice(item: JsonObject): number | undefined {
  const sizes = item.sizes;
  if (!Array.isArray(sizes)) return undefined;
  for (const size of sizes) {
    if (!isObject(size) || !isObject(size.price)) continue;
    const price = kopeckPrice(size.price.product, size.price.total, size.price.basic);
    if (price !== undefined) return price;
  }
  return undefined;
}

export function marketplaceItemPrice(item: JsonObject): number | undefined {
  return (
    firstPrice(item.price_rub, item.price, item.card_price) ??
    sizesPrice(item) ??
    kopeckPrice(item.salePriceU, item.priceU)
  );
}

export function marketplacePriceCondition(item: JsonObject, _kind: MarketplaceKind): string {
  if (firstPrice(item.price_with_plus, item.card_price) !== undefined) {
    return "Есть цена по подписке/карте";
  }
  return "Публичная цена";
}

function firstPrice(...values: unknown[]): number | undefined {
  for (const value of values) {
    if (typeof value === "number" && Number.isFinite(value) && value > 0) return value;
    if (typeof value === "string") {
      const match = value.replaceAll("\u00a0", " ").match(/\d[\d ]*(?:[.,]\d+)?/);
      if (!match) continue;
      const parsed = Number(match[0].replaceAll(" ", "").replace(",", "."));
      if (Number.isFinite(parsed) && parsed > 0) return parsed;
    }
  }
  return undefined;
}

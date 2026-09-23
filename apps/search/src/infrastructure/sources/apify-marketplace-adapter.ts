import { createHash } from "node:crypto";

import { ApifyClient } from "apify-client";
import type { MatchKind, Offer, Product } from "@peremena/contracts";

import type { SourceAdapter } from "../../domain/source-adapter.js";

type JsonObject = Record<string, unknown>;

interface ApifySourceConfig {
  name: string;
  actorId: string;
  host: string;
  buildInput: (query: string, maxItems: number) => JsonObject;
}

export class ApifyMarketplaceAdapter implements SourceAdapter {
  readonly name: string;

  constructor(
    private readonly client: ApifyClient,
    private readonly config: ApifySourceConfig,
    private readonly maxItems: number,
    private readonly maxChargeUsd: number,
  ) {
    this.name = config.name;
  }

  async search(product: Product, signal?: AbortSignal): Promise<Offer[]> {
    signal?.throwIfAborted();
    const query = `${product.brand} ${product.model} ${product.mpn}`;
    const run = await this.client.actor(this.config.actorId).call(
      this.config.buildInput(query, this.maxItems),
      {
        waitSecs: 180,
        timeout: 180,
        maxTotalChargeUsd: this.maxChargeUsd,
        log: null,
      },
    );
    signal?.throwIfAborted();
    if (run.status !== "SUCCEEDED") {
      throw new Error(`Apify Actor ${this.config.actorId}: статус ${run.status}`);
    }
    const dataset = await this.client
      .dataset(run.defaultDatasetId)
      .listItems({ limit: this.maxItems });
    return dataset.items
      .filter(isObject)
      .map((item, index) => this.toOffer(item, product, index))
      .filter((offer): offer is Offer => offer !== undefined);
  }

  private toOffer(item: JsonObject, product: Product, index: number): Offer | undefined {
    const title = firstString(item.title, item.name, item.productName);
    const price = firstPrice(item.price, item.cardPrice, item.currentPrice, item.price_rub);
    if (!title || price === undefined) return undefined;

    const oldPrice = firstPrice(
      item.originalPrice,
      item.oldPrice,
      item.priceOriginal,
      item.price_old_rub,
    );
    const url =
      firstString(item.url, item.productUrl, item.link) ?? `https://${this.config.host}/`;
    const seller = sellerName(item) ?? this.name;
    const availability =
      firstString(item.availability, item.stockStatus) ??
      booleanAvailability(item.inStock, item.isAvailable) ??
      "Неизвестно";
    const delivery =
      firstString(item.deliveryEstimate, item.deliveryText) ??
      (isObject(item.delivery) ? firstString(item.delivery.deliveryText) : undefined);
    const modelMatches = title
      .toLocaleLowerCase("ru")
      .includes(product.model.toLocaleLowerCase("ru"));
    const match: MatchKind = modelMatches ? "probable" : "doubtful";
    const sourceId =
      firstString(item.sku, item.productId, item.modelId, item.marketSku) ?? String(index);
    const id = createHash("sha256")
      .update(`apify:${this.name}:${sourceId}:${price}`)
      .digest("hex")
      .slice(0, 12);

    return {
      id: `apify-${id}`,
      source: this.name,
      seller,
      title,
      price,
      ...(oldPrice !== undefined && oldPrice > price ? { oldPrice } : {}),
      priceCondition:
        firstPrice(item.cardPrice, item.priceYaBank, item.cashbackAmount) !== undefined
          ? "Есть специальная цена/бонус"
          : "Публичная цена",
      currency: "RUB",
      availability,
      ...(delivery ? { delivery } : {}),
      condition: "new",
      match,
      url,
      fetchedAt: new Date().toISOString(),
      demo: false,
    };
  }
}

export function createApifySourcesFromEnv(): SourceAdapter[] {
  if (process.env.APIFY_ENABLED !== "true" || !process.env.APIFY_TOKEN) return [];
  const client = new ApifyClient({ token: process.env.APIFY_TOKEN });
  const maxItems = boundedNumber(process.env.APIFY_MAX_ITEMS, 12, 1, 30);
  const maxChargeUsd = boundedNumber(process.env.APIFY_MAX_CHARGE_USD, 0.2, 0.05, 2);
  const configs: ApifySourceConfig[] = [
    {
      name: "DNS",
      actorId: "crawlerbros/dns-shop-scraper",
      host: "dns-shop.ru",
      buildInput: (query, limit) => ({
        mode: "search",
        searchQuery: query,
        sortBy: "popularity",
        maxItems: limit,
      }),
    },
    {
      name: "Мегамаркет",
      actorId: "crawlerbros/megamarket-scraper",
      host: "megamarket.ru",
      buildInput: (query, limit) => ({
        mode: "search",
        searchQuery: query,
        sortBy: "popular",
        maxItems: limit,
      }),
    },
    {
      name: "Ozon",
      actorId: "zen-studio/ozon-scraper-pro",
      host: "ozon.ru",
      buildInput: (query, limit) => ({
        queries: [query],
        maxResults: limit,
        skipDetails: true,
        includeSellerDetails: false,
        language: "ru",
        currency: "RUB",
      }),
    },
    {
      name: "Яндекс Маркет",
      actorId: "zen-studio/yandex-market-scraper-parser",
      host: "market.yandex.ru",
      buildInput: (query, limit) => ({
        query,
        maxItems: limit,
        enrichProducts: false,
        includeReviews: false,
        region: "62",
      }),
    },
  ];
  return configs.map(
    (config) => new ApifyMarketplaceAdapter(client, config, maxItems, maxChargeUsd),
  );
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

function firstPrice(...values: unknown[]): number | undefined {
  for (const value of values) {
    if (typeof value === "number" && Number.isFinite(value) && value > 0) return value;
    if (typeof value !== "string") continue;
    const match = value.replaceAll("\u00a0", " ").match(/\d[\d ]*(?:[.,]\d+)?/);
    if (!match) continue;
    const parsed = Number(match[0].replaceAll(" ", "").replace(",", "."));
    if (Number.isFinite(parsed) && parsed > 0) return parsed;
  }
  return undefined;
}

function sellerName(item: JsonObject): string | undefined {
  const direct = firstString(item.sellerName, item.shopName, item.supplier);
  if (direct) return direct;
  return isObject(item.seller) ? firstString(item.seller.name, item.seller.title) : firstString(item.seller);
}

function booleanAvailability(...values: unknown[]): string | undefined {
  const value = values.find((candidate): candidate is boolean => typeof candidate === "boolean");
  return value === undefined ? undefined : value ? "В наличии" : "Нет в наличии";
}

function boundedNumber(
  raw: string | undefined,
  fallback: number,
  minimum: number,
  maximum: number,
): number {
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? Math.min(maximum, Math.max(minimum, parsed)) : fallback;
}

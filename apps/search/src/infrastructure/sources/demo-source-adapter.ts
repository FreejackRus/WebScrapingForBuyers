import { createHash } from "node:crypto";
import { setTimeout as delay } from "node:timers/promises";

import type { MatchKind, Offer, Product, ProductCondition } from "@peremena/contracts";

import type { SourceAdapter } from "../../domain/source-adapter.js";

interface DemoSourceOptions {
  name: string;
  host: string;
  priceFactor: number;
  delayMs: number;
  seller?: string;
  condition?: ProductCondition;
}

export class DemoSourceAdapter implements SourceAdapter {
  readonly name: string;

  constructor(private readonly options: DemoSourceOptions) {
    this.name = options.name;
  }

  async search(product: Product, signal?: AbortSignal): Promise<Offer[]> {
    await delay(this.options.delayMs, undefined, { signal });
    const digest = createHash("sha256").update(`${this.name}:${product.id}`).digest("hex");
    const basePrice = 1_200 + (Number.parseInt(digest.slice(0, 5), 16) % 11_000);
    const price = Math.round((basePrice * this.options.priceFactor) / 10) * 10;
    const discounted = Number.parseInt(digest[5] ?? "0", 16) % 3 === 0;
    const match: MatchKind = ["Ozon", "Wildberries"].includes(this.name)
      ? "probable"
      : "exact";

    return [
      {
        id: `${this.name.toLocaleLowerCase("ru").replaceAll(" ", "-")}-${digest.slice(0, 8)}`,
        source: this.name,
        seller: this.options.seller ?? this.name,
        title: product.name,
        ...(match === "exact" ? { mpn: product.mpn } : {}),
        price,
        ...(discounted ? { oldPrice: Math.round((price * 1.09) / 10) * 10 } : {}),
        priceCondition: discounted ? "Цена по карте/акции" : "Обычная цена",
        currency: "RUB",
        availability:
          Number.parseInt(digest[6] ?? "0", 16) % 4 === 0 ? "Под заказ" : "В наличии",
        delivery: `${1 + (Number.parseInt(digest[7] ?? "0", 16) % 6)} дн., стоимость уточняется`,
        ...(Number.parseInt(digest[8] ?? "0", 16) % 5 === 0
          ? {}
          : { warranty: "12 месяцев" }),
        condition: this.options.condition ?? "new",
        match,
        url: `https://${this.options.host}/search/?q=${encodeURIComponent(product.mpn)}`,
        fetchedAt: new Date().toISOString(),
        demo: true,
      },
    ];
  }
}

/**
 * Local-only fake marketplace rows (`demo: true`).
 * B2B names (MERLION/NETLAB/OCS) are not demo-stubbed — see b2b-distributor-adapter.
 * Enabled only when ALLOW_DEMO_SOURCES=true (never in production compose).
 */
export function createDemoSources(): SourceAdapter[] {
  return [
    new DemoSourceAdapter({ name: "DNS", host: "dns-shop.ru", priceFactor: 1.04, delayMs: 950 }),
    new DemoSourceAdapter({
      name: "Яндекс Маркет",
      host: "market.yandex.ru",
      priceFactor: 1.02,
      delayMs: 1_150,
      seller: "Market Seller",
    }),
    new DemoSourceAdapter({
      name: "Ozon",
      host: "ozon.ru",
      priceFactor: 0.98,
      delayMs: 1_350,
      seller: "Ozon Seller",
    }),
    new DemoSourceAdapter({
      name: "Wildberries",
      host: "wildberries.ru",
      priceFactor: 0.95,
      delayMs: 1_550,
      seller: "WB Seller",
    }),
    new DemoSourceAdapter({
      name: "Мегамаркет",
      host: "megamarket.ru",
      priceFactor: 1,
      delayMs: 1_750,
      seller: "Mega Seller",
    }),
  ];
}

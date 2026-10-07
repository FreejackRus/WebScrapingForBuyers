import { describe, expect, it, vi } from "vitest";

import {
  StorefrontDistributorAdapter,
  parseRubPrice,
  parseServermallSearch,
  parseSrvTradeSearch,
  storefrontQuery,
  storefrontSearchUrl,
  toStorefrontOffer,
} from "./storefront-distributor-adapter.js";

// Trimmed copies of the live markup (2026-10-07).
const srvCard = (name: string, part: string, price: string, href: string) => `
<div class="search-cards__item search-card">
  <a class="search-card__image" href="${href}"><img src="/upload/iblock/8e6/a.jpg" alt="" loading="lazy"></a>
  <div class="search-card__body">
    <div class="search-card__brand">Hewlett-Packard Enterprise</div>
    <a class="search-card__name" href="${href}">${name}</a>
    <div class="search-card__part">Парт. номер: ${part}</div>
  </div>
  <div class="search-card__footer">
    <div class="search-card__price price"> ${price} </div>
    <div class="search-card__stock"><span class="icon"></span> <span>В наличии</span></div>
    <button class="button search-card__buy" data-product-id="1">Купить</button>
  </div>
</div>`;

const SRV_FOUND = `<h1>Поиск</h1><p>Найдено товаров: 2</p><div class="search-cards">
${srvCard("Процессор Xeon E5-2697 v4 18 Core 2.30 GHz", "818202-B21", '<span class="price__accent">244&nbsp;364 р.</span>', "/catalog/cpu/xeon_e5_2697_v4.html")}
${srvCard("Процессор Xeon E5-2697 v4 kit", "818202-B22", "Цену уточняйте", "/catalog/cpu/kit.html")}
</div>`;

const SRV_EMPTY = `<p>По запросу «qwzx» товаров не найдено. Попробуйте изменить ваш запрос.</p>
<h2>Популярные товары</h2>
${srvCard("Роутер MikroTik RB4011", "RB4011", '<span class="price__accent">20 000 р.</span>', "/catalog/net/rb4011.html")}`;

const smCard = (title: string, price: string, type: string, href: string) => `
<div class="product-card product-card_new " data-price="${price}" id="bx_1">
  <div class="product-card__inner"><div class="product-card__top product-card__top_new">
    <div class="product-card__top-left"><a href="${href}"><span class="product-card__model product-card__model--name product-card__model--type product-card__model--title">${title}</span></a></div>
    <div class="product-card__top-right"><div class="product-card__stock flex-column">
      <span class="product-card__type"> ${type} </span>
      <span class="product-card__stock-text">В&nbsp;наличии</span>
    </div></div>
  </div>
  <a href="${href}" class="product-card__image product-card__image_new ">
    <img loading="lazy" class="product-card__label brand" src=/upload/brand.webp alt=""/ data-replace>
    <img fetchpriority="high" src=/upload/resize_cache/server.webp alt="${title}" width="720" data-replace>
  </a></div>
</div>`;

const SM_FOUND = `<div class="catalog">
${smCard("Сервер LENOVO ThinkSystem SR650 V2 8SFF", "245553", "Новый", "/catalog/servers/lenovo-sr650-v2-8sff/")}
${smCard("Сервер LENOVO ThinkSystem SR650 12LFF", "98000", "Refurbished", "/catalog/servers/lenovo-sr650-12lff/")}
</div>`;

const cpu = {
  id: "cpu",
  brand: "HPE",
  model: "Xeon E5-2697 v4",
  name: "Процессор HPE Xeon E5-2697 v4",
  mpn: "818202-B21",
  category: "Процессоры",
  characteristics: {},
};

const server = {
  id: "srv",
  brand: "Lenovo",
  model: "ThinkSystem SR650 V2",
  name: "Сервер Lenovo ThinkSystem SR650 V2",
  mpn: "",
  category: "Серверы",
  characteristics: {},
};

describe("parseRubPrice", () => {
  it("reads spaced rubles and rejects text", () => {
    expect(parseRubPrice('<span class="price__accent">244&nbsp;364 р.</span>')).toBe(244364);
    expect(parseRubPrice("Цену уточняйте")).toBeUndefined();
  });
});

describe("parseSrvTradeSearch", () => {
  it("reads cards with part number, price, stock and image", () => {
    const cards = parseSrvTradeSearch(SRV_FOUND);
    expect(cards).toHaveLength(2);
    expect(cards[0]).toMatchObject({
      title: "Процессор Xeon E5-2697 v4 18 Core 2.30 GHz",
      url: "https://srv-trade.ru/catalog/cpu/xeon_e5_2697_v4.html",
      mpn: "818202-B21",
      brand: "Hewlett-Packard Enterprise",
      price: 244364,
      availability: "В наличии",
      imageUrl: "https://srv-trade.ru/upload/iblock/8e6/a.jpg",
    });
    expect(cards[1]?.price).toBeUndefined();
  });

  it("ignores «Популярные товары» on an empty result", () => {
    expect(parseSrvTradeSearch(SRV_EMPTY)).toEqual([]);
  });
});

describe("parseServermallSearch", () => {
  it("reads title, data-price, condition and the product image (not the brand label)", () => {
    const cards = parseServermallSearch(SM_FOUND);
    expect(cards).toHaveLength(2);
    expect(cards[0]).toMatchObject({
      title: "Сервер LENOVO ThinkSystem SR650 V2 8SFF",
      url: "https://servermall.ru/catalog/servers/lenovo-sr650-v2-8sff/",
      price: 245553,
      condition: "new",
      availability: "В наличии",
      imageUrl: "https://servermall.ru/upload/resize_cache/server.webp",
    });
    expect(cards[1]?.condition).toBe("refurbished");
  });

  it("returns nothing for a page without cards", () => {
    expect(parseServermallSearch("<p>Ничего не найдено</p>")).toEqual([]);
  });
});

describe("storefront offers", () => {
  it("queries by part number first", () => {
    expect(storefrontQuery(cpu)).toBe("818202-B21");
    expect(storefrontQuery(server)).toBe("Lenovo ThinkSystem SR650 V2");
    expect(storefrontSearchUrl("srvtrade", "818202-B21")).toBe("https://srv-trade.ru/search/?q=818202-B21");
  });

  it("marks an exact part-number hit and labels the public price", () => {
    const [card] = parseSrvTradeSearch(SRV_FOUND);
    const offer = toStorefrontOffer(card!, cpu, "srvtrade");
    expect(offer).toMatchObject({
      source: "СРВТрейд",
      match: "exact",
      price: 244364,
      priceCondition: "Цена на сайте, не B2B",
      demo: false,
    });
  });

  it("skips cards without a price", () => {
    const cards = parseSrvTradeSearch(SRV_FOUND);
    expect(toStorefrontOffer(cards[1]!, cpu, "srvtrade")).toBeUndefined();
  });

  it("fetches, parses and keeps relevant Servermall rows", async () => {
    const fetchImpl = vi.fn(async () => new Response(SM_FOUND, { status: 200 }));
    const adapter = new StorefrontDistributorAdapter("servermall", fetchImpl as unknown as typeof fetch);
    const offers = await adapter.search(server);
    expect(fetchImpl).toHaveBeenCalledWith(
      "https://servermall.ru/search/?q=Lenovo+ThinkSystem+SR650+V2",
      expect.anything(),
    );
    expect(offers.length).toBeGreaterThan(0);
    expect(offers[0]).toMatchObject({ source: "Servermall", demo: false });
    expect(offers.every((offer) => offer.priceCondition.includes("не B2B"))).toBe(true);
  });

  it("surfaces HTTP errors instead of an empty table", async () => {
    const fetchImpl = vi.fn(async () => new Response("blocked", { status: 403 }));
    const adapter = new StorefrontDistributorAdapter("srvtrade", fetchImpl as unknown as typeof fetch);
    await expect(adapter.search(cpu)).rejects.toThrow("СРВТрейд: HTTP 403");
  });
});

import type { Product } from "@peremena/contracts";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  AVITO_CATEGORY_COMPUTER,
  AVITO_LOCATION_ALL,
  McpMarketplaceAdapter,
  createMarketplaceSourcesFromEnv,
  marketplaceItemPrice,
  assessMarketplaceOfferRelevance,
  isAntibotTransportError,
  isAvitoPowError,
  isMegamarketWafError,
  isMcpSessionLostError,
  isRetryableEmptySearch,
  WB_CATALOG_UNAVAILABLE_403,
  WB_STALE_CATALOG_MISS,
  isWbSearchGoodsFallback,
  isWbStaleCatalogMiss,
  isWbStaleCatalogPayload,
  marketplacePayloadBlockReason,
  marketplaceSearchQueries,
  marketplaceToolArguments,
  presentMarketplaceError,
  productIdentityTokens,
  wbItemsClashSelectedCategory,
  type MarketplaceKind,
  type MarketplaceToolCaller,
} from "./mcp-marketplace-adapter.js";
import { resetWbRateLimitForTests } from "./wb-rate-limit.js";

const product: Product = {
  id: "test",
  brand: "Logitech",
  model: "MX Master 3S",
  name: "Logitech MX Master 3S",
  mpn: "910-006559",
  category: "Мыши",
  characteristics: {},
};

const query = [product.mpn, product.brand, product.model].filter(Boolean).join(" ");

const acceptedByKind: Record<MarketplaceKind, readonly string[]> = {
  wb: ["query", "dest", "page"],
  yandex: ["query", "page", "limit"],
  ozon: ["query", "page"],
  dns: ["query"],
  megamarket: ["query"],
  citilink: ["query"],
  avito: ["query", "page", "location_id"],
  aliexpress: ["query"],
};

describe("marketplaceToolArguments", () => {
  it.each(Object.entries(acceptedByKind) as Array<[MarketplaceKind, readonly string[]]>)(
    "%s sends only schema fields",
    (kind, allowed) => {
      const args = marketplaceToolArguments(kind, query);
      expect(Object.keys(args).sort()).toEqual([...allowed].sort());
      expect(args.query).toBe(query);
      if (kind !== "wb") expect(args).not.toHaveProperty("dest");
      if (kind !== "yandex") expect(args).not.toHaveProperty("limit");
      if (kind === "dns" || kind === "megamarket" || kind === "citilink" || kind === "aliexpress") {
        expect(args).not.toHaveProperty("page");
      }
    },
  );

  it("maps WB dest and Yandex page size to accepted names", () => {
    expect(marketplaceToolArguments("wb", query)).toEqual({
      query,
      dest: "-1257786",
      page: 1,
    });
    expect(marketplaceToolArguments("yandex", query)).toEqual({
      query,
      page: 1,
      limit: 12,
    });
    expect(marketplaceToolArguments("avito", query)).toEqual({
      query,
      page: 1,
      location_id: AVITO_LOCATION_ALL,
    });
    expect(marketplaceToolArguments("avito", query, { page: 2, product })).toEqual({
      query,
      page: 2,
      location_id: AVITO_LOCATION_ALL,
      category_id: AVITO_CATEGORY_COMPUTER,
    });
  });

  it("has no taobao kind after removal", () => {
    expect(Object.keys(acceptedByKind)).not.toContain("taobao");
  });
});

describe("createMarketplaceSourcesFromEnv", () => {
  const previous = {
    url: process.env.MARKETPLACE_MCP_URL,
    token: process.env.MARKETPLACE_MCP_TOKEN,
    tenant: process.env.MARKETPLACE_MCP_TENANT,
    sources: process.env.MARKETPLACE_SOURCES,
    cny: process.env.CNY_RUB_RATE,
  };

  afterEach(() => {
    restoreEnv("MARKETPLACE_MCP_URL", previous.url);
    restoreEnv("MARKETPLACE_MCP_TOKEN", previous.token);
    restoreEnv("MARKETPLACE_MCP_TENANT", previous.tenant);
    restoreEnv("MARKETPLACE_SOURCES", previous.sources);
    restoreEnv("CNY_RUB_RATE", previous.cny);
  });

  it("ignores leftover taobao in MARKETPLACE_SOURCES", () => {
    process.env.MARKETPLACE_MCP_URL = "http://marketplace-mcp.test/mcp";
    process.env.MARKETPLACE_MCP_TOKEN = "token";
    process.env.MARKETPLACE_MCP_TENANT = "peremena";
    process.env.MARKETPLACE_SOURCES = "wildberries,aliexpress,taobao";
    const names = createMarketplaceSourcesFromEnv().map((source) => source.name);
    expect(names).toEqual(["Wildberries", "AliExpress"]);
    expect(names.join(",")).not.toMatch(/taobao/i);
  });
});

describe("marketplaceItemPrice", () => {
  it("does not convert leftover CNY into rubles", () => {
    process.env.CNY_RUB_RATE = "12.5";
    expect(marketplaceItemPrice({ price_cny: 100 })).toBeUndefined();
    expect(marketplaceItemPrice({ price_rub: 1_990 })).toBe(1_990);
    delete process.env.CNY_RUB_RATE;
  });
});

function restoreEnv(name: string, value: string | undefined): void {
  if (value === undefined) delete process.env[name];
  else process.env[name] = value;
}

afterEach(() => {
  resetWbRateLimitForTests();
  delete process.env.AVITO_POW_RETRY_MS;
});

describe("presentMarketplaceError", () => {
  it("maps destroyed CDP context to a warmup instruction, not a retry", () => {
    const message = presentMarketplaceError(
      "megamarket",
      "Page.evaluate: Execution context was destroyed, most likely because of a navigation",
    );
    expect(message).toContain("megamarket.ru");
    expect(message).toContain("headed Chrome");
    expect(message).toContain("5901");
    expect(message).toContain("Повтор поиска блок не снимает");
  });

  it("classifies Streamable HTTP Session not found as a recoverable MCP session loss", () => {
    const message =
      'Streamable HTTP error: Error POSTing to endpoint: {"jsonrpc":"2.0","id":"server-error","error":{"code":-32600,"message":"Session not found"}}';
    expect(isMcpSessionLostError(new Error(message))).toBe(true);
    expect(isMcpSessionLostError(new Error("WB: пустой ответ каталога"))).toBe(false);
    expect(isMcpSessionLostError(new Error("HTTP 429 cdp_blocked"))).toBe(false);
  });

  it("unwraps MCP connector JSON and appends VNC warmup on antibot", () => {
    const message = presentMarketplaceError(
      "ozon",
      JSON.stringify({
        error: "transport_down",
        message: "Cloudflare/Ozon challenge. Open ozon.ru in Chrome CDP.",
        retryable: true,
      }),
    );
    expect(message).toContain("Cloudflare/Ozon challenge. Open ozon.ru in Chrome CDP.");
    expect(message).toContain("ozon.ru");
    expect(message).toContain("5901");
  });

  it("points Avito 429 cdp_blocked at VNC, not another tool call", () => {
    const message = presentMarketplaceError("avito", "HTTP 429 cdp_blocked");
    expect(message).toContain("avito.ru");
    expect(message).toContain("5901");
    expect(isAntibotTransportError("HTTP 429 cdp_blocked")).toBe(true);
    expect(isRetryableEmptySearch("HTTP 429 cdp_blocked")).toBe(false);
  });

  it("classifies Avito 439 as a warmed-session regression, not a dead DC-IP", () => {
    const message = presentMarketplaceError("avito", "HTTP 439 via cdp");
    expect(message).toMatch(/439/);
    expect(message).toMatch(/firewallPow|PoW/i);
    expect(message).toContain("Не долбить");
    expect(message).toMatch(/прогретой сессии/);
    expect(message).toMatch(/не вечный блок/);
    expect(message).not.toMatch(/капч/i);
    expect(message).not.toMatch(/Пройти проверку/);
    expect(isAvitoPowError("HTTP 439 via cdp")).toBe(true);
    expect(isAntibotTransportError("HTTP 439 via cdp")).toBe(true);
    expect(isRetryableEmptySearch("HTTP 439 via cdp")).toBe(false);
  });

  it("keeps Avito handoff_expires_at so the PoW tab can be finished in VNC", () => {
    const message = presentMarketplaceError(
      "avito",
      "HTTP 439 firewallPow handoff_expires_at=2026-09-23T15:20:00Z",
    );
    expect(message).toContain("handoff_expires_at=2026-09-23T15:20:00Z");
    expect(message).toMatch(/Вкладка оставлена для VNC/);
    expect(message).not.toMatch(/Пройти проверку/);
  });

  it("keeps a VNC hint for silent Yandex 302, without shop challenge links", () => {
    const message = presentMarketplaceError("yandex", "HTTP 302 after retries");
    expect(message).toMatch(/302/);
    expect(message).toMatch(/без окна проверки/);
    expect(message).toContain("market.yandex.ru");
    expect(message).toContain("5901");
    expect(message).not.toMatch(/Пройти проверку/);
    expect(isAntibotTransportError("HTTP 302 after retries")).toBe(true);
    expect(isRetryableEmptySearch("HTTP 302 after retries")).toBe(false);
  });

  it("classifies Megamarket 405 nginx as WAF and does not invite a retry loop", () => {
    const message = presentMarketplaceError("megamarket", "HTTP 405 nginx");
    expect(message).toMatch(/405/);
    expect(message).toMatch(/WAF|антибот/i);
    expect(message).toContain("Не долбить поиск");
    expect(message).toContain("megamarket.ru");
    expect(message).not.toMatch(/Пройти проверку/);
    expect(isMegamarketWafError("HTTP 405 nginx")).toBe(true);
    expect(isAntibotTransportError("HTTP 405 nginx")).toBe(true);
    expect(isRetryableEmptySearch("HTTP 405 nginx")).toBe(false);
  });

  it("keeps WB 429 short for the operator, without a VNC wall of text", () => {
    const message = presentMarketplaceError("wb", "HTTP 429 Too Many Requests");
    expect(message).toMatch(/^WB: лимит запросов\./);
    expect(message).not.toContain("5901");
    expect(message).not.toContain("headed Chrome");
    expect(message).not.toContain("VNC");
    expect(message).not.toMatch(/MCP|search-goods/i);
    expect(isAntibotTransportError(message)).toBe(true);
  });

  it("surfaces WB HTTP 403 as a catalog miss, not a scored-junk page", () => {
    const message = presentMarketplaceError("wb", "HTTP 403");
    expect(message).toBe(WB_CATALOG_UNAVAILABLE_403);
    expect(message).not.toMatch(/отсеяны/);
    expect(message).not.toContain("5901");
    expect(isAntibotTransportError(message)).toBe(true);
  });
});

const g102: Product = {
  id: "logitech-g102-black",
  brand: "Logitech",
  model: "G102 Lightsync",
  name: "Мышь проводная Logitech G102 Lightsync Black",
  mpn: "910-005823",
  category: "Мыши",
  characteristics: {},
};

const citilinkFridge = {
  title: "Холодильник двухкамерный Indesit ITR 4180 W Total No Frost белый",
  price_rub: 34_990,
  url: "https://www.citilink.ru/product/holodilnik-dvuhkamernyi-indesit-itr-4180-w-total-no-frost-belyi-1472659/",
};

const citilinkMouse = {
  title: "Мышь проводная Logitech G102 Lightsync Black",
  price_rub: 2_190,
  url: "https://www.citilink.ru/product/mysh-provodnaya-logitech-g102-lightsync-chernyi-1412345/",
};

function citilinkAdapter(callTool: MarketplaceToolCaller["callTool"]) {
  return new McpMarketplaceAdapter({ callTool }, {
    name: "Ситилинк",
    tool: "citilink_search",
    host: "citilink.ru",
    kind: "citilink",
  });
}

describe("McpMarketplaceAdapter", () => {
  it("calls the MCP tool with per-source arguments", async () => {
    const callTool = vi.fn<MarketplaceToolCaller["callTool"]>(async () => ({
      items: [{ title: product.name, price_rub: 8_990, nm_id: "123" }],
    }));
    const adapter = new McpMarketplaceAdapter({ callTool }, {
      name: "Wildberries",
      tool: "wb_search",
      host: "wildberries.ru",
      kind: "wb",
    });

    const offers = await adapter.search(product);
    expect(callTool).toHaveBeenCalledWith("wb_search", {
      query: product.name,
      dest: "-1257786",
      page: 1,
    });
    expect(offers).toHaveLength(1);
    expect(offers[0]).toMatchObject({
      source: "Wildberries",
      title: product.name,
      price: 8_990,
      demo: false,
    });
  });

  it("maps a WB MCP card payload to a visible REAL Wildberries offer", async () => {
    const callTool = vi.fn<MarketplaceToolCaller["callTool"]>(async () => ({
      query: "910-005823 Logitech G102 Lightsync",
      page: 1,
      count: 1,
      items: [
        {
          nm_id: 1_317_494_381,
          name: "Проводная игровая мышь G102 LightSync Black",
          brand: "Logitech",
          supplier: "WB Shop",
          price_rub: 1_344,
          price_original_rub: 1_990,
          in_stock: true,
        },
      ],
    }));
    const adapter = new McpMarketplaceAdapter({ callTool }, {
      name: "Wildberries",
      tool: "wb_search",
      host: "wildberries.ru",
      kind: "wb",
    });

    const offers = await adapter.search(g102);
    expect(offers.length).toBeGreaterThanOrEqual(1);
    expect(offers[0]).toMatchObject({
      source: "Wildberries",
      title: "Проводная игровая мышь G102 LightSync Black",
      price: 1_344,
      demo: false,
    });
    expect(offers[0]?.url).toContain("wildberries.ru/catalog/1317494381");
  });

  it("maps a raw WB catalog item when price lives in sizes[].price.product", async () => {
    const callTool = vi.fn<MarketplaceToolCaller["callTool"]>(async () => ({
      products: [
        {
          id: 1_280_469_586,
          name: "Мышь Logitech G102 Lightsync Black",
          supplier: "Tech&home",
          sizes: [{ price: { basic: 599_000, product: 449_000 } }],
        },
      ],
    }));
    const adapter = new McpMarketplaceAdapter({ callTool }, {
      name: "Wildberries",
      tool: "wb_search",
      host: "wildberries.ru",
      kind: "wb",
    });

    const offers = await adapter.search(g102);
    expect(offers).toHaveLength(1);
    expect(offers[0]).toMatchObject({
      source: "Wildberries",
      price: 4_490,
      demo: false,
    });
    expect(offers[0]?.url).toContain("/catalog/1280469586/");
  });

  it("keeps a WB catalog URL even when the path has no G102 token", async () => {
    const callTool = vi.fn<MarketplaceToolCaller["callTool"]>(async () => ({
      items: [
        {
          nm_id: 789_178_399,
          name: "Игровая мышь G102 LightSync с RGB подсветкой Черная",
          price_rub: 1_516,
          url: "https://www.wildberries.ru/catalog/789178399/detail.aspx",
        },
      ],
    }));
    const adapter = new McpMarketplaceAdapter({ callTool }, {
      name: "Wildberries",
      tool: "wb_search",
      host: "wildberries.ru",
      kind: "wb",
    });

    const offers = await adapter.search(g102);
    expect(offers).toHaveLength(1);
    expect(offers[0]?.url).toBe("https://www.wildberries.ru/catalog/789178399/detail.aspx");
    expect(offers[0]?.demo).toBe(false);
  });

  it("does not retry megamarket when CDP navigation destroys the context", async () => {
    const callTool = vi.fn<MarketplaceToolCaller["callTool"]>(async () => {
      throw new Error("Page.evaluate: Execution context was destroyed, most likely because of a navigation");
    });
    const adapter = new McpMarketplaceAdapter({ callTool }, {
      name: "Мегамаркет",
      tool: "megamarket_search",
      host: "megamarket.ru",
      kind: "megamarket",
    });

    await expect(adapter.search(product)).rejects.toThrow(/megamarket\.ru/);
    expect(callTool).toHaveBeenCalledTimes(1);
    expect(callTool).toHaveBeenCalledWith("megamarket_search", { query });
  });

  it("retries WB once with brand+model after a healthy empty Pale Grey page", async () => {
    const paleGrey: Product = {
      ...product,
      id: "logitech-mx-master-3s-pale-grey",
      name: "Мышь беспроводная Logitech MX Master 3S Pale Grey",
      mpn: "910-006560",
    };
    const callTool = vi.fn<MarketplaceToolCaller["callTool"]>(async (_name, args) => {
      if (args.query === paleGrey.name) return { items: [] };
      return {
        items: [
          {
            nm_id: 900,
            name: "Мышь беспроводная Logitech MX Master 3S",
            brand: "Logitech",
            price_rub: 6_200,
          },
        ],
      };
    });
    const adapter = new McpMarketplaceAdapter({ callTool }, {
      name: "Wildberries",
      tool: "wb_search",
      host: "wildberries.ru",
      kind: "wb",
    });

    const offers = await adapter.search(paleGrey);
    expect(callTool).toHaveBeenNthCalledWith(1, "wb_search", {
      query: paleGrey.name,
      dest: "-1257786",
      page: 1,
    });
    expect(callTool).toHaveBeenNthCalledWith(2, "wb_search", {
      query: "Logitech MX Master 3S",
      dest: "-1257786",
      page: 1,
    });
    expect(callTool).toHaveBeenCalledTimes(2);
    expect(offers).toHaveLength(1);
    expect(offers[0]).toMatchObject({
      source: "Wildberries",
      title: "Мышь беспроводная Logitech MX Master 3S",
      price: 6_200,
      demo: false,
    });
  });

  it("does not send a third wb_search after two healthy empty pages", async () => {
    const paleGrey: Product = {
      ...product,
      name: "Мышь беспроводная Logitech MX Master 3S Pale Grey",
      mpn: "910-006560",
    };
    const callTool = vi.fn<MarketplaceToolCaller["callTool"]>(async () => ({ items: [] }));
    const adapter = new McpMarketplaceAdapter({ callTool }, {
      name: "Wildberries",
      tool: "wb_search",
      host: "wildberries.ru",
      kind: "wb",
    });

    await expect(adapter.search(paleGrey)).rejects.toThrow(/пустой ответ каталога/);
    expect(callTool).toHaveBeenCalledTimes(2);
  });

  it("surfaces WB empty after a live MCP session instead of silent done", async () => {
    const callTool = vi.fn<MarketplaceToolCaller["callTool"]>(async () => ({ items: [] }));
    const adapter = new McpMarketplaceAdapter({ callTool }, {
      name: "Wildberries",
      tool: "wb_search",
      host: "wildberries.ru",
      kind: "wb",
    });

    await expect(adapter.search(product)).rejects.toThrow(/пустой ответ каталога/);
    expect(callTool).toHaveBeenCalledTimes(1);
  });

  it("surfaces WB when MCP items are all dropped, and logs the map", async () => {
    const info = vi.spyOn(console, "info").mockImplementation(() => undefined);
    const callTool = vi.fn<MarketplaceToolCaller["callTool"]>(async () => ({
      items: [
        {
          nm_id: 1,
          name: "Кофе молотый Jacobs Monarch 230 г",
          brand: "Jacobs",
          entity: "Кофе",
          price_rub: 289,
        },
      ],
    }));
    const adapter = new McpMarketplaceAdapter({ callTool }, {
      name: "Wildberries",
      tool: "wb_search",
      host: "wildberries.ru",
      kind: "wb",
    });

    await expect(adapter.search(product)).rejects.toThrow(/нет подходящих карточек.*отсеяны/);
    expect(info).toHaveBeenCalled();
    const mapped = info.mock.calls
      .map((args) => args[0])
      .filter((value): value is string => typeof value === "string")
      .map((value) => JSON.parse(value) as { msg?: string; dropped_titles?: string[] })
      .find((entry) => entry.msg === "marketplace_map");
    expect(mapped?.dropped_titles).toContain("Кофе молотый Jacobs Monarch 230 г");
    info.mockRestore();
  });

  it("treats search-goods fallback + foreign-category titles as a catalog miss, not отсеяны", async () => {
    const callTool = vi.fn<MarketplaceToolCaller["callTool"]>(async () => ({
      fallback: true,
      total_ids: 2000,
      page_size: 30,
      meta: {
        source: "wb_search",
        healthy: false,
        warnings: [
          "fallback: v9 search was unavailable, results came from the legacy id path and may include delisted items without prices",
        ],
      },
      items: [
        { nm_id: 1, name: "Подгузники трусики COMFORT CARE 4 размер L 9-14 кг GIGA 70шт", price_rub: 1_490 },
        { nm_id: 2, name: "Кресло складное для рыбалки туристическое", price_rub: 2_190 },
        { nm_id: 3, name: "Кроссовки спортивные на платформе", price_rub: 3_490 },
        { nm_id: 4, name: "Картридж лазерный MLT-D111S", price_rub: 890 },
        { nm_id: 5, name: "Процессор AMD Ryzen 5 5600", price_rub: 12_990 },
      ],
    }));
    const adapter = new McpMarketplaceAdapter({ callTool }, {
      name: "Wildberries",
      tool: "wb_search",
      host: "wildberries.ru",
      kind: "wb",
    });
    const k380Page: Product = {
      ...product,
      id: "logitech-k380-grey",
      model: "K380",
      name: "Клавиатура беспроводная Logitech K380 Grey",
      mpn: "920-007584",
      category: "Клавиатуры",
    };

    await expect(adapter.search(k380Page)).rejects.toThrow(WB_STALE_CATALOG_MISS);
    expect(callTool).toHaveBeenCalledTimes(1);
    expect(isWbStaleCatalogMiss(WB_STALE_CATALOG_MISS)).toBe(true);
  });

  it("still maps a search-goods fallback when titles are the selected category", async () => {
    const callTool = vi.fn<MarketplaceToolCaller["callTool"]>(async () => ({
      fallback: true,
      total_ids: 2000,
      page_size: 30,
      meta: { warnings: ["fallback: v9 search was unavailable, results came from the legacy id path"] },
      items: [
        {
          nm_id: 11,
          name: "Клавиатура беспроводная Logitech K380 Grey",
          brand: "Logitech",
          price_rub: 2_290,
        },
      ],
    }));
    const adapter = new McpMarketplaceAdapter({ callTool }, {
      name: "Wildberries",
      tool: "wb_search",
      host: "wildberries.ru",
      kind: "wb",
    });
    const k380Page: Product = {
      ...product,
      id: "logitech-k380-grey",
      model: "K380",
      name: "Клавиатура беспроводная Logitech K380 Grey",
      mpn: "920-007584",
      category: "Клавиатуры",
    };

    const offers = await adapter.search(k380Page);
    expect(offers).toHaveLength(1);
    expect(offers[0]?.title).toMatch(/K380/i);
  });

  it("detects the MCP search-goods fallback flag and a category clash", () => {
    expect(
      isWbSearchGoodsFallback({
        fallback: true,
        total_ids: 2000,
        items: [],
      }),
    ).toBe(true);
    expect(
      isWbSearchGoodsFallback({
        page_size: 30,
        total_ids: 2000,
        meta: { warnings: ["fallback: v9 search was unavailable, results came from the legacy id path"] },
      }),
    ).toBe(true);
    expect(isWbSearchGoodsFallback({ items: [{ name: "Клавиатура Logitech K380" }] })).toBe(false);
    const k380Page: Product = {
      ...product,
      model: "K380",
      name: "Клавиатура беспроводная Logitech K380 Grey",
      category: "Клавиатуры",
    };
    expect(
      wbItemsClashSelectedCategory(
        [
          { name: "Подгузники трусики COMFORT CARE" },
          { name: "Кресло складное для рыбалки" },
          { name: "Кроссовки спортивные" },
        ],
        k380Page,
      ),
    ).toBe(true);
    expect(
      wbItemsClashSelectedCategory(
        [
          { name: "Клавиатура Logitech K380 Grey" },
          { name: "Клавиатура Logitech Bluetooth" },
          { name: "Подгузники трусики" },
        ],
        k380Page,
      ),
    ).toBe(false);
    expect(
      isWbStaleCatalogPayload({ status: "no_results", total_ids: 2000 }, [], k380Page),
    ).toBe(true);
    expect(isWbStaleCatalogPayload({ status: "no_results", total_ids: 0 }, [], k380Page)).toBe(false);
  });

  it("treats MCP no_results after a 2000-id search-goods miss as catalog miss, not empty SERP", async () => {
    const callTool = vi.fn<MarketplaceToolCaller["callTool"]>(async () => ({
      status: "no_results",
      query: "Клавиатура беспроводная Logitech K380 Grey",
      page: 1,
      total_ids: 2000,
    }));
    const adapter = new McpMarketplaceAdapter({ callTool }, {
      name: "Wildberries",
      tool: "wb_search",
      host: "wildberries.ru",
      kind: "wb",
    });
    const k380Page: Product = {
      ...product,
      id: "logitech-k380-grey",
      model: "K380",
      name: "Клавиатура беспроводная Logitech K380 Grey",
      mpn: "920-007584",
      category: "Клавиатуры",
    };

    await expect(adapter.search(k380Page)).rejects.toThrow(WB_STALE_CATALOG_MISS);
    expect(callTool).toHaveBeenCalledTimes(1);
  });

  it("treats an HTML doctype payload as a block, not empty done", () => {
    expect(marketplacePayloadBlockReason({ html: "<!DOCTYPE html><html></html>" })).toMatch(/doctype/i);
    expect(marketplacePayloadBlockReason({ status: 439, body: "<!DOCTYPE html>" })).toMatch(/439/);
    expect(isAntibotTransportError("HTML doctype instead of catalog JSON")).toBe(true);
  });

  it("retries Avito once after 439, then stops", async () => {
    process.env.AVITO_POW_RETRY_MS = "0";
    const callTool = vi.fn<MarketplaceToolCaller["callTool"]>(async () => {
      throw new Error("HTTP 439 via cdp");
    });
    const adapter = new McpMarketplaceAdapter({ callTool }, {
      name: "Авито",
      tool: "avito_search",
      host: "avito.ru",
      kind: "avito",
    });

    await expect(adapter.search(product)).rejects.toThrow(/439/);
    expect(callTool).toHaveBeenCalledTimes(2);
    delete process.env.AVITO_POW_RETRY_MS;
  });

  it("recovers Avito REAL rows on the single 439 retry", async () => {
    process.env.AVITO_POW_RETRY_MS = "0";
    const callTool = vi.fn<MarketplaceToolCaller["callTool"]>(async () => {
      if (callTool.mock.calls.length === 1) throw new Error("HTTP 439 via cdp");
      return {
        items: [
          {
            title: "Мышь Logitech MX Master 3S",
            price_rub: 6_500,
            url: "https://www.avito.ru/moskva/tovary/mx-master-1",
          },
        ],
      };
    });
    const adapter = new McpMarketplaceAdapter({ callTool }, {
      name: "Авито",
      tool: "avito_search",
      host: "avito.ru",
      kind: "avito",
    });

    const offers = await adapter.search(product);
    expect(callTool).toHaveBeenCalledTimes(2);
    expect(offers).toHaveLength(1);
    expect(offers[0]).toMatchObject({
      source: "Авито",
      title: "Мышь Logitech MX Master 3S",
      demo: false,
    });
    delete process.env.AVITO_POW_RETRY_MS;
  });

  it("surfaces a short WB rate-limit status and does not retry queries", async () => {
    const callTool = vi.fn<MarketplaceToolCaller["callTool"]>(async () => {
      throw new Error("HTTP 429 Too Many Requests");
    });
    const adapter = new McpMarketplaceAdapter({ callTool }, {
      name: "Wildberries",
      tool: "wb_search",
      host: "wildberries.ru",
      kind: "wb",
    });

    await expect(adapter.search(product)).rejects.toThrow(/WB: лимит запросов/);
    expect(callTool).toHaveBeenCalledTimes(1);
    await expect(adapter.search(product)).rejects.toThrow(/лимит запросов/);
    expect(callTool).toHaveBeenCalledTimes(1);
  });

  it("does not try the next Avito query after 429 cdp_blocked", async () => {
    const callTool = vi.fn<MarketplaceToolCaller["callTool"]>(async () => {
      throw new Error("HTTP 429 cdp_blocked");
    });
    const adapter = new McpMarketplaceAdapter({ callTool }, {
      name: "Авито",
      tool: "avito_search",
      host: "avito.ru",
      kind: "avito",
    });

    await expect(adapter.search(product)).rejects.toThrow(/avito\.ru/);
    expect(callTool).toHaveBeenCalledTimes(1);
  });

  it("keeps only the G102 mouse from a Citilink payload that also has a fridge SKU", async () => {
    const callTool = vi.fn<MarketplaceToolCaller["callTool"]>(async () => ({
      items: [citilinkFridge, citilinkMouse],
    }));
    const offers = await citilinkAdapter(callTool).search(g102);
    expect(callTool).toHaveBeenCalledWith("citilink_search", {
      query: g102.name,
    });
    expect(offers).toHaveLength(1);
    expect(offers[0]).toMatchObject({
      source: "Ситилинк",
      title: citilinkMouse.title,
      url: citilinkMouse.url,
      demo: false,
    });
    expect(offers[0]?.url).not.toMatch(/holodilnik/i);
    expect(["exact", "probable"]).toContain(offers[0]?.match);
  });

  it("returns no Citilink offer when the payload is only an unrelated fridge", async () => {
    const callTool = vi.fn<MarketplaceToolCaller["callTool"]>(async () => ({
      items: [citilinkFridge],
    }));
    const offers = await citilinkAdapter(callTool).search(g102);
    expect(offers).toEqual([]);
  });

  it("does not keep a fridge product URL even if the title looks like the mouse", async () => {
    const callTool = vi.fn<MarketplaceToolCaller["callTool"]>(async () => ({
      items: [{ ...citilinkFridge, title: citilinkMouse.title }],
    }));
    const offers = await citilinkAdapter(callTool).search(g102);
    expect(offers).toHaveLength(1);
    expect(offers[0]?.url).not.toMatch(/holodilnik/i);
    expect(offers[0]?.url).toContain("citilink.ru/search/");
    expect(offers[0]?.match).toBe("doubtful");
  });

  const citilinkKingston = {
    title: "Накопитель SSD Kingston PCIe 4.0 x4 1TB SNV3S/1000G NV3 M.2 2280",
    price_rub: 17_990,
    url: "https://www.citilink.ru/product/nakopitel-ssd-kingston-pcie-4-0-x4-1tb-snv3s-1000g-nv3-m-2-2280-2054925/",
  };

  it("drops a Citilink Kingston SSD for a Logitech MX Master mouse query", async () => {
    const callTool = vi.fn<MarketplaceToolCaller["callTool"]>(async () => ({
      items: [citilinkKingston],
    }));
    const offers = await citilinkAdapter(callTool).search(product);
    expect(offers).toEqual([]);
  });

  it("drops a Citilink Kingston SSD for a Logitech G102 mouse query", async () => {
    const callTool = vi.fn<MarketplaceToolCaller["callTool"]>(async () => ({
      items: [citilinkKingston],
    }));
    const offers = await citilinkAdapter(callTool).search(g102);
    expect(offers).toEqual([]);
  });

  it("drops foreign-category WB promo junk and keeps the Logitech mouse", async () => {
    const callTool = vi.fn<MarketplaceToolCaller["callTool"]>(async () => ({
      items: [
        {
          nm_id: 111,
          name: "Кофе молотый Jacobs Monarch 230 г",
          brand: "Jacobs",
          entity: "Кофе",
          price_rub: 289,
        },
        {
          nm_id: 222,
          name: "Носки мужские набор 10 пар",
          entity: "Носки",
          price_rub: 199,
        },
        {
          nm_id: 333,
          name: "Кроссовки беговые мужские",
          entity: "Кроссовки",
          price_rub: 2_490,
        },
        {
          nm_id: 444,
          name: "Корм сухой для кошек с курицей",
          entity: "Корм для кошек",
          price_rub: 890,
        },
        {
          nm_id: 555,
          name: "БАД витамины комплекс 60 капсул",
          entity: "БАД",
          price_rub: 450,
        },
        {
          nm_id: 361,
          name: "Мышь проводная Logitech G102 LightSync",
          brand: "Logitech",
          supplier: "ЛИНЗЛАБ",
          price_rub: 361,
        },
        {
          nm_id: 777,
          name: "Набор для хобби и творчества",
          entity: "Хобби и творчество",
          supplier: "Хобби и творчество",
          price_rub: 423,
        },
      ],
    }));
    const adapter = new McpMarketplaceAdapter({ callTool }, {
      name: "Wildberries",
      tool: "wb_search",
      host: "wildberries.ru",
      kind: "wb",
    });
    const offers = await adapter.search(g102);
    expect(offers).toHaveLength(1);
    expect(offers[0]).toMatchObject({
      source: "Wildberries",
      title: "Мышь проводная Logitech G102 LightSync",
      price: 361,
      seller: "ЛИНЗЛАБ",
      demo: false,
    });
  });

  const paleGrey: Product = {
    id: "logitech-mx-master-3s-pale-grey",
    brand: "Logitech",
    model: "MX Master 3S",
    name: "Мышь беспроводная Logitech MX Master 3S Pale Grey",
    mpn: "910-006560",
    category: "Мыши",
    characteristics: { цвет: "светло-серый" },
  };

  const citilinkGraphite = {
    title: "Мышь беспроводная Logitech MX Master 3S, Bluetooth/Радио, оптическая, USB, 8000dpi, графитовый [910-006565]",
    price_rub: 7_980,
    url: "https://www.citilink.ru/product/mysh-logitech-mx-master-3s-opticheskaya-besprovodnaya-usb-grafitovyi-9-1933859/",
    product_id: "mysh-logitech-mx-master-3s-opticheskaya-besprovodnaya-usb-grafitovyi-9-1933859",
  };

  it("starts Citilink, WB and Avito with the product title, not the Pale Grey MPN", () => {
    expect(marketplaceSearchQueries(paleGrey, "citilink")[0]).toBe(paleGrey.name);
    expect(marketplaceSearchQueries(paleGrey, "citilink")[1]).toBe("Logitech MX Master 3S");
    expect(marketplaceSearchQueries(paleGrey, "wb")[0]).toBe(paleGrey.name);
    expect(marketplaceSearchQueries(paleGrey, "wb")[1]).toBe("Logitech MX Master 3S");
    expect(marketplaceSearchQueries(paleGrey, "wb").join(" ")).not.toContain(paleGrey.mpn);
    expect(marketplaceSearchQueries(paleGrey, "avito")[0]).toBe(paleGrey.name);
    expect(marketplaceSearchQueries(paleGrey, "avito")[1]).toBe("Logitech MX Master 3S");
  });

  it("keeps a Citilink graphite MX Master 3S for a Pale Grey selection", async () => {
    const callTool = vi.fn<MarketplaceToolCaller["callTool"]>(async () => ({
      items: [citilinkGraphite],
    }));
    const offers = await citilinkAdapter(callTool).search(paleGrey);
    expect(callTool).toHaveBeenCalledWith("citilink_search", { query: paleGrey.name });
    expect(offers).toHaveLength(1);
    expect(offers[0]).toMatchObject({
      source: "Ситилинк",
      title: citilinkGraphite.title,
      url: citilinkGraphite.url,
      price: 7_980,
      demo: false,
    });
    expect(["exact", "probable"]).toContain(offers[0]?.match);
  });

  it("retries Citilink with brand+model after a zero-tile search page", async () => {
    const callTool = vi.fn<MarketplaceToolCaller["callTool"]>(async (_name, args) => {
      if (args.query === paleGrey.name) {
        throw new Error("rendered search page yielded zero product tiles — either the query matched nothing or the DOM shape moved; verify manually");
      }
      return { items: [citilinkGraphite] };
    });
    const offers = await citilinkAdapter(callTool).search(paleGrey);
    expect(callTool).toHaveBeenNthCalledWith(1, "citilink_search", { query: paleGrey.name });
    expect(callTool).toHaveBeenNthCalledWith(2, "citilink_search", {
      query: "Logitech MX Master 3S",
    });
    expect(offers).toHaveLength(1);
    expect(offers[0]?.url).toBe(citilinkGraphite.url);
  });

  it("fetches citilink_card when search tiles have the product URL but no price", async () => {
    const callTool = vi.fn<MarketplaceToolCaller["callTool"]>(async (name, args) => {
      if (name === "citilink_search") {
        return {
          items: [{ title: null, price_rub: null, url: citilinkGraphite.url }],
        };
      }
      expect(name).toBe("citilink_card");
      expect(args).toEqual({ product_url: citilinkGraphite.url });
      return citilinkGraphite;
    });
    const offers = await citilinkAdapter(callTool).search(paleGrey);
    expect(callTool).toHaveBeenCalledWith("citilink_card", { product_url: citilinkGraphite.url });
    expect(offers).toHaveLength(1);
    expect(offers[0]).toMatchObject({
      source: "Ситилинк",
      url: citilinkGraphite.url,
      price: 7_980,
      demo: false,
    });
  });

  it("drops brand-only WB mice and hobby/feed sellers for MX Master 3S", async () => {
    const callTool = vi.fn<MarketplaceToolCaller["callTool"]>(async () => ({
      items: [
        {
          nm_id: 361,
          name: "Мышь проводная Logitech",
          brand: "Logitech",
          supplier: "ЛИНЗЛАБ",
          price_rub: 361,
        },
        {
          nm_id: 461,
          name: "Лакомство для кошек",
          supplier: "KUPI-KORM",
          price_rub: 461,
        },
        {
          nm_id: 423,
          name: "Набор для хобби и творчества",
          entity: "Хобби и творчество",
          supplier: "Хобби и творчество",
          price_rub: 423,
        },
        {
          nm_id: 577,
          name: "Джемпер Stretch jersy",
          entity: "Джемперы",
          supplier: "Stretch jersy",
          price_rub: 577,
        },
        {
          nm_id: 900,
          name: "Мышь беспроводная Logitech MX Master 3S Pale Grey",
          brand: "Logitech",
          supplier: "WB Shop",
          price_rub: 9_490,
        },
      ],
    }));
    const adapter = new McpMarketplaceAdapter({ callTool }, {
      name: "Wildberries",
      tool: "wb_search",
      host: "wildberries.ru",
      kind: "wb",
    });
    const offers = await adapter.search(paleGrey);
    expect(offers).toHaveLength(1);
    expect(offers[0]).toMatchObject({
      source: "Wildberries",
      title: "Мышь беспроводная Logitech MX Master 3S Pale Grey",
      price: 9_490,
      demo: false,
    });
  });

  const k380: Product = {
    id: "logitech-k380-grey",
    brand: "Logitech",
    model: "K380",
    name: "Клавиатура беспроводная Logitech K380 Grey",
    mpn: "920-007584",
    category: "Клавиатуры",
    characteristics: {},
  };

  it("derives strong identity from the selected K380, not leftover MX Master tokens", () => {
    const { strong, weak } = productIdentityTokens(k380);
    expect(strong).toEqual(expect.arrayContaining(["k380"]));
    expect(strong.some((token) => token.includes("920007584") || token.includes("920-007584"))).toBe(true);
    expect(strong).not.toEqual(expect.arrayContaining(["mx", "master", "3s", "g102"]));
    expect(weak).toContain("logitech");
    expect(assessMarketplaceOfferRelevance("Клавиатура Logitech K-380 Grey", undefined, undefined, k380, "wb").kind).toBe(
      "strong",
    );
    expect(assessMarketplaceOfferRelevance("Клавиатура Logitech K380s Multi-Device", undefined, undefined, k380, "wb").kind).toBe(
      "strong",
    );
    expect(assessMarketplaceOfferRelevance("Клавиатура Logitech Bluetooth серая", undefined, undefined, k380, "wb").kind).toBe(
      "weak",
    );
    expect(assessMarketplaceOfferRelevance("Клавиатура беспроводная logitech", undefined, undefined, k380, "wb").kind).toBe(
      "weak",
    );
    expect(assessMarketplaceOfferRelevance("Клавиатура Logitech К 380 Grey", undefined, undefined, k380, "wb").kind).toBe(
      "strong",
    );
    expect(assessMarketplaceOfferRelevance("Клавиатура Logitech K 380", undefined, undefined, k380, "wb").kind).toBe(
      "strong",
    );
    expect(assessMarketplaceOfferRelevance("Кофе молотый Jacobs", undefined, undefined, k380, "wb", "Jacobs", "Jacobs").kind).toBe(
      "drop",
    );
    expect(assessMarketplaceOfferRelevance("Мышь беспроводная Logitech M185", undefined, undefined, k380, "wb").kind).toBe(
      "drop",
    );
    expect(assessMarketplaceOfferRelevance("Клавиатура Logitech K120", undefined, undefined, k380, "wb").kind).toBe(
      "drop",
    );
    for (const junk of [
      "Подгузники трусики COMFORT CARE 4 размер L 9-14 кг GIGA 70шт",
      "Кресло складное для рыбалки туристическое",
      "Аргинин аминокислоты AAKG 1000 мг",
      "Кроссовки спортивные на платформе",
      "Влажные детские салфетки ДПантенол Зайка 6х120 шт с клапаном",
      "Кофе в зернах 1 кг Арабика Премиум Premium",
      "Носки высокие из хлопка набор 10 пар",
    ]) {
      expect(assessMarketplaceOfferRelevance(junk, undefined, undefined, k380, "wb").kind).toBe("drop");
    }
    expect(productIdentityTokens(paleGrey).strong).toEqual(expect.arrayContaining(["master", "3s"]));
    expect(productIdentityTokens(paleGrey).strong).not.toContain("k380");
  });

  it("keeps real K380 keyboard cards instead of dropping the whole WB page", async () => {
    const keyboards = [
      "Клавиатура беспроводная Logitech K380 Grey",
      "Клавиатура Logitech K-380 Bluetooth серая",
      "Logitech K380s Multi-Device Grey",
      "Клавиатура Logitech K380 Multi-Device",
      "Клавиатура Logitech Bluetooth серая",
      "Клавиатура беспроводная logitech",
      "Клавиатура Logitech К 380 Grey",
    ];
    const callTool = vi.fn<MarketplaceToolCaller["callTool"]>(async () => ({
      items: [
        ...keyboards.map((name, index) => ({
          nm_id: 2000 + index,
          name,
          brand: "Logitech",
          entity: "Клавиатуры",
          price_rub: 2_200 + index,
        })),
        {
          nm_id: 1,
          name: "Кофе молотый Jacobs Monarch 230 г",
          brand: "Jacobs",
          entity: "Кофе",
          price_rub: 289,
        },
        {
          nm_id: 2,
          name: "Подгузники трусики COMFORT CARE 4 размер L 9-14 кг GIGA 70шт",
          brand: "MOMI",
          entity: "Подгузники детские",
          price_rub: 1_490,
        },
        {
          nm_id: 3,
          name: "Мышь беспроводная Logitech M185",
          brand: "Logitech",
          entity: "Мыши",
          price_rub: 990,
        },
      ],
    }));
    const adapter = new McpMarketplaceAdapter({ callTool }, {
      name: "Wildberries",
      tool: "wb_search",
      host: "wildberries.ru",
      kind: "wb",
    });
    const offers = await adapter.search(k380);
    expect(callTool).toHaveBeenCalledWith("wb_search", {
      query: k380.name,
      dest: "-1257786",
      page: 1,
    });
    expect(offers).toHaveLength(keyboards.length);
    expect(offers.every((offer) => /клавиатур|k[- ]?380/i.test(offer.title))).toBe(true);
    expect(offers.some((offer) => /кофе|подгузник|мышь/i.test(offer.title))).toBe(false);
  });

  it("sends Avito the product title with /all + computer category, not leftover MX Master", async () => {
    const callTool = vi.fn<MarketplaceToolCaller["callTool"]>(async () => ({
      items: Array.from({ length: 8 }, (_, index) => ({
        title: `Клавиатура Logitech K380 Grey ${index + 1}`,
        price_rub: 2_000 + index,
        url: `https://www.avito.ru/all/tovary/k380-${index + 1}`,
      })),
    }));
    const adapter = new McpMarketplaceAdapter({ callTool }, {
      name: "Авито",
      tool: "avito_search",
      host: "avito.ru",
      kind: "avito",
    });
    const offers = await adapter.search(k380);
    expect(callTool).toHaveBeenCalledTimes(1);
    expect(callTool).toHaveBeenCalledWith("avito_search", {
      query: k380.name,
      page: 1,
      location_id: AVITO_LOCATION_ALL,
      category_id: AVITO_CATEGORY_COMPUTER,
    });
    expect(offers).toHaveLength(8);
    expect(marketplaceSearchQueries(k380, "avito")[0]).toBe(k380.name);
    expect(marketplaceSearchQueries(k380, "avito").join(" ")).not.toMatch(/mx master/i);
  });

  it("fetches one extra Avito page when the first page is tiny", async () => {
    const callTool = vi.fn<MarketplaceToolCaller["callTool"]>(async (_name, args) => {
      if (args.page === 2) {
        return {
          items: [
            {
              title: "Клавиатура Logitech K380 page2",
              price_rub: 2_400,
              url: "https://www.avito.ru/all/tovary/k380-p2",
            },
          ],
        };
      }
      return {
        items: [
          {
            title: "Клавиатура Logitech K380 Grey",
            price_rub: 2_200,
            url: "https://www.avito.ru/all/tovary/k380-1",
          },
          {
            title: "Logitech K-380 bluetooth",
            price_rub: 2_300,
            url: "https://www.avito.ru/all/tovary/k380-2",
          },
        ],
      };
    });
    const adapter = new McpMarketplaceAdapter({ callTool }, {
      name: "Авито",
      tool: "avito_search",
      host: "avito.ru",
      kind: "avito",
    });
    const offers = await adapter.search(k380);
    expect(callTool).toHaveBeenCalledTimes(2);
    expect(callTool.mock.calls[1]?.[1]).toMatchObject({
      query: k380.name,
      page: 2,
      location_id: AVITO_LOCATION_ALL,
      category_id: AVITO_CATEGORY_COMPUTER,
    });
    expect(offers).toHaveLength(3);
  });

  it("does not request Avito page 2 after a 439 on the extra page", async () => {
    process.env.AVITO_POW_RETRY_MS = "0";
    const callTool = vi.fn<MarketplaceToolCaller["callTool"]>(async (_name, args) => {
      if (args.page === 2) throw new Error("HTTP 439 via cdp");
      return {
        items: [
          {
            title: "Клавиатура Logitech K380 Grey",
            price_rub: 2_200,
            url: "https://www.avito.ru/all/tovary/k380-1",
          },
        ],
      };
    });
    const adapter = new McpMarketplaceAdapter({ callTool }, {
      name: "Авито",
      tool: "avito_search",
      host: "avito.ru",
      kind: "avito",
    });
    const offers = await adapter.search(k380);
    expect(offers).toHaveLength(1);
    expect(callTool).toHaveBeenCalledTimes(2);
    delete process.env.AVITO_POW_RETRY_MS;
  });
});

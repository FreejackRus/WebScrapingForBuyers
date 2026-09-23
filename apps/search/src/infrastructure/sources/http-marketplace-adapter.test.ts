import type { Product } from "@peremena/contracts";
import { afterEach, describe, expect, it, vi } from "vitest";

import { WB_CATALOG_UNAVAILABLE_403 } from "./mcp-marketplace-adapter.js";
import { WildberriesHttpAdapter, toWbOffer, wbHttpSearchUrl } from "./http-marketplace-adapter.js";
import { noteWbRateLimited, resetWbRateLimitForTests } from "./wb-rate-limit.js";

const g102: Product = {
  id: "logitech-g102-black",
  brand: "Logitech",
  model: "G102 Lightsync",
  name: "Мышь проводная Logitech G102 Lightsync Black",
  mpn: "910-005823",
  category: "Мыши",
  characteristics: {},
};

afterEach(() => {
  resetWbRateLimitForTests();
  vi.unstubAllGlobals();
});

describe("WildberriesHttpAdapter", () => {
  it("throws a short rate-limit error on HTTP 429 instead of returning empty", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(null, { status: 429 })),
    );
    await expect(new WildberriesHttpAdapter().search(g102)).rejects.toThrow(/WB: лимит запросов/);
  });

  it("does not hit search.wb.ru while the cooldown is active", async () => {
    noteWbRateLimited();
    const fetch = vi.fn();
    vi.stubGlobal("fetch", fetch);
    await expect(new WildberriesHttpAdapter().search(g102)).rejects.toThrow(/лимит запросов/);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("stops on HTTP 403 without trying another catalog version", async () => {
    const fetch = vi.fn(async (_input: RequestInfo | URL) => new Response(null, { status: 403 }));
    vi.stubGlobal("fetch", fetch);
    await expect(new WildberriesHttpAdapter().search(g102)).rejects.toThrow(WB_CATALOG_UNAVAILABLE_403);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(String(fetch.mock.calls[0]?.[0])).toBe(wbHttpSearchUrl(g102.name, "v9"));
  });

  it("uses the official SERP query and can read a later catalog version after empty v9", async () => {
    const k380: Product = {
      id: "logitech-k380-grey",
      brand: "Logitech",
      model: "K380",
      name: "Клавиатура беспроводная Logitech K380 Grey",
      mpn: "920-007584",
      category: "Клавиатуры",
      characteristics: {},
    };
    const fetch = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes("/v9/search")) {
        return new Response(JSON.stringify({ products: [] }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      return new Response(
        JSON.stringify({
          products: [
            {
              id: 88,
              name: "Клавиатура беспроводная Logitech K380 Grey",
              brand: "Logitech",
              sizes: [{ price: { product: 229_000 } }],
            },
          ],
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      );
    });
    vi.stubGlobal("fetch", fetch);
    const offers = await new WildberriesHttpAdapter().search(k380);
    expect(offers).toHaveLength(1);
    expect(offers[0]?.title).toMatch(/K380/i);
    expect(String(fetch.mock.calls[0]?.[0])).toBe(wbHttpSearchUrl(k380.name, "v9"));
    expect(String(fetch.mock.calls[1]?.[0])).toContain("/v14/search");
  });
});

describe("toWbOffer", () => {
  it("reads v9 catalog prices from sizes and keeps REAL Wildberries url", () => {
    const offer = toWbOffer(
      {
        id: 1_317_494_381,
        name: "Проводная игровая мышь G102 LightSync Black",
        supplier: "WB Shop",
        salePriceU: null,
        priceU: null,
        sizes: [{ price: { basic: 199_000, product: 134_400 } }],
      },
      g102,
      0,
    );
    expect(offer).toMatchObject({
      source: "Wildberries",
      title: "Проводная игровая мышь G102 LightSync Black",
      price: 1_344,
      demo: false,
    });
    expect(offer?.url).toContain("wildberries.ru/catalog/1317494381");
  });

  it("drops foreign-category WB catalog junk for a mouse query", () => {
    expect(
      toWbOffer(
        {
          id: 11,
          name: "Кофе молотый Jacobs Monarch 230 г",
          brand: "Jacobs",
          entity: "Кофе",
          sizes: [{ price: { product: 28_900 } }],
        },
        g102,
        0,
      ),
    ).toBeUndefined();
    expect(
      toWbOffer(
        {
          id: 22,
          name: "Носки мужские набор 10 пар",
          entity: "Носки",
          sizes: [{ price: { product: 19_900 } }],
        },
        g102,
        1,
      ),
    ).toBeUndefined();
    expect(
      toWbOffer(
        {
          id: 33,
          name: "Кроссовки беговые мужские",
          entity: "Кроссовки",
          sizes: [{ price: { product: 249_000 } }],
        },
        g102,
        2,
      ),
    ).toBeUndefined();
  });

  it("does not keep a generic mouse or copy the MPN onto it", () => {
    const offer = toWbOffer(
      {
        id: 44,
        name: "Мышь оптическая беспроводная",
        entity: "Мыши",
        sizes: [{ price: { product: 36_100 } }],
      },
      g102,
      0,
    );
    expect(offer).toBeUndefined();
  });

  it("keeps a real MX Master 3S card for a Pale Grey selection", () => {
    const paleGrey: Product = {
      ...g102,
      id: "logitech-mx-master-3s-pale-grey",
      model: "MX Master 3S",
      name: "Мышь беспроводная Logitech MX Master 3S Pale Grey",
      mpn: "910-006560",
    };
    expect(
      toWbOffer(
        {
          id: 55,
          name: "Мышь проводная Logitech",
          brand: "Logitech",
          supplier: "ЛИНЗЛАБ",
          sizes: [{ price: { product: 36_100 } }],
        },
        paleGrey,
        0,
      ),
    ).toBeUndefined();
    const offer = toWbOffer(
      {
        id: 66,
        name: "Мышь беспроводная Logitech MX Master 3S",
        brand: "Logitech",
        sizes: [{ price: { product: 949_000 } }],
      },
      paleGrey,
      1,
    );
    expect(offer).toMatchObject({
      source: "Wildberries",
      title: "Мышь беспроводная Logitech MX Master 3S",
      demo: false,
    });
  });

  it("keeps a K380 keyboard card and does not require leftover MX Master tokens", () => {
    const k380: Product = {
      id: "logitech-k380-grey",
      brand: "Logitech",
      model: "K380",
      name: "Клавиатура беспроводная Logitech K380 Grey",
      mpn: "920-007584",
      category: "Клавиатуры",
      characteristics: {},
    };
    expect(
      toWbOffer(
        {
          id: 77,
          name: "Клавиатура Logitech K-380 Grey Bluetooth",
          brand: "Logitech",
          entity: "Клавиатуры",
          sizes: [{ price: { product: 229_000 } }],
        },
        k380,
        0,
      ),
    ).toMatchObject({
      source: "Wildberries",
      title: "Клавиатура Logitech K-380 Grey Bluetooth",
      demo: false,
    });
    expect(
      toWbOffer(
        {
          id: 78,
          name: "Клавиатура Logitech Bluetooth серая",
          brand: "Logitech",
          entity: "Клавиатуры",
          sizes: [{ price: { product: 219_000 } }],
        },
        k380,
        1,
      ),
    ).toMatchObject({
      source: "Wildberries",
      title: "Клавиатура Logitech Bluetooth серая",
      demo: false,
    });
    expect(
      toWbOffer(
        {
          id: 79,
          name: "Кофе молотый Jacobs Monarch 230 г",
          brand: "Jacobs",
          entity: "Кофе",
          sizes: [{ price: { product: 28_900 } }],
        },
        k380,
        2,
      ),
    ).toBeUndefined();
    expect(
      toWbOffer(
        {
          id: 80,
          name: "Мышь беспроводная Logitech M185",
          brand: "Logitech",
          entity: "Мыши",
          sizes: [{ price: { product: 99_000 } }],
        },
        k380,
        3,
      ),
    ).toBeUndefined();
  });
});

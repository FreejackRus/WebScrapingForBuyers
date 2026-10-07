import { afterEach, describe, expect, it, vi } from "vitest";

import { searchNetlab } from "./netlab-client.js";

const product = {
  id: "logitech-g102",
  brand: "Logitech",
  model: "G102",
  name: "Logitech G102",
  mpn: "910-005823",
  category: "Мыши",
  characteristics: {},
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("searchNetlab", () => {
  it("returns the shared per-source limit when every row already has a price", async () => {
    const goods = Array.from({ length: 40 }, (_, index) => ({
      id: `goods-${index}`,
      name: `Logitech G102 вариант ${index}`,
      price: 2_000 + index,
    }));
    const fetch = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes("/authentication/token.json")) {
        return new Response(JSON.stringify({ data: { token: "token" } }), { status: 200 });
      }
      if (url.includes("/catalogsZip/getGoodsSearch/")) {
        return new Response(JSON.stringify({ data: { goods } }), { status: 200 });
      }
      throw new Error(`Unexpected URL: ${url}`);
    });
    vi.stubGlobal("fetch", fetch);

    const offers = await searchNetlab(
      { baseUrl: "https://netlab.example", username: "user", password: "secret" },
      product,
    );

    expect(offers).toHaveLength(30);
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it("looks past priceless rows while keeping detail lookups capped", async () => {
    const goods = [
      ...Array.from({ length: 12 }, (_, index) => ({
        id: `priceless-${index}`,
        name: `Logitech G102 без цены ${index}`,
      })),
      ...Array.from({ length: 30 }, (_, index) => ({
        id: `priced-${index}`,
        name: `Logitech G102 с ценой ${index}`,
        price: 2_000 + index,
      })),
    ];
    const fetch = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes("/authentication/token.json")) {
        return new Response(JSON.stringify({ data: { token: "token" } }), { status: 200 });
      }
      if (url.includes("/catalogsZip/getGoodsSearch/")) {
        return new Response(JSON.stringify({ data: { goods } }), { status: 200 });
      }
      if (url.includes("/catalogsZip/goodsByUid/")) {
        return new Response(JSON.stringify({ data: { goods: [] } }), { status: 200 });
      }
      throw new Error(`Unexpected URL: ${url}`);
    });
    vi.stubGlobal("fetch", fetch);

    const offers = await searchNetlab(
      { baseUrl: "https://netlab.example", username: "user", password: "secret" },
      product,
    );

    expect(offers).toHaveLength(30);
    expect(fetch).toHaveBeenCalledTimes(14);
  });
});

import type { Offer } from "@peremena/contracts";
import { afterEach, describe, expect, it, vi } from "vitest";

import { assessOffer } from "./offer-assessment.js";
import { extractMpn, inferCategory, productFromQuery, splitBrandModel } from "./product-from-query.js";
import {
  duckDuckGoSuggestUrl,
  googleSuggestUrl,
  suggestLiveProducts,
  yandexSuggestUrl,
} from "../infrastructure/suggest/live-suggest.js";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("productFromQuery", () => {
  it("builds an ephemeral product from a free-text suggestion", () => {
    const product = productFromQuery("ноутбук dell latitude 5540");
    expect(product.brand.toLocaleLowerCase("ru")).toContain("dell");
    expect(product.category).toBe("Ноутбуки");
    expect(product.name.toLocaleLowerCase("ru")).toContain("latitude");
    expect(product.id.startsWith("suggest-")).toBe(true);
  });

  it("extracts Logitech-style MPN", () => {
    expect(extractMpn("Logitech MX Master 910-006559")).toBe("910-006559");
    expect(inferCategory("клавиатура logitech k380")).toBe("Клавиатуры");
    expect(inferCategory("lenovo legion pro 5")).toBe("Ноутбуки");
  });

  it("distinguishes the Lenovo Legion Go handheld from Legion laptops", () => {
    expect(inferCategory("Lenovo Legion Go")).toBe("Игровые консоли");
    expect(inferCategory("Lenovo Legion Pro 5")).toBe("Ноутбуки");
  });

  it("normalizes Pantum aliases without putting query conditions into the model", () => {
    const product = productFromQuery("картридж пантум TL-5120 оригинальный 3000 страниц");
    expect(product.brand).toBe("Pantum");
    expect(product.model).toBe("TL-5120");
    expect(product.mpn).toBe("TL-5120");
  });

  it("keeps RAM layout and toner yield conditions out of the generated model", () => {
    expect(productFromQuery("Kingston Fury Beast 2x16 GB").model).toBe("Fury Beast");
    expect(productFromQuery("картридж Pantum TL-5120 ресурс 3000 страниц").model).toBe("TL-5120");
  });

  it("keeps bounded origin and compatibility phrases out of the generated model", () => {
    expect(splitBrandModel("Pantum TL-5120 оригинальная").model).toBe("TL-5120");
    expect(splitBrandModel("Pantum TL-5120 original").model).toBe("TL-5120");
    expect(splitBrandModel("Pantum TL-5120 OEM").model).toBe("TL-5120");
    expect(splitBrandModel("Pantum TL-5120 compatible").model).toBe("TL-5120");
  });

  it("lets offer assessment check RAM conditions after matching the generated model", () => {
    const query = "Kingston Fury Beast 2x16 GB";
    const assessed = assessOffer(
      productFromQuery(query),
      {
        id: "ram",
        source: "WB",
        seller: "Магазин",
        title: "Kingston Fury Beast 32 GB",
        price: 1000,
        priceCondition: "Обычная цена",
        currency: "RUB",
        availability: "В наличии",
        condition: "new",
        match: "exact",
        url: "https://example.test/ram",
        fetchedAt: new Date(0).toISOString(),
        demo: false,
      } as Offer,
      query,
    );

    expect(assessed?.assessment).toEqual({
      group: "needs_review",
      reasons: expect.arrayContaining(["Количество в комплекте не указано"]),
    });
  });

  it("recognizes multiword brands and does not invent an unknown brand", () => {
    expect(splitBrandModel("принтер Hewlett Packard LaserJet M404dn")).toEqual({
      brand: "Hewlett Packard",
      model: "LaserJet M404dn",
    });
    expect(splitBrandModel("картридж Super Cartridge TL-5120")).toEqual({
      brand: "",
      model: "Super Cartridge TL-5120",
    });
    expect(splitBrandModel("SSD кингстон NV3 1 ТБ оригинальный")).toEqual({ brand: "Kingston", model: "NV3" });
    expect(splitBrandModel("картридж NV Print TL-5120 совместимый")).toEqual({
      brand: "NV Print",
      model: "TL-5120",
    });
    expect(splitBrandModel("SSD Samsung 990 PRO 2 ТБ")).toEqual({ brand: "Samsung", model: "990 PRO" });
    expect(splitBrandModel("картридж Pantum 5120")).toEqual({ brand: "Pantum", model: "5120" });
  });

  it("keeps the complete alphanumeric MPN instead of its numeric fragment", () => {
    expect(extractMpn("Картридж Pantum TL-5120")).toBe("TL-5120");
  });
});

describe("suggestLiveProducts", () => {
  it("merges Google phrases and does not use the static catalog", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL) => {
        const url = String(input);
        if (url.includes("suggestqueries.google.com")) {
          return new Response(JSON.stringify(["logitech", ["logitech mx master 3s", "logitech mx keys"]]), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        }
        if (url.includes("duckduckgo.com") || url.includes("yandex.ru") || url.includes("icecat")) {
          return new Response(JSON.stringify(["q", []]), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        }
        return new Response("{}", { status: 404 });
      }),
    );
    const products = await suggestLiveProducts("logitech mx", 5);
    expect(products.length).toBeGreaterThanOrEqual(2);
    expect(products.some((item) => /master/i.test(item.name))).toBe(true);
    expect(products.every((item) => !item.id.startsWith("logitech-"))).toBe(true);
    expect(googleSuggestUrl("logitech mx")).toContain("suggestqueries.google.com");
    expect(duckDuckGoSuggestUrl("logitech mx")).toContain("duckduckgo.com/ac");
    expect(yandexSuggestUrl("logitech mx")).toContain("yandex.ru/suggest");
  });

  it("uses DuckDuckGo when Google fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL) => {
        const url = String(input);
        if (url.includes("suggestqueries.google.com")) return new Response(null, { status: 403 });
        if (url.includes("duckduckgo.com/ac")) {
          return new Response(JSON.stringify(["ssd", ["ssd kingston nv2", "ssd samsung 990"]]), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        }
        if (url.includes("yandex.ru") || url.includes("icecat")) {
          return new Response(JSON.stringify(["q", []]), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        }
        return new Response("{}", { status: 404 });
      }),
    );
    const products = await suggestLiveProducts("ssd kingston", 5);
    expect(products.some((item) => /kingston/i.test(item.name))).toBe(true);
    expect(products.some((item) => item.characteristics.источник === "duckduckgo")).toBe(true);
  });
});

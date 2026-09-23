import { afterEach, describe, expect, it, vi } from "vitest";

import { extractMpn, inferCategory, productFromQuery } from "./product-from-query.js";
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

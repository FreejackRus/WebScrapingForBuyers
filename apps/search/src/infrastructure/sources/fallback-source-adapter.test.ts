import type { Offer, Product } from "@peremena/contracts";
import { describe, expect, it, vi } from "vitest";

import type { SourceAdapter } from "../../domain/source-adapter.js";
import { FallbackSourceAdapter } from "./fallback-source-adapter.js";

const product: Product = {
  id: "test",
  brand: "Logitech",
  model: "MX Master 3S",
  name: "Logitech MX Master 3S",
  mpn: "910-006559",
  category: "Мыши",
  characteristics: {},
};

const offer: Offer = {
  id: "real",
  source: "DNS",
  seller: "DNS",
  title: product.name,
  price: 8_000,
  priceCondition: "Публичная цена",
  currency: "RUB",
  availability: "В наличии",
  condition: "new",
  match: "probable",
  url: "https://example.com",
  fetchedAt: new Date().toISOString(),
  demo: false,
};

describe("FallbackSourceAdapter", () => {
  it("uses the next adapter after a transport error", async () => {
    const failing: SourceAdapter = {
      name: "DNS",
      search: async () => {
        throw new Error("blocked");
      },
    };
    const fallback: SourceAdapter = {
      name: "DNS",
      search: async () => [offer],
    };

    const source = new FallbackSourceAdapter("DNS", [failing, fallback]);
    await expect(source.search(product)).resolves.toEqual([offer]);
  });

  it("does not fall through after a DNS Qrator/429 block", async () => {
    const failing: SourceAdapter = {
      name: "DNS",
      search: async () => {
        throw new Error("HTTP 401 Qrator");
      },
    };
    const fallback: SourceAdapter = {
      name: "DNS",
      search: async () => [offer],
    };

    const source = new FallbackSourceAdapter("DNS", [failing, fallback]);
    await expect(source.search(product)).rejects.toThrow(/401 Qrator/);
  });

  it("does not HTTP-fallback after WB MCP 429", async () => {
    const failing: SourceAdapter = {
      name: "Wildberries",
      search: async () => {
        throw new Error("WB rate-limited (429). Подождите и повторите поиск.");
      },
    };
    const fallback: SourceAdapter = {
      name: "Wildberries",
      search: vi.fn(async () => [offer]),
    };

    const source = new FallbackSourceAdapter("Wildberries", [failing, fallback]);
    await expect(source.search(product)).rejects.toThrow(/WB rate-limited/);
    expect(fallback.search).not.toHaveBeenCalled();
  });

  it("does not HTTP-fallback after a live WB empty-catalog error", async () => {
    const failing: SourceAdapter = {
      name: "Wildberries",
      search: async () => {
        throw new Error("WB: пустой каталог после живого ответа MCP. Повторите поиск один раз.");
      },
    };
    const fallback: SourceAdapter = {
      name: "Wildberries",
      search: vi.fn(async () => [offer]),
    };

    const source = new FallbackSourceAdapter("Wildberries", [failing, fallback]);
    await expect(source.search(product)).rejects.toThrow(/пустой каталог/);
    expect(fallback.search).not.toHaveBeenCalled();
  });

  it("does not HTTP-fallback when WB MCP already returned empty", async () => {
    const empty: SourceAdapter = {
      name: "Wildberries",
      search: async () => [],
    };
    const fallback: SourceAdapter = {
      name: "Wildberries",
      search: vi.fn(async () => [offer]),
    };

    const source = new FallbackSourceAdapter("Wildberries", [empty, fallback]);
    await expect(source.search(product)).resolves.toEqual([]);
    expect(fallback.search).not.toHaveBeenCalled();
  });

  it("HTTP-fallbacks WB once after a stale search-goods category clash", async () => {
    const failing: SourceAdapter = {
      name: "Wildberries",
      search: async () => {
        throw new Error(
          "WB: каталог MCP недоступен (search-goods fallback), карточки чужой категории.",
        );
      },
    };
    const fallback: SourceAdapter = {
      name: "Wildberries",
      search: async () => [offer],
    };

    const source = new FallbackSourceAdapter("Wildberries", [failing, fallback]);
    await expect(source.search(product)).resolves.toEqual([offer]);
  });

  it("does not HTTP-fallback after a live WB model-drop", async () => {
    const failing: SourceAdapter = {
      name: "Wildberries",
      search: async () => {
        throw new Error("WB: MCP вернул 28 карточек, все отсеяны по модели.");
      },
    };
    const fallback: SourceAdapter = {
      name: "Wildberries",
      search: vi.fn(async () => [offer]),
    };

    const source = new FallbackSourceAdapter("Wildberries", [failing, fallback]);
    await expect(source.search(product)).rejects.toThrow(/отсеяны по модели/);
    expect(fallback.search).not.toHaveBeenCalled();
  });

  it("HTTP-fallbacks WB only when MCP is down without a rate-limit", async () => {
    const failing: SourceAdapter = {
      name: "Wildberries",
      search: async () => {
        throw new Error("MCP connection refused");
      },
    };
    const fallback: SourceAdapter = {
      name: "Wildberries",
      search: async () => [offer],
    };

    const source = new FallbackSourceAdapter("Wildberries", [failing, fallback]);
    await expect(source.search(product)).resolves.toEqual([offer]);
  });

  it("reports all errors when every adapter fails", async () => {
    const sources: SourceAdapter[] = ["MCP blocked", "Apify failed"].map((message) => ({
      name: "DNS",
      search: async () => {
        throw new Error(message);
      },
    }));

    const source = new FallbackSourceAdapter("DNS", sources);
    await expect(source.search(product)).rejects.toThrow("MCP blocked → fallback: Apify failed");
  });
});

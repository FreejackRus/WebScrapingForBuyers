import type { Offer, SearchSnapshot } from "@peremena/contracts";
import { describe, expect, it } from "vitest";

import { analyzeSnapshot } from "./application/analyze.js";
import type { AnalysisNarration } from "./domain/analysis-narrator.js";
import { toExplanationRow } from "./infrastructure/ollama-analysis-narrator.js";

function offer(overrides: Partial<Offer> & Pick<Offer, "id" | "source" | "price" | "demo">): Offer {
  return {
    seller: overrides.source,
    title: "MX Master 3S",
    priceCondition: "Обычная цена",
    currency: "RUB",
    availability: "В наличии",
    warranty: "12 месяцев",
    condition: "new",
    match: "exact",
    url: `https://example.com/${overrides.id}`,
    fetchedAt: new Date().toISOString(),
    ...overrides,
  };
}

const product: SearchSnapshot["product"] = {
  id: "p1",
  brand: "Logitech",
  model: "MX Master 3S",
  name: "MX Master 3S",
  mpn: "910-006559",
  category: "Мыши",
  characteristics: {},
};

function snapshot(offers: Offer[], status: SearchSnapshot["status"] = "complete"): SearchSnapshot {
  return {
    id: "s1",
    query: "MX Master",
    product,
    status,
    sources: [],
    offers,
  };
}

const demoCheap = offer({ id: "demo-merlion", source: "MERLION", price: 100, demo: true });
const wbReal = offer({
  id: "wb-real",
  source: "Wildberries",
  seller: "Marketplace",
  price: 8_990,
  demo: false,
  url: "https://www.wildberries.ru/catalog/123",
});
const citilinkReal = offer({
  id: "citilink-real",
  source: "Ситилинк",
  seller: "Ситилинк",
  price: 9_490,
  demo: false,
  url: "https://www.citilink.ru/product/456",
});

describe("analyzeSnapshot", () => {
  it("selects exact guaranteed offers", async () => {
    const result = await analyzeSnapshot(
      snapshot([offer({ id: "test-offer", source: "TEST", price: 1_000, demo: false })]),
      "Выбери три точных предложения с гарантией",
    );
    expect(result.selectedOfferIds).toEqual(["test-offer"]);
  });

  it("drops cheaper demo rows from ranking when real marketplace offers exist", async () => {
    const result = await analyzeSnapshot(
      snapshot([demoCheap, wbReal, citilinkReal]),
      "Оцени риски поставщика и сроки доставки в Воронеж",
    );
    expect(result.selectedOfferIds).toEqual(["wb-real"]);
    expect(result.appliedFilters).toEqual(
      expect.arrayContaining([
        "В снимке поиска «MX Master»: 3 предложений (2 реальных, 1 демо).",
        "Демо-цены исключены из ранжирования (1 строка).",
        "Сортировка по возрастанию цены.",
        "Отобрано top-1: Wildberries, 8 990 ₽, Marketplace.",
      ]),
    );
  });

  it("keeps demo rows only when the prompt asks for them", async () => {
    const result = await analyzeSnapshot(
      snapshot([demoCheap, wbReal]),
      "Сравни включая демо и укажи разрыв цен",
    );
    expect(result.selectedOfferIds[0]).toBe("demo-merlion");
    expect(result.appliedFilters.some((item) => item.includes("Демо-строки оставлены"))).toBe(true);
  });

  it("keeps compare-real prompts as a table filter over all matching rows", async () => {
    const result = await analyzeSnapshot(
      snapshot([demoCheap, citilinkReal, wbReal]),
      "Сравни только реальные предложения и укажи разрыв цен",
    );
    expect(result.intent).toBe("filter");
    expect(result.selectedOfferIds).toEqual(["wb-real", "citilink-real"]);
    expect(result.tableFilter).toEqual({ realOnly: true });
  });

  it("sends the ranked real table to the narrator, not only the prompt", async () => {
    let seen: AnalysisNarration | undefined;
    const result = await analyzeSnapshot(
      snapshot([demoCheap, citilinkReal, wbReal]),
      "Сравни только реальные предложения и укажи разрыв цен",
      {
        name: "mock",
        summarize: async (input) => {
          seen = input;
          return { summary: "объяснение по таблице", warnings: [] };
        },
      },
    );
    expect(result.summary).toBe("объяснение по таблице");
    expect(seen?.rankedOffers.map((item) => item.id)).toEqual(["wb-real", "citilink-real"]);
    expect(seen?.selectedOfferIds).toEqual(["wb-real", "citilink-real"]);
    expect(seen?.rankedOffers.every((item) => item.demo === false && item.url.length > 0)).toBe(true);
  });

  it("filters the table to real Wildberries under 6000 and cites the URL", async () => {
    const cheapWb = offer({
      id: "wb-cheap",
      source: "Wildberries",
      seller: "LogiStore",
      price: 4_890,
      demo: false,
      url: "https://www.wildberries.ru/catalog/cheap",
    });
    const result = await analyzeSnapshot(
      snapshot([demoCheap, cheapWb, wbReal, citilinkReal]),
      "Оставь только реальные WB дешевле 6000",
    );
    expect(result.intent).toBe("filter");
    expect(result.selectedOfferIds).toEqual(["wb-cheap"]);
    expect(result.tableFilter).toEqual({
      realOnly: true,
      sources: ["Wildberries"],
      maxPrice: 6000,
    });
    expect(result.citations?.[0]).toMatchObject({
      offerId: "wb-cheap",
      url: "https://www.wildberries.ru/catalog/cheap",
    });
    expect(result.citations?.[0]?.label).toContain("открыть");
  });

  it("treats «выдай только вб» as a real Wildberries table filter", async () => {
    const result = await analyzeSnapshot(
      snapshot([demoCheap, citilinkReal, wbReal]),
      "выдай только вб",
    );
    expect(result.intent).toBe("filter");
    expect(result.selectedOfferIds).toEqual(["wb-real"]);
    expect(result.tableFilter).toEqual({
      realOnly: true,
      sources: ["Wildberries"],
    });
  });

  it("returns search intent so the client can refine the model", async () => {
    const result = await analyzeSnapshot(snapshot([wbReal]), "Уточни модель G102");
    expect(result.intent).toBe("search");
    expect(result.searchQuery).toBe("G102");
    expect(result.tableFilter).toBeUndefined();
  });

  it("warns when analysis runs before the search snapshot is complete", async () => {
    const result = await analyzeSnapshot(
      snapshot([wbReal], "running"),
      "Выбери лучшее предложение",
    );
    expect(result.warnings).toContain(
      "Сбор ещё идёт — анализ смотрит только уже загруженные строки таблицы.",
    );
  });
});

describe("toExplanationRow", () => {
  it("keeps source, price, demo, seller and url for the model", () => {
    expect(toExplanationRow(wbReal, true)).toMatchObject({
      source: "Wildberries",
      price: 8_990,
      demo: false,
      seller: "Marketplace",
      url: "https://www.wildberries.ru/catalog/123",
      selected: true,
    });
  });
});

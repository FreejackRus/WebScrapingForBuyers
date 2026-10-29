import { describe, expect, it } from "vitest";

import { matchesWildcardArticle, parseWildcardArticle, wildcardArticleOf, WILDCARD_CHARACTERISTIC } from "./wildcard-article.js";

// Buyer's request 2026-10-28: Epson ink differs by one digit per colour, «С13Т673*4А» should bring all of them.
describe("parseWildcardArticle", () => {
  it("reads a Cyrillic-typed article with a star and keeps the fixed part for the shops", () => {
    const parsed = parseWildcardArticle("чернила эпсон С13Т673*4А");
    expect(parsed?.pattern).toBe("C13T673*4A");
    expect(parsed?.prefix).toBe("C13T673");
    expect(parsed?.sourceQuery).toBe("чернила эпсон C13T673");
  });

  it("ignores queries without a wildcard or with too little fixed text", () => {
    expect(parseWildcardArticle("Epson C13T67324A")).toBeUndefined();
    expect(parseWildcardArticle("T6*")).toBeUndefined();
    expect(parseWildcardArticle("*")).toBeUndefined();
  });
});

describe("matchesWildcardArticle", () => {
  const parsed = parseWildcardArticle("С13Т673*4А")!;

  it.each([
    ["Чернила Epson C13T67314A T6731 черные 70 мл", true],
    ["Чернила EPSON C13T67324A голубой", true],
    ["Чернила Epson С13Т67354А светло-голубые (кириллица в названии)", true],
    ["Чернила Epson C13 T673 64A light magenta", true],
    ["Чернила Epson C13T67344 желтые без суффикса", false],
    ["Чернила Epson C13T66414A для L100", false],
    ["Чернила совместимые для Epson L800", false],
  ])("%s → %s", (title, expected) => {
    expect(matchesWildcardArticle(parsed, title)).toBe(expected);
  });

  it("treats «?» as exactly one character", () => {
    const one = parseWildcardArticle("C13T673?4A")!;
    expect(matchesWildcardArticle(one, "C13T67324A")).toBe(true);
    expect(matchesWildcardArticle(one, "C13T673244A")).toBe(false);
  });
});

describe("wildcardArticleOf", () => {
  it("reads the pattern a product carries in its characteristics", () => {
    const product = { characteristics: { [WILDCARD_CHARACTERISTIC]: "C13T673*4A" } };
    expect(wildcardArticleOf(product)?.prefix).toBe("C13T673");
    expect(wildcardArticleOf({ characteristics: {} })).toBeUndefined();
  });
});

describe("wildcard search through the pipeline", async () => {
  const { productFromQuery } = await import("./product-from-query.js");
  const { classifyQuery } = await import("./it-scope.js");
  const { assessOffer } = await import("./offer-assessment.js");
  const { assessMarketplaceOfferRelevance } = await import("./marketplace-relevance.js");
  const { productForWildcard } = await import("./wildcard-article.js");

  const query = "чернила эпсон С13Т673*4А";
  const wildcard = parseWildcardArticle(query)!;
  const product = productForWildcard(productFromQuery(wildcard.sourceQuery, "query"), wildcard);
  const offer = (title: string) => ({
    id: title, source: "Ozon", seller: "Ozon", title, price: 900, priceCondition: "Публичная цена",
    currency: "RUB" as const, availability: "В наличии", condition: "new" as const, match: "probable" as const,
    url: "https://www.ozon.ru/product/1", fetchedAt: "2026-10-28T10:00:00Z", demo: false,
  });

  it("passes the IT-only gate, with and without the star", () => {
    expect(classifyQuery(product)).toBe("ok");
    expect(classifyQuery(productFromQuery("чернила эпсон С13Т67324А", "query"))).toBe("ok");
  });

  it("keeps every colour and drops other series in both relevance checks", () => {
    const titles = {
      "Чернила Epson C13T67314A черные 70 мл": true,
      "Чернила Epson C13T67364A светло-пурпурные": true,
      "Чернила Epson C13T66414A для L100": false,
      "Чернила совместимые для Epson L800": false,
    };
    for (const [title, keep] of Object.entries(titles)) {
      expect(assessMarketplaceOfferRelevance(title, undefined, undefined, product).kind).toBe(keep ? "strong" : "drop");
      expect(assessOffer(product, offer(title), query) !== null).toBe(keep);
    }
  });
});

describe("productForTypedQuery", async () => {
  const { productForTypedQuery } = await import("./wildcard-article.js");

  it("builds the same wildcard product a typed search gets, and a plain one otherwise", () => {
    expect(productForTypedQuery("чернила эпсон С13Т673*4А").characteristics[WILDCARD_CHARACTERISTIC]).toBe("C13T673*4A");
    expect(productForTypedQuery("logitech k380").characteristics[WILDCARD_CHARACTERISTIC]).toBeUndefined();
  });
});

describe("third-party ink in a wildcard search", async () => {
  const { assessOffer } = await import("./offer-assessment.js");
  const { productForTypedQuery } = await import("./wildcard-article.js");
  const query = "чернила эпсон С13Т673*4А";
  const product = productForTypedQuery(query);
  const row = (title: string, price: number) => ({
    id: title, source: "NETLAB", seller: "NETLAB", title, price, priceCondition: "", currency: "RUB" as const,
    availability: "В наличии", condition: "new" as const, match: "exact" as const, url: "https://www.netlab.ru/1",
    fetchedAt: "2026-10-29T00:00:00Z", demo: false,
  });

  it("keeps NV Print «для Epson» as an analog behind Epson's own ink", () => {
    expect(assessOffer(product, row("NV Print C13T67324A Чернила NV-INK-T6732C для Epson L800", 69), query)?.match).toBe("analog");
    expect(assessOffer(product, row("EPSON C13T67324A Чернила для L800/1800 (cyan) 70 мл", 1116), query)?.match).toBe("exact");
  });

  it("does not demote it when the buyer asked for compatible ink", () => {
    const compatible = "совместимые чернила эпсон С13Т673*4А";
    expect(assessOffer(productForTypedQuery(compatible), row("NV Print C13T67324A Чернила NV-INK-T6732C для Epson L800", 69), compatible)?.match).toBe("exact");
  });
});

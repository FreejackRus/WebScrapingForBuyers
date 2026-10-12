import type { Offer, SearchSnapshot } from "@peremena/contracts";
import { describe, expect, it } from "vitest";

import type { AnalysisNarrator } from "../domain/analysis-narrator.js";
import { justificationTemplate, justifyPurchase, memoIsGrounded, reviewOffers, understandQuery } from "./ai-tools.js";

const row = (id: string, source: string, price: number, extra: Partial<Offer> = {}): Offer => ({
  id, source, seller: source, title: `Samsung SSD 2Tb 990 PRO M.2 (${id})`, price, priceCondition: "Публичная цена",
  currency: "RUB", availability: "В наличии", condition: "new", match: "probable", url: `https://shop/${id}`,
  fetchedAt: "", demo: false, procurementRank: price, ...extra,
});

const snapshot: SearchSnapshot = {
  id: "s", query: "samsung 990 pro 2тб", status: "complete",
  product: { id: "p", brand: "Samsung", model: "990 pro", name: "samsung 990 pro 2тб", mpn: "", category: "SSD", characteristics: {} },
  sources: [],
  offers: [
    row("a", "NETLAB", 35_234),
    row("b", "Wildberries", 31_900),
    row("r1", "Ozon", 9_000, { title: "Радиатор для SSD 990 PRO", assessment: { group: "needs_review", reasons: ["Модель совпадает", "Объём не указан"] } }),
  ],
};

const fake = (answer: unknown): AnalysisNarrator => ({
  name: "test-llm",
  summarize: async () => ({ summary: "", warnings: [] }),
  askJson: async () => answer,
});

describe("understandQuery", () => {
  it("keeps typed fields and drops empty ones", async () => {
    const result = await understandQuery("нужно 5 штук мышек logitech m240", fake({
      productType: "мышь", brand: "Logitech", model: "M240", mpn: "", quantity: 5, condition: "", origin: "",
    }));
    expect(result).toEqual({ productType: "мышь", brand: "Logitech", model: "M240", quantity: 5 });
  });

  it("is off without AI", async () => {
    expect(await understandQuery("мышь", undefined)).toBeUndefined();
  });
});

describe("reviewOffers", () => {
  it("returns model verdicts only for review rows", async () => {
    const result = await reviewOffers(snapshot, fake({ items: [
      { offerId: "r1", verdict: "not_fit", reason: "Это радиатор, а не накопитель" },
      { offerId: "a", verdict: "fits", reason: "Чужая строка" },
    ] }));
    expect(result.items).toEqual([{ offerId: "r1", verdict: "not_fit", reason: "Это радиатор, а не накопитель" }]);
  });

  it("falls back to the deterministic reasons", async () => {
    const result = await reviewOffers(snapshot, undefined);
    expect(result.items).toEqual([{ offerId: "r1", verdict: "unclear", reason: "Объём не указан" }]);
  });
});

describe("justifyPurchase", () => {
  it("builds a template that names the cheaper alternative", () => {
    const text = justificationTemplate(snapshot, snapshot.offers[0]!);
    expect(text).toContain("NETLAB");
    expect(text).toContain("Wildberries");
    expect(text).toMatch(/Самое дешёвое сопоставимое предложение — Wildberries/);
  });

  it("rejects a memo with an invented number", async () => {
    const memo = "Рекомендуем закупить накопитель у NETLAB по цене 29 990 ₽, это выгоднее альтернатив на маркетплейсах.";
    const result = await justifyPurchase(snapshot, "a", fake({ memo }));
    expect(result?.ai).toBe(false);
  });

  it("accepts a grounded memo", async () => {
    const memo = "Рекомендуем закупить накопитель у NETLAB по цене 35 234 ₽: дистрибутор выставляет счёт, товар в наличии. Альтернатива Wildberries дешевле — 31 900 ₽.";
    const result = await justifyPurchase(snapshot, "a", fake({ memo }));
    expect(result).toMatchObject({ ai: true, provider: "test-llm" });
    expect(result?.text).toContain("Источник: https://shop/a");
  });

  it("checks numbers against the facts", () => {
    expect(memoIsGrounded("цена 35 234 ₽", { query: "", chosen: { price: "35 234 ₽" }, alternatives: [] })).toBe(true);
    expect(memoIsGrounded("скидка 1500 ₽", { query: "", chosen: { price: "35 234 ₽" }, alternatives: [] })).toBe(false);
  });
});

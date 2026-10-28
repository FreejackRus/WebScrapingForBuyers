import type { Offer, Product } from "@peremena/contracts";
import { describe, expect, it, vi } from "vitest";

import type { AnalysisNarration, AnalysisNarrator } from "../domain/analysis-narrator.js";
import { groundedNarrator } from "./grounded-narrator.js";

const row = (id: string, source: string, price: number, inStock: boolean): Offer => ({
  id, source, seller: source, title: `Клавиатура Logitech K380 ${id}`, price, priceCondition: "Публичная цена", currency: "RUB",
  availability: inStock ? "В наличии" : "Неизвестно", availabilityStatus: inStock ? "in_stock" : "unknown",
  condition: inStock ? "new" : "unknown", match: "probable", url: "https://example.test/" + id, fetchedAt: "2026-10-29T00:00:00Z", demo: false,
});
const wb = row("wb", "Wildberries", 2273, true);
const avito = row("avito", "Авито", 989, false);
const product = { id: "k380", brand: "Logitech", model: "K380", name: "Logitech K380", mpn: "", category: "Клавиатуры", characteristics: {} } as Product;
const input: AnalysisNarration = {
  prompt: "Сравни", rankedOffers: [wb, avito], selectedOfferIds: ["wb"], deterministicSummary: "", appliedFilters: [],
  snapshotQuery: "K380", snapshotStatus: "complete", productName: "Logitech K380",
};
const narratorReturning = (result: { summary: string; warnings: string[]; offerIds?: string[] }): AnalysisNarrator =>
  ({ name: "test", summarize: async () => result }) as unknown as AnalysisNarrator;
const context = { product, status: "complete" as const, selectedOfferIds: ["wb"], offers: [wb, avito] };

describe("groundedNarrator", () => {
  it("lets the model cite a shown row outside the selection, price next to its shop", async () => {
    const summary = "Лучший вариант — Wildberries, 2 273 ₽, в наличии. Авито дешевле, 989 ₽, но наличие не подтверждено.";
    const narrator = groundedNarrator(narratorReturning({ summary, warnings: [], offerIds: ["wb", "avito"] }), context)!;
    await expect(narrator.summarize(input)).resolves.toMatchObject({ summary });
  });

  it("drops an unverifiable warning instead of the whole answer", async () => {
    vi.spyOn(console, "warn").mockImplementation(() => undefined);
    const narrator = groundedNarrator(narratorReturning({
      summary: "Wildberries — 2 273 ₽.", warnings: ["Доставим завтра бесплатно."], offerIds: ["wb"],
    }), context)!;
    await expect(narrator.summarize(input)).resolves.toMatchObject({ warnings: [] });
  });

  it("refuses a summary with a price on the wrong shop and logs why", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    const narrator = groundedNarrator(narratorReturning({ summary: "На Авито K380 за 2 273 ₽.", warnings: [], offerIds: ["avito", "wb"] }), context)!;
    await expect(narrator.summarize(input)).rejects.toThrow();
    expect(String(warn.mock.calls.at(-1)?.[0])).toMatch(/narration_rejected.*цена 2273/);
  });
});

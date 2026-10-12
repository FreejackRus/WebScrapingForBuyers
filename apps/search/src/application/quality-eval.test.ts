import type { Offer, QualityResult } from "@peremena/contracts";
import { describe, expect, it } from "vitest";

import { loadQualityCases, nextRunDelay, QualityEvaluator, qualityAlerts, scoreCase, summarize } from "./quality-eval.js";

const offer = (title: string, source: string, rank: number, availability = "в наличии"): Offer =>
  ({ id: `${source}-${rank}`, title, source, procurementRank: rank, availability }) as Offer;

const base: QualityResult = {
  at: "2026-10-01T00:00:00.000Z", cases: 30, marketplacePrecision: 0.9, distributorPrecision: null,
  empty: 1, inStockShare: 1, perfect: 20, failedQueries: [], alerts: [],
};

describe("quality eval", () => {
  it("scores marketplace and distributor tabs separately by rank", () => {
    const score = scoreCase({ query: "i5-12400f", top: "12400f", notTop: "компьютер" }, [
      offer("Компьютер i5-12400F", "Ozon", 3),
      offer("Процессор i5-12400F", "Ozon", 1),
      offer("Intel i5-12400F BOX", "Wildberries", 2, "нет в наличии"),
      offer("Intel 12400F OEM", "NETLAB", 1),
    ]);
    expect(score.precision).toBeCloseTo(2 / 3);
    expect(score.distributorPrecision).toBe(1);
    expect(score.topInStock).toBe(2);
    expect(score.top[2]).toMatch(/^✗ \[Ozon\] Компьютер/);
  });

  it("summarizes and lists failed queries", () => {
    const result = summarize(
      [
        { query: "a", total: 5, precision: 1, distributorRows: 0, topInStock: 3, top: [] },
        { query: "b", total: 0, precision: 0, distributorRows: 0, topInStock: 0, top: [] },
      ],
      "now",
    );
    expect(result).toMatchObject({ cases: 2, marketplacePrecision: 0.5, empty: 1, perfect: 1, distributorPrecision: null, alerts: [] });
    expect(result.failedQueries.map((q) => q.query)).toEqual(["b"]);
  });

  it("alerts on a 5-point precision drop or 3 more empty results", () => {
    expect(qualityAlerts(base, { ...base, marketplacePrecision: 0.86 })).toEqual([]);
    expect(qualityAlerts(base, { ...base, marketplacePrecision: 0.85 })[0]).toMatch(/90% → 85%/);
    expect(qualityAlerts(base, { ...base, empty: 4 })[0]).toMatch(/пустых выдач 1 → 4/);
    expect(qualityAlerts(undefined, base)).toEqual([]);
  });

  it("schedules the first run no sooner than the minimum delay", () => {
    const week = 7 * 86_400_000;
    const now = Date.parse(base.at);
    expect(nextRunDelay(undefined, week, now, 600_000)).toBe(600_000);
    expect(nextRunDelay(base, week, now + week * 2, 600_000)).toBe(600_000);
    expect(nextRunDelay(base, week, now + 86_400_000, 600_000)).toBe(6 * 86_400_000);
  });

  it("ships the repo cases", () => {
    expect(loadQualityCases().length).toBeGreaterThanOrEqual(30);
  });

  it("runs cases sequentially and keeps one run at a time", async () => {
    let active = 0;
    let maxActive = 0;
    const evaluator = new QualityEvaluator(
      async (query) => {
        active += 1;
        maxActive = Math.max(maxActive, active);
        await new Promise((resolve) => setTimeout(resolve, 2));
        active -= 1;
        return query === "x" ? [offer("X thing", "Ozon", 1)] : [];
      },
      () => [{ query: "x", top: "x" }, { query: "y", top: "y" }],
    );
    expect(evaluator.trigger()).toBe(true);
    expect(evaluator.trigger()).toBe(false);
    const result = await evaluator.run();
    expect(maxActive).toBe(1);
    expect(result).toMatchObject({ cases: 2, empty: 1, perfect: 1 });
    expect((await evaluator.report()).results).toHaveLength(1);
  });
});

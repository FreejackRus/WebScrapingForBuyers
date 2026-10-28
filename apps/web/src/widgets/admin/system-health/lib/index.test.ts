import type { QualityResult, SourceHealth } from "@peremena/contracts";
import { describe, expect, it } from "vitest";

import { adminAlerts, narrationSummary, percent, sourceTone, trendPoints } from "./index";

const result = (precision: number, alerts: string[] = []): QualityResult => ({
  at: "2026-10-01T00:00:00.000Z", cases: 30, marketplacePrecision: precision, distributorPrecision: null,
  empty: 0, inStockShare: 1, perfect: 0, failedQueries: [], alerts,
});
const health = (ok: boolean, consecutiveFailures: number): SourceHealth => ({
  source: "Ozon", canary: "x", consecutiveFailures, history: [],
  last: { source: "Ozon", ok, rows: 0, ms: 1, checkedAt: "t" },
});

describe("system health lib", () => {
  it("joins source and latest quality alerts", () => {
    expect(
      adminAlerts(
        { sources: [], alerts: ["Источник Ozon не отвечает 3 проверки подряд"], running: false },
        { results: [result(0.9, ["старое"]), result(0.8, ["Качество поиска упало"])], running: false },
      ),
    ).toEqual(["Источник Ozon не отвечает 3 проверки подряд", "Качество поиска упало"]);
    expect(adminAlerts()).toEqual([]);
  });

  it("colours sources by consecutive failures", () => {
    expect(sourceTone(health(true, 0))).toBe("ok");
    expect(sourceTone(health(false, 1))).toBe("warn");
    expect(sourceTone(health(false, 3))).toBe("error");
    expect(sourceTone({ source: "x", canary: "x", consecutiveFailures: 0, history: [] })).toBe("unknown");
  });

  it("formats percent and trend", () => {
    expect(percent(0.857)).toBe("86%");
    expect(percent(null)).toBe("—");
    expect(trendPoints([result(1), result(0.5)], 100, 20)).toBe("0,0 100,10");
  });
});

describe("narrationSummary", () => {
  it("shows the accepted share of model explanations", () => {
    expect(narrationSummary(undefined)).toBe("Нет данных");
    const stats = { since: "2026-10-29T00:00:00Z", accepted: 0, rejected: 0, warningsDropped: 0, recent: [] };
    expect(narrationSummary(stats)).toBe("Модель ещё не отвечала с момента запуска");
    expect(narrationSummary({ ...stats, accepted: 4, rejected: 1 })).toBe("Принято 4 из 5 (80 %)");
  });
});

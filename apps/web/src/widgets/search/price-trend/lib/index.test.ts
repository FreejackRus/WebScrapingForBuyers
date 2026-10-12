import type { PriceHistoryPoint } from "@peremena/contracts";
import { describe, expect, it } from "vitest";

import { priceTrend, sparklinePath } from "./index";

const point = (at: string, mp: number | null, dist: number | null = null): PriceHistoryPoint => ({
  at,
  query: "q",
  marketplace: { min: mp, inStockMin: mp, count: 1 },
  distributor: { min: dist, inStockMin: dist, count: 1 },
});

describe("priceTrend", () => {
  it("follows the in-stock minimum of the active channel", () => {
    const trend = priceTrend([point("1", 1000), point("2", null), point("3", 900)], "marketplace");
    expect(trend?.points).toHaveLength(2);
    expect(trend?.direction).toBe("down");
    expect(trend?.first.price).toBe(1000);
  });
  it("needs at least two points", () => {
    expect(priceTrend([point("1", 1000, 5)], "distributor")).toBeUndefined();
  });
  it("draws a flat series in the middle", () => {
    expect(sparklinePath([{ at: "1", price: 5 }, { at: "2", price: 5 }], 100, 20)).toBe("2.0,10.0 98.0,10.0");
  });
});

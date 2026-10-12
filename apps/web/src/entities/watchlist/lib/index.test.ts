import type { WatchItem } from "@peremena/contracts";
import { describe, expect, it } from "vitest";

import { changeLabel, goodNewsCount } from "./index";

const item = (patch: Partial<WatchItem>): WatchItem => ({
  id: "1",
  createdAt: "",
  query: "",
  product: { id: "p", brand: "", model: "", name: "", mpn: "", category: "", characteristics: {} },
  channel: "marketplace",
  baseline: { price: 1000, inStock: true, at: "" },
  last: null,
  change: null,
  ...patch,
});

describe("watchlist labels", () => {
  it("names the change with a percentage", () => {
    expect(changeLabel(item({ change: "cheaper", last: { price: 930, inStock: true, at: "" } }))).toBe("Подешевело на 7%");
    expect(changeLabel(item({ change: "pricier", last: { price: 1100, inStock: true, at: "" } }))).toBe("Подорожало на 10%");
    expect(changeLabel(item({ change: "back_in_stock" }))).toBe("Появился в наличии");
    expect(changeLabel(item({}))).toBeUndefined();
  });
  it("counts only good news", () => {
    expect(goodNewsCount([item({ change: "cheaper" }), item({ change: "back_in_stock" }), item({ change: "pricier" })])).toBe(2);
  });
});

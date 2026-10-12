import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import type { PriceHistoryPoint } from "@peremena/contracts";
import { describe, expect, it } from "vitest";

import { PriceHistoryStore } from "./price-history-store.js";

const point = (at: string): PriceHistoryPoint => ({
  at,
  query: "q",
  marketplace: { min: 1, inStockMin: 1, count: 1 },
  distributor: { min: null, inStockMin: null, count: 0 },
});

describe("PriceHistoryStore", () => {
  it("caps points per product and products overall, dropping the oldest", () => {
    const store = new PriceHistoryStore(undefined, 2, 3);
    for (let i = 0; i < 5; i += 1) store.append("a", point(String(i)));
    expect(store.get("a").points.map((p) => p.at)).toEqual(["2", "3", "4"]);
    store.append("b", point("b"));
    store.append("a", point("5"));
    store.append("c", point("c"));
    expect(store.get("b").points).toEqual([]);
    expect(store.get("a").points).toHaveLength(3);
  });

  it("saves to and loads from a file, ignoring broken entries", async () => {
    const file = join(mkdtempSync(join(tmpdir(), "ph-")), "h.json");
    const store = new PriceHistoryStore(file, 10, 10, 0);
    store.append("k", point("1"));
    await store.flush();
    expect(JSON.parse(readFileSync(file, "utf8")).k).toHaveLength(1);
    writeFileSync(file, JSON.stringify({ k: [point("1"), { bad: true }], x: "nope" }));
    expect(new PriceHistoryStore(file).get("k").points).toHaveLength(1);
    writeFileSync(file, "{broken");
    expect(new PriceHistoryStore(file).get("k").points).toEqual([]);
  });
});

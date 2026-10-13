import { beforeEach, describe, expect, it, vi } from "vitest";

const store = new Map<string, string>();
vi.stubGlobal("localStorage", {
  getItem: (key: string) => store.get(key) ?? null,
  setItem: (key: string, value: string) => void store.set(key, value),
  removeItem: (key: string) => void store.delete(key),
  clear: () => store.clear(),
  get length() { return store.size; },
  key: (index: number) => [...store.keys()][index] ?? null,
});
import type { Offer } from "@peremena/contracts";
import { previousPrice, readPriceMemory, savePriceMemory } from "./index";

const product = { mpn: "MZ-V9P2T0BW", name: "SSD" };
const offer = (price: number) => ({ id: "1", source: "OZON", url: "https://ozon.ru/p/1", price } as Offer);

describe("price memory", () => {
  beforeEach(() => localStorage.clear());
  it("returns the earlier price only when it moved", () => {
    savePriceMemory(product, [offer(10_000)]);
    const memory = readPriceMemory(product);
    expect(previousPrice(memory, offer(9_000))).toBe(10_000);
    expect(previousPrice(memory, offer(10_050))).toBeUndefined();
    expect(previousPrice(memory, { ...offer(9_000), url: "other" })).toBeUndefined();
  });
});

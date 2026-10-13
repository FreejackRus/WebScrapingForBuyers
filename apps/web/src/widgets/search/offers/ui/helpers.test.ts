import { describe, expect, it } from "vitest";
import { offersWord, priceGap } from "./index";

describe("offer table helpers", () => {
  it("declines «предложение» by number", () => {
    expect([1, 2, 5, 11, 21, 22, 112].map(offersWord)).toEqual([
      "предложение", "предложения", "предложений", "предложений", "предложение", "предложения", "предложений",
    ]);
  });
  it("shows the gap only above the best price", () => {
    expect(priceGap(1000, 1000)).toBeUndefined();
    expect(priceGap(1150, 1000)).toBe(15);
    expect(priceGap(1004, 1000)).toBeUndefined();
    expect(priceGap(900, undefined)).toBeUndefined();
  });
});

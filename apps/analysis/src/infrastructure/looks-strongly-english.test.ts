import { describe, expect, it } from "vitest";

import {
  looksStronglyEnglish,
  narrationNeedsRussianRetry,
} from "./looks-strongly-english.js";

describe("looksStronglyEnglish", () => {
  it("flags English meta-commentary about JSON", () => {
    expect(
      looksStronglyEnglish(
        "The provided JSON contains a list of Lenovo Legion gaming laptops from both Avito and Citilink.",
      ),
    ).toBe(true);
  });

  it("allows Russian summary with Latin product names", () => {
    expect(
      looksStronglyEnglish(
        "По таблице отобраны ноутбуки Lenovo Legion с Авито и Ситилинк; дешевле всего выбранный оффер.",
      ),
    ).toBe(false);
  });

  it("flags long ASCII-only prose", () => {
    expect(
      looksStronglyEnglish(
        "Based on the offers, the cheapest option is from Citilink with warranty included.",
      ),
    ).toBe(true);
  });

  it("ignores short mixed tokens", () => {
    expect(looksStronglyEnglish("WB")).toBe(false);
    expect(looksStronglyEnglish("OK")).toBe(false);
  });
});

describe("narrationNeedsRussianRetry", () => {
  it("retries when summary is English", () => {
    expect(
      narrationNeedsRussianRetry("The provided JSON contains a list of offers.", []),
    ).toBe(true);
  });

  it("retries when a warning is English", () => {
    expect(
      narrationNeedsRussianRetry("Кратко по отбору.", [
        "This offer may be demo data only.",
      ]),
    ).toBe(true);
  });

  it("skips retry for Russian fields", () => {
    expect(
      narrationNeedsRussianRetry("Кратко по отбору Lenovo Legion.", [
        "Есть демо-цены.",
      ]),
    ).toBe(false);
  });
});

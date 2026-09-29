import type { Offer } from "@peremena/contracts";
import { describe, expect, it } from "vitest";

import { flagPriceAnomalies } from "./price-anomaly.js";

function offer(id: string, price: number, extra: Partial<Offer> = {}): Offer {
  return {
    id,
    source: "Ozon",
    seller: "Ozon",
    title: `Logitech K380 ${id}`,
    price,
    priceCondition: "Публичная цена",
    currency: "RUB",
    availability: "В наличии",
    condition: "new",
    match: "exact",
    url: "https://www.ozon.ru/product/1",
    fetchedAt: "2026-09-29T10:00:00Z",
    demo: false,
    ...extra,
  };
}

describe("flagPriceAnomalies", () => {
  it("flags parser-slip prices far below the median and keeps real deals", () => {
    // Live 2026-09-29: Ozon "2 939 ₽" was read as 2 ₽.
    const offers = [offer("a", 2), offer("b", 700), offer("c", 2_939), offer("d", 3_490), offer("e", 3_990)];
    flagPriceAnomalies(offers);
    expect(offers.filter((o) => o.priceAnomaly).map((o) => o.id)).toEqual(["a"]);
  });

  it("measures the median on strong matches so cheap accessories do not hide a slip", () => {
    const offers = [
      offer("slip", 15),
      offer("ssd1", 6_990),
      offer("ssd2", 7_490),
      offer("ssd3", 7_990),
      offer("ssd4", 8_490),
      ...["c1", "c2", "c3", "c4", "c5", "c6"].map((id) => offer(id, 150, { match: "doubtful" })),
    ];
    flagPriceAnomalies(offers);
    expect(offers.find((o) => o.id === "slip")?.priceAnomaly).toBe("too_low");
    expect(offers.find((o) => o.id === "c1")?.priceAnomaly).toBe("too_low");
  });

  it("needs enough comparable prices and ignores demo rows", () => {
    const few = [offer("a", 2), offer("b", 3_000), offer("c", 3_500)];
    flagPriceAnomalies(few);
    expect(few.some((o) => o.priceAnomaly)).toBe(false);

    const withDemo = [offer("demo", 1, { demo: true }), offer("b", 3_000), offer("c", 3_100), offer("d", 3_200), offer("e", 3_300)];
    flagPriceAnomalies(withDemo);
    expect(withDemo.some((o) => o.priceAnomaly)).toBe(false);
  });

  it("clears a flag when later sources move the median down", () => {
    const offers = [offer("a", 250), offer("b", 3_000), offer("c", 3_100), offer("d", 3_200)];
    flagPriceAnomalies(offers);
    expect(offers[0]?.priceAnomaly).toBe("too_low");
    offers.push(offer("e", 300), offer("f", 320), offer("g", 350));
    flagPriceAnomalies(offers);
    expect(offers[0]?.priceAnomaly).toBeUndefined();
  });
});

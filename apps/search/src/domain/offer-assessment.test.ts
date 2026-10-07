import type { Offer, Product } from "@peremena/contracts";
import { describe, expect, it } from "vitest";

import { assessOffer } from "./offer-assessment.js";

function product(overrides: Partial<Product> = {}): Product {
  return {
    id: "p",
    name: "Картридж Pantum TL-5120",
    brand: "Pantum",
    model: "TL-5120",
    mpn: "TL-5120",
    category: "Картриджи",
    characteristics: {},
    ...overrides,
  } as Product;
}

function offer(title: string, overrides: Partial<Offer> = {}): Offer {
  return {
    id: title,
    source: "WB",
    seller: "Магазин",
    title,
    price: 1000,
    priceCondition: "Обычная цена",
    currency: "RUB",
    availability: "В наличии",
    condition: "new",
    match: "exact",
    url: "https://example.test/item",
    fetchedAt: new Date(0).toISOString(),
    demo: false,
    ...overrides,
  } as Offer;
}

describe("offer assessment", () => {
  it("matches an explicit original identity but does not claim authenticity", () => {
    const assessed = assessOffer(
      product(),
      offer("Оригинальный картридж Pantum TL-5120"),
      "картридж pantum tl-5120 оригинальный",
    );
    expect(assessed?.assessment).toEqual({
      group: "match",
      reasons: expect.arrayContaining([
        "Артикул совпадает",
        "Продавец указывает оригинальность; подлинность не проверена",
      ]),
    });
  });

  it("rejects compatibles for an explicit original request and ignores seller as manufacturer", () => {
    expect(
      assessOffer(
        product(),
        offer("Совместимый картридж NV Print TL-5120", { seller: "Официальный магазин Pantum" }),
        "оригинальный картридж Pantum TL-5120",
      ),
    ).toBeNull();
  });

  it("does not infer compatibility from the seller name", () => {
    expect(
      assessOffer(
        product(),
        offer("Оригинальный картридж Pantum TL-5120", { seller: "NV Print" }),
        "оригинальный картридж Pantum TL-5120",
      )?.assessment,
    ).toEqual({
      group: "match",
      reasons: expect.arrayContaining([
        "Артикул совпадает",
        "Продавец указывает оригинальность; подлинность не проверена",
      ]),
    });
  });

  it("keeps unknown origin for review rather than silently treating it as original", () => {
    const assessed = assessOffer(product(), offer("Картридж Pantum TL-5120"), "оригинальный Pantum TL-5120");
    expect(assessed?.assessment).toEqual({
      group: "needs_review",
      reasons: expect.arrayContaining(["Оригинальность не указана"]),
    });
  });

  it("rejects a different full article even when the digits coincide", () => {
    expect(assessOffer(product(), offer("Картридж Pantum DL-5120"), "Pantum TL-5120")).toBeNull();
  });

  it("rejects spare parts for a device request", () => {
    const printer = product({
      name: "Принтер Pantum BM5100ADN",
      model: "BM5100ADN",
      mpn: "BM5100ADN",
      category: "Принтеры",
    });
    expect(assessOffer(printer, offer("Плата форматера для Pantum BM5100ADN"), printer.name)).toBeNull();
  });

  it("rejects conflicting capacity and sends absent capacity evidence to review", () => {
    const ssd = product({
      name: "SSD Kingston NV3 1 ТБ",
      brand: "Kingston",
      model: "NV3",
      mpn: "",
      category: "SSD",
    });
    expect(assessOffer(ssd, offer("SSD Kingston NV3 2 ТБ"), ssd.name)).toBeNull();
    expect(assessOffer(ssd, offer("SSD Kingston NV3"), ssd.name)?.assessment).toEqual({
      group: "needs_review",
      reasons: expect.arrayContaining(["Объём не указан"]),
    });
  });

  it("rejects conflicting pack quantity and reviews missing quantity", () => {
    const query = "Картридж Pantum TL-5120 упаковка 5 шт";
    expect(assessOffer(product(), offer("Картридж Pantum TL-5120 10 шт"), query)).toBeNull();
    expect(assessOffer(product(), offer("Картридж Pantum TL-5120"), query)?.assessment).toEqual({
      group: "needs_review",
      reasons: expect.arrayContaining(["Количество в комплекте не указано"]),
    });
  });
});

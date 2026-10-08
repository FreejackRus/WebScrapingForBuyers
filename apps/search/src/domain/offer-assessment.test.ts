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

  it("treats a known compatible maker in the title as compatible even when it says original", () => {
    expect(
      assessOffer(
        product(),
        offer("Оригинальный картридж TL-5120 от NV Print"),
        "оригинальный картридж Pantum TL-5120",
      ),
    ).toBeNull();
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
    expect(assessOffer(product(), offer("Картридж Pantum TL-51200"), "Pantum TL-5120")).toBeNull();
    const mouse = product({ name: "Logitech G102", brand: "Logitech", model: "G102", mpn: "", category: "Мыши" });
    expect(assessOffer(mouse, offer("Мышь Logitech G1020"), mouse.name)).toBeNull();
    const ssd = product({ name: "SSD Kingston NV3", brand: "Kingston", model: "NV3", mpn: "", category: "SSD" });
    expect(assessOffer(ssd, offer("SSD Kingston NV30"), ssd.name)).toBeNull();
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

  it("uses selected product characteristics when the typed query omits capacity", () => {
    const ssd = product({
      name: "SSD Kingston NV3",
      brand: "Kingston",
      model: "NV3",
      mpn: "",
      category: "SSD",
      characteristics: { Объём: "1 ТБ" },
    });
    expect(assessOffer(ssd, offer("SSD Kingston NV3 2 ТБ"), "Kingston NV3")).toBeNull();
  });

  it("gives the explicit typed capacity precedence over stale selected-product capacity", () => {
    const ssd = product({
      name: "SSD Kingston NV3 2 ТБ",
      brand: "Kingston",
      model: "NV3",
      mpn: "",
      category: "SSD",
      characteristics: { Объём: "2 ТБ" },
    });
    expect(assessOffer(ssd, offer("SSD Kingston NV3 1 ТБ"), "Kingston NV3 1 ТБ")?.assessment?.group).toBe("match");
  });

  it("distinguishes RAM kit layout even when total capacity is equal", () => {
    const ram = product({
      name: "Kingston Fury Beast 2x16 GB",
      brand: "Kingston",
      model: "Fury Beast",
      mpn: "",
      category: "Оперативная память",
    });
    expect(assessOffer(ram, offer("Kingston Fury Beast 1x32 GB"), ram.name)).toBeNull();
    expect(assessOffer(ram, offer("Kingston Fury Beast 2x16 GB"), ram.name)?.assessment?.group).toBe("match");
  });

  it("keeps the selected RAM kit quantity when the typed query omits its layout", () => {
    const ram = product({
      name: "Kingston Fury Beast 2x16 GB",
      brand: "Kingston",
      model: "Fury Beast",
      mpn: "",
      category: "Оперативная память",
    });
    const query = "Kingston Fury Beast";

    expect(assessOffer(ram, offer("Kingston Fury Beast 1x32 GB"), query)).toBeNull();
    expect(assessOffer(ram, offer("Kingston Fury Beast 32 GB"), query)?.assessment).toEqual({
      group: "needs_review",
      reasons: expect.arrayContaining(["Количество в комплекте не указано"]),
    });
  });

  it("keeps the selected RAM kit quantity when the typed query only overrides total capacity", () => {
    const ram = product({
      name: "Kingston Fury Beast 2x16 GB",
      brand: "Kingston",
      model: "Fury Beast",
      mpn: "",
      category: "Оперативная память",
    });

    expect(assessOffer(ram, offer("Kingston Fury Beast 1x32 GB"), "Kingston Fury Beast 32 GB")).toBeNull();
  });

  it("lets an explicit typed RAM kit layout override the selected layout", () => {
    const ram = product({
      name: "Kingston Fury Beast 2x16 GB",
      brand: "Kingston",
      model: "Fury Beast",
      mpn: "",
      category: "Оперативная память",
    });

    expect(
      assessOffer(ram, offer("Kingston Fury Beast 1x32 GB"), "Kingston Fury Beast 1x32 GB")?.assessment?.group,
    ).toBe("match");
  });

  it("normalizes RAM kit total capacity and module quantity", () => {
    const ram = product({
      name: "Kingston Fury Beast 32 GB комплект 2 шт",
      brand: "Kingston",
      model: "Fury Beast",
      mpn: "",
      category: "Оперативная память",
    });
    expect(assessOffer(ram, offer("Kingston Fury Beast 2x16 GB комплект 2 шт"), ram.name)?.assessment?.group).toBe("match");
  });

  it("rejects conflicting toner yield and reviews an absent yield", () => {
    const query = "Картридж Pantum TL-5120 ресурс 3000 страниц";
    expect(assessOffer(product(), offer("Картридж Pantum TL-5120 6000 страниц"), query)).toBeNull();
    expect(assessOffer(product(), offer("Картридж Pantum TL-5120"), query)?.assessment).toEqual({
      group: "needs_review",
      reasons: expect.arrayContaining(["Ресурс не указан"]),
    });
    expect(assessOffer(product(), offer("Картридж Pantum TL-5120 ресурс 3000 страниц"), query)?.assessment?.group).toBe("match");
    expect(assessOffer(product(), offer("Картридж Pantum TL-5120 3000 страниц"), query)?.assessment?.group).toBe("match");
  });
});

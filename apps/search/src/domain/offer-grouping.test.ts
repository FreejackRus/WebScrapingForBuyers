import type { Offer, Product } from "@peremena/contracts";
import { describe, expect, it } from "vitest";

import { offerModelKey, packQuantity, withGrouping } from "./offer-grouping.js";
import { parseWildcardArticle, productForWildcard } from "./wildcard-article.js";

const k380: Product = {
  id: "k380", brand: "Logitech", model: "K380", name: "Logitech K380", mpn: "", category: "Клавиатуры", characteristics: {},
};
const offer = (title: string, price = 1000, mpn?: string): Offer => ({
  id: title, source: "Ozon", seller: "Ozon", title, price, priceCondition: "Публичная цена", currency: "RUB",
  availability: "В наличии", condition: "new", match: "probable", url: "https://www.ozon.ru/product/1",
  fetchedAt: "2026-10-28T10:00:00Z", demo: false, ...(mpn ? { mpn } : {}),
});

describe("offerModelKey", () => {
  it.each([
    ["Клавиатура Logitech K380 Multi-Device, серая", "K380"],
    ["Клавиатура Logitech K380s Pebble Keys 2", "K380S"],
    ["Клавиатура Logitech К380 (кириллица)", "K380"],
    ["Клавиатура Logitech K3800 другая модель", undefined],
    ["Клавиатура беспроводная Logitech", undefined],
  ])("%s → %s", (title, key) => {
    expect(offerModelKey(k380, offer(title))).toBe(key);
  });

  it("uses the matched article for a wildcard search, one key per colour", () => {
    const wildcard = parseWildcardArticle("чернила эпсон С13Т673*4А")!;
    const product = productForWildcard({ ...k380, model: "", characteristics: {} }, wildcard);
    expect(offerModelKey(product, offer("Чернила Epson C13T67324A голубые"))).toBe("C13T67324A");
    expect(offerModelKey(product, offer("Чернила Epson С13Т67364А светло-пурпурные"))).toBe("C13T67364A");
  });

  it("gives no key to a model without digits or letters", () => {
    expect(offerModelKey({ ...k380, model: "Pebble" }, offer("Logitech Pebble"))).toBeUndefined();
  });
});

describe("packQuantity", () => {
  it.each([
    ["Комплект картриджей HP 4 шт", 4],
    ["Набор из 6 цветов чернил Epson", 6],
    ["Картридж HP 305 упаковка 2 шт", 2],
    ["Мышь Logitech 1 шт", undefined],
    ["Монитор Dell 24 дюйма", undefined],
    ["Хаб USB 3.0 на 4 порта", undefined],
    ["Кабель 1.5 шт", undefined],
  ])("%s → %s", (title, quantity) => {
    expect(packQuantity(title)).toBe(quantity);
  });
});

describe("withGrouping", () => {
  it("adds the price per unit for a set and leaves single units alone", () => {
    const set = withGrouping(k380, offer("Комплект клавиатур Logitech K380 3 шт", 3000));
    expect(set).toMatchObject({ modelKey: "K380", packQuantity: 3, unitPrice: 1000 });
    const single = withGrouping(k380, offer("Logitech K380", 1100));
    expect(single.packQuantity).toBeUndefined();
    expect(single.unitPrice).toBeUndefined();
  });
});

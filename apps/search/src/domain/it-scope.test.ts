import type { Offer } from "@peremena/contracts";
import { describe, expect, it } from "vitest";

import {
  classifyQuery,
  filterItSuggestions,
  isExplicitlyNonIt,
  isItIdentifier,
  isItOfferForProduct,
  isItProduct,
  isOfferInItScope,
} from "./it-scope.js";
import { inferCategory, productFromQuery } from "./product-from-query.js";

function offer(title: string): Offer {
  return {
    id: title,
    source: "TEST",
    seller: "TEST",
    title,
    price: 1_000,
    priceCondition: "Публичная цена",
    currency: "RUB",
    availability: "В наличии",
    condition: "new",
    match: "probable",
    url: "https://example.com/product",
    fetchedAt: "2026-09-25T00:00:00.000Z",
    demo: true,
  };
}

describe("IT assortment scope", () => {
  it("includes smartphones, tablets and their accessories", () => {
    expect(inferCategory("Apple iPhone 15 Pro")).toBe("Смартфоны");
    expect(inferCategory("Samsung Galaxy S24")).toBe("Смартфоны");
    expect(inferCategory("Samsung Galaxy Tab S9")).toBe("Планшеты");
    expect(inferCategory("Чехол для iPhone 15")).toBe("Аксессуары IT");
    expect(inferCategory("Клавиатура для iPad Air")).toBe("Клавиатуры");
    expect(inferCategory("Графический планшет XP-Pen Artist")).toBe("Графические планшеты");
    expect(inferCategory("DisplayPort кабель 2 м")).toBe("Кабели и адаптеры");
    expect(inferCategory("Коврик для мыши Logitech")).toBe("Аксессуары IT");
    expect(isItProduct(productFromQuery("планшет Apple iPad Air"))).toBe(true);
  });

  it("keeps components separate from complete devices", () => {
    expect(inferCategory("SSD Kingston NV2 для ноутбука")).toBe("SSD");
    expect(inferCategory("Ноутбук Lenovo Legion Pro 5 512GB SSD")).toBe("Ноутбуки");
    expect(inferCategory("Блок питания для компьютера 650W")).toBe("Блоки питания");
    expect(inferCategory("Сервер Dell PowerEdge R750")).toBe("Серверы");
    expect(isItOfferForProduct(productFromQuery("Apple iPhone 15"), offer("Чехол для iPhone 15"))).toBe(false);
    expect(isItOfferForProduct(productFromQuery("Чехол для iPhone 15"), offer("Чехол для iPhone 15"))).toBe(true);
    expect(isItOfferForProduct(productFromQuery("Ноутбук Lenovo Legion Pro 5"), offer("SSD для ноутбука Lenovo"))).toBe(false);
  });

  it("excludes household goods even when their brand also makes electronics", () => {
    expect(isExplicitlyNonIt("Пылесос Samsung Jet 75")).toBe(true);
    expect(isItProduct(productFromQuery("Пылесос Samsung Jet 75"))).toBe(false);
    expect(isItOfferForProduct(productFromQuery("смартфон Samsung Galaxy S24"), offer("Пылесос Samsung Jet 75"))).toBe(false);
    expect(isItIdentifier("G102")).toBe(true);
    expect(isItIdentifier("обычный товар")).toBe(false);
  });

  it("keeps toys and other non-equipment goods out of queries, suggestions and offers", () => {
    // No toy/food/clothes dictionary: anything not recognised as equipment is rejected.
    for (const text of ["игрушки", "кукла Barbie", "LEGO Technic конструктор", "пазл 1000 деталей", "авокадо", "Logitech игрушка"]) {
      expect(classifyQuery(productFromQuery(text))).not.toBe("ok");
    }
    expect(classifyQuery(productFromQuery("Пылесос Samsung Jet 75"))).toBe("non_it");
    expect(classifyQuery(productFromQuery("игрушки"))).toBe("unclear");
    expect(classifyQuery(productFromQuery("что-то красивое"))).toBe("unclear");
    expect(classifyQuery(productFromQuery("мышь Logitech G102"))).toBe("ok");
    expect(classifyQuery(productFromQuery("Logitech"))).toBe("ok");
    expect(classifyQuery(productFromQuery("G102"))).toBe("ok");
    expect(isOfferInItScope(productFromQuery("мышь Logitech G102"), offer("Мягкая игрушка зайка"))).toBe(false);
    expect(isOfferInItScope(productFromQuery("мышь Logitech G102"), offer("Клавиатура Logitech K380"))).toBe(false);
    expect(isOfferInItScope(productFromQuery("мышь Logitech G102"), offer("Logitech G102 Lightsync"))).toBe(true);
  });

  it("requires product identity for an IT offer when the query names no IT category", () => {
    const bareCode = productFromQuery("G102");
    expect(isItOfferForProduct(bareCode, offer("Чехол для ноутбука"))).toBe(false);
    expect(isItOfferForProduct(bareCode, offer("Мышь Logitech G102 Lightsync"))).toBe(true);
  });

  it("treats a bare 'switch' as network gear only next to network signals", () => {
    expect(classifyQuery(productFromQuery("Nintendo Switch"))).not.toBe("ok");
    expect(isItOfferForProduct(productFromQuery("коммутатор TP-Link"), offer("Игровая консоль Nintendo Switch OLED"))).toBe(false);
    expect(classifyQuery(productFromQuery("switch 8 port gigabit"))).toBe("ok");
    expect(classifyQuery(productFromQuery("управляемый switch PoE"))).toBe("ok");
    expect(
      isItOfferForProduct(productFromQuery("коммутатор TP-Link TL-SG108"), offer("Switch TP-Link TL-SG108 8 портов")),
    ).toBe(true);
  });

  it("filters live suggestions down to equipment", () => {
    const phrases = ["игрушки для кошек", "игрушки", "игрушка lego", "игровая мышь logitech", "ноутбук lenovo legion 5", "игровой монитор 144 гц"];
    expect(filterItSuggestions(phrases)).toEqual(["игровая мышь logitech", "ноутбук lenovo legion 5", "игровой монитор 144 гц"]);
  });

  it("classifies by the head noun, so an equipment word in the tail does not admit a toy", () => {
    for (const text of ["игрушки для детей на 3д принтере", "кофе для офиса с принтером", "игровое кресло для компьютера"]) {
      expect(classifyQuery(productFromQuery(text))).not.toBe("ok");
    }
    expect(filterItSuggestions(["игрушки для детей на 3д принтере", "принтер для 3д печати", "ssd для ноутбука"])).toEqual(["принтер для 3д печати", "ssd для ноутбука"]);
    expect(inferCategory("Подставка для ноутбука")).toBe("Аксессуары IT");
    expect(inferCategory("Клавиатура для iPad Air")).toBe("Клавиатуры");
    expect(inferCategory("лучший SSD для ноутбука")).toBe("SSD");
  });

  it("does not treat quantities or a non-IT head word plus a code as a model identifier", () => {
    for (const text of ["Сахар 500г", "Крем SPF50", "Футболка 2XL", "Корм 5кг", "пазл 1000 деталей"]) {
      expect(classifyQuery(productFromQuery(text))).not.toBe("ok");
    }
    expect(isItIdentifier("500gb")).toBe(false);
    expect(classifyQuery(productFromQuery("G102"))).toBe("ok");
    expect(classifyQuery(productFromQuery("Logitech G102 беспроводная"))).toBe("ok");
  });

  it("lets the specific product type win over modifiers and generic words", () => {
    expect(inferCategory("Компьютерная мышь Logitech")).toBe("Мыши");
    expect(inferCategory("Компьютерная клавиатура Defender")).toBe("Клавиатуры");
    expect(inferCategory("ASUS ROG Strix Z790 Wi-Fi материнская плата")).toBe("Материнские платы");
    expect(inferCategory("MSI Nitro видеокарта RTX 4060")).toBe("Видеокарты");
    expect(inferCategory("Lenovo Legion Pro 5")).toBe("Ноутбуки");
    expect(inferCategory("Wi-Fi роутер TP-Link")).toBe("Сеть");
  });

  it("matches rules that contain a preposition against the full text", () => {
    expect(inferCategory("Корпус для ПК Zalman")).toBe("Корпуса ПК");
    expect(inferCategory("Вентилятор для корпуса Arctic P12")).toBe("Охлаждение ПК");
  });

  it("accepts brands typed in Cyrillic and rejects household goods of IT brands in English", () => {
    expect(classifyQuery(productFromQuery("самсунг галакси"))).toBe("ok");
    expect(classifyQuery(productFromQuery("леново")) ).toBe("ok");
    expect(classifyQuery(productFromQuery("Samsung vacuum cleaner"))).not.toBe("ok");
    expect(classifyQuery(productFromQuery("Xiaomi robot vacuum"))).not.toBe("ok");
  });

  it("classifies by the product text, not by a category the client claims", () => {
    const doll = { ...productFromQuery("Кукла Barbie"), category: "Ноутбуки" };
    expect(classifyQuery(doll)).not.toBe("ok");
  });
});

describe("CPU shorthand", () => {
  it.each(["12400F", "i5-12400F", "процессор 12400F"])("accepts %s and excludes complete PCs", (query) => {
    const product = productFromQuery(query);
    expect(classifyQuery(product)).toBe("ok");
    expect(product.category).toBe("Процессоры");
    expect(isItOfferForProduct(product, offer("Процессор Intel Core i5-12400F OEM"))).toBe(true);
    expect(isItOfferForProduct(product, offer("Компьютер Intel Core i5-12400F"))).toBe(false);
  });
});

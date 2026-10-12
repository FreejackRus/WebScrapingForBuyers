import { describe, expect, it } from "vitest";

import { assessMarketplaceOfferRelevance } from "./marketplace-relevance.js";
import { assessOffer } from "./offer-assessment.js";
import { productFromQuery } from "./product-from-query.js";

/** End to end: the raw typed query, parsed as in production, against marketplace titles. */
function kind(query: string, title: string): string {
  return assessMarketplaceOfferRelevance(title, undefined, undefined, productFromQuery(query, "query")).kind;
}

describe("typed query → offer precision", () => {
  it.each([
    ["990 pro 2тб", "SSD Samsung 990 PRO 2 ТБ NVMe M.2", "strong"],
    ["990 pro 2тб", "SSD Samsung 990 PRO 1ТБ, NVMe", "drop"],
    ["990 pro 2тб", "SSD Samsung 990 PRO 4TB", "drop"],
    ["samsung 990 pro 2tb", "SSD Samsung 990 PRO (1TB)", "drop"],
    ["4060 8gb", "Видеокарта MSI GeForce RTX 4060 VENTUS 2X 8G", "strong"],
    ["4060 8gb", "Видеокарта Palit RTX4060 8 ГБ для компьютера", "strong"],
    ["4060 8gb", "Игровой ПК Ryzen 5 RTX 4060 8GB", "drop"],
    ["4060 8gb", "Видеокарта RTX 4060 Ti 16GB", "drop"],
    ["rtx 4060", "Видеокарта RTX 4060 Ti 8GB", "drop"],
    ["rtx 4060 ti", "Видеокарта RTX 4060 Ti 8GB", "strong"],
    ["legion go", "Игровая консоль Lenovo Legion Go 1TB", "strong"],
    ["legion go", "Lenovo Legion Go S", "drop"],
    ["legion go", "Чехол для Lenovo Legion Go", "drop"],
  ])("%s ← %s → %s", (query, title, expected) => {
    expect(kind(query, title)).toBe(expected);
  });

  it("keeps the product category for GPU numbers and SSD series typed without a type word", () => {
    expect(productFromQuery("4060 8gb", "query").category).toBe("Видеокарты");
    expect(productFromQuery("990 pro 2тб", "query").category).toBe("SSD");
    // A brand before the series must not hide it (the hint needs a word boundary, not a space at the start).
    expect(productFromQuery("samsung 990 pro 2тб", "query").category).toBe("SSD");
    expect(productFromQuery("palit 4060 8gb", "query").category).toBe("Видеокарты");
    expect(productFromQuery("amd rx 7800 xt", "query").category).toBe("Видеокарты");
    expect(productFromQuery("игровой пк 4060 8gb", "query").category).not.toBe("Видеокарты");
  });

  it("does not read pack sizes, revisions or series numbers as a variant suffix", () => {
    expect(kind("rtx 4060", "Видеокарта MSI RTX 4060 2X 8G")).toBe("strong");
    expect(kind("картридж pantum tl-5120", "Картридж Pantum TL-5120 2 шт")).not.toBe("drop");
    expect(kind("Xeon E5-2697 v4", "Процессор Intel Xeon E5-2697 v4 2.3GHz")).toBe("strong");
  });

  describe("assessment keeps listings that name the model in their own words", () => {
    const offer = (title: string) => ({
      id: "x", source: "T", seller: "T", title, price: 1000, priceCondition: "", currency: "RUB" as const,
      availability: "В наличии", condition: "new" as const, match: "probable" as const, url: "https://t", fetchedAt: "", demo: false,
    });
    const assessed = (query: string, title: string) => assessOffer(productFromQuery(query, "query"), offer(title), query);

    it.each([
      ["оперативная память ddr5 32gb kingston fury", "Оперативная память Kingston FURY Beast DDR5 32GB 5600"],
      ["ибп apc back-ups 650", "ИБП APC Back-UPS 650VA BX650MI-GR"],
      ["сервер lenovo thinksystem sr650 v2", "Сервер Lenovo ThinkSystem SR650 V2 8SFF"],
      ["kyocera 302n494021", "Узел проявки Kyocera 302N494021 DV-1150"],
    ])("%s ← %s", (query, title) => {
      expect(assessed(query, title)).not.toBeNull();
    });

    it("does not accept an older server generation or a third-party article", () => {
      expect(assessed("сервер lenovo thinksystem sr650 v2", "Сервер Lenovo ThinkSystem SR650 (7X06A0B3EA)")).toBeNull();
      expect(assessed("tl-5120 оригинальный", "Картридж N-TL-5120 для принтера Pantum BP5100 3K с чипом")).toBeNull();
      expect(assessed("tl-5120 оригинальный", "Картридж Pantum TL-5120 оригинальный")).not.toBeNull();
      // Live 2026-10-12: the printer maker named only after «для», or a third-party brand.
      expect(assessed("tl-5120 оригинальный", "Тонер-картридж TL-5120 для Pantum BP5100DN BP5100DW")).toBeNull();
      expect(assessed("tl-5120 оригинальный", "Картридж Parus TL-5120 к принтеру Pantum 5100 (3000 стр.)")).toBeNull();
      expect(assessed("tl-5120 оригинальный", "Картридж Pantum TL-5120 для BP5100DN")).not.toBeNull();
    });

    it("reads GPU names typed without a type word as graphics cards", () => {
      expect(productFromQuery("rx 7800 xt", "query").category).toBe("Видеокарты");
    });
  });

  describe("accessories sold under the device name", () => {
    const offer = (title: string) => ({
      id: "x", source: "T", seller: "T", title, price: 1000, priceCondition: "", currency: "RUB" as const,
      availability: "В наличии", condition: "new" as const, match: "probable" as const, url: "https://t", fetchedAt: "", demo: false,
    });
    const assessed = (query: string, title: string) => assessOffer(productFromQuery(query, "query"), offer(title), query);

    it.each([
      ["видеокарта rtx 4070 super", "Радиатор для видеокарты PALIT RTX 4070 Super 4070 4070Ti"],
      ["ибп apc back-ups 650", "Батарея для ИБП APC Back-UPS 650"],
      ["lenovo legion go", "Защитное стекло для Lenovo Legion Go"],
      ["процессор xeon e5-2697 v4", "Кулер для процессора Xeon E5-2697 v4"],
    ])("drops %s ← %s", (query, title) => {
      expect(assessed(query, title)).toBeNull();
    });

    it("keeps devices that mention an accessory later and accessories the buyer asked for", () => {
      expect(assessed("ибп apc back-ups 650", "ИБП APC Back-UPS 650VA, 390 Вт, с аккумулятором")).not.toBeNull();
      expect(assessed("кулер для процессора deepcool ak400", "Кулер для процессора DeepCool AK400")).not.toBeNull();
    });
  });

  describe("distributor price-list rows (NETLAB, live 2026-10-12)", () => {
    const offer = (title: string, mpn?: string) => ({
      id: "x", source: "NETLAB", seller: "NETLAB", title, ...(mpn ? { mpn } : {}), price: 1000, priceCondition: "", currency: "RUB" as const,
      availability: "В наличии", condition: "new" as const, match: "exact" as const, url: "https://t", fetchedAt: "", demo: false,
    });
    const assessed = (query: string, title: string, mpn?: string) =>
      assessOffer(productFromQuery(query, "query"), offer(title, mpn), query);

    it("drops another maker's item that shares the model number", () => {
      expect(assessed("logitech m240", "D-Link DEM-CB50/M240 Пассивный кабель 10GBase-CX4 длиной 50 см", "DEM-CB50/M240")).toBeNull();
      expect(assessed("logitech m240", "Картридж TKB140XX для Катюша серий P140/M140/M240 (12000 стр.)")).toBeNull();
      expect(assessed("мфу hp m247", "Ролик подхвата автоподатчика КАТЮША M247-06-0013-00 для Катюша M2471")).toBeNull();
      expect(assessed("logitech m240", "910-007185/910-007119 Logitech Wireless Mouse M240 SILENT - Graphite")).not.toBeNull();
      expect(assessed("logitech m240", "Мышь беспроводная M240 Silent (910-007119)")).not.toBeNull();
    });

    it("finds the model inside a maker article", () => {
      expect(assessed("ssd kingston kc3000 1tb", "Kingston SSD 1Tb M.2 SKC3000S/1024G M.2 2280 NVMe", "SKC3000S/1024G")).not.toBeNull();
      expect(assessed("мышь logitech g102", "TP-Link TL-SG1024 Коммутатор 24 порта")).toBeNull();
      expect(assessed("картридж pantum tl-5120", "Картридж Pantum TL-5120X повышенной ёмкости")).toBeNull();
    });

    it("reads «5 штук» as an order quantity, not a pack size", () => {
      expect(assessed("нужно 5 штук мышек logitech m240", "Мышь беспроводная Logitech M240 Silent")?.assessment?.group).toBe("match");
      expect(assessed("картридж pantum tl-5120 упаковка 5 шт", "Картридж Pantum TL-5120")?.assessment?.group).toBe("needs_review");
    });

    it("does not offer another memory generation", () => {
      const query = "оперативная память ddr5 32gb kingston fury";
      expect(assessed(query, "Игровая память Kingston Fury Beast DIMM DDR4 32GB (2*16GB) 3200Mhz")).toBeNull();
      expect(assessed(query, "Оперативная память Kingston FURY Beast DDR5 32GB 5600")).not.toBeNull();
    });

    it("keeps a cable query to the interfaces asked for", () => {
      expect(assessed("кабель hdmi 2м", "KS-is KS-468L1-2 Кабель-адаптер HDMI 19M - DVI 25M 2м")).toBeNull();
      expect(assessed("кабель hdmi 2м", "Кабель аудио-видео Buro HDMI (m)/HDMI (m) 2м. черный (BHP-HDMI-2.1-2)")).not.toBeNull();
    });

    it("does not offer a drum unit for a cartridge query", () => {
      expect(assessed("картридж 5120", "Фотовал (OPC Drum) NVP для Pantum DL-420/5120 (P3010/P3020)")).toBeNull();
    });
  });
});

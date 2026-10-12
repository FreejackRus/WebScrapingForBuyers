import { describe, expect, it, vi } from "vitest";

import { OzonCardVerifier, ozonCardFacts } from "./card-verifiers.js";

// Trimmed live ozon_card payload (2026-10-12).
const payload = {
  status: "success",
  price: 24268,
  card_price: 23271,
  is_available: true,
  title: "Dell 23.8\" Монитор (Dell P2423D 2K), IPS, 2560x1440 2K, 60 Гц",
  characteristics: [
    { id: "Type_0", title: { textRs: [{ type: "text", content: "Тип" }] }, values: [{ id: "Type_0", text: "Монитор" }] },
    { id: "Model", title: { textRs: [{ type: "text", content: "Модель" }] }, values: [{ text: "P2423D" }] },
  ],
};

describe("Ozon card verifier", () => {
  it("reads the regular price, stock and characteristics", () => {
    expect(ozonCardFacts(payload)).toEqual({
      title: payload.title,
      price: 24268,
      available: true,
      priceBasis: "без Ozon Карты",
      priceCondition: "Обычная цена без Ozon Карты (проверено на карточке)",
      specs: "Тип Монитор; Модель P2423D",
    });
  });

  it("ignores an error payload", () => {
    expect(ozonCardFacts({ status: "error" })).toBeUndefined();
  });

  it("checks only Ozon product links, without tracking parameters", async () => {
    const callTool = vi.fn(async () => payload);
    const verifier = new OzonCardVerifier({ callTool });
    const row = { source: "Ozon", url: "https://www.ozon.ru/product/dell-1955648092/?at=abc" } as never;
    expect(verifier.supports(row)).toBe(true);
    expect(verifier.supports({ source: "Ozon", url: "https://www.ozon.ru/search/?text=x" } as never)).toBe(false);
    await verifier.fetch(row);
    expect(callTool).toHaveBeenCalledWith("ozon_card", { sku_or_path: "https://www.ozon.ru/product/dell-1955648092/" });
  });
});

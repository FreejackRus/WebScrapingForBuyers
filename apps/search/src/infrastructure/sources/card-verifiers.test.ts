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

describe("storefront card verifier", async () => {
  const { StorefrontCardVerifier, schemaOrgCardFacts } = await import("./card-verifiers.js");

  it("reads Servermall JSON-LD", () => {
    const html = `<script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"WebPage"},{"@type":"Product","name":"сервер LENOVO ThinkSystem SR650 V2 8SFF","offers":{"@type":"Offer","price":"245553","availability":"https://schema.org/InStock"}}]}</script>`;
    expect(schemaOrgCardFacts(html)).toEqual({ title: "сервер LENOVO ThinkSystem SR650 V2 8SFF", price: 245553, available: true });
  });

  it("reads СРВТрейд microdata", () => {
    const html = `<h1 itemprop="name">Процессор Xeon E5-2697 v4</h1><span class="price__base">242&nbsp;064 р.</span><meta itemprop="price" content="242064"><link itemprop="availability" href="http://schema.org/InStock">`;
    expect(schemaOrgCardFacts(html)).toEqual({ title: "Процессор Xeon E5-2697 v4", price: 242064, available: true });
  });

  it("treats a removed card as sold out and checks only storefront product links", async () => {
    const verifier = new StorefrontCardVerifier((async () => new Response("", { status: 404 })) as unknown as typeof fetch);
    const row = { source: "Servermall", url: "https://servermall.ru/catalog/servers/x/" } as never;
    expect(verifier.supports(row)).toBe(true);
    expect(verifier.supports({ source: "Ozon", url: "https://servermall.ru/catalog/x" } as never)).toBe(false);
    await expect(verifier.fetch(row)).resolves.toEqual({ available: false });
  });
});

import type { Offer } from "@peremena/contracts";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

const offer: Offer = {
  id: "ozon-1",
  source: "Ozon",
  seller: "Официальный магазин",
  title: "Kingston Server Premier 32GB",
  mpn: "KSM48E40BD8KI-32HA",
  price: 12990,
  oldPrice: 14990,
  priceCondition: "public",
  currency: "RUB",
  availability: "В наличии",
  delivery: "1–2 дня",
  condition: "new",
  match: "exact",
  url: "https://www.ozon.ru/product/example",
  fetchedAt: "2026-09-25T08:00:00Z",
  demo: true,
};

const state = vi.hoisted(() => ({
  offer: undefined as Offer | undefined,
  closeOffer: vi.fn(),
  openOffer: vi.fn(),
}));

vi.mock("features/search", () => ({
  useOfferCard: () => ({
    offer: state.offer,
    closeOffer: state.closeOffer,
    openOffer: state.openOffer,
  }),
}));

import { OfferCard } from "./index";

describe("OfferCard", () => {
  it("renders nothing until a row is opened", () => {
    state.offer = undefined;
    expect(renderToStaticMarkup(<OfferCard />)).toBe("");
  });

  it("shows known offer fields and a secondary shop link", () => {
    state.offer = offer;
    const html = renderToStaticMarkup(<OfferCard />);
    expect(html).toContain("Внутренняя карточка");
    expect(html).toContain("Kingston Server Premier 32GB");
    expect(html).toContain("Ozon");
    expect(html).toContain("Официальный магазин");
    expect(html).toContain("В наличии");
    expect(html).toContain("Демо");
    expect(html).toContain("KSM48E40BD8KI-32HA");
    expect(html).toContain("Открыть на площадке");
    expect(html).toContain(offer.url);
    expect(html).toContain("Время запроса");
    expect(html).not.toContain("Съём");
    expect(html).toContain("Фото нет в данных предложения");
    expect(html).not.toContain("<img");
    expect(html).not.toMatch(/MCP|VNC|CDP|source\.message|Пройти проверку|wb_search/i);
  });

  it("omits the demo badge for public offers", () => {
    state.offer = { ...offer, demo: false };
    const html = renderToStaticMarkup(<OfferCard />);
    expect(html).not.toContain("Демо");
    expect(html).toContain("Открыть на площадке");
  });
});

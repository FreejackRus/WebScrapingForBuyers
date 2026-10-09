import type { Offer, SearchSnapshot } from "@peremena/contracts";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

const offer: Offer = {
  id: "wb-1",
  source: "Wildberries",
  seller: "Seller",
  title: "Logitech MX Master 3S",
  price: 8990,
  priceCondition: "public",
  currency: "RUB",
  availability: "В наличии",
  condition: "new",
  match: "exact",
  url: "https://www.wildberries.ru/catalog/1/detail.aspx",
  fetchedAt: "2026-09-25T08:00:00Z",
  demo: false,
};

const reviewOffer = {
  ...offer,
  id: "wb-review",
  title: "Logitech MX Master 3S compatible shell",
  assessment: {
    group: "needs_review" as const,
    reasons: ["В названии есть признаки другого товара"],
  },
};

const rows = [offer, reviewOffer];
const tablePage = {
  rows: [offer],
  reviewRows: [reviewOffer],
  total: 1,
};

const snapshot: SearchSnapshot = {
  id: "search",
  query: "MX Master",
  status: "complete",
  offers: rows,
  product: {
    id: "mouse",
    brand: "Logitech",
    model: "MX Master 3S",
    name: "Logitech MX Master 3S",
    mpn: "",
    category: "",
    characteristics: {},
  },
  sources: [{ source: "Wildberries", status: "done" }],
};

const openOffer = vi.fn();

vi.mock("features/search", () => ({
  useFilteredOffers: () => rows,
  useOfferTable: () => ({
    ...tablePage,
    page: 1,
    pageCount: 1,
    pageSize: 8,
    sort: undefined,
    setPage: vi.fn(),
    cycleSort: vi.fn(),
    selectSort: vi.fn(),
  }),
  useOfferCard: () => ({ offer: undefined, openOffer, closeOffer: vi.fn() }),
  useOfferColumns: () => ({
    columns: [
      { key: "source", label: "Источник / продавец" },
      { key: "title", label: "Товар" },
      { key: "match", label: "Совпадение" },
      { key: "price", label: "Цена" },
      { key: "availability", label: "Наличие" },
      { key: "conditions", label: "Условия" },
      { key: "fetched", label: "Время запроса" },
    ],
    visible: [
      { key: "source", label: "Источник / продавец" },
      { key: "title", label: "Товар" },
      { key: "match", label: "Совпадение" },
      { key: "price", label: "Цена" },
      { key: "availability", label: "Наличие" },
      { key: "conditions", label: "Условия" },
      { key: "fetched", label: "Время запроса" },
    ],
    hidden: [],
    widthOf: () => 120,
    toggle: vi.fn(),
    setWidth: vi.fn(),
    reset: vi.fn(),
  }),
}));
vi.mock("entities/search", () => ({
  useSearchStore: (
    selector: (value: {
      offerFilter: string;
      setOfferFilter: () => void;
      tableFilter: undefined;
      setTableFilter: () => void;
      snapshot: SearchSnapshot;
    }) => unknown,
  ) =>
    selector({
      offerFilter: "",
      setOfferFilter: vi.fn(),
      tableFilter: undefined,
      setTableFilter: vi.fn(),
      snapshot,
    }),
}));
vi.mock("entities/analysis", () => ({
  useAnalysisStore: (selector: (value: { analysis: { selectedOfferIds: string[] } }) => unknown) =>
    selector({ analysis: { selectedOfferIds: [reviewOffer.id] } }),
}));

import { OfferTable } from "./index";

describe("OfferTable", () => {
  it("opens the internal card instead of jumping to the shop", () => {
    const html = renderToStaticMarkup(<OfferTable />);
    expect(html).toContain("offer-row");
    expect(html).toContain(">Карточка</button>");
    expect(html).toContain("Время запроса");
    expect(html).toContain("Столбцы");
    expect(html).not.toContain("Съём");
    expect(html).not.toContain("К офферу");
    expect(html).not.toContain(`href="${offer.url}"`);
    expect(html).not.toMatch(/MCP|VNC|CDP|source\.message/i);
  });

  it("keeps legacy offers in the main table and collapses offers that need review", () => {
    const html = renderToStaticMarkup(<OfferTable />);

    expect(html).toContain("<details");
    expect(html).not.toMatch(/<details[^>]*\sopen(?:=|\s|>)/);
    expect(html).toContain("Требует уточнения — 1");
    expect(html).toContain("В названии есть признаки другого товара");
    expect(html.indexOf(offer.title)).toBeLessThan(html.indexOf("Требует уточнения — 1"));
    expect(html.indexOf("Требует уточнения — 1")).toBeLessThan(html.indexOf(reviewOffer.title));
    expect(html).not.toContain("Лучший выбор");
    expect(html).not.toContain("offer-cta primary");
  });

  it("explains when every filtered offer needs review", () => {
    tablePage.rows = [];
    tablePage.reviewRows = [reviewOffer];
    tablePage.total = 0;

    try {
      const html = renderToStaticMarkup(<OfferTable />);
      expect(html).toContain("Нет предложений без уточнений");
      expect(html).toContain("Все найденные предложения требуют проверки");
      expect(html).not.toContain("Предложения не найдены");
      expect(html).toContain("Требует уточнения — 1");
    } finally {
      tablePage.rows = [offer];
      tablePage.reviewRows = [reviewOffer];
      tablePage.total = 1;
    }
  });
});

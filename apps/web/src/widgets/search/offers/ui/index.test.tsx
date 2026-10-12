import type { Offer, OfferTableFilter, SearchSnapshot } from "@peremena/contracts";
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
let mockTableFilter: OfferTableFilter | undefined;

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
      tableFilter: OfferTableFilter | undefined;
      setTableFilter: () => void;
      snapshot: SearchSnapshot;
    }) => unknown,
  ) =>
    selector({
      offerFilter: "",
      setOfferFilter: vi.fn(),
      tableFilter: mockTableFilter,
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
    expect(html).toContain("Только в наличии");
    expect(html).toContain("Максимальная цена");
    expect(html).toContain("Состояние товара");
    expect(html).toContain("Поставщик");
    expect(html).toContain("Комплектация");
    expect(html).toContain("BOX — розничная упаковка; OEM — поставка производителя без обещания состава");
    expect(html).toContain("По соответствию и наличию");
    expect(html).not.toContain("По порядку загрузки");
    expect(html).not.toContain("Лучший выбор");
  });

  it("does not repeat a seller that matches the source", () => {
    const previousSeller = offer.seller;
    offer.seller = offer.source;
    try {
      const html = renderToStaticMarkup(<OfferTable />);
      expect(html).not.toContain(`· ${offer.source}`);
      expect(html).not.toContain(`offer-seller-desktop\">${offer.source}`);
    } finally {
      offer.seller = previousSeller;
    }
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

  it("offers stock, budget, condition, supplier and packaging filters without the chat", () => {
    mockTableFilter = undefined;
    const html = renderToStaticMarkup(<OfferTable />);
    expect(html).toContain("Только в наличии");
    expect(html).toContain("Максимальная цена");
    expect(html).toContain("Состояние товара");
    expect(html).toContain("Поставщик");
    expect(html).toContain("Комплектация");
    expect(html).toContain("BOX — розничная упаковка");
    expect(html).toContain(">Wildberries</option>");
    expect(html).toContain("По соответствию и наличию");
    expect(html).not.toContain("offer-filter-chips");
  });

  it("shows each active condition as a removable chip", () => {
    mockTableFilter = { inStockOnly: true, maxPrice: 15_000, conditions: ["new"], sources: ["Wildberries"], packaging: "BOX" };
    const html = renderToStaticMarkup(<OfferTable />);
    mockTableFilter = undefined;
    expect(html).toContain("offer-filter-chips");
    for (const label of ["В наличии", "До 15", "Новый товар", "Поставщик: Wildberries", "Комплектация: BOX", "Сбросить всё"]) {
      expect(html).toContain(label);
    }
    expect(html.match(/class="offer-filter-chip"/g)).toHaveLength(5);
  });
});

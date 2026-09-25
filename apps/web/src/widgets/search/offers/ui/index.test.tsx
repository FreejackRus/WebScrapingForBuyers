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

const snapshot: SearchSnapshot = {
  id: "search",
  query: "MX Master",
  status: "complete",
  offers: [offer],
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
  useFilteredOffers: () => [offer],
  useOfferTable: () => ({
    rows: [offer],
    total: 1,
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
  useAnalysisStore: (selector: (value: { analysis: undefined }) => unknown) =>
    selector({ analysis: undefined }),
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
});

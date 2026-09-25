import type { Offer, SearchSnapshot } from "@peremena/contracts";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const state = vi.hoisted(() => ({
  snapshot: undefined as SearchSnapshot | undefined,
  error: "",
  offerFilter: "",
  tableFilter: undefined,
  selectedOfferId: undefined,
  setOfferFilter: vi.fn(),
  setTableFilter: vi.fn(),
  openOffer: vi.fn(),
  closeOffer: vi.fn(),
}));

vi.mock("entities/search", () => ({
  useSearchStore: (selector: (value: typeof state) => unknown) => selector(state),
  searchApi: { exportUrl: () => "/export.xlsx" },
}));
vi.mock("entities/user", () => ({
  useUserStore: (selector: (value: { user: { role: string } }) => unknown) => selector({ user: { role: "manager" } }),
}));
vi.mock("entities/analysis", () => ({
  useAnalysisStore: (selector: (value: { analysis: undefined }) => unknown) => selector({ analysis: undefined }),
}));

import { SearchWorkspace } from "./index";

function offer(demo: boolean, price: number): Offer {
  return {
    id: `${demo}-${price}`, source: "Store", seller: "Seller", title: "Keyboard", price,
    priceCondition: "public", currency: "RUB", availability: "В наличии", condition: "new",
    match: "exact", url: "https://example.com/product", fetchedAt: "2026-09-24T08:00:00Z", demo,
  };
}

describe("search workspace data states", () => {
  beforeEach(() => {
    state.offerFilter = "";
    state.snapshot = {
      id: "search", query: "Keyboard", status: "complete", offers: [],
      product: { id: "keyboard", brand: "Brand", model: "Keyboard", name: "Keyboard", mpn: "", category: "", characteristics: {} },
      sources: [{ source: "Store", status: "done" }],
    };
  });

  it("shows an honest starting state before the first search", () => {
    state.snapshot = undefined;
    const html = renderToStaticMarkup(<SearchWorkspace />);
    expect(html).toContain("Найдите модель — покажем предложения");
    expect(html).toContain("Укажите товар");
    expect(html).not.toContain("Таблица предложений");
    expect(html).not.toMatch(/демо|DEMO|демонстрацион/i);
  });

  it("does not present non-public rows as the best public price", () => {
    state.snapshot!.offers = [offer(true, 100)];
    const html = renderToStaticMarkup(<SearchWorkspace />);
    expect(html).toMatch(/Лучшая публичная<\/span><b class="mono">—<\/b>/);
    expect(html).not.toMatch(/демо|DEMO|демонстрацион/i);
  });

  it("shows best public price without demo banners", () => {
    state.snapshot!.offers = [offer(false, 500)];
    const html = renderToStaticMarkup(<SearchWorkspace />);
    expect(html).toContain("Минимум среди загруженных");
    expect(html).not.toMatch(/демо|DEMO|демонстрацион|REAL/i);
  });

  it("distinguishes completed empty results from collection still running", () => {
    let html = renderToStaticMarkup(<SearchWorkspace />);
    expect(html).toContain("Предложения не найдены");
    expect(html).not.toContain("Собираем предложения");
    state.snapshot!.status = "running";
    html = renderToStaticMarkup(<SearchWorkspace />);
    expect(html).toContain("Собираем предложения");
  });

  it("explains failed collection without exposing source diagnostics to managers", () => {
    state.snapshot!.sources = [{ source: "Store", status: "error", message: "private-diagnostic" }];
    const html = renderToStaticMarkup(<SearchWorkspace />);
    expect(html).toContain("Есть ошибки");
    expect(html).toContain("Не удалось получить предложения");
    expect(html).not.toContain("private-diagnostic");
    expect(html).not.toContain("Собираем предложения");
    expect(html).not.toContain("Коннекторы");
    expect(html).not.toContain("Пройти проверку");
  });

  it("offers a filter reset when downloaded rows are hidden", () => {
    state.snapshot!.offers = [offer(false, 500)];
    state.offerFilter = "not-a-match";
    const html = renderToStaticMarkup(<SearchWorkspace />);
    expect(html).toContain("Нет предложений по этому фильтру");
    expect(html).toContain("Сбросить все фильтры");
    expect(html).not.toContain("Собираем предложения");
  });

  it("does not show a partial-collection banner to managers", () => {
    state.snapshot!.offers = [offer(false, 500)];
    state.snapshot!.sources.push({ source: "Unavailable", status: "error" });
    expect(renderToStaticMarkup(<SearchWorkspace />)).not.toContain("Сбор завершён частично");
  });
});

import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const state = vi.hoisted(() => ({
  query: "",
  suggestions: [],
  activity: "idle",
  suggesting: false,
  availableSources: ["Wildberries", "Ozon"],
  selectedSources: ["Wildberries", "Ozon"],
  setQuery: vi.fn(),
  setSelectedSources: vi.fn(),
  loadSources: vi.fn(),
  suggest: vi.fn(),
  history: [] as Array<{ id: string; query: string; createdAt: string; product: object }>,
  loadHistory: vi.fn(),
  removeHistoryEntry: vi.fn(),
  clearHistory: vi.fn(),
}));

vi.mock("entities/search", () => ({
  useSearchStore: (selector: (value: typeof state) => unknown) => selector(state),
}));
vi.mock("features/search", () => ({ startSearch: vi.fn() }));

import { SearchCommand, SuggestionList } from "./index";

describe("SearchCommand", () => {
  beforeEach(() => {
    state.query = "";
    state.activity = "idle";
    state.history = [];
    state.selectedSources = ["Wildberries", "Ozon"];
  });

  it("shows the keyboard shortcut without an unnecessary clear button", () => {
    const html = renderToStaticMarkup(<SearchCommand />);
    expect(html).toContain("Ctrl+K");
    expect(html).not.toContain("Очистить поиск");
  });

  it("offers to clear a typed query while search is idle", () => {
    state.query = "Logitech MX Master 3S";
    const html = renderToStaticMarkup(<SearchCommand />);
    expect(html).toContain('aria-label="Очистить поиск"');
    expect(html).toContain('type="button"');
  });

  it("does not offer to clear a query during a running search", () => {
    state.query = "Logitech MX Master 3S";
    state.activity = "search";
    expect(renderToStaticMarkup(<SearchCommand />)).not.toContain("Очистить поиск");
  });

  it("keeps the search action visible while autocomplete is loading", () => {
    state.query = "Logitech MX Master 3S";
    state.suggesting = true;
    const html = renderToStaticMarkup(<SearchCommand />);
    expect(html).toContain(">Найти</button>");
    state.suggesting = false;
  });

  it("states the equipment scope and offers example queries while the field is empty", () => {
    const html = renderToStaticMarkup(<SearchCommand />);
    expect(html).toContain("IT-оборудование и комплектующие");
    expect(html).toContain('role="group"');
    expect(html).toContain("Мышь Logitech G102");
    state.query = "Logitech";
    expect(renderToStaticMarkup(<SearchCommand />)).not.toContain("Мышь Logitech G102");
    state.query = "";
  });

  it("shows the remembered searches instead of examples and lets the buyer manage them", () => {
    state.history = [
      { id: "1", query: "SSD Kingston NV2", createdAt: "2026-10-04T10:00:00.000Z", product: {} },
      { id: "2", query: "Мышь Logitech G102", createdAt: "2026-10-04T09:00:00.000Z", product: {} },
    ];
    const html = renderToStaticMarkup(<SearchCommand />);
    expect(html).toContain("Недавние запросы");
    expect(html).toContain("SSD Kingston NV2");
    expect(html).toContain('aria-label="Удалить «SSD Kingston NV2» из истории"');
    expect(html).toContain("Очистить историю");
    expect(html).not.toContain("Например:</span>");
    state.query = "ssd";
    expect(renderToStaticMarkup(<SearchCommand />)).not.toContain("Недавние запросы");
    state.query = "";
  });

  it("lets the buyer pick sources for the request", () => {
    const html = renderToStaticMarkup(<SearchCommand />);
    expect(html).toContain("Поставщики для запроса");
    expect(html).toContain("Wildberries");
    expect(html).toContain("Ozon");
  });

  it("keeps the supplier picker compact: a one-line summary that expands on demand", () => {
    const html = renderToStaticMarkup(<SearchCommand />);
    expect(html).toContain("<details");
    expect(html).toContain("Поставщики: 2 из 2");
    state.selectedSources = ["Ozon"];
    expect(renderToStaticMarkup(<SearchCommand />)).toContain("Поставщики: 1 из 2");
    state.selectedSources = ["Wildberries", "Ozon"];
  });

  it("exposes the field as a combobox that is collapsed while no suggestions are shown", () => {
    const html = renderToStaticMarkup(<SearchCommand />);
    expect(html).toContain('role="combobox"');
    expect(html).toContain('aria-expanded="false"');
    expect(html).not.toContain("aria-controls");
    expect(html).not.toContain("aria-activedescendant");
  });

  it("gives every suggestion a stable option id and keeps its inner button out of the tab order", () => {
    const products = [
      { id: "a", name: "Мышь A", brand: "Logitech", category: "Мыши", mpn: "", model: "A", characteristics: {} },
      { id: "b", name: "Мышь B", brand: "Logitech", category: "Мыши", mpn: "", model: "B", characteristics: {} },
    ] as never[];
    const html = renderToStaticMarkup(
      <SuggestionList
        listId="L"
        suggestions={products}
        activeIndex={1}
        suggesting={false}
        disabled={false}
        onHover={() => undefined}
        onPick={() => undefined}
      />,
    );
    expect(html).toContain('id="L"');
    expect(html).toContain('id="L-opt-0"');
    expect(html).toContain('id="L-opt-1"');
    expect(html).toContain('role="option"');
    expect(html).toContain('tabindex="-1"');
  });

  it("explains a disabled search when no supplier is selected and opens the supplier picker", () => {
    state.selectedSources = [];
    state.query = "Logitech MX Master 3S";
    const html = renderToStaticMarkup(<SearchCommand />);
    expect(html).toContain("Выберите хотя бы одного поставщика");
    expect(html).toContain('role="status"');
    expect(html).toMatch(/<details[^>]*\sopen=""/);
    const id = /id="([^"]+)"[^>]*>Выберите хотя бы одного поставщика/.exec(html)?.[1];
    expect(id).toBeTruthy();
    expect(html).toContain(`aria-describedby="${id}"`);
    expect(html).toContain('type="submit"');
    state.selectedSources = ["Wildberries", "Ozon"];
    state.query = "";
    const ok = renderToStaticMarkup(<SearchCommand />);
    expect(ok).not.toContain("Выберите хотя бы одного поставщика");
    expect(ok).not.toMatch(/<details[^>]*\sopen=""/);
  });

  it("describes the Ctrl+K shortcut for assistive tech and hides the visible badge", () => {
    const html = renderToStaticMarkup(<SearchCommand />);
    expect(html).toContain("Сочетание клавиш Ctrl+K (⌘K на Mac) фокусирует поиск");
    expect(html).toMatch(/<span[^>]*aria-hidden="true"[^>]*>Ctrl\+K<\/span>/);
  });
});

it("offers a labelled product category selector", () => {
  expect(renderToStaticMarkup(<SearchCommand />)).toContain('aria-label="Категория товара"');
});

import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const state = vi.hoisted(() => ({
  query: "",
  suggestions: [],
  activity: "idle",
  suggesting: false,
  setQuery: vi.fn(),
  suggest: vi.fn(),
}));

vi.mock("entities/search", () => ({
  useSearchStore: (selector: (value: typeof state) => unknown) => selector(state),
}));
vi.mock("features/search", () => ({ startSearch: vi.fn() }));

import { SearchCommand } from "./index";

describe("SearchCommand", () => {
  beforeEach(() => {
    state.query = "";
    state.activity = "idle";
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
});

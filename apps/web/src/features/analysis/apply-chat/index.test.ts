import { beforeEach, describe, expect, it, vi } from "vitest";

const setQuery = vi.fn();
const suggest = vi.fn();
const start = vi.fn().mockResolvedValue(undefined);
const setTableFilter = vi.fn();

vi.mock("entities/search", () => ({
  useSearchStore: {
    getState: () => ({ setQuery, suggest, setTableFilter, start }),
  },
}));

import { applyChatResult } from "./index.js";

describe("applyChatResult", () => {
  beforeEach(() => {
    setQuery.mockReset();
    suggest.mockReset();
    start.mockClear();
    setTableFilter.mockReset();
  });

  it("applies model searchQuery on search intent", () => {
    applyChatResult({
      summary: "Ищу Logitech G102",
      selectedOfferIds: [],
      appliedFilters: [],
      warnings: [],
      citations: [],
      intent: "search",
      searchQuery: "Logitech G102",
    });
    expect(setQuery).toHaveBeenCalledWith("Logitech G102");
    expect(start).toHaveBeenCalledWith(expect.objectContaining({ name: "Logitech G102", characteristics: { источник: "typed" } }));
    expect(suggest).not.toHaveBeenCalled();
    expect(setTableFilter).toHaveBeenCalledWith(undefined);
  });

  it("does not copy arbitrary text into the search box", () => {
    applyChatResult({
      summary: "Я копайлот",
      selectedOfferIds: [],
      appliedFilters: [],
      warnings: [],
      citations: [],
      intent: "help",
    });
    expect(setQuery).not.toHaveBeenCalled();
  });

  it("keeps the manager's table filter on a conversational reply", () => {
    // «так стопэ, было же наличие» after «только в наличии» must not bring back every row.
    applyChatResult({
      summary: "Подтверждённое наличие только у двух предложений.",
      selectedOfferIds: [],
      appliedFilters: [],
      warnings: [],
      citations: [],
      intent: "help",
    });
    expect(setTableFilter).not.toHaveBeenCalled();
  });

  it("applies tableFilter on filter intent", () => {
    applyChatResult({
      summary: "Оставлены выбранные строки",
      selectedOfferIds: ["a"],
      appliedFilters: [],
      warnings: [],
      citations: [],
      intent: "filter",
      tableFilter: { realOnly: true },
    });
    expect(setTableFilter).toHaveBeenCalledWith({ realOnly: true, selectedOfferIds: ["a"] });
    expect(setQuery).not.toHaveBeenCalled();
  });

  it("falls back to selectedOfferIds when tableFilter is missing", () => {
    applyChatResult({
      summary: "Таблица отфильтрована",
      selectedOfferIds: ["x", "y"],
      appliedFilters: [],
      warnings: [],
      citations: [],
      intent: "filter",
    });
    expect(setTableFilter).toHaveBeenCalledWith({ selectedOfferIds: ["x", "y"] });
  });
});

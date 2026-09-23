import { beforeEach, describe, expect, it, vi } from "vitest";

const setQuery = vi.fn();
const suggest = vi.fn();
const setTableFilter = vi.fn();

vi.mock("entities/search", () => ({
  useSearchStore: {
    getState: () => ({ setQuery, suggest, setTableFilter }),
  },
}));

import { applyChatResult } from "./index.js";

describe("applyChatResult", () => {
  beforeEach(() => {
    setQuery.mockReset();
    suggest.mockReset();
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
    expect(suggest).toHaveBeenCalled();
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
    expect(setTableFilter).toHaveBeenCalledWith(undefined);
  });

  it("applies tableFilter on filter intent", () => {
    applyChatResult({
      summary: "Только REAL",
      selectedOfferIds: ["a"],
      appliedFilters: [],
      warnings: [],
      citations: [],
      intent: "filter",
      tableFilter: { realOnly: true },
    });
    expect(setTableFilter).toHaveBeenCalledWith({ realOnly: true });
    expect(setQuery).not.toHaveBeenCalled();
  });
});

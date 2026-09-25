import { beforeEach, describe, expect, it, vi } from "vitest";

const api = vi.hoisted(() => ({ suggest: vi.fn() }));

vi.mock("../api", () => ({ searchApi: api }));

import { useSearchStore } from "./index";

describe("catalog suggestions", () => {
  beforeEach(() => {
    api.suggest.mockReset();
    useSearchStore.setState({
      query: "Logitech MX Master 3S",
      suggestions: [],
      suggesting: false,
      activity: null,
      error: "",
    });
  });

  it("does not turn an empty background autocomplete into a search error", async () => {
    api.suggest.mockResolvedValue({ products: [] });
    await useSearchStore.getState().suggest({ quiet: true });
    expect(useSearchStore.getState().error).toBe("");
    expect(useSearchStore.getState().suggesting).toBe(false);
  });

  it("does not show a blocking error when background autocomplete fails", async () => {
    api.suggest.mockRejectedValue(new Error("Источник подсказок недоступен"));
    await useSearchStore.getState().suggest({ quiet: true });
    expect(useSearchStore.getState().error).toBe("");
    expect(useSearchStore.getState().suggesting).toBe(false);
  });

  it("retains feedback for an explicitly requested catalog suggestion", async () => {
    api.suggest.mockResolvedValue({ products: [] });
    await useSearchStore.getState().suggest();
    expect(useSearchStore.getState().error).toContain("Подсказок нет");
  });
});

import type { SearchHistoryEntry } from "@peremena/contracts";
import { beforeEach, describe, expect, it, vi } from "vitest";

const api = vi.hoisted(() => ({
  history: vi.fn(),
  removeHistory: vi.fn(),
  clearHistory: vi.fn(),
  start: vi.fn(),
  subscribe: vi.fn(),
}));

vi.mock("../api", () => ({ searchApi: api }));

import { useSearchStore } from "./index";

const entry = (id: string, query: string): SearchHistoryEntry => ({
  id,
  query,
  createdAt: "2026-10-04T10:00:00.000Z",
  product: { id, brand: "", model: query, name: query, mpn: "", category: "Каталог", characteristics: {} },
});

describe("search history", () => {
  beforeEach(() => {
    Object.values(api).forEach((fn) => fn.mockReset());
    useSearchStore.setState({ history: [], activity: null, error: "", selectedSources: ["Ozon"] });
  });

  it("loads the remembered searches of the user", async () => {
    api.history.mockResolvedValue({ history: [entry("1", "мышь g102")] });
    await useSearchStore.getState().loadHistory();
    expect(useSearchStore.getState().history.map((item) => item.query)).toEqual(["мышь g102"]);
  });

  it("keeps working when history cannot be loaded", async () => {
    api.history.mockRejectedValue(new Error("down"));
    await useSearchStore.getState().loadHistory();
    expect(useSearchStore.getState().history).toEqual([]);
    expect(useSearchStore.getState().error).toBe("");
  });

  it("removes one entry optimistically and clears all", async () => {
    useSearchStore.setState({ history: [entry("1", "a1"), entry("2", "b2")] });
    api.removeHistory.mockResolvedValue({ ok: true });
    await useSearchStore.getState().removeHistoryEntry("1");
    expect(useSearchStore.getState().history.map((item) => item.id)).toEqual(["2"]);
    api.clearHistory.mockResolvedValue({ ok: true });
    await useSearchStore.getState().clearHistory();
    expect(useSearchStore.getState().history).toEqual([]);
  });

  it("refreshes the list after a search was started", async () => {
    api.start.mockResolvedValue({ id: "s1", query: "ssd nv2", status: "running", offers: [], sources: [], product: entry("s1", "ssd nv2").product });
    api.subscribe.mockReturnValue({ close: vi.fn(), readyState: 0 });
    api.history.mockResolvedValue({ history: [entry("s1", "ssd nv2")] });
    await useSearchStore.getState().start(entry("s1", "ssd nv2").product);
    await vi.waitFor(() => expect(useSearchStore.getState().history).toHaveLength(1));
  });

  it("resynchronizes on cascading errors instead of restoring stale snapshots", async () => {
    useSearchStore.setState({ history: [entry("1", "a1"), entry("2", "b2")] });
    api.removeHistory.mockRejectedValue(new Error("network error"));
    // Simulate server still has both after first failed removal attempt
    api.history.mockResolvedValue({ history: [entry("1", "a1"), entry("2", "b2")] });

    // First removal fails: optimistically set to [b2], then error calls loadHistory
    await useSearchStore.getState().removeHistoryEntry("1");
    expect(useSearchStore.getState().history).toEqual([entry("1", "a1"), entry("2", "b2")]);

    // Second removal also fails: should resync via loadHistory, not restore old snapshot
    // This prevents the ghost resurrection of already-attempted-deletion items
    await useSearchStore.getState().removeHistoryEntry("2");
    expect(useSearchStore.getState().history).toEqual([entry("1", "a1"), entry("2", "b2")]);
  });
});

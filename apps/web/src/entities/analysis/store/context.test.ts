import { beforeEach, describe, expect, it, vi } from "vitest";
const { analyze, chat } = vi.hoisted(() => ({ analyze: vi.fn(), chat: vi.fn() }));
vi.mock("../api", () => ({ analysisApi: { analyze, chat } }));
import { useAnalysisStore } from "./index";
const result = { summary: "Ответ", selectedOfferIds: ["cpu"], appliedFilters: [], warnings: [] };
beforeEach(() => { useAnalysisStore.getState().reset(); vi.clearAllMocks(); });
describe("analysis context and pending responses", () => {
  it("passes active filters and selection to snapshot analysis", async () => {
    analyze.mockResolvedValue(result);
    const context = { tableFilter: { maxPrice: 15000 }, selectedOfferIds: ["cpu"] };
    await useAnalysisStore.getState().run("s1", "а BOX?", context);
    expect(analyze).toHaveBeenCalledWith("s1", "а BOX?", [], context);
  });
  it("does not restore an answer or conversation after reset", async () => {
    let resolve!: (value: typeof result) => void;
    analyze.mockReturnValue(new Promise((done) => { resolve = done; }));
    const pending = useAnalysisStore.getState().run("s1", "почему этот?");
    useAnalysisStore.getState().reset();
    resolve(result);
    expect(await pending).toBeUndefined();
    expect(useAnalysisStore.getState().analysis).toBeUndefined();
    expect(useAnalysisStore.getState().messages).toEqual([]);
    expect(useAnalysisStore.getState().busy).toBe(false);
  });
  it("does not append a stale transport error after reset", async () => {
    let reject!: (error: Error) => void;
    chat.mockReturnValue(new Promise((_done, fail) => { reject = fail; }));
    const pending = useAnalysisStore.getState().chat("найди 12400F");
    useAnalysisStore.getState().reset();
    reject(new Error("network"));
    expect(await pending).toBeUndefined();
    expect(useAnalysisStore.getState().messages).toEqual([]);
  });
  it("discards a result if another search became active", async () => {
    let resolve!: (value: typeof result) => void;
    analyze.mockReturnValue(new Promise((done) => { resolve = done; }));
    let searchId = "s1";
    const pending = useAnalysisStore.getState().run("s1", "почему этот?", {}, () => searchId === "s1");
    searchId = "s2";
    resolve(result);
    expect(await pending).toBeUndefined();
    expect(useAnalysisStore.getState().analysis).toBeUndefined();
    expect(useAnalysisStore.getState().messages.filter(m => m.role === "assistant")).toEqual([]);
    expect(useAnalysisStore.getState().busy).toBe(false);
  });
  it("shows a clarification question instead of applying a guessed result", async () => {
    analyze.mockResolvedValue({ ...result, summary: "Уточнение", clarificationQuestion: "Искать другой процессор или оставить текущий?" });
    await useAnalysisStore.getState().run("s1", "а другой?");
    expect(useAnalysisStore.getState().messages.at(-1)?.text).toBe("Искать другой процессор или оставить текущий?");
  });
});

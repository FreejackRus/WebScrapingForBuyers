import { beforeEach, expect, it, vi } from "vitest";
const { request } = vi.hoisted(() => ({ request: vi.fn().mockResolvedValue({}) }));
vi.mock("shared/api", () => ({ apiUrl: (path: string) => path, request }));
import { analysisApi } from "./index";
beforeEach(() => vi.clearAllMocks());
it("serializes active context only for analysis with a snapshot", async () => {
  const context = { tableFilter: { inStockOnly: true, maxPrice: 15000 }, selectedOfferIds: ["cpu"] };
  await analysisApi.analyze("s1", "а BOX?", [], context);
  expect(JSON.parse(request.mock.calls[0]![1].body)).toEqual({ prompt: "а BOX?", history: [], context });
  await analysisApi.chat("найди 12400F", []);
  expect(JSON.parse(request.mock.calls[1]![1].body)).toEqual({ prompt: "найди 12400F", history: [] });
});

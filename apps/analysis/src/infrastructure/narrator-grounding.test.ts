import type { Offer } from "@peremena/contracts";
import { afterEach, describe, expect, it, vi } from "vitest";
import { OllamaAnalysisNarrator } from "./ollama-analysis-narrator.js";
afterEach(() => vi.unstubAllGlobals());
const offer: Offer = { id: "cpu", title: "Intel 12400F BOX", source: "NETLAB", seller: "NETLAB", price: 13445, availability: "склад: более 50 шт.", currency: "RUB", priceCondition: "Обычная", condition: "new", match: "exact", url: "https://netlab.ru/product/1", fetchedAt: "today", demo: false };
const context = { product: { id: "p", name: "12400F", model: "12400F", brand: "Intel", mpn: "", category: "Процессоры", characteristics: {} }, status: "running" as const, selectedOfferIds: ["cpu"], offers: [offer] };
function mockReply(content: object) { return new Response(JSON.stringify({ done: true, done_reason: "stop", message: { role: "assistant", content: JSON.stringify(content) } })); }
describe("bounded structured facts", () => {
  it("accepts optional offer IDs and clarification", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => mockReply({ summary: "Уточните товар.", warnings: [], offerIds: ["cpu"], clarificationQuestion: "Оставить BOX для текущего процессора?" })));
    const answer = await new OllamaAnalysisNarrator("http://ollama", "qwen").answer({ prompt: "а другой?", trustedContext: context });
    expect(answer.offerIds).toEqual(["cpu"]);
    expect(answer.clarificationQuestion).toBe("Оставить BOX для текущего процессора?");
  });
  it.each([{ids:["unknown"]}, {ids:Array.from({ length: 21 }, (_, i) => `o-${i}`)}, {ids:["cpu", "cpu"]}])("rejects IDs outside bounded facts $ids", async ({ids}) => {
    vi.stubGlobal("fetch", vi.fn(async () => mockReply({ summary: "Уточните товар.", warnings: [], offerIds: ids })));
    await expect(new OllamaAnalysisNarrator("http://ollama", "qwen").answer({ prompt: "почему?", trustedContext: context })).rejects.toThrow();
  });
  it("transmits bounded trusted context and no URLs", async () => {
    let payload: any;
    let system = "";
    vi.stubGlobal("fetch", vi.fn(async (_url, init) => {
      const body = JSON.parse(String(init.body)); system = body.messages[0].content; payload = JSON.parse(body.messages[1].content);
      return mockReply({ summary: "Сравните предложения в таблице.", warnings: [] });
    }));
    await new OllamaAnalysisNarrator("http://ollama", "qwen").answer({ prompt: "почему?", trustedContext: { ...context, offers: Array.from({length: 25}, (_, i) => ({...offer, id: `cpu-${i}`, title: "я".repeat(1000)})) } });
    expect(payload.trustedContext.offers).toHaveLength(20);
    expect(payload.trustedContext.status).toBe("running");
    expect(payload.trustedContext.offers[0].title.length).toBeLessThan(600);
    expect(JSON.stringify(payload.trustedContext)).not.toContain("https://");
    expect(system).toMatch(/гаранти|комплект/);
  });
});

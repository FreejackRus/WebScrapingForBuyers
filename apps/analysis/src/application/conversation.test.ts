import type { Offer, SearchSnapshot } from "@peremena/contracts";
import { describe, expect, it } from "vitest";

import type { AnalysisNarrator, CopilotChatInput } from "../domain/analysis-narrator.js";
import { analyzeSnapshot } from "./analyze.js";
import { classifyIntent } from "./prompt-intent.js";

// Real manager chat on prod, 2026-10-05, «кабель hdmi»: every line below got the
// same re-told selection «лучший — Авито за 50 ₽» because anything unknown fell
// into "explain".
describe("chat next to an open table", () => {
  it.each([
    ["что есть в наличии?", "filter"],
    ["ага а я хочу по наличию", "filter"],
    ["понятно, а по ссылке ты можешь сам просмотреть?", "help"],
    ["так ты со мной говоришь?", "help"],
    ["ты меня обманул", "help"],
    ["сравни лучшие предложения", "explain"],
    ["покажи самую низкую цену", "explain"],
  ])("«%s» → %s", (prompt, intent) => {
    expect(classifyIntent(prompt, "")).toBe(intent);
  });

  const base = {
    priceCondition: "Обычная цена",
    currency: "RUB" as const,
    condition: "new" as const,
    match: "exact" as const,
    fetchedAt: "2026-10-05T10:00:00Z",
    demo: false,
  };
  const offers: Offer[] = [
    { ...base, id: "avito", source: "Авито", seller: "Частное лицо", title: "Кабель HDMI", price: 50, availability: "Неизвестно", url: "https://avito.ru/1" },
    { ...base, id: "ozon", source: "Ozon", seller: "Ozon", title: "Кабель HDMI 2.1 2 м", price: 390, availability: "В наличии", url: "https://ozon.ru/1" },
    { ...base, id: "wb", source: "Wildberries", seller: "WB", title: "Кабель HDMI 1.5 м", price: 290, availability: "В наличии: 12", url: "https://wb.ru/1" },
  ];
  const snap: SearchSnapshot = {
    id: "s",
    query: "кабель hdmi",
    status: "complete",
    product: { id: "p", brand: "", model: "HDMI", name: "Кабель HDMI", mpn: "", category: "Кабели", characteristics: {} },
    offers,
    sources: [],
  };

  it("«что есть в наличии?» keeps only confirmed stock and says why Avito is hidden", async () => {
    const result = await analyzeSnapshot(snap, "Что есть в наличии?");
    expect(result.intent).toBe("filter");
    expect(result.tableFilter?.inStockOnly).toBe(true);
    expect(result.selectedOfferIds).toEqual(["wb", "ozon"]);
    expect(result.warnings.join(" ")).toMatch(/не сообщает наличие/);
  });

  it("a complaint reaches the model as a question, with table facts, not as a re-told pick", async () => {
    let seen: CopilotChatInput | undefined;
    const narrator: AnalysisNarrator = {
      name: "test",
      summarize: async () => {
        throw new Error("must not re-tell the selection");
      },
      answer: async (input) => {
        seen = input;
        return { summary: "Да, слышу.", warnings: [] };
      },
    };
    const result = await analyzeSnapshot(snap, "ты меня обманул", narrator);
    expect(result.summary).toBe("Да, слышу.");
    expect(seen?.prompt).toBe("ты меня обманул");
    const facts = seen?.tableFacts?.join("\n") ?? "";
    expect(facts).toMatch(/с подтверждённым наличием — 2/);
    expect(facts).toMatch(/Самое дешёвое с подтверждённым наличием: Wildberries/);
    expect(facts).toMatch(/не открывает ссылки/);
  });
});

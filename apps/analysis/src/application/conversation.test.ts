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
    ["пон6ятно а где есть наличие", "filter"],
    ["так стопэ, было же наличие", "help"],
    ["а че так", "help"],
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

  it("asking for stock when nobody confirms it keeps the table and says why", async () => {
    const onlyAvito: SearchSnapshot = { ...snap, offers: offers.filter((offer) => offer.source === "Авито") };
    const result = await analyzeSnapshot(onlyAvito, "понятно а где есть наличие");
    expect(result.tableFilter).toBeUndefined();
    expect(result.intent).toBe("help");
    expect(result.summary).toMatch(/нет подтверждённого наличия/);
    expect(result.summary).not.toMatch(/таблица пустая/);
  });

  it("a remark mid-conversation is sent as chat, without the canned help warning", async () => {
    let hint: string | undefined;
    const narrator: AnalysisNarrator = {
      name: "test",
      summarize: async () => ({ summary: "", warnings: [] }),
      answer: async (input) => {
        hint = input.intentHint;
        return { summary: "По сути.", warnings: [] };
      },
    };
    const result = await analyzeSnapshot(snap, "а че так", narrator);
    expect(hint).toBe("chat");
    expect(result.warnings.join(" ")).not.toMatch(/Не отвечаю на вопросы вне/);
  });

  it("passes earlier turns to the model so «было же наличие» has a referent", async () => {
    let seen: CopilotChatInput | undefined;
    const narrator: AnalysisNarrator = {
      name: "test",
      summarize: async () => ({ summary: "", warnings: [] }),
      answer: async (input) => {
        seen = input;
        return { summary: "Ок.", warnings: [] };
      },
    };
    const history = [
      { role: "user" as const, text: "где есть наличие" },
      { role: "assistant" as const, text: "Подтверждённое наличие у двух: WB и Ozon." },
    ];
    await analyzeSnapshot(snap, "так стопэ, было же наличие", narrator, { history });
    expect(seen?.history).toEqual(history);
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
        return { summary: "Сравните предложения в таблице.", warnings: [] };
      },
    };
    const result = await analyzeSnapshot(snap, "ты меня обманул", narrator);
    expect(result.summary).toBe("Сравните предложения в таблице.");
    expect(seen?.prompt).toBe("ты меня обманул");
    const facts = seen?.tableFacts?.join("\n") ?? "";
    expect(facts).toMatch(/с подтверждённым наличием — 2/);
    expect(facts).toMatch(/Самое дешёвое с подтверждённым наличием: Wildberries/);
    expect(facts).toMatch(/не открывает ссылки/);
  });
});

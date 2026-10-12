import type { Offer } from "@peremena/contracts";
import { afterEach, describe, expect, it, vi } from "vitest";

import { VllmAnalysisNarrator } from "./vllm-analysis-narrator.js";

afterEach(() => vi.unstubAllGlobals());

const offer: Offer = {
  id: "cpu",
  title: "Intel 12400F BOX",
  source: "NETLAB",
  seller: "NETLAB",
  price: 13_445,
  availability: "склад: более 50 шт.",
  currency: "RUB",
  priceCondition: "Обычная",
  condition: "new",
  match: "exact",
  url: "https://netlab.ru/product/1",
  fetchedAt: "today",
  demo: false,
};
const trustedContext = {
  product: { id: "p", name: "12400F", model: "12400F", brand: "Intel", mpn: "", category: "Процессоры", characteristics: {} },
  status: "complete" as const,
  selectedOfferIds: ["cpu"],
  offers: [offer],
};

function completion(content: object, overrides: Record<string, unknown> = {}) {
  return new Response(JSON.stringify({
    choices: [{ finish_reason: "stop", message: { role: "assistant", content: JSON.stringify(content) } }],
    ...overrides,
  }));
}

describe("VllmAnalysisNarrator", () => {
  it("uses the OpenAI-compatible structured-output contract without thinking", async () => {
    let requestedUrl = "";
    let requestHeaders: Headers | undefined;
    let requestBody: Record<string, any> = {};
    vi.stubGlobal("fetch", vi.fn(async (url, init) => {
      requestedUrl = String(url);
      requestHeaders = new Headers(init?.headers);
      requestBody = JSON.parse(String(init?.body));
      return completion({ summary: "Выбрано предложение NETLAB.", warnings: [], offerIds: ["cpu"] });
    }));

    const answer = await new VllmAnalysisNarrator("http://vllm:8000/v1/", "Qwen/Qwen3", "secret-key").answer({
      prompt: "почему этот?",
      trustedContext,
    });

    expect(answer.offerIds).toEqual(["cpu"]);
    expect(requestedUrl).toBe("http://vllm:8000/v1/chat/completions");
    expect(requestHeaders?.get("authorization")).toBe("Bearer secret-key");
    expect(requestBody).toMatchObject({
      model: "Qwen/Qwen3",
      stream: false,
      temperature: 0.3,
      top_p: 0.8,
      max_tokens: 1024,
      chat_template_kwargs: { enable_thinking: false },
      response_format: { type: "json_schema", json_schema: { strict: true } },
    });
    expect(requestBody.response_format.json_schema.schema).toMatchObject({ type: "object" });
    expect(requestBody.messages.map((message: { role: string }) => message.role)).toEqual(["system", "user"]);
  });

  it.each([
    ["length finish", { choices: [{ finish_reason: "length", message: { role: "assistant", content: "{}" } }] }],
    ["wrong role", { choices: [{ finish_reason: "stop", message: { role: "user", content: "{}" } }] }],
    ["malformed choice", { choices: [] }],
  ])("rejects %s", async (_case, payload) => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response(JSON.stringify(payload))));
    await expect(new VllmAnalysisNarrator("http://vllm/v1", "qwen").answer({ prompt: "объясни" })).rejects.toThrow();
  });

  it("keeps upstream secrets out of errors", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response("upstream leaked secret-key", { status: 500 })));
    const error = await new VllmAnalysisNarrator("http://vllm/v1", "qwen", "secret-key")
      .answer({ prompt: "объясни" })
      .catch((caught: unknown) => caught);
    expect(String(error)).not.toContain("secret-key");
    expect(String(error)).not.toContain("upstream leaked");
  });

  it("rejects a response body above the existing byte limit", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => completion({ summary: "я".repeat(70_000), warnings: [] })));
    await expect(new VllmAnalysisNarrator("http://vllm/v1", "qwen").answer({ prompt: "объясни" }))
      .rejects.toThrow("ответ локальной модели не прошёл проверку формата");
  });

  it("reuses grounding validation for unknown offer IDs", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => completion({ summary: "Выбрано.", warnings: [], offerIds: ["invented"] })));
    await expect(new VllmAnalysisNarrator("http://vllm/v1", "qwen").answer({
      prompt: "почему?",
      trustedContext,
    })).rejects.toThrow();
  });
});

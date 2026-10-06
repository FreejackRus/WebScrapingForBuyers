import { afterEach, describe, expect, it, vi } from "vitest";

import { OllamaAnalysisNarrator } from "./ollama-analysis-narrator.js";

afterEach(() => vi.unstubAllGlobals());

function ollamaReply(content: object) {
  return new Response(
    JSON.stringify({ done: true, done_reason: "stop", message: { role: "assistant", content: JSON.stringify(content) } }),
    { status: 200, headers: { "content-type": "application/json" } },
  );
}

describe("OllamaAnalysisNarrator · history", () => {
  it("sends the newest six turns, clipped, and the history rule in the system prompt", async () => {
    const bodies: Array<{ messages: Array<{ role: string; content: string }> }> = [];
    vi.stubGlobal(
      "fetch",
      vi.fn(async (_url: string, init: RequestInit) => {
        bodies.push(JSON.parse(String(init.body)));
        return ollamaReply({ summary: "Да, наличие было у двух предложений.", warnings: [] });
      }),
    );
    const history = Array.from({ length: 8 }, (_, i) => ({
      role: (i % 2 ? "assistant" : "user") as "user" | "assistant",
      text: i === 7 ? "я".repeat(1_000) : `реплика ${i}`,
    }));
    await new OllamaAnalysisNarrator("http://ollama", "qwen3.8:27b-q8_0").answer({
      prompt: "так стопэ, было же наличие",
      history,
    });
    const system = bodies[0]!.messages[0]!.content;
    const payload = JSON.parse(bodies[0]!.messages[1]!.content) as { history: Array<{ text: string }> };
    expect(system).toMatch(/history — предыдущие реплики/);
    expect(payload.history).toHaveLength(6);
    expect(payload.history[0]!.text).toBe("реплика 2");
    expect(payload.history.at(-1)!.text).toBe(`${"я".repeat(400)}…`);
  });
});

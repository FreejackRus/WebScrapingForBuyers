import AgentLoop from "@deepseek-ai/dsh-agent-loop";
import { afterEach, describe, expect, it, vi } from "vitest";

import { NarrationError } from "../domain/narration-error.js";
import { DeepseekHarnessNarrator, runProcurementHarness } from "./deepseek-harness-narrator.js";

afterEach(() => { vi.restoreAllMocks(); vi.unstubAllGlobals(); });

describe("bounded procurement Harness", () => {
  it("executes the official loop and disposes its request-scoped agent", async () => {
    const create = vi.spyOn(AgentLoop.prototype, "createAgent");
    const complete = vi.fn(async (system, payload, signal) => {
      expect(system).toBe("Объясни {{literal}}, не меняй факты.");
      expect(payload).toEqual({ prompt: "почему?" });
      expect(signal).toBeInstanceOf(AbortSignal);
      return { summary: "Проверенный ответ", warnings: [] };
    });
    expect(await runProcurementHarness("local-qwen", "Объясни {{literal}}, не меняй факты.", { prompt: "почему?" }, complete))
      .toEqual({ summary: "Проверенный ответ", warnings: [] });
    expect(complete).toHaveBeenCalledTimes(1);
    expect(create).toHaveBeenCalledTimes(1);
    const handle = await create.mock.results[0]!.value;
    expect(() => handle.agent.ctx.agents).toThrow(/inactive context/);
  });

  it("does not mix concurrent users or their context", async () => {
    const answers = await Promise.all(["первый", "второй"].map((owner) =>
      runProcurementHarness("local-qwen", "Отвечай по данным", { owner }, async (_s, payload) => payload)));
    expect(answers).toEqual([{ owner: "первый" }, { owner: "второй" }]);
  });

  it("refuses oversized input before invoking the model", async () => {
    const complete = vi.fn();
    await expect(runProcurementHarness("local-qwen", "Правила", { prompt: "a".repeat(24_001) }, complete))
      .rejects.toMatchObject({ reason: "context_limit" });
    expect(complete).not.toHaveBeenCalled();
  });

  it("does not invoke the model without a trusted system prompt", async () => {
    const complete = vi.fn();
    await expect(runProcurementHarness("local-qwen", "", {}, complete)).rejects.toBeInstanceOf(NarrationError);
    expect(complete).not.toHaveBeenCalled();
  });

  it.each(["timeout", "invalid_response", "incomplete"] as const)("preserves safe %s failure", async (reason) => {
    await expect(runProcurementHarness("local-qwen", "Правила", {}, async () => { throw new NarrationError(reason); }))
      .rejects.toMatchObject({ reason });
  });

  it("does not expose unknown transport errors", async () => {
    const result = await runProcurementHarness("local-qwen", "Правила", {}, async () => {
      throw new Error("upstream-secret-key");
    }).catch((error: unknown) => error);
    expect(result).toBeInstanceOf(NarrationError);
    expect(String(result)).not.toContain("upstream-secret-key");
  });

  it("sanitizes a teardown error after releasing the request context", async () => {
    const create = vi.spyOn(AgentLoop.prototype, "createAgent");
    const result = runProcurementHarness("local-qwen", "Правила", {}, async () => {
      const owner = create.mock.calls[0]![0];
      const fiber = owner.fiber;
      const dispose = fiber.dispose.bind(fiber);
      vi.spyOn(fiber, "dispose").mockImplementation(async () => {
        await dispose();
        throw new Error("private-teardown-details");
      });
      return { summary: "Ответ" };
    });
    await expect(result).rejects.toMatchObject({ reason: "unavailable" });
  });

  it("calls only the configured local model with the existing schema and no tools", async () => {
    let body: Record<string, any> = {};
    const request = vi.fn(async (url, init) => {
      expect(String(url)).toBe("http://vllm:8000/v1/chat/completions");
      expect(new Headers(init.headers).get("authorization")).toBe("Bearer private-local-token");
      body = JSON.parse(init.body);
      return new Response(JSON.stringify({ choices: [{ finish_reason: "stop", message: {
        role: "assistant", content: JSON.stringify({ summary: "Ответ по таблице.", warnings: [], offerIds: [] }),
      } }] }));
    });
    vi.stubGlobal("fetch", request);
    const answer = await new DeepseekHarnessNarrator("http://vllm:8000/v1", "local-qwen", "private-local-token")
      .answer({ prompt: "Помоги с таблицей" });
    expect(answer.summary).toBe("Ответ по таблице.");
    expect(request).toHaveBeenCalledTimes(1);
    expect(body.model).toBe("local-qwen");
    expect(body.tools).toBeUndefined();
    expect(body.response_format.type).toBe("json_schema");
    expect(body.chat_template_kwargs.enable_thinking).toBe(false);
    expect(body.messages.map((message: { role: string }) => message.role)).toEqual(["system", "user"]);
  });
});

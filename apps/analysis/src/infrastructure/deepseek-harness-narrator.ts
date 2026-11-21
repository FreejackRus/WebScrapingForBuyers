import { randomUUID } from "node:crypto";

import { Context } from "@deepseek-ai/cordis";
import AgentRegistry from "@deepseek-ai/dsh-agent";
import AgentLoop from "@deepseek-ai/dsh-agent-loop";
import LlmRuntime, {
  attributionHeaders, createUserMessage, LlmAdapter,
  type GenerateOptions, type StreamChunk,
} from "@deepseek-ai/dsh-llm";
import SessionStore, { type SessionId } from "@deepseek-ai/dsh-session";
import SessionProjectionRegistry from "@deepseek-ai/dsh-session-projection";
import SystemPrompt from "@deepseek-ai/dsh-system-prompt";
import * as NativeToolExecutor from "@deepseek-ai/dsh-tool-executor-native";
import ToolRuntime from "@deepseek-ai/dsh-tools";

import { NarrationError } from "../domain/narration-error.js";
import { MAX_CONTEXT_CHARS } from "./ollama-analysis-narrator.js";
import { VllmAnalysisNarrator } from "./vllm-analysis-narrator.js";

type Complete = (system: string, payload: unknown, signal?: AbortSignal) => Promise<unknown>;

/** Only one text request is admitted. No built-in tools, plugins or remote providers. */
class ProcurementAdapter extends LlmAdapter {
  calls = 0;
  failure: unknown;

  constructor(private readonly complete: Complete) { super(); }

  override async *stream(options: GenerateOptions): AsyncIterable<StreamChunk> {
    if (++this.calls !== 1 || options.tools?.length || options.messages.length !== 2) {
      throw new NarrationError("invalid_response");
    }
    const [system, user] = options.messages;
    if (system?.role !== "system" || user?.role !== "user") throw new NarrationError("invalid_response");
    const text = (content: typeof user.content): string => content.map((block) => {
      if (block.type !== "text") throw new NarrationError("invalid_response");
      return block.text;
    }).join("");
    let answer: string;
    try {
      answer = JSON.stringify(await this.complete(text(system.content), JSON.parse(text(user.content)), options.signal));
    } catch (error) {
      this.failure = error;
      throw new NarrationError("unavailable");
    }
    yield { type: "block-start", index: 0, blockType: "text" };
    yield { type: "text-delta", index: 0, text: answer };
    yield { type: "block-end", index: 0, block: { type: "text", text: answer } };
    // Token usage is not fabricated when the existing transport does not expose it.
    yield { type: "finish", reason: { kind: "stop" } };
  }
}

/** Per-request memory-only runtime: no shared user history, filesystem or shell service. */
export async function runProcurementHarness(
  model: string, system: string, payload: unknown, complete: Complete,
): Promise<unknown> {
  const user = JSON.stringify(payload);
  if (!user || user.length > MAX_CONTEXT_CHARS) throw new NarrationError("context_limit");
  const ctx = new Context();
  const adapter = new ProcurementAdapter(complete);
  try {
    await ctx.plugin(LlmRuntime);
    await ctx.plugin(SessionStore);
    await ctx.plugin(SessionProjectionRegistry);
    await ctx.plugin(SystemPrompt, { includeHarnessIdentity: false, includeRuntimeContext: false });
    await ctx.plugin(ToolRuntime);
    await ctx.plugin(NativeToolExecutor);
    await ctx.plugin(AgentRegistry);
    await ctx.plugin(AgentLoop, { agents: [], maxParallelToolCalls: 1 });
    ctx.llm.registerAdapter(["price-radar-local"], adapter);
    ctx.systemPrompt.section({ name: "procurement", order: 0, text: system, complete: true, interpolate: false });
    const handle = await ctx.agents.create({
      sessionId: randomUUID() as SessionId,
      agentOptions: { provider: "price-radar-local", model, maxTokens: 1_024 },
    });
    const agent = handle.agent;
    agent.followup(createUserMessage({ content: [{ type: "text", text: user }], source: { kind: "user" } }));
    await agent.whenIdle();
    if (adapter.failure) throw adapter.failure;
    const events = agent.session.snapshotEvents();
    const end = events.find((event) => event.type === "turn/end");
    const answers = events.filter((event) => event.type === "assistant/message");
    if (end?.type !== "turn/end" || end.data.reason.kind !== "completed" || answers.length !== 1) {
      throw new NarrationError("invalid_response");
    }
    const answer = answers[0];
    if (answer?.type !== "assistant/message" || answer.data.interrupted) throw new NarrationError("incomplete");
    const content = answer.data.message.content.map((block) => {
      if (block.type !== "text") throw new NarrationError("invalid_response");
      return block.text;
    }).join("");
    return JSON.parse(content) as unknown;
  } catch (error) {
    if (error instanceof NarrationError) throw error;
    throw new NarrationError("unavailable");
  } finally {
    try { await ctx.fiber.dispose(); }
    catch { throw new NarrationError("unavailable"); }
  }
}

/** Official Harness loop; existing vLLM schemas, parsers and grounding remain authoritative. */
export class DeepseekHarnessNarrator extends VllmAnalysisNarrator {
  override readonly name: string;

  constructor(baseUrl: string, model: string, apiKey?: string) {
    super(baseUrl, model, apiKey);
    this.name = `DeepSeek Harness · vLLM · ${model}`;
  }

  protected override chatJson(system: string, payload: unknown, format: Record<string, unknown>): Promise<unknown> {
    return runProcurementHarness(this.model, system, payload, (prompt, input, signal) =>
      super.chatJson(prompt, input, format, signal, attributionHeaders()));
  }
}

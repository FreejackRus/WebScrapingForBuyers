import { NarrationError } from "../domain/narration-error.js";
import {
  boundedString,
  MAX_CONTEXT_CHARS,
  MAX_RESPONSE_BYTES,
  object,
  OllamaAnalysisNarrator,
  readResponse,
  UNTRUSTED_DATA_RULE,
} from "./ollama-analysis-narrator.js";

/** vLLM transport over the existing bounded prompts, parsers, grounding, and history. */
export class VllmAnalysisNarrator extends OllamaAnalysisNarrator {
  override readonly name: string;

  constructor(baseUrl: string, model: string, private readonly apiKey?: string) {
    super(baseUrl, model);
    this.name = `vLLM · ${model}`;
  }

  protected override async chatJson(
    system: string,
    userPayload: unknown,
    format: Record<string, unknown>,
  ): Promise<unknown> {
    const userContent = JSON.stringify(userPayload);
    if (userContent.length > MAX_CONTEXT_CHARS) throw new NarrationError("context_limit");
    try {
      const response = await fetch(`${this.baseUrl.replace(/\/$/, "")}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(this.apiKey ? { Authorization: `Bearer ${this.apiKey}` } : {}),
        },
        signal: AbortSignal.timeout(120_000),
        body: JSON.stringify({
          model: this.model,
          stream: false,
          temperature: this.sampling.temperature,
          top_p: this.sampling.top_p,
          max_tokens: 1_024,
          chat_template_kwargs: { enable_thinking: false },
          response_format: {
            type: "json_schema",
            json_schema: { name: "analysis_response", strict: true, schema: format },
          },
          messages: [
            { role: "system", content: `${UNTRUSTED_DATA_RULE}${system}` },
            { role: "user", content: userContent },
          ],
        }),
      });
      if (!response.ok) {
        await response.body?.cancel();
        throw new NarrationError("unavailable");
      }
      const payload = object(await readResponse(response));
      if (!Array.isArray(payload.choices) || payload.choices.length !== 1) {
        throw new NarrationError("invalid_response");
      }
      const choice = object(payload.choices[0]);
      if (choice.finish_reason !== "stop") throw new NarrationError("incomplete");
      const message = object(choice.message);
      if (message.role !== "assistant") throw new NarrationError("invalid_response");
      const content = boundedString(message.content, MAX_RESPONSE_BYTES);
      try {
        return JSON.parse(content) as unknown;
      } catch {
        throw new NarrationError("invalid_response");
      }
    } catch (error) {
      if (error instanceof NarrationError) throw error;
      throw new NarrationError(
        error instanceof Error && (error.name === "TimeoutError" || error.name === "AbortError")
          ? "timeout"
          : "unavailable",
      );
    }
  }
}

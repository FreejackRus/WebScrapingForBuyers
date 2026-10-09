import type { AnalyzeRequest, SearchSnapshot } from "@peremena/contracts";
import { createService, fetchWithTimeout, serviceUrl } from "@peremena/service-kit";

import { analyzeSnapshot, answerCopilot } from "./application/analyze.js";
import type { AnalysisNarrator } from "./domain/analysis-narrator.js";
import {
  keepAliveFromEnv,
  OllamaAnalysisNarrator,
  samplingFromEnv,
} from "./infrastructure/ollama-analysis-narrator.js";

/** Earlier chat turns from the client; untrusted, bounded, context only. */
const HISTORY_SCHEMA = {
  type: "array",
  maxItems: 8,
  items: {
    type: "object",
    required: ["role", "text"],
    additionalProperties: false,
    properties: {
      role: { type: "string", enum: ["user", "assistant"] },
      text: { type: "string", maxLength: 2_000 },
    },
  },
} as const;

const CONTEXT_SCHEMA = {
  type: "object", additionalProperties: false,
  properties: {
    selectedOfferIds: {type: "array", maxItems: 500, items: {type:"string",minLength:1,maxLength:150}},
    tableFilter: {type:"object",additionalProperties:false,properties:{
      packaging:{type:"string",enum:["BOX","OEM"]},
      realOnly:{type:"boolean"},inStockOnly:{type:"boolean"},maxPrice:{type:"number",minimum:0},
      sources:{type:"array",maxItems:32,items:{type:"string",minLength:1,maxLength:80}},
      selectedOfferIds:{type:"array",maxItems:500,items:{type:"string",minLength:1,maxLength:150}},
      titleIncludeAny:{type:"array",maxItems:32,items:{type:"string",minLength:1,maxLength:100}},
      titleExcludeAny:{type:"array",maxItems:32,items:{type:"string",minLength:1,maxLength:100}},
    }},
  },
} as const;

export function buildAnalysisApp(options: { narrator?: AnalysisNarrator; logger?: boolean } = {}) {
  const app = createService({ logger: options.logger ?? false });
  const narrator =
    options.narrator ??
    (process.env.OLLAMA_BASE_URL && process.env.OLLAMA_MODEL
      ? new OllamaAnalysisNarrator(
          process.env.OLLAMA_BASE_URL,
          process.env.OLLAMA_MODEL,
          samplingFromEnv(process.env.OLLAMA_SAMPLING),
          keepAliveFromEnv(process.env.OLLAMA_KEEP_ALIVE),
        )
      : undefined);
  const searchBase = serviceUrl("SEARCH_URL", "http://127.0.0.1:3003");

  app.get("/health", async () => ({
    status: "ok",
    service: "analysis",
    provider: narrator?.name ?? "Анализ Price Radar без AI",
  }));

  app.post<{ Body: AnalyzeRequest }>(
    "/chat",
    {
      schema: {
        body: {
          type: "object",
          required: ["prompt"],
          additionalProperties: false,
          properties: {
            prompt: { type: "string", minLength: 2, maxLength: 1_000 },
            userName: { type: "string", minLength: 1, maxLength: 80 },
            userRole: { type: "string", enum: ["admin", "manager"] },
            userLogin: { type: "string", minLength: 1, maxLength: 80 },
            history: HISTORY_SCHEMA,
          },
        },
      },
    },
    async (request) =>
      answerCopilot(request.body.prompt, narrator, {
        ...(request.body.userName ? { userName: request.body.userName } : {}),
        ...(request.body.userRole ? { userRole: request.body.userRole } : {}),
        ...(request.body.userLogin ? { userLogin: request.body.userLogin } : {}),
        ...(request.body.history?.length ? { history: request.body.history } : {}),
      }),
  );

  app.post<{ Params: { id: string }; Body: AnalyzeRequest }>(
    "/searches/:id/analyze",
    {
      schema: {
        body: {
          type: "object",
          required: ["prompt"],
          additionalProperties: false,
          properties: {
            prompt: { type: "string", minLength: 2, maxLength: 1_000 },
            userName: { type: "string", minLength: 1, maxLength: 80 },
            userRole: { type: "string", enum: ["admin", "manager"] },
            userLogin: { type: "string", minLength: 1, maxLength: 80 },
            history: HISTORY_SCHEMA,
            context: CONTEXT_SCHEMA,
          },
        },
      },
    },
    async (request, reply) => {
      let response: Response;
      try {
        response = await fetchWithTimeout(`${searchBase}/searches/${request.params.id}`, {}, 10_000);
      } catch {
        return reply.code(502).send({ error: "Сервис поиска недоступен" });
      }
      if (response.status === 404) return reply.code(404).send({ error: "Поиск не найден" });
      if (!response.ok) return reply.code(502).send({ error: "Сервис поиска недоступен" });
      const snapshot = (await response.json()) as SearchSnapshot;
      return analyzeSnapshot(snapshot, request.body.prompt, narrator, {
        ...(request.body.userName ? { userName: request.body.userName } : {}),
        ...(request.body.userRole ? { userRole: request.body.userRole } : {}),
        ...(request.body.userLogin ? { userLogin: request.body.userLogin } : {}),
        ...(request.body.history?.length ? { history: request.body.history } : {}),
        ...(request.body.context ? { context: request.body.context } : {}),
        searchId: request.params.id,
      });
    },
  );

  return app;
}

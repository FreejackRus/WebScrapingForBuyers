import type { AnalyzeRequest, BasketItem, SearchSnapshot } from "@peremena/contracts";
import { createService, fetchWithTimeout, serviceUrl } from "@peremena/service-kit";

import { justifyPurchase, reviewOffers, understandQuery } from "./application/ai-tools.js";
import { analyzeSnapshot, answerCopilot } from "./application/analyze.js";
import { justifyBasket, splitRequest } from "./application/basket-tools.js";
import { narrationStats } from "./application/narration-stats.js";
import type { AnalysisNarrator } from "./domain/analysis-narrator.js";
import {
  keepAliveFromEnv,
  OllamaAnalysisNarrator,
  samplingFromEnv,
} from "./infrastructure/ollama-analysis-narrator.js";
import { VllmAnalysisNarrator } from "./infrastructure/vllm-analysis-narrator.js";

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
      conditions:{type:"array",maxItems:5,items:{type:"string",enum:["new","refurbished","used","display","unknown"]}},
      sources:{type:"array",maxItems:32,items:{type:"string",minLength:1,maxLength:80}},
      selectedOfferIds:{type:"array",maxItems:500,items:{type:"string",minLength:1,maxLength:150}},
      titleIncludeAny:{type:"array",maxItems:32,items:{type:"string",minLength:1,maxLength:100}},
      titleExcludeAny:{type:"array",maxItems:32,items:{type:"string",minLength:1,maxLength:100}},
      modelKeys:{type:"array",maxItems:32,items:{type:"string",minLength:1,maxLength:40}},
      cheaperOnly:{type:"boolean"},
    }},
  },
} as const;

function narratorFromEnv(): AnalysisNarrator | undefined {
  const provider = process.env.AI_PROVIDER?.trim().toLowerCase();
  if (provider === "vllm") {
    if (!process.env.VLLM_BASE_URL) throw new Error("VLLM_BASE_URL is required when AI_PROVIDER=vllm");
    if (!process.env.VLLM_MODEL) throw new Error("VLLM_MODEL is required when AI_PROVIDER=vllm");
    return new VllmAnalysisNarrator(process.env.VLLM_BASE_URL, process.env.VLLM_MODEL, process.env.VLLM_API_KEY);
  }
  if (provider && provider !== "ollama") throw new Error(`Unsupported AI_PROVIDER: ${provider}`);
  if (provider === "ollama" && (!process.env.OLLAMA_BASE_URL || !process.env.OLLAMA_MODEL)) {
    throw new Error("OLLAMA_BASE_URL and OLLAMA_MODEL are required when AI_PROVIDER=ollama");
  }
  return process.env.OLLAMA_BASE_URL && process.env.OLLAMA_MODEL
    ? new OllamaAnalysisNarrator(
        process.env.OLLAMA_BASE_URL,
        process.env.OLLAMA_MODEL,
        samplingFromEnv(process.env.OLLAMA_SAMPLING),
        keepAliveFromEnv(process.env.OLLAMA_KEEP_ALIVE),
      )
    : undefined;
}

export function buildAnalysisApp(options: { narrator?: AnalysisNarrator; logger?: boolean } = {}) {
  const app = createService({ logger: options.logger ?? false });
  const narrator = options.narrator ?? narratorFromEnv();
  const searchBase = serviceUrl("SEARCH_URL", "http://127.0.0.1:3003");

  app.get("/quality/narration", async () => narrationStats.snapshot());

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

  const loadSnapshot = async (id: string): Promise<SearchSnapshot | { status: number; error: string }> => {
    let response: Response;
    try {
      response = await fetchWithTimeout(`${searchBase}/searches/${encodeURIComponent(id)}`, {}, 10_000);
    } catch {
      return { status: 502, error: "Сервис поиска недоступен" };
    }
    if (response.status === 404) return { status: 404, error: "Поиск не найден" };
    if (!response.ok) return { status: 502, error: "Сервис поиска недоступен" };
    return (await response.json()) as SearchSnapshot;
  };

  // Internal: the search service asks how to read a free-text request. Never blocks a search.
  app.post<{ Body: { query: string } }>(
    "/understand",
    { schema: { body: { type: "object", required: ["query"], additionalProperties: false, properties: { query: { type: "string", minLength: 2, maxLength: 300 } } } } },
    async (request) => {
      try {
        return { understanding: (await understandQuery(request.body.query, narrator)) ?? null };
      } catch {
        return { understanding: null };
      }
    },
  );

  app.post<{ Params: { id: string } }>("/searches/:id/review", async (request, reply) => {
    const snapshot = await loadSnapshot(request.params.id);
    if ("error" in snapshot) return reply.code(snapshot.status).send({ error: snapshot.error });
    return reviewOffers(snapshot, narrator);
  });

  app.post<{ Params: { id: string }; Body: { offerId: string } }>(
    "/searches/:id/justify",
    { schema: { body: { type: "object", required: ["offerId"], additionalProperties: false, properties: { offerId: { type: "string", minLength: 1, maxLength: 120 } } } } },
    async (request, reply) => {
      const snapshot = await loadSnapshot(request.params.id);
      if ("error" in snapshot) return reply.code(snapshot.status).send({ error: snapshot.error });
      const memo = await justifyPurchase(snapshot, request.body.offerId, narrator);
      return memo ?? reply.code(404).send({ error: "Предложение не найдено в этом поиске" });
    },
  );

  // Basket memo: the gateway forwards the user's stored basket; validated again here.
  app.post<{ Body: { items: BasketItem[] } }>(
    "/justify-basket",
    { schema: { body: BASKET_BODY_SCHEMA } },
    async (request) => justifyBasket(request.body.items, narrator),
  );

  app.post<{ Body: { text: string } }>(
    "/split-request",
    { schema: { body: { type: "object", required: ["text"], additionalProperties: false, properties: { text: { type: "string", minLength: 2, maxLength: 3_000 } } } } },
    async (request) => splitRequest(request.body.text, narrator),
  );

  return app;
}

const short = (max: number) => ({ type: "string", maxLength: max }) as const;
const BASKET_BODY_SCHEMA = {
  type: "object",
  required: ["items"],
  additionalProperties: false,
  properties: {
    items: {
      type: "array",
      minItems: 1,
      maxItems: 50,
      items: {
        type: "object",
        required: ["id", "addedAt", "query", "quantity", "offer"],
        properties: {
          id: short(120),
          addedAt: short(40),
          query: short(300),
          quantity: { type: "integer", minimum: 1, maximum: 10_000 },
          offer: {
            type: "object",
            required: ["source", "seller", "title", "price", "priceCondition", "availability", "condition", "url"],
            properties: {
              source: short(80),
              seller: short(200),
              title: short(400),
              mpn: short(80),
              price: { type: "number", minimum: 0 },
              priceCondition: short(200),
              availability: short(200),
              condition: short(20),
              url: short(2_000),
              verificationNote: short(400),
            },
          },
        },
      },
    },
  },
} as const;

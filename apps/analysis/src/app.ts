import type { AnalyzeRequest, SearchSnapshot } from "@peremena/contracts";
import { createService, serviceUrl } from "@peremena/service-kit";

import { analyzeSnapshot, answerCopilot } from "./application/analyze.js";
import type { AnalysisNarrator } from "./domain/analysis-narrator.js";
import { OllamaAnalysisNarrator } from "./infrastructure/ollama-analysis-narrator.js";

export function buildAnalysisApp(options: { narrator?: AnalysisNarrator; logger?: boolean } = {}) {
  const app = createService({ logger: options.logger ?? false });
  const narrator =
    options.narrator ??
    (process.env.OLLAMA_BASE_URL && process.env.OLLAMA_MODEL
      ? new OllamaAnalysisNarrator(process.env.OLLAMA_BASE_URL, process.env.OLLAMA_MODEL)
      : undefined);
  const searchBase = serviceUrl("SEARCH_URL", "http://127.0.0.1:3003");

  app.get("/health", async () => ({
    status: "ok",
    service: "analysis",
    provider: narrator?.name ?? "Детерминированный анализ",
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
          },
        },
      },
    },
    async (request) =>
      answerCopilot(request.body.prompt, narrator, {
        ...(request.body.userName ? { userName: request.body.userName } : {}),
        ...(request.body.userRole ? { userRole: request.body.userRole } : {}),
        ...(request.body.userLogin ? { userLogin: request.body.userLogin } : {}),
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
          },
        },
      },
    },
    async (request, reply) => {
      const response = await fetch(`${searchBase}/searches/${request.params.id}`);
      if (response.status === 404) return reply.code(404).send({ error: "Поиск не найден" });
      if (!response.ok) return reply.code(502).send({ error: "Сервис поиска недоступен" });
      const snapshot = (await response.json()) as SearchSnapshot;
      return analyzeSnapshot(snapshot, request.body.prompt, narrator, {
        ...(request.body.userName ? { userName: request.body.userName } : {}),
        ...(request.body.userRole ? { userRole: request.body.userRole } : {}),
        ...(request.body.userLogin ? { userLogin: request.body.userLogin } : {}),
        searchId: request.params.id,
      });
    },
  );

  return app;
}

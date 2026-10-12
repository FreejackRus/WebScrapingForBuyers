import type { SearchSourcesResponse } from "@peremena/contracts";
import type { FastifyPluginAsync } from "fastify";

import { exportSearch } from "../application/export-service.js";
import type { SearchService } from "../application/search-service.js";
import { findProduct } from "../domain/catalog.js";
import { classifyQuery, isExplicitlyNonIt } from "../domain/it-scope.js";
import { isProductPayload, productFromQuery } from "../domain/product-from-query.js";
import { mergeUnderstanding, needsUnderstanding } from "../domain/query-understanding.js";
import { isSourceDisabled, listDisabledSources } from "../domain/source-policy.js";
import { suggestLiveProducts } from "../infrastructure/suggest/live-suggest.js";
import { fetchUnderstanding } from "../infrastructure/understanding-client.js";

const queryBodySchema = {
  type: "object",
  required: ["query"],
  additionalProperties: false,
  properties: {
    query: { type: "string", minLength: 2, maxLength: 300 },
  },
} as const;

export const searchRoutes: FastifyPluginAsync<{
  searchService: SearchService;
  mode: "demo" | "hybrid";
}> = async (app, options) => {
  const { searchService } = options;

  app.get("/health", async () => ({ status: "ok", service: "search", mode: options.mode }));

  app.get("/sources", async (): Promise<SearchSourcesResponse> => ({
    sources: searchService.listSources(),
    disabledSources: listDisabledSources(),
  }));

  app.post<{ Body: { query: string } }>(
    "/suggestions",
    { schema: { body: queryBodySchema } },
    async (request) => ({ products: await suggestLiveProducts(request.body.query) }),
  );

  app.post<{ Body: { query: string; productId?: string; product?: ProductLike; sources?: string[] } }>(
    "/searches",
    {
      schema: {
        body: {
          type: "object",
          required: ["query"],
          additionalProperties: false,
          properties: {
            query: { type: "string", minLength: 2, maxLength: 300 },
            productId: { type: "string" },
            product: { type: "object", additionalProperties: true },
            sources: { type: "array", items: { type: "string", minLength: 1, maxLength: 80 }, maxItems: 32 },
          },
        },
      },
    },
    async (request, reply) => {
      const payload = isProductPayload(request.body.product) ? request.body.product : undefined;
      const chosen =
        (payload && payload.characteristics.источник !== "typed" ? payload : undefined) ??
        (request.body.productId ? findProduct(request.body.productId) : undefined);
      let product =
        chosen ??
        (payload ? productFromQuery(payload.name, "query") : undefined) ??
        (await suggestLiveProducts(request.body.query, 1))[0] ??
        productFromQuery(request.body.query, "query");
      // A product the buyer typed (not picked from suggestions): let the local AI read a long or unclear request.
      if (!chosen && needsUnderstanding(request.body.query, product)) {
        const understanding = await fetchUnderstanding(request.body.query);
        if (understanding) product = mergeUnderstanding(product, understanding, request.body.query);
      }
      // The typed query is what lands in the history, so it is judged as well as the chosen product.
      if (classifyQuery(product) !== "ok" || isExplicitlyNonIt(request.body.query)) {
        return reply.code(422).send({
          error: "Price Radar ищет только IT-оборудование и комплектующие. Уточните запрос: тип устройства, бренд или артикул.",
        });
      }
      const selected = searchService.resolveSources(request.body.sources);
      if (selected.length === 0) {
        const error = request.body.sources?.some(isSourceDisabled)
          ? "DNS временно недоступен. Выберите другой источник."
          : request.body.sources?.length
            ? "Нет выбранных источников"
            : "Нет доступных источников для поиска";
        return reply.code(400).send({ error });
      }
      return reply.code(201).send(searchService.start(request.body.query, product, request.body.sources));
    },
  );

  app.get<{ Params: { id: string } }>("/searches/:id", async (request, reply) => {
    const snapshot = searchService.get(request.params.id);
    return snapshot ?? reply.code(404).send({ error: "Поиск не найден" });
  });

  app.get<{ Params: { id: string } }>("/searches/:id/events", (request, reply) => {
    const snapshot = searchService.get(request.params.id);
    if (!snapshot) return reply.code(404).send({ error: "Поиск не найден" });

    reply.hijack();
    reply.raw.writeHead(200, {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    });
    const send = (event: unknown) => {
      reply.raw.write(`data: ${JSON.stringify(event)}\n\n`);
    };
    send({ type: "snapshot", data: snapshot });
    const unsubscribe = searchService.subscribe(request.params.id, send);
    request.raw.on("close", unsubscribe);
    return reply;
  });

  app.get<{ Params: { id: string } }>("/searches/:id/export.xlsx", async (request, reply) => {
    const snapshot = searchService.get(request.params.id);
    if (!snapshot) return reply.code(404).send({ error: "Поиск не найден" });
    const file = await exportSearch(snapshot);
    return reply
      .header("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
      .header("Content-Disposition", `attachment; filename="offers-${snapshot.id}.xlsx"`)
      .send(file);
  });
};

type ProductLike = Record<string, unknown>;

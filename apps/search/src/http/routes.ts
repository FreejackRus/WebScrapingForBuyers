import type { FastifyPluginAsync } from "fastify";

import { exportSearch } from "../application/export-service.js";
import type { SearchService } from "../application/search-service.js";
import { findProduct, suggestProducts } from "../domain/catalog.js";

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

  app.post<{ Body: { query: string } }>(
    "/suggestions",
    { schema: { body: queryBodySchema } },
    async (request) => ({ products: suggestProducts(request.body.query) }),
  );

  app.post<{ Body: { query: string; productId?: string } }>(
    "/searches",
    {
      schema: {
        body: {
          ...queryBodySchema,
          properties: {
            ...queryBodySchema.properties,
            productId: { type: "string" },
          },
        },
      },
    },
    async (request, reply) => {
      const product =
        (request.body.productId ? findProduct(request.body.productId) : undefined) ??
        suggestProducts(request.body.query, 1)[0];
      if (!product) {
        return reply.code(422).send({
          error: "Товар не найден в демонстрационном каталоге. Уточните запрос.",
        });
      }
      return reply.code(201).send(searchService.start(request.body.query, product));
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

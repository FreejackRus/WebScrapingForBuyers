import type { SearchSnapshot, SessionUser } from "@peremena/contracts";
import { createService, serviceUrl } from "@peremena/service-kit";
import type { FastifyReply, FastifyRequest } from "fastify";

import { presentEvent, presentSnapshot } from "./present.js";

export function buildGatewayApp(options: { logger?: boolean } = {}) {
  const app = createService({ logger: options.logger ?? false, cookies: true });
  const identity = serviceUrl("IDENTITY_URL", "http://127.0.0.1:3002");
  const search = serviceUrl("SEARCH_URL", "http://127.0.0.1:3003");
  const analysis = serviceUrl("ANALYSIS_URL", "http://127.0.0.1:3004");

  app.addHook("preHandler", async (request, reply) => {
    const open =
      request.url === "/api/v1/health" ||
      request.url.startsWith("/api/v1/health?") ||
      request.url === "/api/v1/auth/login";
    if (open) return;
    const user = await resolveUser(identity, request);
    if (!user) return reply.code(401).send({ error: "Требуется вход в Price Radar" });
    request.currentUser = user;
  });

  app.get("/api/v1/health", async () => {
    const [searchHealth, analysisHealth] = await Promise.all([
      getJson(`${search}/health`).catch(() => ({ mode: "demo" })),
      getJson(`${analysis}/health`).catch(() => ({ provider: "Детерминированный анализ" })),
    ]);
    return {
      status: "ok",
      mode: searchHealth.mode === "hybrid" ? "hybrid" : "demo",
      analysisProvider: analysisHealth.provider ?? "Детерминированный анализ",
    };
  });

  app.post("/api/v1/auth/login", async (request, reply) =>
    proxyJson(identity, "/auth/login", request, reply),
  );
  app.post("/api/v1/auth/logout", async (request, reply) =>
    proxyJson(identity, "/auth/logout", request, reply),
  );
  app.get("/api/v1/auth/me", async (request, reply) =>
    proxyJson(identity, "/auth/me", request, reply),
  );
  app.patch("/api/v1/auth/settings", async (request, reply) =>
    proxyJson(identity, "/auth/settings", request, reply),
  );

  app.post("/api/v1/suggestions", async (request, reply) =>
    proxyJson(search, "/suggestions", request, reply),
  );
  app.post("/api/v1/searches", async (request, reply) => {
    const result = await proxyJson(search, "/searches", request, reply);
    if (reply.statusCode === 201 && result && typeof result === "object") {
      return presentSnapshot(result as SearchSnapshot, request.currentUser);
    }
    return result;
  });
  app.get<{ Params: { id: string } }>("/api/v1/searches/:id", async (request, reply) => {
    const result = await proxyJson(search, `/searches/${request.params.id}`, request, reply);
    if (result && typeof result === "object" && "offers" in result) {
      return presentSnapshot(result as SearchSnapshot, request.currentUser);
    }
    return result;
  });
  app.get<{ Params: { id: string } }>("/api/v1/searches/:id/events", async (request, reply) => {
    const upstream = await fetch(`${search}/searches/${request.params.id}/events`, {
      headers: cookieHeader(request),
    });
    if (!upstream.ok || !upstream.body) {
      return reply.code(upstream.status).send({ error: "Поток поиска недоступен" });
    }
    reply.hijack();
    reply.raw.writeHead(200, {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    });
    const reader = upstream.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    const pump = async () => {
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const chunks = buffer.split("\n\n");
        buffer = chunks.pop() ?? "";
        for (const chunk of chunks) {
          const line = chunk.replace(/^data: /, "");
          try {
            const event = presentEvent(JSON.parse(line), request.currentUser);
            reply.raw.write(`data: ${JSON.stringify(event)}\n\n`);
          } catch {
            reply.raw.write(`${chunk}\n\n`);
          }
        }
      }
      reply.raw.end();
    };
    request.raw.on("close", () => reader.cancel().catch(() => undefined));
    void pump();
    return reply;
  });
  app.post<{ Params: { id: string }; Body: { prompt?: string } }>(
    "/api/v1/searches/:id/analyze",
    async (request, reply) => {
      const prompt = typeof request.body?.prompt === "string" ? request.body.prompt : "";
      const enriched = {
        prompt,
        ...(request.currentUser?.displayName
          ? { userName: request.currentUser.displayName }
          : {}),
        ...(request.currentUser?.role ? { userRole: request.currentUser.role } : {}),
        ...(request.currentUser?.login ? { userLogin: request.currentUser.login } : {}),
      };
      return proxyJson(analysis, `/searches/${request.params.id}/analyze`, request, reply, enriched);
    },
  );
  app.get<{ Params: { id: string } }>("/api/v1/searches/:id/export.xlsx", async (request, reply) => {
    const upstream = await fetch(`${search}/searches/${request.params.id}/export.xlsx`, {
      headers: cookieHeader(request),
    });
    if (!upstream.ok) {
      return reply.code(upstream.status).send({ error: "Экспорт недоступен" });
    }
    const bytes = Buffer.from(await upstream.arrayBuffer());
    return reply
      .header(
        "Content-Type",
        upstream.headers.get("content-type") ??
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      )
      .header(
        "Content-Disposition",
        upstream.headers.get("content-disposition") ?? `attachment; filename="offers.xlsx"`,
      )
      .send(bytes);
  });

  return app;
}

declare module "fastify" {
  interface FastifyRequest {
    currentUser?: SessionUser;
  }
}

async function resolveUser(identity: string, request: FastifyRequest) {
  const cookie = request.headers.cookie;
  if (!cookie) return undefined;
  const response = await fetch(`${identity}/auth/me`, { headers: { cookie } });
  if (!response.ok) return undefined;
  const payload = (await response.json()) as { user?: SessionUser };
  return payload.user;
}

async function proxyJson(
  base: string,
  path: string,
  request: FastifyRequest,
  reply: FastifyReply,
  bodyOverride?: unknown,
) {
  const headers: Record<string, string> = {
    ...cookieHeader(request),
    accept: "application/json",
  };
  const payload = bodyOverride !== undefined ? bodyOverride : request.body;
  const raw = payload === undefined ? undefined : JSON.stringify(payload);
  if (raw) headers["content-type"] = "application/json";
  const response = await fetch(`${base}${path}`, {
    method: request.method,
    headers,
    ...(raw ? { body: raw } : {}),
  });
  const text = await response.text();
  reply.code(response.status);
  const setCookie = response.headers.getSetCookie?.() ?? [];
  for (const cookie of setCookie) reply.header("set-cookie", cookie);
  if (!text) return null;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

function cookieHeader(request: FastifyRequest): Record<string, string> {
  return request.headers.cookie ? { cookie: request.headers.cookie } : {};
}

async function getJson(url: string) {
  const response = await fetch(url);
  return (await response.json()) as Record<string, string>;
}

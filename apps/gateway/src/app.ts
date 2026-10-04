import type { SearchSnapshot, SessionUser } from "@peremena/contracts";
import { createService, fetchWithTimeout, isTimeoutError, serviceUrl } from "@peremena/service-kit";
import type { FastifyReply, FastifyRequest } from "fastify";

import { presentEvent, presentSnapshot } from "./present.js";
import { SearchHistory } from "./search-history.js";
import { UserCache } from "./user-cache.js";

const IDENTITY_TIMEOUT_MS = 5_000;
const HEALTH_TIMEOUT_MS = 3_000;
const JSON_TIMEOUT_MS = 30_000;
/** The narrator may wait for the local LLM for up to two minutes. */
const ANALYSIS_TIMEOUT_MS = 180_000;
const EXPORT_TIMEOUT_MS = 60_000;
const STREAM_CONNECT_TIMEOUT_MS = 10_000;

export function buildGatewayApp(options: { logger?: boolean; history?: SearchHistory } = {}) {
  const app = createService({ logger: options.logger ?? false, cookies: true });
  // HISTORY_FILE points at a mounted volume in production; without it history lives in memory only.
  const history = options.history ?? new SearchHistory(process.env.HISTORY_FILE);
  const identity = serviceUrl("IDENTITY_URL", "http://127.0.0.1:3002");
  const search = serviceUrl("SEARCH_URL", "http://127.0.0.1:3003");
  const analysis = serviceUrl("ANALYSIS_URL", "http://127.0.0.1:3004");
  const users = new UserCache();

  app.addHook("preHandler", async (request, reply) => {
    const open =
      request.url === "/api/v1/health" ||
      request.url.startsWith("/api/v1/health?") ||
      request.url === "/api/v1/auth/login";
    if (open) return;
    let user: SessionUser | undefined;
    try {
      user = await resolveUser(identity, request, users);
    } catch {
      return reply.code(503).send({ error: "Сервис входа временно недоступен" });
    }
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
  app.post("/api/v1/auth/logout", async (request, reply) => {
    const result = await proxyJson(identity, "/auth/logout", request, reply);
    users.clear();
    return result;
  });
  app.get("/api/v1/auth/me", async (request, reply) =>
    proxyJson(identity, "/auth/me", request, reply),
  );
  app.patch("/api/v1/auth/settings", async (request, reply) => {
    const result = await proxyJson(identity, "/auth/settings", request, reply);
    users.clear();
    return result;
  });

  app.get("/api/v1/sources", async (request, reply) =>
    proxyJson(search, "/sources", request, reply),
  );
  app.post("/api/v1/suggestions", async (request, reply) =>
    proxyJson(search, "/suggestions", request, reply),
  );
  app.post("/api/v1/searches", async (request, reply) => {
    const result = await proxyJson(search, "/searches", request, reply);
    if (reply.statusCode === 201 && result && typeof result === "object") {
      const snapshot = result as SearchSnapshot;
      if (request.currentUser) {
        history.record(request.currentUser.id, { id: snapshot.id, query: snapshot.query, product: snapshot.product });
      }
      return presentSnapshot(snapshot, request.currentUser);
    }
    return result;
  });
  app.get("/api/v1/history", async (request) => ({
    history: request.currentUser ? history.list(request.currentUser.id) : [],
  }));
  app.delete("/api/v1/history", async (request) => {
    if (request.currentUser) history.clear(request.currentUser.id);
    return { ok: true };
  });
  app.delete<{ Params: { id: string } }>("/api/v1/history/:id", async (request, reply) => {
    const removed = request.currentUser ? history.remove(request.currentUser.id, request.params.id) : false;
    return removed ? { ok: true } : reply.code(404).send({ error: "Запись истории не найдена" });
  });
  app.get<{ Params: { id: string } }>("/api/v1/searches/:id", async (request, reply) => {
    const result = await proxyJson(search, `/searches/${request.params.id}`, request, reply);
    if (result && typeof result === "object" && "offers" in result) {
      return presentSnapshot(result as SearchSnapshot, request.currentUser);
    }
    return result;
  });
  app.get<{ Params: { id: string } }>("/api/v1/searches/:id/events", async (request, reply) => {
    const controller = new AbortController();
    const connectTimer = setTimeout(() => controller.abort(), STREAM_CONNECT_TIMEOUT_MS);
    let upstream: Response;
    try {
      upstream = await fetch(`${search}/searches/${request.params.id}/events`, {
        headers: cookieHeader(request),
        signal: controller.signal,
      });
    } catch {
      return reply.code(502).send({ error: "Поток поиска недоступен" });
    } finally {
      clearTimeout(connectTimer);
    }
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
      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done || reply.raw.destroyed) break;
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
      } catch (error) {
        // The search service dropped the stream mid-way. Ending the response lets the
        // client reconnect; an unhandled rejection here used to take the gateway down.
        request.log.warn({ err: error }, "search event stream interrupted");
      } finally {
        if (!reply.raw.writableEnded) reply.raw.end();
      }
    };
    request.raw.on("close", () => {
      controller.abort();
      reader.cancel().catch(() => undefined);
    });
    void pump();
    return reply;
  });
  app.post<{ Params: { id: string }; Body: { prompt?: string } }>(
    "/api/v1/searches/:id/analyze",
    async (request, reply) =>
      proxyJson(analysis, `/searches/${request.params.id}/analyze`, request, reply, userPrompt(request), ANALYSIS_TIMEOUT_MS),
  );
  app.post<{ Body: { prompt?: string } }>("/api/v1/copilot/chat", async (request, reply) =>
    proxyJson(analysis, "/chat", request, reply, userPrompt(request), ANALYSIS_TIMEOUT_MS),
  );
  app.get<{ Params: { id: string } }>("/api/v1/searches/:id/export.xlsx", async (request, reply) => {
    let upstream: Response;
    try {
      upstream = await fetchWithTimeout(
        `${search}/searches/${request.params.id}/export.xlsx`,
        { headers: cookieHeader(request) },
        EXPORT_TIMEOUT_MS,
      );
    } catch (error) {
      return reply.code(gatewayStatus(error)).send({ error: "Экспорт недоступен" });
    }
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

/** The prompt plus who is asking, so analysis can tailor and sanitise its answer. */
function userPrompt(request: FastifyRequest<{ Body: { prompt?: string } }>) {
  const prompt = typeof request.body?.prompt === "string" ? request.body.prompt : "";
  const user = request.currentUser;
  return {
    prompt,
    ...(user?.displayName ? { userName: user.displayName } : {}),
    ...(user?.role ? { userRole: user.role } : {}),
    ...(user?.login ? { userLogin: user.login } : {}),
  };
}

function gatewayStatus(error: unknown): number {
  return isTimeoutError(error) ? 504 : 502;
}

async function resolveUser(identity: string, request: FastifyRequest, cache: UserCache) {
  const cookie = request.headers.cookie;
  if (!cookie) return undefined;
  const cached = cache.get(cookie);
  if (cached) return cached;
  const response = await fetchWithTimeout(`${identity}/auth/me`, { headers: { cookie } }, IDENTITY_TIMEOUT_MS);
  if (response.status === 401) return undefined;
  if (!response.ok) throw new Error(`identity ${response.status}`);
  const payload = (await response.json()) as { user?: SessionUser };
  if (payload.user) cache.set(cookie, payload.user);
  return payload.user;
}

async function proxyJson(
  base: string,
  path: string,
  request: FastifyRequest,
  reply: FastifyReply,
  bodyOverride?: unknown,
  timeoutMs = JSON_TIMEOUT_MS,
) {
  const headers: Record<string, string> = {
    ...cookieHeader(request),
    accept: "application/json",
  };
  const payload = bodyOverride !== undefined ? bodyOverride : request.body;
  const raw = payload === undefined ? undefined : JSON.stringify(payload);
  if (raw) headers["content-type"] = "application/json";
  let response: Response;
  try {
    response = await fetchWithTimeout(
      `${base}${path}`,
      { method: request.method, headers, ...(raw ? { body: raw } : {}) },
      timeoutMs,
    );
  } catch (error) {
    reply.code(gatewayStatus(error));
    return { error: isTimeoutError(error) ? "Сервис не ответил вовремя" : "Сервис временно недоступен" };
  }
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
  const response = await fetchWithTimeout(url, {}, HEALTH_TIMEOUT_MS);
  return (await response.json()) as Record<string, string>;
}

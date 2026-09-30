import type { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";

import type { AuthStore } from "../domain/auth-store.js";
import { LoginLimiter } from "./login-limiter.js";
import { clearSession, readSessionUser, writeSession } from "./session.js";

export const identityRoutes: FastifyPluginAsync<{ authStore: AuthStore; loginLimiter?: LoginLimiter }> = async (
  app,
  options,
) => {
  const { authStore } = options;
  const limiter = options.loginLimiter ?? new LoginLimiter();

  app.get("/health", async () => ({ status: "ok", service: "identity" }));

  app.post<{ Body: { login: string; password: string } }>(
    "/auth/login",
    {
      schema: {
        body: {
          type: "object",
          required: ["login", "password"],
          additionalProperties: false,
          properties: {
            login: { type: "string", minLength: 1, maxLength: 80 },
            password: { type: "string", minLength: 1, maxLength: 200 },
          },
        },
      },
    },
    async (request, reply) => {
      const wait = limiter.retryAfterSeconds(request.body.login);
      if (wait > 0) {
        return reply
          .header("retry-after", String(wait))
          .code(429)
          .send({ error: "Слишком много попыток входа. Повторите позже." });
      }
      const user = await authStore.authenticate(request.body.login, request.body.password);
      if (!user) {
        limiter.recordFailure(request.body.login);
        return reply.code(401).send({ error: "Неверный логин или пароль" });
      }
      limiter.reset(request.body.login);
      writeSession(reply, user.id);
      return { user };
    },
  );

  app.post("/auth/logout", async (_request, reply) => {
    clearSession(reply);
    return { ok: true };
  });

  app.get("/auth/me", async (request, reply) => {
    const user = readSessionUser(request, authStore);
    return user ? { user } : reply.code(401).send({ error: "Требуется вход в Price Radar" });
  });

  app.patch<{
    Body: {
      displayName?: string;
      city?: string;
      analysisPrompt?: string;
      currentPassword?: string;
      newPassword?: string;
    };
  }>(
    "/auth/settings",
    {
      schema: {
        body: {
          type: "object",
          additionalProperties: false,
          properties: {
            displayName: { type: "string", minLength: 1, maxLength: 80 },
            city: { type: "string", minLength: 2, maxLength: 80 },
            analysisPrompt: { type: "string", minLength: 2, maxLength: 1_000 },
            currentPassword: { type: "string", minLength: 1, maxLength: 200 },
            newPassword: { type: "string", minLength: 8, maxLength: 200 },
          },
        },
      },
    },
    async (request, reply) => {
      const user = requireUser(request, reply, authStore);
      if (!user) return;
      if (request.body.newPassword) {
        if (!request.body.currentPassword) {
          return reply.code(400).send({ error: "Укажите текущий пароль" });
        }
        const changed = await authStore.changePassword(user.id, {
          currentPassword: request.body.currentPassword,
          newPassword: request.body.newPassword,
        });
        if (!changed) return reply.code(400).send({ error: "Не удалось сменить пароль" });
      }
      return {
        user: authStore.updateSettings(user.id, request.body) ?? authStore.getById(user.id),
      };
    },
  );
};

function requireUser(request: FastifyRequest, reply: FastifyReply, store: AuthStore) {
  const user = readSessionUser(request, store);
  if (user) return user;
  reply.code(401).send({ error: "Требуется вход в Price Radar" });
  return undefined;
}

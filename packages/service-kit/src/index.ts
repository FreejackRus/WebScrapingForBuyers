import cookie from "@fastify/cookie";
import cors from "@fastify/cors";
import Fastify, { type FastifyInstance } from "fastify";

export function createService(options: { logger?: boolean; cookies?: boolean } = {}): FastifyInstance {
  const app = Fastify({ logger: options.logger ?? false });
  void app.register(cors, { origin: true, credentials: true });
  if (options.cookies) void app.register(cookie);
  return app;
}

export function listenService(app: FastifyInstance, fallbackPort: number) {
  const port = Number(process.env.PORT ?? fallbackPort);
  const host = process.env.HOST ?? "0.0.0.0";
  return app
    .listen({ port, host })
    .catch((error: unknown) => {
      app.log.error(error);
      process.exit(1);
    });
}

export function requiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Нужна переменная ${name}`);
  return value;
}

export function serviceUrl(name: string, fallback: string): string {
  return (process.env[name] ?? fallback).replace(/\/$/, "");
}

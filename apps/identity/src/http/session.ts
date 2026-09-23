import { createHmac, timingSafeEqual } from "node:crypto";

import "@fastify/cookie";
import type { FastifyReply, FastifyRequest } from "fastify";

import type { AuthStore } from "../domain/auth-store.js";

const cookieName = "pr_session";
const ttlMs = 12 * 60 * 60 * 1000;

export function readSessionUser(request: FastifyRequest, store: AuthStore) {
  const token = request.cookies?.[cookieName];
  if (!token) return undefined;
  const userId = verifySession(token);
  return userId ? store.getById(userId) : undefined;
}

export function writeSession(reply: FastifyReply, userId: string) {
  reply.setCookie(cookieName, signSession(userId), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: ttlMs / 1000,
    secure: process.env.COOKIE_SECURE === "true",
  });
}

export function clearSession(reply: FastifyReply) {
  reply.clearCookie(cookieName, { path: "/" });
}

function signSession(userId: string): string {
  const payload = Buffer.from(
    JSON.stringify({ userId, exp: Date.now() + ttlMs }),
    "utf8",
  ).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

function verifySession(token: string): string | undefined {
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return undefined;
  const expected = sign(payload);
  const left = Buffer.from(signature);
  const right = Buffer.from(expected);
  if (left.length !== right.length || !timingSafeEqual(left, right)) return undefined;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      userId?: string;
      exp?: number;
    };
    if (!data.userId || !data.exp || data.exp < Date.now()) return undefined;
    return data.userId;
  } catch {
    return undefined;
  }
}

function sign(payload: string): string {
  const secret = process.env.AUTH_SECRET ?? "peremena-dev-secret-change-me";
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

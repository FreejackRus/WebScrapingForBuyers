const DEFAULT_COOLDOWN_MS = 45_000;

let blockedUntil = 0;

export function wbCooldownMs(): number {
  const raw = Number(process.env.WB_RATE_LIMIT_COOLDOWN_MS);
  return Number.isFinite(raw) && raw >= 0 ? raw : DEFAULT_COOLDOWN_MS;
}

export function noteWbRateLimited(): void {
  blockedUntil = Date.now() + wbCooldownMs();
}

export function remainingWbCooldownMs(now = Date.now()): number {
  return Math.max(0, blockedUntil - now);
}

/** Short admin-facing status. Managers never see source.message. */
export function presentWbRateLimited(raw?: string): string {
  const status = raw?.match(/\b(429|403)\b/)?.[1];
  const wait = remainingWbCooldownMs();
  const waitHint = wait > 0 ? ` Подождите ${Math.ceil(wait / 1000)} с.` : " Подождите и повторите поиск.";
  return status ? `WB rate-limited (${status}).${waitHint}` : `WB rate-limited.${waitHint}`;
}

export function assertWbCatalogAllowed(): void {
  if (remainingWbCooldownMs() <= 0) return;
  throw new Error(presentWbRateLimited());
}

export function resetWbRateLimitForTests(): void {
  blockedUntil = 0;
}

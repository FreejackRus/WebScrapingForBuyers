import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

import type { SourceCheck, SourceHealth, SourceHealthReport } from "@peremena/contracts";

import type { SourceAdapter } from "../domain/source-adapter.js";
import { productFromQuery } from "../domain/product-from-query.js";

/**
 * Canary query per source: something the source is known to stock, so «0 rows» means trouble.
 * Distributors carry server/printer catalogues, not mice — they get their own canaries.
 */
const CANARIES: Record<string, string> = {
  NETLAB: "Pantum TL-5120P",
  "СРВТрейд": "818202-B21",
  Servermall: "Lenovo ThinkSystem SR650 V2",
};
export const DEFAULT_CANARY = "Мышь Logitech M240";
export const HISTORY_PER_SOURCE = 24;
/** Consecutive failed checks that raise an admin banner. */
export const FAILURE_ALERT_THRESHOLD = 3;

export function canaryFor(source: string): string {
  return CANARIES[source] ?? DEFAULT_CANARY;
}

/** Newest-last history → the source's current health. Pure, so the table and alerts are testable. */
export function summarizeSource(source: string, checks: SourceCheck[]): SourceHealth {
  let consecutiveFailures = 0;
  for (let i = checks.length - 1; i >= 0 && !checks[i]!.ok; i -= 1) consecutiveFailures += 1;
  const lastSuccess = [...checks].reverse().find((check) => check.ok);
  const last = checks.at(-1);
  return {
    source,
    canary: canaryFor(source),
    consecutiveFailures,
    history: checks,
    ...(last ? { last } : {}),
    ...(lastSuccess ? { lastSuccessAt: lastSuccess.checkedAt } : {}),
  };
}

export function sourceAlerts(sources: SourceHealth[]): string[] {
  return sources
    .filter((source) => source.consecutiveFailures >= FAILURE_ALERT_THRESHOLD)
    .map((source) => `Источник ${source.source} не отвечает ${source.consecutiveFailures} проверки подряд`);
}

export interface SourceMonitorOptions {
  file?: string;
  timeoutMs?: number;
  /** Pause between canaries: sequential and spaced so WB does not rate-limit the real users. */
  pauseMs?: number;
  now?: () => number;
}

export class SourceMonitor {
  private readonly checks = new Map<string, SourceCheck[]>();
  private running: Promise<void> | undefined;
  private timer: NodeJS.Timeout | undefined;
  private loaded: Promise<void>;

  constructor(
    private readonly sources: () => SourceAdapter[],
    private readonly options: SourceMonitorOptions = {},
  ) {
    this.loaded = this.load();
  }

  async report(): Promise<SourceHealthReport> {
    await this.loaded;
    const names = new Set([...this.sources().map((source) => source.name)]);
    const sources = [...names].map((name) => summarizeSource(name, this.checks.get(name) ?? []));
    return { sources, alerts: sourceAlerts(sources), running: this.running !== undefined };
  }

  /** One canary round; concurrent calls share the round in flight. */
  runOnce(): Promise<void> {
    this.running ??= this.round().finally(() => {
      this.running = undefined;
    });
    return this.running;
  }

  /** Every `minutes` (0 disables), first round after `firstDelayMs`. */
  schedule(minutes: number, firstDelayMs = 120_000): void {
    if (!(minutes > 0)) return;
    const tick = (delay: number) => {
      this.timer = setTimeout(() => {
        void this.runOnce().finally(() => tick(minutes * 60_000));
      }, delay);
      this.timer.unref?.();
    };
    tick(firstDelayMs);
  }

  stop(): void {
    if (this.timer) clearTimeout(this.timer);
  }

  private async round(): Promise<void> {
    await this.loaded;
    const now = this.options.now ?? Date.now;
    const pauseMs = this.options.pauseMs ?? 5_000;
    const sources = this.sources();
    for (const [index, source] of sources.entries()) {
      if (index > 0 && pauseMs > 0) await new Promise((resolve) => setTimeout(resolve, pauseMs));
      const check = await probe(source, this.options.timeoutMs ?? 60_000, now);
      const history = [...(this.checks.get(source.name) ?? []), check].slice(-HISTORY_PER_SOURCE);
      this.checks.set(source.name, history);
    }
    await this.save();
  }

  private async load(): Promise<void> {
    if (!this.options.file) return;
    try {
      const raw = JSON.parse(await readFile(this.options.file, "utf8")) as Record<string, SourceCheck[]>;
      for (const [name, checks] of Object.entries(raw)) {
        if (Array.isArray(checks)) this.checks.set(name, checks.slice(-HISTORY_PER_SOURCE));
      }
    } catch {
      // No file yet or unreadable: start with an empty history.
    }
  }

  private async save(): Promise<void> {
    if (!this.options.file) return;
    try {
      await mkdir(dirname(this.options.file), { recursive: true });
      await writeFile(this.options.file, JSON.stringify(Object.fromEntries(this.checks)));
    } catch {
      // Monitoring must never take the search service down.
    }
  }
}

/** Calls the adapter directly (no SearchService, no cache) so the check sees the live source. */
export async function probe(source: SourceAdapter, timeoutMs: number, now: () => number = Date.now): Promise<SourceCheck> {
  const started = now();
  const controller = new AbortController();
  let timer: NodeJS.Timeout | undefined;
  try {
    const offers = await Promise.race([
      source.search(productFromQuery(canaryFor(source.name), "query"), controller.signal),
      new Promise<never>((_resolve, reject) => {
        timer = setTimeout(() => {
          controller.abort();
          reject(new Error(`Нет ответа за ${Math.round(timeoutMs / 1000)} с`));
        }, timeoutMs);
      }),
    ]);
    const rows = offers.length;
    return {
      source: source.name,
      ok: rows > 0,
      rows,
      ms: now() - started,
      checkedAt: new Date(now()).toISOString(),
      ...(rows === 0 ? { error: "Пустой ответ на контрольный запрос" } : {}),
    };
  } catch (error) {
    return {
      source: source.name,
      ok: false,
      rows: 0,
      ms: now() - started,
      checkedAt: new Date(now()).toISOString(),
      error: (error instanceof Error ? error.message : String(error)).slice(0, 300),
    };
  } finally {
    if (timer) clearTimeout(timer);
  }
}

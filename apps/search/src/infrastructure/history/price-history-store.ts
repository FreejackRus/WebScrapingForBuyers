import { readFileSync } from "node:fs";
import { mkdir, rename, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

import type { PriceHistory, PriceHistoryPoint } from "@peremena/contracts";

export const MAX_PRODUCTS = 200;
export const MAX_POINTS = 60;
const SAVE_DEBOUNCE_MS = 500;

function isPoint(value: unknown): value is PriceHistoryPoint {
  if (!value || typeof value !== "object") return false;
  const point = value as Record<string, unknown>;
  return typeof point.at === "string" && typeof point.query === "string" && !!point.marketplace && !!point.distributor;
}

/**
 * Price series per product, newest product last. Memory only unless a file is given
 * (PRICE_HISTORY_FILE on a volume): the project has no database. A broken file means
 * an empty history, never a crash; a failed write only logs.
 */
export class PriceHistoryStore {
  private readonly series = new Map<string, PriceHistoryPoint[]>();
  private dirty = false;
  private timer: NodeJS.Timeout | undefined;
  private running: Promise<void> | undefined;

  constructor(
    private readonly filePath?: string,
    private readonly maxProducts: number = MAX_PRODUCTS,
    private readonly maxPoints: number = MAX_POINTS,
    private readonly debounceMs: number = SAVE_DEBOUNCE_MS,
  ) {
    this.load();
  }

  get(key: string): PriceHistory {
    return { key, points: structuredClone(this.series.get(key) ?? []).map(({ offers: _offers, ...rest }) => rest) };
  }

  /** Listing prices of the newest point of this product, with its time. */
  latestPrices(key: string): { at: string; prices: Record<string, number> } | undefined {
    const last = this.series.get(key)?.at(-1);
    return last?.offers ? { at: last.at, prices: { ...last.offers } } : undefined;
  }

  append(key: string, point: PriceHistoryPoint): void {
    // Listing prices are only needed for the next comparison: older points drop them.
    const older = (this.series.get(key) ?? []).map(({ offers: _offers, ...rest }) => rest);
    const points = [...older, structuredClone(point)].slice(-this.maxPoints);
    // Re-insert so the Map order is "least recently searched first": that one is dropped at the cap.
    this.series.delete(key);
    this.series.set(key, points);
    while (this.series.size > this.maxProducts) {
      const oldest = this.series.keys().next().value;
      if (oldest === undefined) break;
      this.series.delete(oldest);
    }
    this.schedule();
  }

  /** Writes any pending change right away; call it on shutdown. Never rejects. */
  async flush(): Promise<void> {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = undefined;
    }
    await this.drain();
  }

  private load(): void {
    if (!this.filePath) return;
    try {
      const parsed: unknown = JSON.parse(readFileSync(this.filePath, "utf8"));
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return;
      for (const [key, points] of Object.entries(parsed)) {
        if (!Array.isArray(points)) continue;
        const valid = points.filter(isPoint).slice(-this.maxPoints);
        if (valid.length) this.series.set(key, valid);
      }
      while (this.series.size > this.maxProducts) {
        const oldest = this.series.keys().next().value;
        if (oldest === undefined) break;
        this.series.delete(oldest);
      }
    } catch {
      // No file yet, or unreadable: start empty.
    }
  }

  private schedule(): void {
    if (!this.filePath) return;
    this.dirty = true;
    if (this.timer) return;
    this.timer = setTimeout(() => {
      this.timer = undefined;
      void this.drain();
    }, this.debounceMs);
  }

  private drain(): Promise<void> {
    if (this.running) return this.running;
    const run = (async () => {
      try {
        while (this.dirty) {
          this.dirty = false;
          await this.write();
        }
      } finally {
        this.running = undefined;
      }
    })();
    this.running = run;
    return run;
  }

  private async write(): Promise<void> {
    if (!this.filePath) return;
    try {
      await mkdir(dirname(this.filePath), { recursive: true });
      const tmp = `${this.filePath}.tmp`;
      await writeFile(tmp, JSON.stringify(Object.fromEntries(this.series)), "utf8");
      await rename(tmp, this.filePath);
    } catch (error) {
      console.warn(JSON.stringify({ msg: "price_history_save_failed", error: error instanceof Error ? error.message : String(error) }));
    }
  }
}

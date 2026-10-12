import { randomUUID } from "node:crypto";
import { readFileSync } from "node:fs";
import { mkdir, rename, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

import type { OfferChannel, Product, WatchItem } from "@peremena/contracts";

export const WATCHLIST_LIMIT = 30;
const SAVE_DEBOUNCE_MS = 200;

export interface NewWatch {
  query: string;
  product: Product;
  channel: OfferChannel;
  price: number;
  inStock: boolean;
}

function isWatchItem(value: unknown): value is WatchItem {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  const baseline = item.baseline as Record<string, unknown> | undefined;
  return (
    typeof item.id === "string" &&
    typeof item.query === "string" &&
    (item.channel === "marketplace" || item.channel === "distributor") &&
    !!item.product &&
    typeof item.product === "object" &&
    !!baseline &&
    typeof baseline.price === "number"
  );
}

/**
 * Per-user watched prices, newest first. Memory, mirrored to WATCHLIST_FILE when set
 * (the same no-database pattern as the search history). A broken file means an empty list.
 */
export class WatchlistStore {
  private readonly byUser = new Map<string, WatchItem[]>();
  private dirty = false;
  private timer: NodeJS.Timeout | undefined;
  private running: Promise<void> | undefined;

  constructor(
    private readonly filePath?: string,
    private readonly limit: number = WATCHLIST_LIMIT,
    private readonly now: () => number = Date.now,
    private readonly debounceMs: number = SAVE_DEBOUNCE_MS,
  ) {
    this.load();
  }

  list(userId: string): WatchItem[] {
    return structuredClone(this.byUser.get(userId) ?? []);
  }

  get(userId: string, id: string): WatchItem | undefined {
    const item = this.byUser.get(userId)?.find((entry) => entry.id === id);
    return item ? structuredClone(item) : undefined;
  }

  /** Every (user, item) pair, for the scheduled recheck. */
  all(): Array<{ userId: string; item: WatchItem }> {
    return [...this.byUser].flatMap(([userId, items]) => items.map((item) => ({ userId, item: structuredClone(item) })));
  }

  /** Undefined when the list is full. Watching the same product+channel again restarts it. */
  add(userId: string, watch: NewWatch): WatchItem | undefined {
    const items = this.byUser.get(userId) ?? [];
    const rest = items.filter((item) => !(item.product.id === watch.product.id && item.product.name === watch.product.name && item.channel === watch.channel));
    if (rest.length >= this.limit) return undefined;
    const at = new Date(this.now()).toISOString();
    const item: WatchItem = {
      id: randomUUID(),
      createdAt: at,
      query: watch.query.trim().slice(0, 300),
      product: structuredClone(watch.product),
      channel: watch.channel,
      baseline: { price: watch.price, inStock: watch.inStock, at },
      last: null,
      change: null,
    };
    this.byUser.set(userId, [item, ...rest]);
    this.schedule();
    return structuredClone(item);
  }

  /** Replaces the check result of an item; false when it was deleted meanwhile. */
  update(userId: string, id: string, patch: Pick<WatchItem, "last" | "change"> & { checkError?: string }): WatchItem | undefined {
    const items = this.byUser.get(userId);
    const index = items?.findIndex((item) => item.id === id) ?? -1;
    if (!items || index < 0) return undefined;
    const { checkError: _old, ...current } = items[index]!;
    const next: WatchItem = { ...current, last: patch.last, change: patch.change, ...(patch.checkError ? { checkError: patch.checkError } : {}) };
    items[index] = next;
    this.schedule();
    return structuredClone(next);
  }

  remove(userId: string, id: string): boolean {
    const items = this.byUser.get(userId) ?? [];
    const next = items.filter((item) => item.id !== id);
    if (next.length === items.length) return false;
    this.byUser.set(userId, next);
    this.schedule();
    return true;
  }

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
      for (const [userId, items] of Object.entries(parsed)) {
        if (Array.isArray(items)) this.byUser.set(userId, items.filter(isWatchItem).slice(0, this.limit));
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
      await writeFile(tmp, JSON.stringify(Object.fromEntries(this.byUser)), { encoding: "utf8", mode: 0o600 });
      await rename(tmp, this.filePath);
    } catch (error) {
      console.warn(JSON.stringify({ msg: "watchlist_save_failed", error: error instanceof Error ? error.message : String(error) }));
    }
  }
}

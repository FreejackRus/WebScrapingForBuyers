import { readFileSync } from "node:fs";
import { mkdir, rename, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

import type { Product, SearchHistoryEntry } from "@peremena/contracts";

export const DEFAULT_HISTORY_LIMIT = 30;
export const DEFAULT_SAVE_DEBOUNCE_MS = 200;

export interface SearchRecord {
  id: string;
  query: string;
  product: Product;
}

const MAX_QUERY_LENGTH = 300;

function isHistoryEntry(value: unknown): value is SearchHistoryEntry {
  if (!value || typeof value !== "object") return false;
  const entry = value as Record<string, unknown>;
  return (
    typeof entry.id === "string" &&
    typeof entry.query === "string" &&
    entry.query.length <= MAX_QUERY_LENGTH &&
    typeof entry.createdAt === "string" &&
    !!entry.product &&
    typeof entry.product === "object"
  );
}

function normalizeQuery(query: string): string {
  return query.toLocaleLowerCase("ru").replace(/\s+/g, " ").trim();
}

/**
 * Per-user list of recent searches, newest first. Kept in memory and mirrored to a JSON
 * file when a path is given, so a redeploy does not wipe it (the project has no database).
 * A missing or broken file means an empty history, never a crash.
 */
export class SearchHistory {
  private readonly byUser = new Map<string, SearchHistoryEntry[]>();
  private dirty = false;
  private timer: NodeJS.Timeout | undefined;
  private running: Promise<void> | undefined;

  constructor(
    private readonly filePath?: string,
    private readonly limit: number = DEFAULT_HISTORY_LIMIT,
    private readonly now: () => number = Date.now,
    private readonly debounceMs: number = DEFAULT_SAVE_DEBOUNCE_MS,
  ) {
    this.load();
  }

  list(userId: string): SearchHistoryEntry[] {
    return structuredClone(this.byUser.get(userId) ?? []);
  }

  record(userId: string, search: SearchRecord): void {
    const key = normalizeQuery(search.query);
    if (!key) return;
    const entry: SearchHistoryEntry = {
      id: search.id,
      query: search.query.trim(),
      product: structuredClone(search.product),
      createdAt: new Date(this.now()).toISOString(),
    };
    const rest = (this.byUser.get(userId) ?? []).filter((item) => normalizeQuery(item.query) !== key);
    this.byUser.set(userId, [entry, ...rest].slice(0, this.limit));
    this.schedule();
  }

  remove(userId: string, id: string): boolean {
    const entries = this.byUser.get(userId) ?? [];
    const next = entries.filter((entry) => entry.id !== id);
    if (next.length === entries.length) return false;
    this.byUser.set(userId, next);
    this.schedule();
    return true;
  }

  clear(userId: string): void {
    if (this.byUser.delete(userId)) this.schedule();
  }

  private load(): void {
    if (!this.filePath) return;
    try {
      const parsed: unknown = JSON.parse(readFileSync(this.filePath, "utf8"));
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return;
      for (const [userId, entries] of Object.entries(parsed)) {
        if (!Array.isArray(entries)) continue;
        // A damaged or hand-edited file must not break later searches: keep only well-formed entries.
        this.byUser.set(userId, entries.filter(isHistoryEntry).slice(0, this.limit));
      }
    } catch {
      // No file yet, or it is unreadable: start empty.
    }
  }

  /** Writes any pending change right away; call it on shutdown. Never rejects. */
  async flush(): Promise<void> {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = undefined;
    }
    await this.drain();
  }

  /** Marks the state dirty and coalesces a burst of changes into one delayed write. */
  private schedule(): void {
    if (!this.filePath) return;
    this.dirty = true;
    if (this.timer) return;
    this.timer = setTimeout(() => {
      this.timer = undefined;
      void this.drain();
    }, this.debounceMs);
  }

  /** One write at a time; changes that arrive meanwhile are saved by the next loop pass. */
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
      // Queries are mildly sensitive: owner-only file.
      await writeFile(tmp, JSON.stringify(Object.fromEntries(this.byUser)), { encoding: "utf8", mode: 0o600 });
      await rename(tmp, this.filePath);
    } catch (error) {
      // History is a convenience; a read-only volume must not break searching.
      console.warn(JSON.stringify({ msg: "history_save_failed", error: error instanceof Error ? error.message : String(error) }));
    }
  }
}

import { mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

import type { Product, SearchHistoryEntry } from "@peremena/contracts";

export const DEFAULT_HISTORY_LIMIT = 30;

export interface SearchRecord {
  id: string;
  query: string;
  product: Product;
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

  constructor(
    private readonly filePath?: string,
    private readonly limit: number = DEFAULT_HISTORY_LIMIT,
    private readonly now: () => number = Date.now,
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
    this.save();
  }

  remove(userId: string, id: string): boolean {
    const entries = this.byUser.get(userId) ?? [];
    const next = entries.filter((entry) => entry.id !== id);
    if (next.length === entries.length) return false;
    this.byUser.set(userId, next);
    this.save();
    return true;
  }

  clear(userId: string): void {
    if (this.byUser.delete(userId)) this.save();
  }

  private load(): void {
    if (!this.filePath) return;
    try {
      const parsed = JSON.parse(readFileSync(this.filePath, "utf8")) as Record<string, unknown>;
      for (const [userId, entries] of Object.entries(parsed)) {
        if (Array.isArray(entries)) this.byUser.set(userId, entries.slice(0, this.limit) as SearchHistoryEntry[]);
      }
    } catch {
      // No file yet, or it is unreadable: start empty.
    }
  }

  private save(): void {
    if (!this.filePath) return;
    try {
      mkdirSync(dirname(this.filePath), { recursive: true });
      const tmp = `${this.filePath}.tmp`;
      writeFileSync(tmp, JSON.stringify(Object.fromEntries(this.byUser)), "utf8");
      renameSync(tmp, this.filePath);
    } catch (error) {
      // History is a convenience; a read-only volume must not break searching.
      console.warn(JSON.stringify({ msg: "history_save_failed", error: error instanceof Error ? error.message : String(error) }));
    }
  }
}

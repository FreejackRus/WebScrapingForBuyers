import { randomUUID } from "node:crypto";

import type { Offer, Product, SearchEvent, SearchSnapshot, SourceState } from "@peremena/contracts";

import { flagPriceAnomalies } from "../domain/price-anomaly.js";
import type { SourceAdapter } from "../domain/source-adapter.js";

type Listener = (event: SearchEvent) => void;

function lastGoodKey(source: string, product: Product): string {
  return `${source}\0${product.mpn}\0${product.model}`.toLocaleLowerCase("ru");
}

export interface SearchRetention {
  /** How long a finished search stays readable (SSE replay, Excel export). */
  ttlMs: number;
  /** Upper bound on stored searches; oldest finished ones go first. */
  maxSearches: number;
  /** Upper bound on remembered per-source "last good" result sets. */
  maxLastGood: number;
}

export const DEFAULT_RETENTION: SearchRetention = {
  ttlMs: 6 * 60 * 60 * 1000,
  maxSearches: 200,
  maxLastGood: 200,
};

export class SearchService {
  private readonly searches = new Map<string, SearchSnapshot>();
  private readonly finishedAt = new Map<string, number>();
  private readonly listeners = new Map<string, Set<Listener>>();
  private readonly lastGoodReal = new Map<string, Offer[]>();

  constructor(
    private readonly sources: SourceAdapter[],
    private readonly retention: SearchRetention = DEFAULT_RETENTION,
    private readonly now: () => number = Date.now,
  ) {}

  listSources(): string[] {
    return this.sources.map((source) => source.name);
  }

  start(query: string, product: Product, sourceNames?: string[]): SearchSnapshot {
    const selected = this.resolveSources(sourceNames);
    const snapshot: SearchSnapshot = {
      id: randomUUID(),
      query,
      product,
      status: "running",
      offers: [],
      sources: selected.map((source) => ({ source: source.name, status: "pending" })),
    };
    this.prune();
    this.searches.set(snapshot.id, snapshot);
    queueMicrotask(() => void this.collect(snapshot.id, selected));
    return structuredClone(snapshot);
  }

  get(id: string): SearchSnapshot | undefined {
    const snapshot = this.searches.get(id);
    return snapshot ? structuredClone(snapshot) : undefined;
  }

  subscribe(id: string, listener: Listener): () => void {
    const listeners = this.listeners.get(id) ?? new Set<Listener>();
    listeners.add(listener);
    this.listeners.set(id, listeners);
    return () => {
      listeners.delete(listener);
      if (listeners.size === 0) this.listeners.delete(id);
    };
  }

  resolveSources(sourceNames?: string[]): SourceAdapter[] {
    if (!sourceNames?.length) return this.sources;
    const wanted = new Set(sourceNames.map((name) => name.trim().toLocaleLowerCase("ru")).filter(Boolean));
    return this.sources.filter((source) => wanted.has(source.name.toLocaleLowerCase("ru")));
  }

  private async collect(id: string, sources = this.sources): Promise<void> {
    const snapshot = this.searches.get(id);
    if (!snapshot) return;

    await Promise.allSettled(
      sources.map(async (source) => {
        this.updateSource(snapshot, source.name, { source: source.name, status: "loading" });
        try {
          const offers = await source.search(snapshot.product);
          snapshot.offers.push(...offers);
          flagPriceAnomalies(snapshot.offers);
          const real = offers.filter((offer) => !offer.demo);
          if (real.length > 0) {
            this.rememberLastGood(lastGoodKey(source.name, snapshot.product), real);
          }
          console.info(
            JSON.stringify({
              msg: "source_collect",
              searchId: id,
              source: source.name,
              offers: offers.length,
            }),
          );
          this.emit(id, { type: "offers", data: structuredClone(offers) });
          this.updateSource(snapshot, source.name, { source: source.name, status: "done" });
        } catch (error) {
          const message = error instanceof Error ? error.message : "Неизвестная ошибка";
          const cached = this.lastGoodReal.get(lastGoodKey(source.name, snapshot.product));
          if (cached && cached.length > 0) {
            const reused = structuredClone(cached);
            snapshot.offers.push(...reused);
            flagPriceAnomalies(snapshot.offers);
            this.emit(id, { type: "offers", data: reused });
          }
          this.updateSource(snapshot, source.name, {
            source: source.name,
            status: "error",
            message:
              cached && cached.length > 0
                ? `${message} Показаны последние удачные REAL-предложения.`
                : message,
          });
        }
      }),
    );

    snapshot.status = "complete";
    this.finishedAt.set(id, this.now());
    this.emit(id, { type: "complete", data: structuredClone(snapshot) });
  }

  private rememberLastGood(key: string, real: Offer[]): void {
    // Delete first so a refreshed key moves to the newest position of the Map.
    this.lastGoodReal.delete(key);
    this.lastGoodReal.set(key, structuredClone(real));
    while (this.lastGoodReal.size > this.retention.maxLastGood) {
      const oldest = this.lastGoodReal.keys().next().value;
      if (oldest === undefined) break;
      this.lastGoodReal.delete(oldest);
    }
  }

  /** Drops expired finished searches, then the oldest finished ones above the cap. Running searches are never dropped. */
  private prune(): void {
    const cutoff = this.now() - this.retention.ttlMs;
    for (const [id, finished] of this.finishedAt) {
      if (finished <= cutoff) this.forget(id);
    }
    for (const id of this.finishedAt.keys()) {
      if (this.searches.size < this.retention.maxSearches) break;
      this.forget(id);
    }
  }

  private forget(id: string): void {
    this.searches.delete(id);
    this.finishedAt.delete(id);
    this.listeners.delete(id);
  }

  private updateSource(snapshot: SearchSnapshot, sourceName: string, state: SourceState): void {
    const index = snapshot.sources.findIndex((source) => source.source === sourceName);
    if (index >= 0) snapshot.sources[index] = state;
    this.emit(snapshot.id, { type: "source", data: structuredClone(state) });
  }

  private emit(id: string, event: SearchEvent): void {
    this.listeners.get(id)?.forEach((listener) => listener(event));
  }
}

export type { Offer };

import { randomUUID } from "node:crypto";

import type { Offer, Product, SearchEvent, SearchSnapshot, SourceState } from "@peremena/contracts";

import type { SourceAdapter } from "../domain/source-adapter.js";

type Listener = (event: SearchEvent) => void;

function lastGoodKey(source: string, product: Product): string {
  return `${source}\0${product.mpn}\0${product.model}`.toLocaleLowerCase("ru");
}

export class SearchService {
  private readonly searches = new Map<string, SearchSnapshot>();
  private readonly listeners = new Map<string, Set<Listener>>();
  private readonly lastGoodReal = new Map<string, Offer[]>();

  constructor(private readonly sources: SourceAdapter[]) {}

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
          const real = offers.filter((offer) => !offer.demo);
          if (real.length > 0) {
            this.lastGoodReal.set(lastGoodKey(source.name, snapshot.product), structuredClone(real));
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
    this.emit(id, { type: "complete", data: structuredClone(snapshot) });
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

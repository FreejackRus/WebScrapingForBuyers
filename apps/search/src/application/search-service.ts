import { randomUUID } from "node:crypto";

import { offerAvailabilityStatus, offerChannel, type Offer, type Product, type SearchEvent, type SearchSnapshot, type SourceState } from "@peremena/contracts";

import { isUnrequestedConsumablePart } from "../domain/consumable-parts.js";
import { isOfferInItScope } from "../domain/it-scope.js";
import { assessOffer } from "../domain/offer-assessment.js";
import { withCatalogArticles } from "../domain/catalog-article.js";
import { applyCardFacts, type CardVerifier } from "../domain/offer-verification.js";
import { flagPriceAnomalies } from "../domain/price-anomaly.js";
import { markPreviousPrices, priceHistoryKey, priceHistoryPoint } from "../domain/price-history.js";
import type { PriceHistoryStore } from "../infrastructure/history/price-history-store.js";
import { assignProcurementRanks } from "../domain/procurement-rank.js";
import type { SourceAdapter } from "../domain/source-adapter.js";
import { isSourceDisabled } from "../domain/source-policy.js";

type Listener = (event: SearchEvent) => void;

/** Rank and anomaly flag of each existing row, to detect a re-ranking by a later batch. */
function rankState(offers: Offer[]): Map<string, string> {
  return new Map(offers.map((offer) => [offer.id, `${offer.procurementRank ?? ""}|${offer.priceAnomaly ?? ""}`]));
}

function rankStateChanged(before: Map<string, string>, offers: Offer[]): boolean {
  return offers.some(
    (offer) => before.has(offer.id) && before.get(offer.id) !== `${offer.procurementRank ?? ""}|${offer.priceAnomaly ?? ""}`,
  );
}

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

/** How many top rows a buyer reads first; these are re-checked on the product card. */
export const VERIFY_TOP = 3;
/** Whole verification step; a slow card must not hold the search much longer. */
export const VERIFY_BUDGET_MS = 25_000;
const VERIFY_CARD_TIMEOUT_MS = 12_000;

/** One slow or hung source must not keep a whole search in "running" forever. */
export const DEFAULT_SOURCE_TIMEOUT_MS = 120_000;

function withDeadline<T>(work: Promise<T>, ms: number, label: string): Promise<T> {
  let timer: NodeJS.Timeout | undefined;
  const deadline = new Promise<never>((_resolve, reject) => {
    timer = setTimeout(() => reject(new Error(`${label}: источник не ответил за ${Math.round(ms / 1000)} с.`)), ms);
  });
  return Promise.race([work, deadline]).finally(() => clearTimeout(timer));
}

/** Minutes a finished search is reused for the same request; 0 disables the cache. */
export function searchCacheMs(env: NodeJS.ProcessEnv = process.env): number {
  const raw = env.SEARCH_CACHE_MINUTES;
  const minutes = raw === undefined || raw.trim() === "" ? 15 : Number(raw);
  return Number.isFinite(minutes) && minutes > 0 ? minutes * 60_000 : 0;
}

/** Same typed query, same product identity and same source set: the buyer repeats the search. */
function searchCacheKey(query: string, product: Product, sourceNames: string[]): string {
  const norm = (value: string | undefined) => (value ?? "").trim().replace(/\s+/g, " ").toLocaleLowerCase("ru");
  return [norm(query), norm(product.mpn), norm(product.model), norm(product.name), [...sourceNames].map(norm).sort().join(",")].join("\0");
}

export interface StartOptions {
  /** Skip the recent-result cache («Обновить»). */
  fresh?: boolean;
}

export class SearchService {
  private readonly searches = new Map<string, SearchSnapshot>();
  private readonly finishedAt = new Map<string, number>();
  private readonly listeners = new Map<string, Set<Listener>>();
  private readonly lastGoodReal = new Map<string, Offer[]>();
  /** Cache key of each search, taken at start: the product changes later (catalogue articles). */
  private readonly cacheKeys = new Map<string, string>();

  constructor(
    private readonly sources: SourceAdapter[],
    private readonly retention: SearchRetention = DEFAULT_RETENTION,
    private readonly now: () => number = Date.now,
    private readonly sourceTimeoutMs: number = Number(process.env.SOURCE_TIMEOUT_MS) || DEFAULT_SOURCE_TIMEOUT_MS,
    private readonly verifiers: CardVerifier[] = [],
    private readonly cacheMs: number = searchCacheMs(),
    private readonly priceHistory?: PriceHistoryStore,
  ) {}

  listSources(): string[] {
    return this.resolveSources().map((source) => source.name);
  }

  start(query: string, product: Product, sourceNames?: string[], options: StartOptions = {}): SearchSnapshot {
    const selected = this.resolveSources(sourceNames);
    const key = searchCacheKey(query, product, selected.map((source) => source.name));
    this.prune();
    const cached = options.fresh ? undefined : this.recentComplete(key);
    if (cached) {
      const copy: SearchSnapshot = {
        ...structuredClone(cached.snapshot),
        id: randomUUID(),
        status: "complete",
        cachedAt: new Date(cached.finishedAt).toISOString(),
      };
      this.searches.set(copy.id, copy);
      // Its own finish time stays the original one, so a copy never extends the cache life.
      this.finishedAt.set(copy.id, cached.finishedAt);
      return structuredClone(copy);
    }
    const snapshot: SearchSnapshot = {
      id: randomUUID(),
      query,
      product,
      status: "running",
      offers: [],
      sources: selected.map((source) => ({ source: source.name, status: "pending" })),
    };
    this.attachHistoryKey(snapshot);
    this.searches.set(snapshot.id, snapshot);
    this.cacheKeys.set(snapshot.id, key);
    queueMicrotask(() => void this.collect(snapshot.id, selected));
    return structuredClone(snapshot);
  }

  /** Newest completed (non-copy) search for this key that is still fresh enough to reuse. */
  private recentComplete(key: string): { snapshot: SearchSnapshot; finishedAt: number } | undefined {
    if (this.cacheMs <= 0) return undefined;
    let best: { snapshot: SearchSnapshot; finishedAt: number } | undefined;
    for (const [id, cacheKey] of this.cacheKeys) {
      if (cacheKey !== key) continue;
      const snapshot = this.searches.get(id);
      const finishedAt = this.finishedAt.get(id);
      if (!snapshot || snapshot.status !== "complete" || finishedAt === undefined) continue;
      if (this.now() - finishedAt >= this.cacheMs) continue;
      if (!best || finishedAt > best.finishedAt) best = { snapshot, finishedAt };
    }
    return best;
  }

  /**
   * Runs a search to completion for internal checks (weekly quality eval). Goes straight to
   * start(), never through any HTTP-level result cache, so the score reflects live sources.
   */
  async runUncached(query: string, product: Product, timeoutMs = 150_000): Promise<SearchSnapshot> {
    const { id } = this.start(query, product, undefined, { fresh: true });
    const started = this.now();
    for (;;) {
      const snapshot = this.get(id);
      if (!snapshot || snapshot.status !== "running" || this.now() - started > timeoutMs) {
        return snapshot ?? { id, query, product, status: "complete", offers: [], sources: [] };
      }
      await new Promise((resolve) => setTimeout(resolve, 1_000));
    }
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
    const active = this.sources.filter((source) => !isSourceDisabled(source.name));
    if (!sourceNames?.length) return active;
    const wanted = new Set(sourceNames.map((name) => name.trim().toLocaleLowerCase("ru")).filter(Boolean));
    return active.filter((source) => wanted.has(source.name.toLocaleLowerCase("ru")));
  }

  private async collect(id: string, sources = this.sources): Promise<void> {
    const snapshot = this.searches.get(id);
    if (!snapshot) return;
    await this.resolveArticles(snapshot, sources).catch(() => undefined);

    await Promise.allSettled(
      sources.map(async (source) => {
        this.updateSource(snapshot, source.name, { source: source.name, status: "loading" });
        try {
          const found = await withDeadline(
            source.search(snapshot.product, AbortSignal.timeout(this.sourceTimeoutMs)),
            this.sourceTimeoutMs,
            source.name,
          );
          // Demo rows are labelled fixtures; real rows must positively look like equipment.
          const inScope = found.filter((offer) => offer.demo || isOfferInItScope(snapshot.product, offer));
          const offers = this.matchingQuery(snapshot, inScope);
          const ranksBefore = rankState(snapshot.offers);
          snapshot.offers.push(...offers);
          flagPriceAnomalies(snapshot.offers);
          assignProcurementRanks(snapshot.offers);
          const reranked = rankStateChanged(ranksBefore, snapshot.offers);
          // Cache before the query-intent filter: the next query for the same item may ask the opposite.
          const real = inScope.filter((offer) => !offer.demo);
          if (real.length > 0) {
            this.rememberLastGood(lastGoodKey(source.name, snapshot.product), real);
          }
          console.info(
            JSON.stringify({
              msg: "source_collect",
              searchId: id,
              source: source.name,
              found: found.length,
              offers: offers.length,
              droppedByItScope: found.length - inScope.length,
              droppedByQueryIntent: inScope.length - offers.length,
            }),
          );
          this.emit(id, { type: "offers", data: structuredClone(offers) });
          // Earlier rows got new ranks/anomaly flags: the client must not keep stale ones.
          if (reranked) this.emit(id, { type: "snapshot", data: structuredClone(snapshot) });
          this.updateSource(snapshot, source.name, { source: source.name, status: "done" });
        } catch (error) {
          const message = error instanceof Error ? error.message : "Неизвестная ошибка";
          const cached = this.lastGoodReal.get(lastGoodKey(source.name, snapshot.product));
          if (cached && cached.length > 0) {
            const reused = this.matchingQuery(snapshot, structuredClone(cached));
            const ranksBefore = rankState(snapshot.offers);
            snapshot.offers.push(...reused);
            flagPriceAnomalies(snapshot.offers);
            assignProcurementRanks(snapshot.offers);
            this.emit(id, { type: "offers", data: reused });
            if (rankStateChanged(ranksBefore, snapshot.offers)) {
              this.emit(id, { type: "snapshot", data: structuredClone(snapshot) });
            }
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

    assignProcurementRanks(snapshot.offers);
    await this.verifyTop(snapshot).catch(() => undefined);
    this.recordPriceHistory(snapshot);
    snapshot.status = "complete";
    this.finishedAt.set(id, this.now());
    this.emit(id, { type: "complete", data: structuredClone(snapshot) });
  }

  /** Exact maker article from a distributor catalogue before the sources are asked (3 s at most). */
  private async resolveArticles(snapshot: SearchSnapshot, sources: SourceAdapter[]): Promise<void> {
    for (const source of sources) {
      if (!source.articlesFor) continue;
      const articles = await withDeadline(source.articlesFor(snapshot.product, snapshot.query), 3_000, source.name).catch(() => []);
      const product = withCatalogArticles(snapshot.product, articles, source.name);
      if (product === snapshot.product) continue;
      snapshot.product = product;
      console.info(JSON.stringify({ msg: "catalog_articles", searchId: snapshot.id, source: source.name, articles }));
      this.emit(snapshot.id, { type: "snapshot", data: structuredClone(snapshot) });
      return;
    }
  }

  /**
   * Re-checks the rows a buyer reads first on their product cards. A row that fails
   * (sold out, other model) sinks, so the next one is checked — a few rounds at most.
   */
  private async verifyTop(snapshot: SearchSnapshot): Promise<void> {
    if (this.verifiers.length === 0) return;
    const deadline = this.now() + VERIFY_BUDGET_MS;
    const tried = new Set<string>();
    for (let round = 0; round < 3 && this.now() < deadline; round += 1) {
      const ranked = [...snapshot.offers]
        .filter((offer) => !offer.demo && offer.priceAnomaly !== "too_low" && offer.assessment?.group !== "needs_review")
        .sort((a, b) => (a.procurementRank ?? Infinity) - (b.procurementRank ?? Infinity));
      // The table has a marketplace tab and a distributor tab: the buyer reads the top of each.
      const top = (["marketplace", "distributor"] as const).flatMap((channel) =>
        ranked.filter((offer) => offerChannel(offer) === channel).slice(0, VERIFY_TOP));
      const pending = top.flatMap((offer) => {
        const verifier = tried.has(offer.id) ? undefined : this.verifiers.find((candidate) => candidate.supports(offer));
        return verifier ? [{ offer, verifier }] : [];
      });
      if (pending.length === 0) return;
      const timeout = Math.max(1000, Math.min(VERIFY_CARD_TIMEOUT_MS, deadline - this.now()));
      const results = await Promise.allSettled(
        pending.map(({ offer, verifier }) => {
          tried.add(offer.id);
          return withDeadline(verifier.fetch(offer, AbortSignal.timeout(timeout)), timeout, offer.source);
        }),
      );
      const checkedAt = new Date(this.now()).toISOString();
      let changed = false;
      results.forEach((result, index) => {
        const { offer } = pending[index]!;
        if (result.status !== "fulfilled" || !result.value) return;
        const position = snapshot.offers.findIndex((row) => row.id === offer.id);
        if (position < 0) return;
        snapshot.offers[position] = applyCardFacts(offer, result.value, snapshot.product, snapshot.query, checkedAt);
        changed = true;
      });
      console.info(JSON.stringify({
        msg: "verify_top",
        searchId: snapshot.id,
        round,
        checked: pending.length,
        statuses: pending.map(({ offer }) => snapshot.offers.find((row) => row.id === offer.id)?.verification?.status ?? "failed"),
      }));
      if (!changed) return;
      flagPriceAnomalies(snapshot.offers);
      assignProcurementRanks(snapshot.offers);
      this.emit(snapshot.id, { type: "snapshot", data: structuredClone(snapshot) });
    }
  }

  /**
   * What the typed query says beyond the product itself: «оригинальный» /
   * «совместимый», and no cartridge chips/toner unless asked for.
   */
  private matchingQuery(snapshot: SearchSnapshot, offers: Offer[]): Offer[] {
    return offers.flatMap((rawOffer) => {
      const offer = { ...rawOffer, availabilityStatus: offerAvailabilityStatus(rawOffer) };
      if (offer.demo) return [offer];
      if (isUnrequestedConsumablePart(offer, snapshot.query)) return [];
      const assessed = assessOffer(snapshot.product, offer, snapshot.query);
      return assessed ? [assessed] : [];
    });
  }

  private attachHistoryKey(snapshot: SearchSnapshot): void {
    if (!this.priceHistory) return;
    const key = priceHistoryKey(snapshot.product);
    if (key) snapshot.historyKey = key;
    else delete snapshot.historyKey;
  }

  /**
   * One point per completed real search. The key is taken again: a catalogue article found
   * during the search names the product better than the typed text did.
   */
  private recordPriceHistory(snapshot: SearchSnapshot): void {
    if (!this.priceHistory) return;
    this.attachHistoryKey(snapshot);
    if (!snapshot.historyKey) return;
    const previous = this.priceHistory.latestPrices(snapshot.historyKey);
    delete snapshot.previousPricesAt;
    markPreviousPrices(snapshot.offers, previous?.prices);
    if (previous) snapshot.previousPricesAt = previous.at;
    const point = priceHistoryPoint(snapshot.query, snapshot.offers, new Date(this.now()).toISOString());
    if (point) this.priceHistory.append(snapshot.historyKey, point);
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
    this.cacheKeys.delete(id);
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

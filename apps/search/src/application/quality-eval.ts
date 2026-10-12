import { existsSync, readFileSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import type { Offer, QualityFailedQuery, QualityReport, QualityResult } from "@peremena/contracts";

/**
 * TS port of scripts/eval-search.mjs: the same cases and the same top-3 scoring, run in-process
 * on a schedule so a quality drop shows up in the admin panel instead of in a manager's complaint.
 */

export interface QualityCase {
  query: string;
  top?: string;
  notTop?: string;
}

export interface CaseScore {
  query: string;
  total: number;
  precision: number;
  distributorRows: number;
  distributorPrecision?: number;
  topInStock: number;
  top: string[];
}

const TOP = 3;
const DISTRIBUTORS = new Set(["netlab", "ocs", "merlion", "treolan", "марвел", "servermall", "срвтрейд", "онлайнтрейд", "регард", "хардпрайс", "торгpc"]);
export const QUALITY_HISTORY = 12;
/** Alert thresholds: marketplace precision fell by ≥5 p.p. or ≥3 more queries came back empty. */
const PRECISION_DROP = 0.05;
const EMPTY_GROWTH = 3;

const isDistributor = (offer: Offer) => DISTRIBUTORS.has(offer.source.toLocaleLowerCase("ru"));
const inStock = (offer: Offer) =>
  offer.availabilityStatus ? offer.availabilityStatus === "in_stock" : !/нет в наличии|под заказ|ожида/i.test(offer.availability);
const regex = (source?: string) => (source ? new RegExp(source, "iu") : undefined);

export function scoreCase(testCase: QualityCase, offers: Offer[]): CaseScore {
  const sorted = [...offers].sort((a, b) => (a.procurementRank ?? 1e9) - (b.procurementRank ?? 1e9));
  // The table shows marketplaces and distributors in separate tabs: score the top rows of each.
  const top = sorted.filter((offer) => !isDistributor(offer)).slice(0, TOP);
  const topDistributors = sorted.filter(isDistributor).slice(0, TOP);
  const want = regex(testCase.top);
  const avoid = regex(testCase.notTop);
  const hay = (offer: Offer) => `${offer.title} ${offer.mpn ?? ""}`.toLowerCase();
  const good = (offer: Offer) => (!want || want.test(hay(offer))) && !(avoid && avoid.test(hay(offer)));
  const hits = top.filter(good).length;
  const distributorHits = topDistributors.filter(good).length;
  return {
    query: testCase.query,
    total: offers.length,
    precision: top.length ? hits / top.length : 0,
    distributorRows: topDistributors.length,
    ...(topDistributors.length ? { distributorPrecision: distributorHits / topDistributors.length } : {}),
    topInStock: top.filter(inStock).length,
    top: [...top, ...topDistributors].map((offer) => `${good(offer) ? "✓" : "✗"} [${offer.source}] ${offer.title}`),
  };
}

const round3 = (value: number) => Math.round(value * 1000) / 1000;

export function summarize(scores: CaseScore[], at: string, previous?: QualityResult): QualityResult {
  const avg = (pick: (score: CaseScore) => number, list = scores) =>
    list.length ? list.reduce((sum, score) => sum + pick(score), 0) / list.length : 0;
  const withDistributors = scores.filter((score) => score.distributorRows > 0);
  const failedQueries: QualityFailedQuery[] = scores
    .filter((score) => score.precision < 1)
    .map((score) => ({ query: score.query, precision: round3(score.precision), top: score.top }));
  const result: QualityResult = {
    at,
    cases: scores.length,
    marketplacePrecision: round3(avg((score) => score.precision)),
    distributorPrecision: withDistributors.length ? round3(avg((score) => score.distributorPrecision ?? 0, withDistributors)) : null,
    empty: scores.filter((score) => score.total === 0).length,
    inStockShare: round3(avg((score) => score.topInStock / TOP)),
    perfect: scores.filter((score) => score.precision === 1).length,
    failedQueries,
    alerts: [],
  };
  return { ...result, alerts: qualityAlerts(previous, result) };
}

export function qualityAlerts(previous: QualityResult | undefined, current: QualityResult): string[] {
  if (!previous) return [];
  const alerts: string[] = [];
  const drop = previous.marketplacePrecision - current.marketplacePrecision;
  if (drop >= PRECISION_DROP - 1e-9) {
    const pct = (value: number) => `${Math.round(value * 100)}%`;
    alerts.push(`Качество поиска упало: точность маркетплейсов ${pct(previous.marketplacePrecision)} → ${pct(current.marketplacePrecision)}`);
  }
  if (current.empty - previous.empty >= EMPTY_GROWTH) {
    alerts.push(`Качество поиска упало: пустых выдач ${previous.empty} → ${current.empty}`);
  }
  return alerts;
}

/** When the next run is due: interval after the last one, but never sooner than `minDelayMs` after start. */
export function nextRunDelay(last: QualityResult | undefined, intervalMs: number, now: number, minDelayMs: number): number {
  const due = last ? Date.parse(last.at) + intervalMs - now : 0;
  return Math.max(minDelayMs, Number.isFinite(due) ? due : 0);
}

/** Cases ship next to the compiled module (copied by the build) or come from the repo's eval/ in dev and tests. */
export function loadQualityCases(file = process.env.QUALITY_CASES_FILE): QualityCase[] {
  const candidates = [
    file,
    fileURLToPath(new URL("./search-cases.json", import.meta.url)),
    fileURLToPath(new URL("../../../../eval/search-cases.json", import.meta.url)),
  ].filter((path): path is string => Boolean(path));
  const found = candidates.find((path) => existsSync(path));
  return found ? (JSON.parse(readFileSync(found, "utf8")) as QualityCase[]) : [];
}

/** Runs one query to completion, bypassing any search cache; returns the final offers. */
export type QueryRunner = (query: string) => Promise<Offer[]>;

export class QualityEvaluator {
  private results: QualityResult[] = [];
  private running: Promise<QualityResult> | undefined;
  private timer: NodeJS.Timeout | undefined;
  private readonly loaded: Promise<void>;

  constructor(
    private readonly runner: QueryRunner,
    private readonly cases: () => QualityCase[] = () => loadQualityCases(),
    private readonly file?: string,
    private readonly now: () => number = Date.now,
  ) {
    this.loaded = this.load();
  }

  async report(): Promise<QualityReport> {
    await this.loaded;
    return { results: [...this.results], running: this.running !== undefined };
  }

  /** Starts a run unless one is already going; returns false when it was already running. */
  trigger(): boolean {
    if (this.running) return false;
    void this.run().catch(() => undefined);
    return true;
  }

  run(): Promise<QualityResult> {
    this.running ??= this.evaluate().finally(() => {
      this.running = undefined;
    });
    return this.running;
  }

  async schedule(days: number, minDelayMs = 10 * 60_000): Promise<void> {
    if (!(days > 0)) return;
    await this.loaded;
    const intervalMs = days * 86_400_000;
    const tick = (delay: number) => {
      this.timer = setTimeout(() => {
        void this.run()
          .catch(() => undefined)
          .finally(() => tick(intervalMs));
      }, Math.min(delay, 2 ** 31 - 1));
      this.timer.unref?.();
    };
    tick(nextRunDelay(this.results.at(-1), intervalMs, this.now(), minDelayMs));
  }

  stop(): void {
    if (this.timer) clearTimeout(this.timer);
  }

  private async evaluate(): Promise<QualityResult> {
    await this.loaded;
    const scores: CaseScore[] = [];
    // Sequential on purpose: thirty parallel searches would trip marketplace rate limits.
    for (const testCase of this.cases()) {
      const offers = await this.runner(testCase.query).catch(() => [] as Offer[]);
      scores.push(scoreCase(testCase, offers));
    }
    const result = summarize(scores, new Date(this.now()).toISOString(), this.results.at(-1));
    this.results = [...this.results, result].slice(-QUALITY_HISTORY);
    await this.save();
    return result;
  }

  private async load(): Promise<void> {
    if (!this.file) return;
    try {
      const raw = JSON.parse(await readFile(this.file, "utf8")) as unknown;
      if (Array.isArray(raw)) this.results = (raw as QualityResult[]).slice(-QUALITY_HISTORY);
    } catch {
      // No stored results yet.
    }
  }

  private async save(): Promise<void> {
    if (!this.file) return;
    try {
      await mkdir(dirname(this.file), { recursive: true });
      await writeFile(this.file, JSON.stringify(this.results));
    } catch {
      // Losing the history file must not fail the run.
    }
  }
}

import type { NarrationStats } from "@peremena/contracts";

const RECENT = 10;

/** In-memory counters of the fact check on model prose (reset on restart; admin panel only). */
export class NarrationStatsRecorder {
  private readonly stats: NarrationStats;

  constructor(private readonly now: () => Date = () => new Date()) {
    this.stats = { since: now().toISOString(), accepted: 0, rejected: 0, warningsDropped: 0, recent: [] };
  }

  accepted(): void {
    this.stats.accepted += 1;
  }

  rejected(kind: "summary" | "answer", problem: string): void {
    this.stats.rejected += 1;
    this.stats.recent.unshift({ at: this.now().toISOString(), kind, problem: problem.slice(0, 300) });
    this.stats.recent.length = Math.min(this.stats.recent.length, RECENT);
  }

  warningsDropped(count: number): void {
    this.stats.warningsDropped += count;
  }

  snapshot(): NarrationStats {
    return structuredClone(this.stats);
  }
}

export const narrationStats = new NarrationStatsRecorder();

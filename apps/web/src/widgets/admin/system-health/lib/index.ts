import type { QualityReport, QualityResult, SourceHealth, SourceHealthReport } from "@peremena/contracts";

import { request } from "shared/api";
import { apiBase } from "shared/config";

export const systemHealthApi = {
  sources: () => request<SourceHealthReport>(`${apiBase}/admin/sources/health`),
  quality: () => request<QualityReport>(`${apiBase}/admin/quality`),
  runQuality: () => request<QualityReport & { started: boolean }>(`${apiBase}/admin/quality/run`, { method: "POST", body: "{}" }),
};

/** Banner lines for admins: failing sources first, then the latest quality drop. */
export function adminAlerts(sources?: SourceHealthReport, quality?: QualityReport): string[] {
  return [...(sources?.alerts ?? []), ...(quality?.results.at(-1)?.alerts ?? [])];
}

export type SourceTone = "ok" | "warn" | "error" | "unknown";

export function sourceTone(source: SourceHealth): SourceTone {
  if (!source.last) return "unknown";
  if (source.last.ok) return "ok";
  return source.consecutiveFailures >= 3 ? "error" : "warn";
}

export const percent = (value: number | null | undefined) => (value === null || value === undefined ? "—" : `${Math.round(value * 100)}%`);

export function formatTime(iso?: string): string {
  if (!iso) return "—";
  const date = new Date(iso);
  return Number.isNaN(date.getTime())
    ? "—"
    : date.toLocaleString("ru-RU", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
}

/** Polyline points for the precision trend, 0..1 mapped onto a width×height box. */
export function trendPoints(results: QualityResult[], width: number, height: number): string {
  if (results.length === 0) return "";
  const step = results.length > 1 ? width / (results.length - 1) : 0;
  return results
    .map((result, index) => `${Math.round(index * step)},${Math.round(height - result.marketplacePrecision * height)}`)
    .join(" ");
}

import type { AnalysisResult, OfferCitation, SourceState, UserRole } from "@peremena/contracts";

/** User-facing stand-in when a marketplace failed or a leaky sentence was dropped. */
export const SOURCE_UNAVAILABLE = "источник временно недоступен";
const REPLY_UNAVAILABLE = "Не удалось подготовить ответ; проверьте предложения в таблице.";

/**
 * Internal transport / operator runbooks that procurement chat must never echo.
 * Admin connector `source.message` stays on the sources panel, not in the LLM.
 */
const INFRA_LEAK_SOURCE =
  String.raw`(?<![a-zа-яё0-9])(?:v[\s._-]*(?:n[\s._-]*c|c[\s._-]*n)|m[\s._-]*c[\s._-]*p|c[\s._-]*d[\s._-]*p)(?![a-zа-яё0-9])|\b(?:ssh|qrator|handoff|docker(?:-compose)?|chrome[-_ ]?cdp|chrome[- ]headed|headed\s+chrome|chrome\s+profile|marketplace-mcp|ru-marketplace-mcp|wb_search|ozon_search|avito_search|yandex_search|citilink_search|dns_search|compose\s+up|captcha|ollama|qwen\w*|gguf|vllm|llm)\b|(?<![a-zа-яё0-9])(?:антибот|прогрев|капч\w*)(?![a-zа-яё0-9])|\b(?:http\s*(?:403|429|5\d\d)|(?:search|card)\.wb\.ru|hf\.co)\b|ssh\s+-L|:5901\b|:9222\b|\b5901\b|\b9222\b|CHROME_CDP`;

function leakRe(): RegExp {
  return new RegExp(INFRA_LEAK_SOURCE, "i");
}

export function hasInfraLeak(text: string): boolean {
  return leakRe().test(text);
}

export function sanitizeUserFacingText(
  text: string,
  fallback = SOURCE_UNAVAILABLE,
): string {
  const trimmed = text.trim();
  if (!trimmed) return fallback;
  if (!hasInfraLeak(trimmed)) return trimmed;
  const sentences = trimmed.split(/(?<=[.!?…])(?:\s+|$)/).filter((part) => part.trim());
  const kept = sentences
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence && !hasInfraLeak(sentence));
  return kept.length > 0 ? kept.join(" ") : fallback;
}

/** Never includes `source.message`. Error status is a plain availability phrase. */
export function publicSourceLine(source: Pick<SourceState, "source" | "status">): string {
  const status = {
    pending: "ожидает сбора",
    loading: "сбор идёт",
    done: "данные получены",
    error: SOURCE_UNAVAILABLE,
  }[source.status];
  return `${source.source}: ${status}`;
}

export function publicSourceLines(sources: Array<Pick<SourceState, "source" | "status">>): string[] {
  return sources.map(publicSourceLine);
}

function sanitizeCitation(citation: OfferCitation): OfferCitation {
  if (!hasInfraLeak(citation.label)) return citation;
  return {
    ...citation,
    label: sanitizeUserFacingText(citation.label, "Открыть предложение"),
  };
}

export function sanitizeAnalysisResult(result: AnalysisResult, userRole?: UserRole): AnalysisResult {
  const warnings = result.warnings
    .map((warning) => (hasInfraLeak(warning) ? sanitizeUserFacingText(warning) : warning))
    .filter((warning) => warning.trim().length > 0);
  const appliedFilters = result.appliedFilters
    .map((filter) => (hasInfraLeak(filter) ? sanitizeUserFacingText(filter) : filter))
    .filter((filter) => filter.trim().length > 0);
  return {
    ...result,
    summary: sanitizeUserFacingText(result.summary, result.summary.trim() ? REPLY_UNAVAILABLE : result.summary),
    ...(result.provider && userRole !== "admin" ? { provider: "Закрытый контур ПЕРЕМЕНА" } : {}),
    warnings,
    appliedFilters,
    ...(result.citations
      ? { citations: result.citations.map(sanitizeCitation) }
      : {}),
  };
}

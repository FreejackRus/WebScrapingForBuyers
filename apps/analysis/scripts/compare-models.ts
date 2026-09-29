/**
 * A/B of Ollama models on the real analysis pipeline.
 *
 *   OLLAMA_BASE_URL=http://127.0.0.1:11434 \
 *   npx tsx apps/analysis/scripts/compare-models.ts snapshots.json out.md modelA modelB ...
 *
 * snapshots.json — array of SearchSnapshot captured from the search service.
 * Every model gets the same snapshots and prompts through analyzeSnapshot /
 * answerCopilot, so deterministic filtering and ranking are identical; only the
 * narrator differs. Raw narrator output is measured BEFORE sanitizeAnalysisResult,
 * because the sanitizer hides exactly the leaks we want to count.
 */
import { readFileSync, writeFileSync } from "node:fs";

import type { AnalysisResult, SearchSnapshot } from "@peremena/contracts";

import { analyzeSnapshot, answerCopilot } from "../src/application/analyze.js";
import { hasInfraLeak } from "../src/application/infra-leak.js";
import type { AnalysisNarrator } from "../src/domain/analysis-narrator.js";
import { OllamaAnalysisNarrator } from "../src/infrastructure/ollama-analysis-narrator.js";

const SNAPSHOT_PROMPTS = ["Сравни лучшие предложения", "Что есть в наличии?", "Покажи самую низкую цену"];
const CHAT_PROMPTS = [
  "Привет! Что ты умеешь?",
  "Найди клавиатуру Logitech MX Keys",
  "Как выгрузить таблицу в Excel?",
  "Какие поставщики сейчас подключены?",
];

interface Call {
  method: string;
  ms: number;
  ok: boolean;
  error?: string;
  text: string;
}

interface Run {
  label: string;
  result?: AnalysisResult;
  error?: string;
  ms: number;
}

function cyrillicShare(text: string): number {
  const letters = text.match(/\p{L}/gu) ?? [];
  if (!letters.length) return 1;
  return letters.filter((ch) => /[а-яё]/i.test(ch)).length / letters.length;
}

/** Records every narrator call: latency, failure, raw user-facing text. */
function recording(inner: OllamaAnalysisNarrator, calls: Call[]): AnalysisNarrator {
  const wrap =
    <A, R>(method: string, fn: (arg: A) => Promise<R>) =>
    async (arg: A): Promise<R> => {
      const started = performance.now();
      try {
        const value = await fn(arg);
        const v = value as { summary?: string; warnings?: string[]; rejectedOfferIds?: string[] };
        const text = [v.summary ?? "", ...(v.warnings ?? [])].join("\n");
        calls.push({ method, ms: performance.now() - started, ok: true, text });
        return value;
      } catch (error) {
        calls.push({
          method,
          ms: performance.now() - started,
          ok: false,
          error: error instanceof Error ? error.message : String(error),
          text: "",
        });
        throw error;
      }
    };
  return {
    name: inner.name,
    summarize: wrap("summarize", (a) => inner.summarize(a)),
    answer: wrap("answer", (a) => inner.answer(a)),
    filterRelevance: wrap("filterRelevance", (a) => inner.filterRelevance(a)),
  };
}

function percentile(values: number[], p: number): number {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.min(sorted.length - 1, Math.floor((p / 100) * sorted.length))]!;
}

async function evaluate(model: string, snapshots: SearchSnapshot[], baseUrl: string) {
  const calls: Call[] = [];
  const narrator = recording(new OllamaAnalysisNarrator(baseUrl, model), calls);
  const runs: Run[] = [];
  const options = { userRole: "manager" as const, userName: "Анна Петрова", addressAs: "Анна" };

  // Warm-up: the first call pays model load into VRAM; keep it out of latency.
  await answerCopilot("Привет", new OllamaAnalysisNarrator(baseUrl, model), options).catch(() => undefined);

  for (const snapshot of snapshots) {
    for (const prompt of SNAPSHOT_PROMPTS) {
      const started = performance.now();
      const label = `${snapshot.query} · ${prompt}`;
      try {
        runs.push({ label, result: await analyzeSnapshot(snapshot, prompt, narrator, options), ms: performance.now() - started });
      } catch (error) {
        runs.push({ label, error: String(error), ms: performance.now() - started });
      }
      process.stderr.write(`${model} | ${label}\n`);
    }
  }
  for (const prompt of CHAT_PROMPTS) {
    const started = performance.now();
    try {
      runs.push({ label: `чат · ${prompt}`, result: await answerCopilot(prompt, narrator, options), ms: performance.now() - started });
    } catch (error) {
      runs.push({ label: `чат · ${prompt}`, error: String(error), ms: performance.now() - started });
    }
    process.stderr.write(`${model} | чат · ${prompt}\n`);
  }
  return { model, calls, runs };
}

async function main() {
  const [snapshotsPath, outPath, ...models] = process.argv.slice(2);
  const baseUrl = process.env.OLLAMA_BASE_URL;
  if (!snapshotsPath || !outPath || models.length < 1 || !baseUrl) {
    throw new Error("usage: OLLAMA_BASE_URL=… compare-models.ts snapshots.json out.md modelA [modelB …]");
  }
  const snapshots = (JSON.parse(readFileSync(snapshotsPath, "utf8")) as SearchSnapshot[]).filter(
    (s) => s.offers.length > 0,
  );

  const results = [];
  for (const model of models) results.push(await evaluate(model, snapshots, baseUrl));

  const lines: string[] = [`# Сравнение моделей: ${models.join(" vs ")}`, ""];
  lines.push(`Снимков: ${snapshots.length} (${snapshots.map((s) => `${s.query} — ${s.offers.length}`).join("; ")})`, "");
  lines.push(
    "| Модель | Вызовов | Ошибок/невалидный JSON | Утечки тех. терминов (сырые) | Не по-русски (<80% кириллицы) | p50, с | p95, с | max, с |",
    "|---|---|---|---|---|---|---|---|",
  );
  for (const { model, calls } of results) {
    const ms = calls.map((c) => c.ms / 1000);
    const texts = calls.filter((c) => c.ok && c.text.trim());
    lines.push(
      `| ${model} | ${calls.length} | ${calls.filter((c) => !c.ok).length} | ${texts.filter((c) => hasInfraLeak(c.text)).length} | ${
        texts.filter((c) => cyrillicShare(c.text) < 0.8).length
      } | ${percentile(ms, 50).toFixed(1)} | ${percentile(ms, 95).toFixed(1)} | ${Math.max(0, ...ms).toFixed(1)} |`,
    );
  }
  lines.push("", "## По методам", "");
  for (const { model, calls } of results) {
    const methods = [...new Set(calls.map((c) => c.method))];
    for (const method of methods) {
      const mine = calls.filter((c) => c.method === method);
      lines.push(
        `- ${model} · ${method}: ${mine.length} вызовов, ошибок ${mine.filter((c) => !c.ok).length}, p50 ${percentile(
          mine.map((c) => c.ms / 1000),
          50,
        ).toFixed(1)} с`,
      );
    }
  }

  lines.push("", "## Ответы бок о бок", "");
  const labels = results[0]!.runs.map((r) => r.label);
  for (const label of labels) {
    lines.push(`### ${label}`, "");
    for (const { model, runs } of results) {
      const run = runs.find((r) => r.label === label);
      const body = run?.error
        ? `ОШИБКА: ${run.error}`
        : `${run?.result?.summary ?? ""}${run?.result?.warnings?.length ? `\n\n_Предупреждения:_ ${run.result.warnings.join(" · ")}` : ""}\n\n_provider: ${run?.result?.provider ?? "—"}, отобрано: ${run?.result?.selectedOfferIds.length ?? 0}, ${((run?.ms ?? 0) / 1000).toFixed(1)} с_`;
      lines.push(`**${model}**`, "", body, "");
    }
  }
  const errors = results.flatMap(({ model, calls }) => calls.filter((c) => !c.ok).map((c) => `- ${model} · ${c.method}: ${c.error}`));
  if (errors.length) lines.push("## Ошибки вызовов", "", ...errors, "");

  writeFileSync(outPath, lines.join("\n"));
  process.stderr.write(`written ${outPath}\n`);
}

await main();

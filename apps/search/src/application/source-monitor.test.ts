import { mkdtemp, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import type { Offer, SourceCheck } from "@peremena/contracts";
import { describe, expect, it } from "vitest";

import type { SourceAdapter } from "../domain/source-adapter.js";
import { canaryFor, DEFAULT_CANARY, probe, SourceMonitor, sourceAlerts, summarizeSource } from "./source-monitor.js";

const check = (ok: boolean, at: string): SourceCheck => ({ source: "Ozon", ok, rows: ok ? 5 : 0, ms: 10, checkedAt: at });

describe("source monitor", () => {
  it("picks canaries per source with a marketplace default", () => {
    expect(canaryFor("NETLAB")).toBe("Pantum TL-5120P");
    expect(canaryFor("СРВТрейд")).toBe("818202-B21");
    expect(canaryFor("Wildberries")).toBe(DEFAULT_CANARY);
  });

  it("counts trailing failures and remembers the last success", () => {
    const health = summarizeSource("Ozon", [check(true, "t1"), check(false, "t2"), check(false, "t3"), check(false, "t4")]);
    expect(health.consecutiveFailures).toBe(3);
    expect(health.lastSuccessAt).toBe("t1");
    expect(sourceAlerts([health])).toEqual(["Источник Ozon не отвечает 3 проверки подряд"]);
    expect(sourceAlerts([summarizeSource("Ozon", [check(false, "a"), check(true, "b")])])).toEqual([]);
  });

  it("treats an empty answer and a timeout as failures", async () => {
    const empty: SourceAdapter = { name: "WB", search: async () => [] };
    const hang: SourceAdapter = { name: "Slow", search: () => new Promise<Offer[]>(() => undefined) };
    expect((await probe(empty, 1000)).ok).toBe(false);
    const timedOut = await probe(hang, 20);
    expect(timedOut.ok).toBe(false);
    expect(timedOut.error).toMatch(/Нет ответа/);
  });

  it("runs canaries sequentially, keeps 24 checks and persists them", async () => {
    const file = join(await mkdtemp(join(tmpdir(), "monitor-")), "m.json");
    const seen: string[] = [];
    const source: SourceAdapter = {
      name: "Ozon",
      search: async (product) => {
        seen.push(product.name);
        return [{ id: "1" } as Offer];
      },
    };
    const monitor = new SourceMonitor(() => [source], { file, pauseMs: 0 });
    for (let i = 0; i < 26; i += 1) await monitor.runOnce();
    const report = await monitor.report();
    expect(report.sources[0]?.history).toHaveLength(24);
    expect(report.sources[0]?.last?.ok).toBe(true);
    expect(seen[0]).toMatch(/M240/i);
    const stored = JSON.parse(await readFile(file, "utf8")) as Record<string, unknown[]>;
    expect(stored.Ozon).toHaveLength(24);
    const reloaded = await new SourceMonitor(() => [source], { file }).report();
    expect(reloaded.sources[0]?.history).toHaveLength(24);
  });
});

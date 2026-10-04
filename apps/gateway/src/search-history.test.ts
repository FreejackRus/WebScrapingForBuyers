import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import type { Product } from "@peremena/contracts";
import { afterEach, describe, expect, it, vi } from "vitest";

import { SearchHistory } from "./search-history.js";

const product = (name: string): Product =>
  ({ id: name, name, brand: "", model: name, mpn: "", category: "Каталог", characteristics: {} }) as Product;

const dirs: string[] = [];
function tempFile(): string {
  const dir = mkdtempSync(join(tmpdir(), "history-"));
  dirs.push(dir);
  return join(dir, "history.json");
}
afterEach(() => {
  for (const dir of dirs.splice(0)) rmSync(dir, { recursive: true, force: true });
});

describe("SearchHistory", () => {
  it("keeps newest first and separates users", () => {
    const history = new SearchHistory();
    history.record("u1", { id: "s1", query: "мышь g102", product: product("мышь g102") });
    history.record("u1", { id: "s2", query: "ssd nv2", product: product("ssd nv2") });
    history.record("u2", { id: "s3", query: "монитор", product: product("монитор") });
    expect(history.list("u1").map((entry) => entry.query)).toEqual(["ssd nv2", "мышь g102"]);
    expect(history.list("u2").map((entry) => entry.query)).toEqual(["монитор"]);
    expect(history.list("nobody")).toEqual([]);
  });

  it("moves a repeated query to the top instead of duplicating it", () => {
    const history = new SearchHistory();
    history.record("u1", { id: "s1", query: "Мышь G102", product: product("a") });
    history.record("u1", { id: "s2", query: "ssd", product: product("b") });
    history.record("u1", { id: "s3", query: "  мышь   g102 ", product: product("a") });
    expect(history.list("u1").map((entry) => entry.id)).toEqual(["s3", "s2"]);
  });

  it("caps the list per user and removes or clears entries", () => {
    const history = new SearchHistory(undefined, 3);
    for (const n of [1, 2, 3, 4]) history.record("u1", { id: `s${n}`, query: `q${n}`, product: product(`q${n}`) });
    expect(history.list("u1").map((entry) => entry.id)).toEqual(["s4", "s3", "s2"]);
    expect(history.remove("u1", "s3")).toBe(true);
    expect(history.remove("u1", "missing")).toBe(false);
    history.clear("u1");
    expect(history.list("u1")).toEqual([]);
  });

  it("survives a restart through the file and tolerates a broken file", async () => {
    const file = tempFile();
    const first = new SearchHistory(file);
    first.record("u1", { id: "s1", query: "ssd nv2", product: product("ssd nv2") });
    await first.flush();
    expect(new SearchHistory(file).list("u1")).toHaveLength(1);
    expect(JSON.parse(readFileSync(file, "utf8")).u1).toHaveLength(1);
    const broken = tempFile();
    const second = new SearchHistory(broken);
    second.record("u1", { id: "s1", query: "x1", product: product("x1") });
    await second.flush();
    writeFileSync(broken, "{not json");
    expect(new SearchHistory(broken).list("u1")).toEqual([]);
  });

  it("drops malformed entries from a damaged file instead of failing every later search", () => {
    const file = tempFile();
    const good = { id: "ok", query: "ssd nv2", product: product("ssd nv2"), createdAt: "2026-10-04T10:00:00.000Z" };
    writeFileSync(file, JSON.stringify({ u1: [null, 7, { id: 1 }, { id: "x", query: 5, product: {}, createdAt: "t" }, good], u2: "nope", u3: null }));
    const history = new SearchHistory(file);
    expect(history.list("u1").map((entry) => entry.id)).toEqual(["ok"]);
    expect(history.list("u2")).toEqual([]);
    expect(() => history.record("u1", { id: "s2", query: "ssd nv2 1tb", product: product("ssd nv2 1tb") })).not.toThrow();
    expect(history.list("u1").map((entry) => entry.id)).toEqual(["s2", "ok"]);
    writeFileSync(file, "[1,2,3]");
    expect(new SearchHistory(file).list("u1")).toEqual([]);
  });

  it("debounces writes: nothing is written synchronously, a burst ends in one consistent file", async () => {
    const file = tempFile();
    const history = new SearchHistory(file, 30, Date.now, 20);
    for (const n of [1, 2, 3]) history.record("u1", { id: `s${n}`, query: `q${n}`, product: product(`q${n}`) });
    history.remove("u1", "s2");
    expect(existsSync(file)).toBe(false);
    await history.flush();
    expect(JSON.parse(readFileSync(file, "utf8")).u1.map((e: { id: string }) => e.id)).toEqual(["s3", "s1"]);
    expect(existsSync(`${file}.tmp`)).toBe(false);
  });

  it("writes the debounced state by itself after the delay and flush is a no-op when clean", async () => {
    const file = tempFile();
    const history = new SearchHistory(file, 30, Date.now, 10);
    history.record("u1", { id: "s1", query: "q1", product: product("q1") });
    await new Promise((resolve) => setTimeout(resolve, 150));
    expect(JSON.parse(readFileSync(file, "utf8")).u1).toHaveLength(1);
    await expect(history.flush()).resolves.toBeUndefined();
  });

  it("keeps changes made during an in-flight write and saves them afterwards", async () => {
    const file = tempFile();
    const history = new SearchHistory(file, 30, Date.now, 0);
    history.record("u1", { id: "s1", query: "q1", product: product("q1") });
    const first = history.flush();
    history.record("u1", { id: "s2", query: "q2", product: product("q2") });
    await first;
    await history.flush();
    expect(JSON.parse(readFileSync(file, "utf8")).u1).toHaveLength(2);
  });

  it("does not throw or reject when the file cannot be written", async () => {
    const blocker = tempFile();
    writeFileSync(blocker, "x");
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    const history = new SearchHistory(join(blocker, "nested", "history.json"), 30, Date.now, 0);
    expect(() => history.record("u1", { id: "s1", query: "q1", product: product("q1") })).not.toThrow();
    await expect(history.flush()).resolves.toBeUndefined();
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("history_save_failed"));
    warn.mockRestore();
  });
});

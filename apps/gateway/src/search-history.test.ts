import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import type { Product } from "@peremena/contracts";
import { afterEach, describe, expect, it } from "vitest";

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

  it("survives a restart through the file and tolerates a broken file", () => {
    const file = tempFile();
    new SearchHistory(file).record("u1", { id: "s1", query: "ssd nv2", product: product("ssd nv2") });
    expect(new SearchHistory(file).list("u1")).toHaveLength(1);
    expect(JSON.parse(readFileSync(file, "utf8")).u1).toHaveLength(1);
    const broken = tempFile();
    new SearchHistory(broken).record("u1", { id: "s1", query: "x1", product: product("x1") });
    writeFileSync(broken, "{not json");
    expect(new SearchHistory(broken).list("u1")).toEqual([]);
  });
});

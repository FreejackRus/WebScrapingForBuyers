#!/usr/bin/env node
// Search quality check: runs eval/search-cases.json against a search service and
// scores the top rows by server rank. Usage: node scripts/eval-search.mjs [baseUrl] [casesFile]
import { readFileSync, writeFileSync } from "node:fs";

const base = process.argv[2] ?? process.env.SEARCH_URL ?? "http://localhost:3003";
const cases = JSON.parse(readFileSync(process.argv[3] ?? new URL("../eval/search-cases.json", import.meta.url), "utf8"));
const TOP = 3;
const DISTRIBUTORS = new Set(["netlab", "ocs", "merlion", "treolan", "марвел", "servermall", "срвтрейд", "онлайнтрейд", "регард", "хардпрайс", "торгpc"]);
const isDistributor = (o) => DISTRIBUTORS.has(o.source.toLocaleLowerCase("ru"));
const TIMEOUT_MS = Number(process.env.EVAL_TIMEOUT_MS ?? 150_000);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const inStock = (o) => (o.availabilityStatus ? o.availabilityStatus === "in_stock" : !/нет в наличии|под заказ|ожида/i.test(o.availability));

async function run(c) {
  const started = Date.now();
  const res = await fetch(`${base}/searches`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ query: c.query }) });
  if (!res.ok) return { ...c, error: `HTTP ${res.status}` };
  let snap = await res.json();
  while (snap.status !== "complete" && Date.now() - started < TIMEOUT_MS) {
    await sleep(2000);
    snap = await (await fetch(`${base}/searches/${snap.id}`)).json();
  }
  const offers = [...snap.offers].sort((a, b) => (a.procurementRank ?? 1e9) - (b.procurementRank ?? 1e9));
  // The table shows marketplaces and distributors in separate tabs: score the top rows of each.
  const top = offers.filter((o) => !isDistributor(o)).slice(0, TOP);
  const topDistributors = offers.filter(isDistributor).slice(0, TOP);
  const re = (s) => (s ? new RegExp(s, "iu") : undefined);
  const want = re(c.top), avoid = re(c.notTop);
  const hay = (o) => `${o.title} ${o.mpn ?? ""}`.toLowerCase();
  // A title cut by the marketplace ("…") may lose the model part `top` looks for: it is not a wrong item
  // unless `notTop` says so.
  const truncated = (o) => /…\s*$/u.test(o.title ?? "");
  const good = (o) => (!want || want.test(hay(o)) || truncated(o)) && !(avoid && avoid.test(hay(o)));
  const hits = top.filter(good);
  const distributorHits = topDistributors.filter(good);
  return {
    query: c.query,
    total: offers.length,
    precision: top.length ? hits.length / top.length : 0,
    distributorRows: topDistributors.length,
    distributorPrecision: topDistributors.length ? distributorHits.length / topDistributors.length : undefined,
    topInStock: top.filter(inStock).length,
    errors: snap.sources.filter((s) => s.status === "error").map((s) => s.source),
    timedOut: snap.status !== "complete",
    seconds: Math.round((Date.now() - started) / 1000),
    top: [...top, ...topDistributors].map((o) => `${good(o) ? "✓" : "✗"} [${o.source}] ${o.title} — ${o.price} ₽ — ${o.availability}`),
  };
}

const results = [];
for (const c of cases) {
  const r = await run(c).catch((e) => ({ query: c.query, error: String(e) }));
  results.push(r);
  console.log(`${r.error ? "ERR" : (r.precision * 100).toFixed(0).padStart(3) + "%"}  ${r.query}  (${r.total ?? 0} строк, ${r.seconds ?? "?"} с)`);
  for (const line of r.top ?? []) console.log(`      ${line}`);
}
const ok = results.filter((r) => !r.error);
const avg = (f) => (ok.length ? ok.reduce((s, r) => s + f(r), 0) / ok.length : 0);
const summary = {
  cases: results.length,
  failed: results.length - ok.length,
  empty: ok.filter((r) => r.total === 0).length,
  precisionTop3: +avg((r) => r.precision).toFixed(3),
  distributorQueries: ok.filter((r) => r.distributorRows > 0).length,
  distributorPrecisionTop3: (() => {
    const withRows = ok.filter((r) => r.distributorRows > 0);
    return withRows.length ? +(withRows.reduce((s, r) => s + r.distributorPrecision, 0) / withRows.length).toFixed(3) : null;
  })(),
  perfectTop3: ok.filter((r) => r.precision === 1).length,
  inStockShareTop3: +avg((r) => r.topInStock / TOP).toFixed(3),
  medianSeconds: ok.map((r) => r.seconds).sort((a, b) => a - b)[Math.floor(ok.length / 2)],
};
console.log("\n" + JSON.stringify(summary, null, 2));
if (process.env.EVAL_OUT) writeFileSync(process.env.EVAL_OUT, JSON.stringify({ at: new Date().toISOString(), base, summary, results }, null, 2));

/**
 * Price Radar office agent — Citilink search from the office IP.
 *
 * Citilink (Qrator) blocks the server's datacenter IP with HTTP 429, while an ordinary
 * headless Chrome from the office network passes without any manual warm-up. This agent
 * runs on an office machine, listens on 127.0.0.1 only and is reached by the server through
 * a reverse SSH tunnel (see install.sh). It returns plain search tiles; the server does the
 * relevance checks, ranking and everything else.
 *
 *   GET /health                      → { ok, browser, cached, lastError, pausedUntil? }
 *   GET /citilink/search?q=…&limit=  → { query, fetchedAt, stale?, items: [{ id, title, url, price, clubPrice?, inStock }] }
 */
import { createServer } from "node:http";
import { homedir } from "node:os";
import { join } from "node:path";
import { chromium } from "playwright-core";

const PORT = Number(process.env.AGENT_PORT ?? 18091);
const CHROME = process.env.AGENT_CHROME ?? "/usr/bin/google-chrome";
const CACHE_MS = Number(process.env.AGENT_CACHE_MINUTES ?? 20) * 60_000;
const PACE_MS = Number(process.env.AGENT_PACE_MS ?? 2_500);
const PROFILE = process.env.AGENT_PROFILE ?? join(homedir(), ".cache", "price-radar-agent", "chrome");
const TOKEN = process.env.AGENT_TOKEN ?? "";
// After Qrator's 429 the office IP stays out for a while: keep away instead of extending the block.
const BACKOFF_MS = Number(process.env.AGENT_BACKOFF_MINUTES ?? 15) * 60_000;
// An older answer for the same query beats none; it keeps its own fetchedAt, so the age is honest.
const STALE_MS = Number(process.env.AGENT_STALE_HOURS ?? 24) * 3_600_000;

let context;
let lastError = "";
let lastRunAt = 0;
let blockedUntil = 0;
let queue = Promise.resolve();
const cache = new Map();

async function browser() {
  if (context) return context;
  // Persistent profile: Qrator's trust cookie survives restarts, so fewer challenges.
  context = await chromium.launchPersistentContext(PROFILE, {
    executablePath: CHROME,
    headless: true,
    locale: "ru-RU",
    viewport: { width: 1366, height: 900 },
    args: ["--headless=new", "--disable-blink-features=AutomationControlled"],
  });
  context.on("close", () => { context = undefined; });
  return context;
}

async function searchCitilink(query, limit) {
  const ctx = await browser();
  const page = await ctx.newPage();
  try {
    const wait = lastRunAt + PACE_MS - Date.now();
    if (wait > 0) await new Promise((resolve) => setTimeout(resolve, wait));
    lastRunAt = Date.now();
    const response = await page.goto(`https://www.citilink.ru/search/?text=${encodeURIComponent(query)}`, { waitUntil: "domcontentloaded", timeout: 40_000 });
    const status = response?.status() ?? 0;
    if (status >= 400) throw new Error(`citilink HTTP ${status}`);
    const filled = "[data-meta-product-id]:not([data-meta-product-id=''])";
    const found = await Promise.race([
      page.waitForSelector(filled, { timeout: 20_000 }).then(() => true),
      // A search with no results renders a message instead of tiles.
      page.waitForSelector("text=/ничего не найдено|не нашлось/i", { timeout: 20_000 }).then(() => false),
    ]).catch(() => { throw new Error("citilink: no result tiles (layout changed or challenge)"); });
    if (!found) return [];
    await page.waitForTimeout(800);
    return await page.$$eval(filled, (tiles, max) => tiles.slice(0, max).flatMap((tile) => {
      const link = tile.querySelector("a[data-meta-name='Snippet__title']") ?? tile.querySelector("a[href*='/product/']");
      const priceNode = tile.querySelector("[data-meta-price]");
      const price = Number(priceNode?.getAttribute("data-meta-price"));
      const title = (link?.getAttribute("title") || link?.textContent || "").trim();
      const href = link?.getAttribute("href");
      if (!title || !href || !Number.isFinite(price) || price <= 0) return [];
      const club = Number((tile.querySelector("[data-meta-name='Snippet__club-price']")?.textContent ?? "").replace(/[^\d]/g, ""));
      const text = tile.textContent ?? "";
      const inStock = !/нет в наличии|под заказ|сообщить о поступлении/i.test(text) && Boolean(tile.querySelector("[data-meta-name='Snippet__cart-button']"));
      return [{
        id: tile.getAttribute("data-meta-product-id"),
        title,
        url: new URL(href, "https://www.citilink.ru").toString(),
        price,
        ...(club > 0 && club < price ? { clubPrice: club } : {}),
        inStock,
      }];
    }), limit);
  } finally {
    await page.close().catch(() => undefined);
  }
}

function run(query, limit) {
  const key = `${query.toLowerCase()}|${limit}`;
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < CACHE_MS) return Promise.resolve(hit.value);
  const stale = hit && Date.now() - hit.at < STALE_MS ? { ...hit.value, stale: true } : undefined;
  if (Date.now() < blockedUntil) {
    return stale ? Promise.resolve(stale) : Promise.reject(new Error("citilink: пауза после HTTP 429"));
  }
  // One search at a time: paced requests keep the office IP in good standing.
  const job = queue.then(async () => {
    const items = await searchCitilink(query, limit);
    const value = { query, fetchedAt: new Date().toISOString(), items };
    cache.set(key, { at: Date.now(), value });
    if (cache.size > 300) cache.delete(cache.keys().next().value);
    lastError = "";
    return value;
  }).catch((error) => {
    lastError = String(error?.message ?? error);
    if (/HTTP 429/.test(String(error?.message ?? error))) blockedUntil = Date.now() + BACKOFF_MS;
    if (stale) return stale;
    throw error;
  });
  queue = job.catch((error) => { lastError = String(error?.message ?? error); });
  return job;
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url ?? "/", "http://agent");
  const send = (status, body) => {
    response.writeHead(status, { "content-type": "application/json; charset=utf-8" });
    response.end(JSON.stringify(body));
  };
  if (TOKEN && request.headers["x-agent-token"] !== TOKEN) return send(401, { error: "unauthorized" });
  if (url.pathname === "/health") return send(200, { ok: true, browser: Boolean(context), cached: cache.size, lastError, ...(Date.now() < blockedUntil ? { pausedUntil: new Date(blockedUntil).toISOString() } : {}) });
  if (url.pathname === "/citilink/search") {
    const query = (url.searchParams.get("q") ?? "").trim().slice(0, 200);
    const limit = Math.min(Math.max(Number(url.searchParams.get("limit")) || 20, 1), 40);
    if (query.length < 2) return send(400, { error: "q is required" });
    try {
      return send(200, await run(query, limit));
    } catch (error) {
      return send(502, { error: String(error?.message ?? error) });
    }
  }
  return send(404, { error: "not found" });
});

server.listen(PORT, "127.0.0.1", () => console.log(JSON.stringify({ msg: "office_agent_listening", port: PORT })));
for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, async () => {
    server.close();
    await context?.close().catch(() => undefined);
    process.exit(0);
  });
}

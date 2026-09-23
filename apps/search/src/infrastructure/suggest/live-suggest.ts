import type { Product } from "@peremena/contracts";

import { extractMpn, productFromQuery, splitBrandModel } from "../../domain/product-from-query.js";

const BROWSER_HEADERS = {
  Accept: "application/json,text/plain,*/*",
  "Accept-Language": "ru-RU,ru;q=0.9,en;q=0.8",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
};

export type SuggestEngine = "google" | "duckduckgo" | "yandex";

export function googleSuggestUrl(query: string): string {
  const params = new URLSearchParams({ client: "firefox", hl: "ru", q: query });
  return `https://suggestqueries.google.com/complete/search?${params.toString()}`;
}

export function duckDuckGoSuggestUrl(query: string): string {
  const params = new URLSearchParams({ q: query, type: "list" });
  return `https://duckduckgo.com/ac/?${params.toString()}`;
}

export function yandexSuggestUrl(query: string): string {
  const params = new URLSearchParams({ v: "4", uil: "ru", part: query, n: "10" });
  return `https://yandex.ru/suggest/suggest-ya.cgi?${params.toString()}`;
}

export function icecatProductUrl(brand: string, productCode: string): string {
  const params = new URLSearchParams({
    lang: "ru",
    shopname: "openIcecat-Live",
    content: "essentialinfo",
    Brand: brand,
    ProductCode: productCode,
  });
  return `https://live.icecat.biz/api?${params.toString()}`;
}

function parseSuggestList(payload: unknown): string[] {
  if (!Array.isArray(payload) || payload.length < 2 || !Array.isArray(payload[1])) return [];
  return payload[1]
    .map((item) => {
      if (typeof item === "string") return item.trim();
      if (item && typeof item === "object" && typeof (item as { phrase?: string }).phrase === "string") {
        return (item as { phrase: string }).phrase.trim();
      }
      return "";
    })
    .filter(Boolean);
}

function parseYandexSuggest(payload: unknown): string[] {
  if (!Array.isArray(payload) || payload.length < 2 || !Array.isArray(payload[1])) return [];
  const out: string[] = [];
  for (const row of payload[1]) {
    if (Array.isArray(row) && typeof row[0] === "string" && row[0].trim()) out.push(row[0].trim());
    else if (typeof row === "string" && row.trim()) out.push(row.trim());
  }
  return out;
}

async function fetchJson(url: string, signal?: AbortSignal): Promise<unknown> {
  const response = await fetch(url, {
    headers: BROWSER_HEADERS,
    redirect: "follow",
    ...(signal ? { signal } : {}),
  });
  if (!response.ok) throw new Error(`suggest HTTP ${response.status}`);
  const type = response.headers.get("content-type") ?? "";
  if (type.includes("javascript") || type.includes("text/plain")) {
    const text = await response.text();
    return JSON.parse(text);
  }
  return response.json();
}

export async function fetchEnginePhrases(
  engine: SuggestEngine,
  query: string,
  signal?: AbortSignal,
): Promise<string[]> {
  if (engine === "google") {
    return parseSuggestList(await fetchJson(googleSuggestUrl(query), signal));
  }
  if (engine === "duckduckgo") {
    return parseSuggestList(await fetchJson(duckDuckGoSuggestUrl(query), signal));
  }
  return parseYandexSuggest(await fetchJson(yandexSuggestUrl(query), signal));
}

async function enrichFromIcecat(phrase: string, signal?: AbortSignal): Promise<Product | undefined> {
  const mpn = extractMpn(phrase);
  const { brand } = splitBrandModel(phrase);
  if (!mpn || !brand || brand === "—") return undefined;
  try {
    const response = await fetch(icecatProductUrl(brand, mpn), {
      headers: BROWSER_HEADERS,
      ...(signal ? { signal } : {}),
    });
    if (!response.ok) return undefined;
    const payload = (await response.json()) as {
      msg?: string;
      data?: {
        EssentialInfo?: {
          Brand?: string;
          ProductCode?: string;
          ProductName?: string;
          ProductNameInfo?: { ProductIntName?: string; ProductLocalName?: { Value?: string } };
        };
      };
    };
    if (payload.msg !== "OK" || !payload.data?.EssentialInfo) return undefined;
    const info = payload.data.EssentialInfo;
    const local =
      info.ProductNameInfo?.ProductLocalName?.Value ??
      info.ProductNameInfo?.ProductIntName ??
      info.ProductName ??
      phrase;
    const productBrand = info.Brand?.trim() || brand;
    const productCode = info.ProductCode?.trim() || mpn;
    const model = (info.ProductName ?? productCode).trim();
    return {
      ...productFromQuery(`${productBrand} ${model}`.trim(), "icecat"),
      brand: productBrand,
      model,
      name: local.trim() || `${productBrand} ${model}`,
      mpn: productCode,
      characteristics: { источник: "icecat", код: productCode },
    };
  } catch {
    return undefined;
  }
}

/**
 * Live autocomplete from public search engines (Google → DDG → Yandex in parallel).
 * No static product catalog. Icecat only enriches when Brand+MPN are present.
 */
export async function suggestLiveProducts(query: string, limit = 8, signal?: AbortSignal): Promise<Product[]> {
  const trimmed = query.trim();
  if (trimmed.length < 2) return [];

  const engines: SuggestEngine[] = ["google", "duckduckgo", "yandex"];
  const settled = await Promise.allSettled(engines.map((engine) => fetchEnginePhrases(engine, trimmed, signal)));

  const phrases: string[] = [];
  const seen = new Set<string>();
  const engineByPhrase = new Map<string, SuggestEngine>();
  const push = (phrase: string, engine: SuggestEngine) => {
    const key = phrase.toLocaleLowerCase("ru");
    if (!phrase || seen.has(key)) return;
    seen.add(key);
    phrases.push(phrase);
    engineByPhrase.set(key, engine);
  };

  settled.forEach((result, index) => {
    const engine = engines[index]!;
    if (result.status !== "fulfilled") return;
    for (const phrase of result.value) push(phrase, engine);
  });

  const anyEngineOk = settled.some((result) => result.status === "fulfilled" && result.value.length > 0);
  if (!anyEngineOk) {
    // Engines blocked/down: still return the typed query as a single live candidate.
    return [productFromQuery(trimmed, "query")];
  }

  // Prefer engine phrases; keep typed query only if engines did not echo it.
  const ordered = phrases.filter((phrase) => phrase.toLocaleLowerCase("ru") !== trimmed.toLocaleLowerCase("ru"));
  const candidates = [trimmed, ...ordered].slice(0, Math.max(limit, 10));

  const products: Product[] = [];
  for (const phrase of candidates) {
    const enriched = await enrichFromIcecat(phrase, signal);
    if (enriched) {
      products.push(enriched);
      continue;
    }
    const engine = engineByPhrase.get(phrase.toLocaleLowerCase("ru")) ?? "google";
    products.push(productFromQuery(phrase, engine));
  }

  const needle = trimmed.toLocaleLowerCase("ru");
  return products
    .sort((left, right) => {
      const leftPrefix = left.name.toLocaleLowerCase("ru").startsWith(needle) ? 1 : 0;
      const rightPrefix = right.name.toLocaleLowerCase("ru").startsWith(needle) ? 1 : 0;
      if (leftPrefix !== rightPrefix) return rightPrefix - leftPrefix;
      const leftIce = left.characteristics.источник === "icecat" ? 1 : 0;
      const rightIce = right.characteristics.источник === "icecat" ? 1 : 0;
      return rightIce - leftIce;
    })
    .slice(0, limit);
}

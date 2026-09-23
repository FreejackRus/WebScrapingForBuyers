import type { ChatIntent, OfferTableFilter } from "@peremena/contracts";

const SOURCE_ALIASES = [
  { pattern: /(?<![a-zа-яё0-9])(wb|вб|вайлдберр\w*|wildberries)(?![a-zа-яё0-9])/i, name: "Wildberries" },
  { pattern: /(?<![a-zа-яё0-9])(ситилинк|citilink)(?![a-zа-яё0-9])/i, name: "Ситилинк" },
  { pattern: /(?<![a-zа-яё0-9])(ozon|озон)(?![a-zа-яё0-9])/i, name: "Ozon" },
  { pattern: /(?<![a-zа-яё0-9])(яндекс|yandex)(?![a-zа-яё0-9])/i, name: "Яндекс Маркет" },
  { pattern: /(?<![a-zа-яё0-9])(dns|днс)(?![a-zа-яё0-9])/i, name: "DNS" },
  { pattern: /(?<![a-zа-яё0-9])(мегамаркет|megamarket)(?![a-zа-яё0-9])/i, name: "Мегамаркет" },
  { pattern: /(?<![a-zа-яё0-9])(avito|авито)(?![a-zа-яё0-9])/i, name: "Avito" },
] as const;

export function parseSources(normalized: string): string[] {
  return SOURCE_ALIASES.filter((item) => item.pattern.test(normalized)).map((item) => item.name);
}

export function parseMaxPrice(normalized: string): number | undefined {
  const match = normalized.match(/(?:дешевл[еаеейю]|ниже|до|под|меньше|<)\s*(\d+(?:[\s\u00a0]?\d+)*)/);
  const raw = match?.[1];
  if (!raw) return undefined;
  const value = Number(raw.replace(/[\s\u00a0]/g, ""));
  return Number.isFinite(value) ? value : undefined;
}

export function extractSearchQuery(prompt: string): string {
  return prompt
    .replace(/уточни(?:те)? модель/gi, "")
    .replace(/запусти(?:те)? поиск/gi, "")
    .replace(/найд[иу]|найти|поищи|\bищи\b/gi, "")
    .replace(/собери предложени\w*/gi, "")
    .replace(/новый поиск/gi, "")
    .trim();
}

export function classifyIntent(normalized: string, searchQuery: string): ChatIntent {
  const wantSearch =
    /уточни(?:те)? модель|запусти(?:те)? поиск|найд[иу]|найти|поищи|\bищи\b|новый поиск|собери предлож/.test(
      normalized,
    );
  if (wantSearch && searchQuery.length >= 2) return "search";
  if (
    /оставь|фильтр|убери|исключ|покажи только|выдай только|только реальн|только (?:вб|wb|вайлдберр|wildberries)|без демо|не демо|дешевл|ниже \d|до \d|под \d/.test(
      normalized,
    )
  ) {
    return "filter";
  }
  return "explain";
}

export function buildTableFilter(input: {
  intent: ChatIntent;
  includeDemo: boolean;
  wantRealOnly: boolean;
  realCount: number;
  sources: string[];
  maxPrice?: number;
}): OfferTableFilter | undefined {
  if (input.intent !== "filter") return undefined;
  const filter: OfferTableFilter = {};
  if (!input.includeDemo && (input.wantRealOnly || input.realCount > 0)) filter.realOnly = true;
  if (input.sources.length > 0) filter.sources = input.sources;
  if (input.maxPrice != null) filter.maxPrice = input.maxPrice;
  return Object.keys(filter).length > 0 ? filter : undefined;
}

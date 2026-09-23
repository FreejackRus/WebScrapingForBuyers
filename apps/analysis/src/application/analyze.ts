import type {
  AnalysisResult,
  Offer,
  OfferCitation,
  SearchSnapshot,
  UserRole,
} from "@peremena/contracts";

import type { AnalysisNarrator } from "../domain/analysis-narrator.js";

import {
  addressName,
  buildTableFilter,
  cannedMetaAnswer,
  classifyIntent,
  extractSearchQuery,
  parseMaxPrice,
  parseSources,
  withGreeting,
} from "./prompt-intent.js";
import {
  buildBlockedResponse,
  bumpSafetyCounter,
  detectSafetyCategory,
  logSafetyIncident,
} from "./chat-safety.js";

export interface AnalyzeOptions {
  userName?: string;
  userRole?: UserRole;
  userLogin?: string;
  searchId?: string;
}

function money(price: number) {
  return `${price.toLocaleString("ru-RU")} ₽`;
}

function offerLabel(offer: Offer) {
  return `${offer.source}, ${money(offer.price)}${offer.demo ? " (демо)" : ""}, ${offer.seller}`;
}

function citationOf(offer: Offer): OfferCitation {
  return {
    offerId: offer.id,
    url: offer.url,
    label: `${offer.source}, ${money(offer.price)}${offer.demo ? " (демо)" : ""} — открыть`,
  };
}

function selectionLimit(normalized: string) {
  if (/три|3/.test(normalized)) return 3;
  if (/пять|5/.test(normalized)) return 5;
  if (/сравн|все лучш|\bтоп\b/.test(normalized)) return 5;
  return 1;
}

function ruCount(count: number, one: string, few: string, many: string) {
  const mod100 = Math.abs(count) % 100;
  const mod10 = mod100 % 10;
  if (mod100 > 10 && mod100 < 20) return `${count} ${many}`;
  if (mod10 === 1) return `${count} ${one}`;
  if (mod10 >= 2 && mod10 <= 4) return `${count} ${few}`;
  return `${count} ${many}`;
}

function matchesSource(offer: Offer, sources: string[]) {
  const hay = offer.source.toLocaleLowerCase("ru");
  return sources.some((source) => hay.includes(source.toLocaleLowerCase("ru")));
}

function sourceLines(snapshot: SearchSnapshot, userRole?: UserRole): string[] {
  return snapshot.sources.map((source) => {
    const base = `${source.source}: ${source.status}`;
    if (userRole === "admin" && source.message?.trim()) {
      return `${base} (${source.message.trim()})`;
    }
    return base;
  });
}

const META_INTENTS = new Set(["help", "export", "sources", "ranking", "demo", "admin"]);

export async function analyzeSnapshot(
  snapshot: SearchSnapshot,
  prompt: string,
  narrator?: AnalysisNarrator,
  options: AnalyzeOptions = {},
): Promise<AnalysisResult> {
  const incoming = [...snapshot.offers];
  const realCount = incoming.filter((offer) => !offer.demo).length;
  const demoCount = incoming.length - realCount;
  const normalized = prompt.toLocaleLowerCase("ru");
  const searchQuery = extractSearchQuery(prompt);
  const userName = options.userName?.trim() || undefined;
  const userRole = options.userRole;
  const userLogin = options.userLogin?.trim() || undefined;

  const safetyCategory = detectSafetyCategory(normalized);
  if (safetyCategory) {
    const key = userLogin || userName || "anonymous";
    const repeatCount = bumpSafetyCounter(key);
    const blocked = buildBlockedResponse({
      category: safetyCategory,
      ...(userName ? { userName } : {}),
      repeatCount,
    });
    logSafetyIncident({
      category: safetyCategory,
      ...(userLogin ? { userLogin } : {}),
      ...(userName ? { userName } : {}),
      ...(userRole ? { userRole } : {}),
      repeatCount,
      escalated: blocked.escalated,
      ...(options.searchId ? { searchId: options.searchId } : {}),
    });
    return {
      summary: blocked.summary,
      selectedOfferIds: [],
      appliedFilters: ["Запрос отклонён политикой безопасности копайлота."],
      warnings: [blocked.warning],
      citations: [],
      intent: "blocked",
      provider: "Политика безопасности Price Radar",
      safety: {
        category: safetyCategory,
        warning: blocked.warning,
        repeatCount,
        escalated: blocked.escalated,
      },
    };
  }

  const intent = classifyIntent(normalized, searchQuery);
  const sources = parseSources(normalized);
  const maxPrice = parseMaxPrice(normalized);

  if (META_INTENTS.has(intent)) {
    const meta = cannedMetaAnswer({
      intent: intent as Exclude<typeof intent, "explain" | "filter" | "search" | "blocked">,
      ...(userName ? { userName } : {}),
      ...(userRole ? { userRole } : {}),
      snapshotQuery: snapshot.query,
      sourceLines: sourceLines(snapshot, userRole),
      offerCount: incoming.length,
      realCount,
      demoCount,
    });
    return {
      summary: meta.summary,
      selectedOfferIds: [],
      appliedFilters: meta.appliedFilters,
      warnings: meta.warnings,
      citations: [],
      intent,
      provider: "Справочный ответ Price Radar",
    };
  }

  const filters: string[] = [
    `В снимке поиска «${snapshot.query}»: ${incoming.length} предложений (${realCount} реальных, ${demoCount} демо).`,
  ];
  const warnings: string[] = [
    snapshot.status === "complete"
      ? "Анализ смотрит только уже загруженные предложения."
      : "Сбор ещё идёт — анализ смотрит только уже загруженные строки таблицы.",
  ];

  let offers = incoming;

  if (/точн|артикул/.test(normalized)) {
    offers = offers.filter((offer) => offer.match === "exact");
    filters.push(`Только точные совпадения по артикулу (${offers.length} из ${incoming.length}).`);
  }
  if (/гарант/.test(normalized)) {
    const before = offers.length;
    offers = offers.filter((offer) => Boolean(offer.warranty));
    filters.push(`Только предложения с указанной гарантией (${offers.length} из ${before}).`);
  }
  if (/нов(ый|ые|ых)|без б\/у|исключ.*б\/у/.test(normalized)) {
    const before = offers.length;
    offers = offers.filter((offer) => offer.condition === "new");
    filters.push(`Только новые товары (${offers.length} из ${before}).`);
  }
  if (sources.length > 0) {
    const before = offers.length;
    offers = offers.filter((offer) => matchesSource(offer, sources));
    filters.push(`Только источники ${sources.join(", ")} (${offers.length} из ${before}).`);
  }
  if (maxPrice != null) {
    const before = offers.length;
    offers = offers.filter((offer) => offer.price <= maxPrice);
    filters.push(`Цена не выше ${money(maxPrice)} (${offers.length} из ${before}).`);
  }

  const includeDemo = /включая демо|с демо|демо тоже/.test(normalized);
  const wantRealOnly = /реальн|без демо|не демо/.test(normalized);
  if (includeDemo) {
    filters.push("Демо-строки оставлены в ранжировании по запросу.");
  } else if (wantRealOnly || realCount > 0) {
    const dropped = offers.filter((offer) => offer.demo).length;
    offers = offers.filter((offer) => !offer.demo);
    filters.push(
      dropped > 0
        ? `Демо-цены исключены из ранжирования (${ruCount(dropped, "строка", "строки", "строк")}).`
        : "Только реальные предложения.",
    );
  } else {
    filters.push("Реальных строк в снимке нет — ранжирование по демо.");
  }

  offers.sort((left, right) => left.price - right.price);
  filters.push("Сортировка по возрастанию цены.");

  const requested = selectionLimit(normalized);
  const selected = intent === "filter" ? offers : offers.slice(0, requested);
  filters.push(
    selected.length === 0
      ? intent === "filter"
        ? "В таблицу ничего не подошло."
        : `Отобрано top-${requested}: ничего не подошло.`
      : intent === "filter"
        ? `В таблицу отобраны ${ruCount(selected.length, "строка", "строки", "строк")}: ${selected.map(offerLabel).join("; ")}.`
        : `Отобрано top-${selected.length}: ${selected.map(offerLabel).join("; ")}.`,
  );

  const best = selected[0];
  const summary =
    intent === "search"
      ? withGreeting(
          `Запускаю уточнение модели «${searchQuery}». Выберите карточку слева, чтобы собрать предложения.`,
          userName,
        )
      : intent === "filter"
        ? !best
          ? withGreeting("По заданным критериям предложений не найдено — таблица пустая.", userName)
          : withGreeting(
              `Таблица отфильтрована. Лучший вариант: ${offerLabel(best)}. Показано строк: ${selected.length}.`,
              userName,
            )
        : !best
          ? withGreeting("По заданным критериям предложений не найдено.", userName)
          : withGreeting(
              `Лучший вариант: ${offerLabel(best)}. Отобрано предложений: ${selected.length}.`,
              userName,
            );

  if (selected.some((offer) => offer.demo)) {
    warnings.push(
      "В выборке есть демонстрационные цены — их нельзя использовать для закупочного решения.",
    );
  }

  const tableFilter = buildTableFilter({
    intent,
    includeDemo,
    wantRealOnly,
    realCount,
    sources,
    ...(maxPrice != null ? { maxPrice } : {}),
  });
  const citations = selected.filter((offer) => offer.url).map(citationOf);

  const result: AnalysisResult = {
    summary,
    selectedOfferIds: selected.map((offer) => offer.id),
    appliedFilters: filters,
    warnings,
    citations,
    intent,
    ...(tableFilter ? { tableFilter } : {}),
    ...(intent === "search" ? { searchQuery } : {}),
  };
  if (!narrator || selected.length === 0 || intent === "search") return result;

  const addressAs = addressName(userName);
  try {
    const narrated = await narrator.summarize({
      prompt,
      rankedOffers: offers,
      selectedOfferIds: result.selectedOfferIds,
      deterministicSummary: summary,
      appliedFilters: filters,
      snapshotQuery: snapshot.query,
      snapshotStatus: snapshot.status,
      productName: snapshot.product.name,
      ...(userName ? { userName } : {}),
      ...(addressAs ? { addressAs } : {}),
      ...(userRole ? { userRole } : {}),
    });
    return {
      ...result,
      summary: narrated.summary,
      warnings: [...result.warnings, ...narrated.warnings],
      provider: narrator.name,
    };
  } catch (error) {
    return {
      ...result,
      warnings: [
        ...result.warnings,
        `AI-анализ недоступен: ${error instanceof Error ? error.message : "неизвестная ошибка"}`,
      ],
      provider: "Детерминированный fallback",
    };
  }
}

export type { Offer };

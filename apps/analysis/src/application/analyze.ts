import type {
  AnalysisResult,
  ChatIntent,
  Offer,
  OfferCitation,
  SearchSnapshot,
  UserRole,
} from "@peremena/contracts";

import type { AnalysisNarrator, CopilotChatAnswer } from "../domain/analysis-narrator.js";
import { narrationFailureMessage } from "../domain/narration-error.js";

import {
  addressName,
  applyTitleFilterRules,
  buildTableFilter,
  cannedMetaAnswer,
  classifyIntent,
  extractSearchQuery,
  parseMaxPrice,
  parseSources,
  parseTitleFilterRules,
  withGreeting,
} from "./prompt-intent.js";
import {
  buildBlockedResponse,
  bumpSafetyCounter,
  detectSafetyCategory,
  logSafetyIncident,
} from "./chat-safety.js";
import { publicSourceLines, sanitizeAnalysisResult } from "./infra-leak.js";

export interface AnalyzeOptions {
  userName?: string;
  userRole?: UserRole;
  userLogin?: string;
  searchId?: string;
}

/** Cap rows sent to Ollama relevance filter (latency). */
const RELEVANCE_CANDIDATE_CAP = 40;

function money(price: number) {
  return `${price.toLocaleString("ru-RU")} ₽`;
}

function offerLabel(offer: Offer) {
  return `${offer.source}, ${money(offer.price)}, ${offer.seller}`;
}

function citationOf(offer: Offer): OfferCitation {
  return {
    offerId: offer.id,
    url: offer.url,
    label: `${offer.source}, ${money(offer.price)} — открыть`,
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

function sourceLines(snapshot: SearchSnapshot): string[] {
  return publicSourceLines(snapshot.sources);
}

const META_INTENTS = new Set(["help", "export", "sources", "ranking", "admin"]);

type MetaIntent = Exclude<ChatIntent, "explain" | "filter" | "search" | "blocked" | "demo">;

function asMetaIntent(intent: ChatIntent): MetaIntent | undefined {
  if (intent === "demo") return "help";
  if (META_INTENTS.has(intent)) return intent as MetaIntent;
  return undefined;
}

/**
 * Deterministic soft-drop: when exact/probable rows exist, drop doubtful/analog.
 * Keeps all rows if the snapshot is only doubtful (nothing better to prefer).
 */
export function dropWeakMatchesWhenStrongerExist(offers: Offer[]): {
  kept: Offer[];
  dropped: number;
} {
  const strong = offers.filter((offer) => offer.match === "exact" || offer.match === "probable");
  if (strong.length === 0) return { kept: offers, dropped: 0 };
  const kept = offers.filter((offer) => offer.match === "exact" || offer.match === "probable");
  return { kept, dropped: offers.length - kept.length };
}

async function applyLlmRelevanceFilter(
  offers: Offer[],
  snapshot: SearchSnapshot,
  prompt: string,
  narrator: AnalysisNarrator,
  options: { userName?: string; addressAs?: string },
): Promise<{ offers: Offer[]; rejected: number; warnings: string[] }> {
  if (!narrator.filterRelevance || offers.length === 0) {
    return { offers, rejected: 0, warnings: [] };
  }
  // Prefer ambiguous residual for the model; if none, skip LLM call.
  const ambiguous = offers.filter((offer) => offer.match === "doubtful" || offer.match === "analog");
  const eligible = ambiguous.length > 0 ? ambiguous : offers;
  const candidates = eligible.slice(0, RELEVANCE_CANDIDATE_CAP);
  const coverageWarnings = candidates.length < offers.length
    ? [`AI-проверка названий получила ${candidates.length} из ${offers.length} строк; остальные строки не проверены моделью.`]
    : [];
  if (candidates.length === 0) return { offers, rejected: 0, warnings: [] };

  try {
    const result = await narrator.filterRelevance({
      prompt,
      snapshotQuery: snapshot.query,
      productName: snapshot.product.name,
      productBrand: snapshot.product.brand,
      productModel: snapshot.product.model,
      productMpn: snapshot.product.mpn,
      candidates: candidates.map((offer) => ({
        id: offer.id,
        title: offer.title,
        mpn: offer.mpn ?? null,
        match: offer.match,
        price: offer.price,
        source: offer.source,
      })),
      ...(options.userName ? { userName: options.userName } : {}),
      ...(options.addressAs ? { addressAs: options.addressAs } : {}),
    });
    const candidateIds = new Set(candidates.map((offer) => offer.id));
    const reject = new Set(result.rejectedOfferIds.filter((id) => candidateIds.has(id)));
    const warnings = [...coverageWarnings, ...result.warnings];
    if (reject.size === 0) return { offers, rejected: 0, warnings };
    const filtered = offers.filter((offer) => !reject.has(offer.id));
    // Never wipe the table if the model rejected everything.
    if (filtered.length === 0) {
      return {
        offers,
        rejected: 0,
        warnings: [
          ...warnings,
          "Проверка соответствия отклонила все предложения, поэтому исходные варианты сохранены.",
        ],
      };
    }
    return {
      offers: filtered,
      rejected: offers.length - filtered.length,
      warnings,
    };
  } catch (error) {
    return {
      offers,
      rejected: 0,
      warnings: [
        `Проверка соответствия временно недоступна: ${narrationFailureMessage(error)}. Предложения сохранены.`,
      ],
    };
  }
}

function resolveChatIntent(
  heuristic: ChatIntent,
  narrated: CopilotChatAnswer | undefined,
  heuristicSearchQuery: string,
): { intent: ChatIntent; searchQuery?: string } {
  const modelQuery = narrated?.searchQuery?.trim();
  const modelIntent = narrated?.intent;

  // An explicit help/source/admin/filter request must not become a catalog
  // search just because the model returned a searchQuery.
  if (heuristic !== "search" && heuristic !== "explain") {
    return { intent: heuristic };
  }

  if (modelIntent === "search" && modelQuery && modelQuery.length >= 2) {
    return { intent: "search", searchQuery: modelQuery };
  }
  if (heuristic === "search" && heuristicSearchQuery.length >= 2) {
    return {
      intent: "search",
      searchQuery: modelQuery && modelQuery.length >= 2 ? modelQuery : heuristicSearchQuery,
    };
  }
  if (modelIntent && asMetaIntent(modelIntent)) {
    return { intent: asMetaIntent(modelIntent)! };
  }
  if (asMetaIntent(heuristic)) {
    return { intent: asMetaIntent(heuristic)! };
  }
  return { intent: "help" };
}

export async function analyzeSnapshot(
  snapshot: SearchSnapshot,
  prompt: string,
  narrator?: AnalysisNarrator,
  options: AnalyzeOptions = {},
): Promise<AnalysisResult> {
  return sanitizeAnalysisResult(await analyzeSnapshotRaw(snapshot, prompt, narrator, options), options.userRole);
}

async function analyzeSnapshotRaw(
  snapshot: SearchSnapshot,
  prompt: string,
  narrator?: AnalysisNarrator,
  options: AnalyzeOptions = {},
): Promise<AnalysisResult> {
  const incoming = [...snapshot.offers];
  const realCount = incoming.filter((offer) => !offer.demo).length;
  const normalized = prompt.toLocaleLowerCase("ru");
  const searchQuery = extractSearchQuery(prompt);
  const userName = options.userName?.trim() || undefined;
  const userRole = options.userRole;
  const userLogin = options.userLogin?.trim() || undefined;
  const addressAs = addressName(userName);

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

  let intent = classifyIntent(normalized, searchQuery);
  const metaIntent = asMetaIntent(intent);
  const sources = parseSources(normalized);
  const maxPrice = parseMaxPrice(normalized);
  const titleRules = parseTitleFilterRules(normalized);

  if (metaIntent) {
    const meta = cannedMetaAnswer({
      intent: metaIntent,
      ...(userName ? { userName } : {}),
      ...(userRole ? { userRole } : {}),
      snapshotQuery: snapshot.query,
      sourceLines: sourceLines(snapshot),
      offerCount: incoming.length,
    });
    const base = {
      summary: meta.summary,
      selectedOfferIds: [] as string[],
      appliedFilters: meta.appliedFilters,
      warnings: meta.warnings,
      citations: [] as OfferCitation[],
      intent: metaIntent,
      provider: "Справочный ответ Price Radar",
    };
    // These answers must describe only application state, never a model's guess about operations.
    if (!narrator?.answer || metaIntent === "admin" || metaIntent === "sources") return base;
    try {
      const narrated = await narrator.answer({
        prompt,
        intentHint: metaIntent,
        snapshotQuery: snapshot.query,
        productName: snapshot.product.name,
        offerCount: incoming.length,
        sourceLines: sourceLines(snapshot),
        ...(userName ? { userName } : {}),
        ...(addressAs ? { addressAs } : {}),
        ...(userRole ? { userRole } : {}),
      });
      return {
        ...base,
        summary: narrated.summary,
        warnings: [...meta.warnings, ...narrated.warnings],
        provider: narrator.name,
      };
    } catch (error) {
      return {
        ...base,
        warnings: [
          ...meta.warnings,
          `AI-ответ недоступен: ${narrationFailureMessage(error)}.`,
        ],
        provider: "Справочный fallback Price Radar",
      };
    }
  }

  // Search intent: prefer model searchQuery when Ollama answers.
  if (intent === "search") {
    let query = searchQuery;
    let summary = withGreeting(
      `Запускаю уточнение модели «${query}». Выберите карточку слева, чтобы собрать предложения.`,
      userName,
    );
    let warnings: string[] = [];
    let provider = "Детерминированный поиск Price Radar";
    if (narrator?.answer) {
      try {
        const narrated = await narrator.answer({
          prompt,
          intentHint: "search",
          snapshotQuery: snapshot.query,
          productName: snapshot.product.name,
          ...(userName ? { userName } : {}),
          ...(addressAs ? { addressAs } : {}),
          ...(userRole ? { userRole } : {}),
        });
        const resolved = resolveChatIntent("search", narrated, searchQuery);
        if (resolved.searchQuery) query = resolved.searchQuery;
        summary = narrated.summary;
        warnings = narrated.warnings;
        provider = narrator.name;
      } catch (error) {
        warnings = [
          `AI-ответ недоступен: ${narrationFailureMessage(error)}.`,
        ];
        provider = "Справочный fallback Price Radar";
      }
    }
    return {
      summary,
      selectedOfferIds: [],
      appliedFilters: [`Новый поиск по запросу «${query}».`],
      warnings,
      citations: [],
      intent: "search",
      searchQuery: query,
      provider,
    };
  }

  const filters: string[] = [
    `В снимке поиска «${snapshot.query}»: ${incoming.length} предложений.`,
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
  // Source restriction only when the user named a marketplace — never invent WB-only.
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
  if (titleRules) {
    const before = offers.length;
    offers = applyTitleFilterRules(offers, titleRules);
    const bits: string[] = [];
    if (titleRules.includeAny?.length) bits.push(`тип: ${titleRules.includeAny.slice(0, 4).join("/")}`);
    if (titleRules.excludeAny?.length) bits.push(`исключить: ${titleRules.excludeAny.slice(0, 4).join("/")}`);
    filters.push(
      `Фильтр по названию (${bits.join("; ") || "тип товара"}): ${offers.length} из ${before}.`,
    );
  }

  const includeDemo = /включая демо|с демо|демо тоже/.test(normalized);
  const wantRealOnly = /реальн|без демо|не демо/.test(normalized);
  if (!includeDemo && (wantRealOnly || realCount > 0)) {
    offers = offers.filter((offer) => !offer.demo);
  }

  // Soft-drop is for explain/pick-best. Filter intents keep all sources that match criteria.
  if (intent !== "filter") {
    const weakDrop = dropWeakMatchesWhenStrongerExist(offers);
    if (weakDrop.dropped > 0) {
      offers = weakDrop.kept;
      filters.push(
        `Убраны сомнительные совпадения (${ruCount(weakDrop.dropped, "строка", "строки", "строк")}); оставлены более подходящие товары.`,
      );
    }
  }

  // Hybrid relevance step 2: optional LLM reject list on ambiguous residual (or all if only weak).
  if (narrator && (intent === "explain" || intent === "filter")) {
    const llm = await applyLlmRelevanceFilter(offers, snapshot, prompt, narrator, {
      ...(userName ? { userName } : {}),
      ...(addressAs ? { addressAs } : {}),
    });
    offers = llm.offers;
    warnings.push(...llm.warnings);
    if (llm.rejected > 0) {
      filters.push(
        `Убраны предложения с неподходящим названием (${ruCount(llm.rejected, "строка", "строки", "строк")}).`,
      );
    }
  }

  offers.sort((left, right) => left.price - right.price);
  filters.push("Сортировка по возрастанию цены.");

  const requested = selectionLimit(normalized);
  const selected = intent === "filter" ? offers : offers.slice(0, requested);
  filters.push(
    selected.length === 0
      ? intent === "filter"
        ? "В таблицу ничего не подошло."
        : "Подходящих предложений не найдено."
      : intent === "filter"
        ? `В таблицу отобраны ${ruCount(selected.length, "строка", "строки", "строк")}: ${selected.map(offerLabel).join("; ")}.`
        : `${selected.length === 1 ? "Выбран" : "Выбраны"} ${ruCount(selected.length, "вариант", "варианта", "вариантов")}: ${selected.map(offerLabel).join("; ")}.`,
  );

  const best = selected[0];
  const summary =
    intent === "filter"
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

  const tableFilter = buildTableFilter({
    intent,
    includeDemo,
    wantRealOnly,
    realCount,
    sources,
    ...(maxPrice != null ? { maxPrice } : {}),
    ...(titleRules ? { titleRules } : {}),
    selectedOfferIds: selected.map((offer) => offer.id),
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
  };
  if (!narrator || selected.length === 0) return result;

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
        `AI-анализ недоступен: ${narrationFailureMessage(error)}. Сохранён детерминированный отбор.`,
      ],
      provider: "Детерминированный fallback",
    };
  }
}

export type { Offer };

/** Standalone copilot chat (no search snapshot) — always prefers the LLM when available. */
export async function answerCopilot(
  prompt: string,
  narrator?: AnalysisNarrator,
  options: AnalyzeOptions = {},
): Promise<AnalysisResult> {
  return sanitizeAnalysisResult(await answerCopilotRaw(prompt, narrator, options), options.userRole);
}

async function answerCopilotRaw(
  prompt: string,
  narrator?: AnalysisNarrator,
  options: AnalyzeOptions = {},
): Promise<AnalysisResult> {
  const normalized = prompt.toLocaleLowerCase("ru");
  const searchQuery = extractSearchQuery(prompt);
  const userName = options.userName?.trim() || undefined;
  const userRole = options.userRole;
  const userLogin = options.userLogin?.trim() || undefined;
  const addressAs = addressName(userName);

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

  const heuristicIntent = classifyIntent(normalized, searchQuery);

  if (heuristicIntent === "filter" || heuristicIntent === "explain") {
    return {
      summary: withGreeting(
        "Сейчас нет таблицы предложений. Сначала выберите товар и дождитесь результатов поиска — тогда смогу отфильтровать или объяснить конкретные строки.",
        userName,
      ),
      selectedOfferIds: [],
      appliedFilters: ["Нет снимка поиска."],
      warnings: [],
      citations: [],
      intent: "help",
      provider: "Справочный ответ Price Radar",
    };
  }

  const standaloneMeta = asMetaIntent(heuristicIntent);
  if (standaloneMeta === "sources" || standaloneMeta === "admin" || standaloneMeta === "ranking") {
    const meta = cannedMetaAnswer({
      intent: standaloneMeta,
      ...(userName ? { userName } : {}),
      ...(userRole ? { userRole } : {}),
      snapshotQuery: "",
      sourceLines: [],
      offerCount: 0,
    });
    return {
      summary: meta.summary,
      selectedOfferIds: [],
      appliedFilters: meta.appliedFilters,
      warnings: meta.warnings,
      citations: [],
      intent: standaloneMeta,
      provider: "Справочный ответ Price Radar",
    };
  }

  if (narrator?.answer) {
    try {
      const narrated = await narrator.answer({
        prompt,
        intentHint: heuristicIntent,
        ...(userName ? { userName } : {}),
        ...(addressAs ? { addressAs } : {}),
        ...(userRole ? { userRole } : {}),
      });
      const resolved = resolveChatIntent(heuristicIntent, narrated, searchQuery);
      return {
        summary: resolved.intent === "search" && resolved.searchQuery
          ? withGreeting(
              `Уточняю модель «${resolved.searchQuery}». Выберите найденную карточку, чтобы собрать предложения.`,
              userName,
            )
          : narrated.summary,
        selectedOfferIds: [],
        appliedFilters:
          resolved.intent === "search"
            ? [`Новый поиск по запросу «${resolved.searchQuery}».`]
            : ["Ответ на справочный вопрос без открытого поиска."],
        warnings: resolved.intent === "search" ? [] : narrated.warnings,
        citations: [],
        intent: resolved.intent,
        ...(resolved.searchQuery ? { searchQuery: resolved.searchQuery } : {}),
        provider: narrator.name,
      };
    } catch (error) {
      if (heuristicIntent === "search" && searchQuery.length >= 2) {
        return {
          summary: withGreeting(
            `Уточняю модель «${searchQuery}». Выберите найденную карточку, чтобы собрать предложения.`,
            userName,
          ),
          selectedOfferIds: [],
          appliedFilters: [`Новый поиск по запросу «${searchQuery}».`],
          warnings: [`AI-ответ недоступен: ${narrationFailureMessage(error)}. Запрос извлечён из текста.`],
          citations: [],
          intent: "search",
          searchQuery,
          provider: "Справочный fallback Price Radar",
        };
      }
      if (standaloneMeta) {
        const meta = cannedMetaAnswer({
          intent: standaloneMeta,
          ...(userName ? { userName } : {}),
          ...(userRole ? { userRole } : {}),
          snapshotQuery: "",
          sourceLines: [],
          offerCount: 0,
        });
        return {
          summary: meta.summary,
          selectedOfferIds: [],
          appliedFilters: meta.appliedFilters,
          warnings: [...meta.warnings, `AI-ответ недоступен: ${narrationFailureMessage(error)}.`],
          citations: [],
          intent: standaloneMeta,
          provider: "Справочный fallback Price Radar",
        };
      }
      return {
        summary: withGreeting(
          "Сейчас не удалось получить ответ модели. Повторите вопрос или выберите товар слева для анализа таблицы.",
          userName,
        ),
        selectedOfferIds: [],
        appliedFilters: ["AI-чат недоступен."],
        warnings: [`AI-ответ недоступен: ${narrationFailureMessage(error)}.`],
        citations: [],
        intent: "help",
        provider: "Справочный fallback Price Radar",
      };
    }
  }

  if (heuristicIntent === "search" && searchQuery.length >= 2) {
    return {
      summary: withGreeting(
        `Запускаю уточнение модели «${searchQuery}». Выберите карточку слева, чтобы собрать предложения.`,
        userName,
      ),
      selectedOfferIds: [],
      appliedFilters: [`Новый поиск по запросу «${searchQuery}».`],
      warnings: ["Модель не подключена — запрос определён по вашему сообщению."],
      citations: [],
      intent: "search",
      searchQuery,
      provider: "Справочный ответ Price Radar",
    };
  }

  const chatMetaIntent = asMetaIntent(heuristicIntent);
  if (chatMetaIntent) {
    const meta = cannedMetaAnswer({
      intent: chatMetaIntent,
      ...(userName ? { userName } : {}),
      ...(userRole ? { userRole } : {}),
      snapshotQuery: "",
      sourceLines: [],
      offerCount: 0,
    });
    return {
      summary: meta.summary,
      selectedOfferIds: [],
      appliedFilters: meta.appliedFilters,
      warnings: [...meta.warnings, "Модель не подключена — показан справочный шаблон."],
      citations: [],
      intent: chatMetaIntent,
      provider: "Справочный ответ Price Radar",
    };
  }

  return {
    summary: withGreeting(
      "Для фильтра, сравнения и разбора строк выберите товар слева и дождитесь таблицы. Справочные вопросы задайте ещё раз после подключения модели.",
      userName,
    ),
    selectedOfferIds: [],
    appliedFilters: ["Нет снимка поиска и нет модели."],
    warnings: ["Модель сейчас не подключена."],
    citations: [],
    intent: "help",
    provider: "Справочный ответ Price Radar",
  };
}

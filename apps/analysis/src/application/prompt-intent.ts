import type { ChatIntent, Offer, OfferTableFilter, UserRole } from "@peremena/contracts";
import { hasInfraLeak } from "./infra-leak.js";

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

/** Title/product-type tokens for reshaping the offers table (not marketplace sources). */
export interface TitleFilterRules {
  includeAny?: string[];
  excludeAny?: string[];
}

const NOTEBOOK_INCLUDE = ["ноутбук", "laptop", "notebook", "macbook", "ультрабук", "ultrabook"];
const HANDHELD_EXCLUDE = [
  "legion go",
  "steam deck",
  "rog ally",
  "handheld",
  "игровая консоль",
  "игровой консол",
  "портативная консоль",
  "портативн консол",
  "приставка",
];

/**
 * Category / type filter from the user prompt («только ноутбуки», «не консоль»).
 * Does not imply a marketplace source restriction.
 */
export function parseTitleFilterRules(normalized: string): TitleFilterRules | undefined {
  const includeAny: string[] = [];
  const excludeAny: string[] = [];

  const wantsNotebooks = /ноутбук|laptop|notebook|ультрабук|ultrabook/.test(normalized);
  const excludeHandheld =
    wantsNotebooks ||
    /не консол|без консол|не приставк|без приставк|не legion go|без legion go|без\s+go\b|не handheld|без handheld|не портативн\w* консол/.test(
      normalized,
    );

  if (wantsNotebooks) includeAny.push(...NOTEBOOK_INCLUDE);
  if (excludeHandheld) excludeAny.push(...HANDHELD_EXCLUDE);

  if (includeAny.length === 0 && excludeAny.length === 0) return undefined;
  return {
    ...(includeAny.length > 0 ? { includeAny } : {}),
    ...(excludeAny.length > 0 ? { excludeAny } : {}),
  };
}

export function applyTitleFilterRules(offers: Offer[], rules: TitleFilterRules): Offer[] {
  const hayOf = (title: string) => title.toLocaleLowerCase("ru");
  const afterExclude =
    rules.excludeAny && rules.excludeAny.length > 0
      ? offers.filter(
          (offer) => !rules.excludeAny!.some((token) => hayOf(offer.title).includes(token.toLocaleLowerCase("ru"))),
        )
      : offers;
  if (!rules.includeAny?.length) return afterExclude;
  const withInclude = afterExclude.filter((offer) =>
    rules.includeAny!.some((token) => hayOf(offer.title).includes(token.toLocaleLowerCase("ru"))),
  );
  // If no title has include tokens, keep exclude-only result (e.g. "Legion 5" without «ноутбук»).
  return withInclude.length > 0 ? withInclude : afterExclude;
}

export function extractSearchQuery(prompt: string): string {
  return prompt
    .replace(/покажи\s+(?:реальн[а-яё]*\s+)?предложени[а-яё]*\s+по\s+/gi, "")
    .replace(/уточни(?:те)? модель/gi, "")
    .replace(/запусти(?:те)? поиск/gi, "")
    .replace(/найд[иу]|найти|поищи|\bищи\b/gi, "")
    .replace(/собери предложени\w*/gi, "")
    .replace(/новый поиск/gi, "")
    .trim();
}

/** Short form of displayName for greetings («Михаил Иванов» → «Михаил»). */
export function addressName(userName?: string): string | undefined {
  const trimmed = userName?.trim();
  if (!trimmed) return undefined;
  return trimmed.split(/\s+/)[0];
}

/** True when the user is reshaping the current offers table (not asking for VNC/admin). */
export function wantsTableFilter(normalized: string): boolean {
  return (
    /отфильтр|фильтруй|\bфильтр\b|оставь|убери|исключ|покажи только|выдай только|только реальн|только сам|только ноутбук|опять (?:отфильтр|фильтр)|пробегись|по всем источникам|без демо|не демо|дешевл|ниже \d|до \d|под \d|не консол|без консол|не приставк|без legion go|не legion go|только (?:вб|wb|вайлдберр|wildberries|ситилинк|citilink|ozon|озон|dns|днс|avito|авито)/.test(
      normalized,
    )
  );
}

export function classifyIntent(normalized: string, searchQuery: string): ChatIntent {
  if (/^(?:привет|здравствуй(?:те)?|добрый\s+(?:день|вечер|утро)|hi|hello)(?:[!.\s]|$)/i.test(normalized)) {
    return "help";
  }
  if (
    /кто ты|что ты (?:умеешь|можешь|такое)|зачем ты|для чего ты|помощь|справк|как пользоват|что умеешь|что такое копайлот|о себе|тво[ея] задач/.test(
      normalized,
    )
  ) {
    return "help";
  }
  if (/excel|экспорт|выгруз|скачать таблиц|xlsx|выгрузк/.test(normalized)) {
    return "export";
  }

  // Table reshape beats sources/admin: «пробегись по источникам» is a filter, not VNC.
  if (wantsTableFilter(normalized)) {
    return "filter";
  }

  if (
    hasInfraLeak(normalized) || /\bip\b|консоль админ|админк|удалённ\w* рабоч|удаленн\w* рабоч|chrome[- ]?контур/.test(
      normalized,
    )
  ) {
    return "admin";
  }
  if (
    /что такое демо|демо[- ]цен|зачем демо|чем демо|demo[- ]цен|пометк\w* демо|строк\w* демо/.test(
      normalized,
    )
  ) {
    return "help";
  }
  if (
    /как (?:ты )?выбира|как ранжир|почему лучш|детермин|как считает|по чем(?:у|у) отобр|логик\w* отбор|как работает отбор/.test(
      normalized,
    )
  ) {
    return "ranking";
  }
  if (
    /какие источник|какие площадк|коннектор|статус сбор|пайплайн|почему нет (?:wb|вб|ozon|озон|dns)|почему (?:пусто|ошибк)|источник(?:и|ов)?\s+(?:в снимке|не ответил|упал|ошиб)|панель источник/.test(
      normalized,
    )
  ) {
    return "sources";
  }

  const wantSearch =
    /уточни(?:те)? модель|запусти(?:те)? поиск|найд[иу]|найти|поищи|\bищи\b|новый поиск|собери предлож|покажи\s+(?:реальн[а-яё]*\s+)?предложени[а-яё]*\s+по\s+/.test(
      normalized,
    );
  if (wantSearch && searchQuery.length >= 2) return "search";
  return "explain";
}

export function buildTableFilter(input: {
  intent: ChatIntent;
  includeDemo: boolean;
  wantRealOnly: boolean;
  realCount: number;
  sources: string[];
  maxPrice?: number;
  titleRules?: TitleFilterRules;
  selectedOfferIds?: string[];
}): OfferTableFilter | undefined {
  if (input.intent !== "filter") return undefined;
  const filter: OfferTableFilter = {};
  if (!input.includeDemo && (input.wantRealOnly || input.realCount > 0)) filter.realOnly = true;
  if (input.sources.length > 0) filter.sources = input.sources;
  if (input.maxPrice != null) filter.maxPrice = input.maxPrice;
  if (input.titleRules?.includeAny?.length) filter.titleIncludeAny = input.titleRules.includeAny;
  if (input.titleRules?.excludeAny?.length) filter.titleExcludeAny = input.titleRules.excludeAny;
  if (input.selectedOfferIds) filter.selectedOfferIds = input.selectedOfferIds;
  return Object.keys(filter).length > 0 ? filter : undefined;
}

export function withGreeting(summary: string, userName?: string): string {
  const name = addressName(userName);
  if (!name) return summary;
  const start = summary.trim().toLocaleLowerCase("ru");
  const greeting = name.toLocaleLowerCase("ru");
  if (start.startsWith(`${greeting},`) || start.startsWith(`${greeting}!`)) {
    return summary;
  }
  return `${name}, ${summary.charAt(0).toLocaleLowerCase("ru")}${summary.slice(1)}`;
}

export function cannedMetaAnswer(input: {
  intent: Exclude<ChatIntent, "explain" | "filter" | "search" | "blocked" | "demo">;
  userName?: string;
  userRole?: UserRole;
  snapshotQuery: string;
  sourceLines: string[];
  offerCount: number;
}): { summary: string; warnings: string[]; appliedFilters: string[] } {
  const name = addressName(input.userName);
  const hello = name ? `${name}, ` : "";
  const filters = ["Справочный ответ: отбор предложений не изменён."];

  switch (input.intent) {
    case "help":
      return {
        summary:
          `${hello}я копайлот закупок ПЕРЕМЕНА Price Radar — не общий чат. ` +
          "Помогаю по уже собранной таблице предложений: объяснить, какой вариант отобрал код, " +
          "сравнить цены, отфильтровать строки, уточнить модель для нового поиска, " +
          "напомнить про Excel и источники. Ранжирование считает сервис анализа, " +
          "локальная модель только формулирует объяснение.",
        warnings: [
          "Не отвечаю на вопросы вне закупки, таблицы и источников Price Radar.",
        ],
        appliedFilters: filters,
      };
    case "export":
      return {
        summary:
          `${hello}Excel выгружается кнопкой «Excel» в рабочей области поиска — ` +
          "это снимок уже загруженных предложений текущего сбора (не пересчёт модели). " +
          "Сначала дождитесь строк в таблице или работайте с уже пришедшими.",
        warnings: ["В выгрузку попадают строки текущего снимка поиска."],
        appliedFilters: filters,
      };
    case "ranking":
      return {
        summary:
          `${hello}сначала учитываю ваши условия и убираю явно неподходящие товары, ` +
          "затем сортирую предложения по цене. Модель может помочь проверить соответствие названия товара, " +
          "но не меняет цены и порядок подходящих предложений.",
        warnings: [],
        appliedFilters: filters,
      };
    case "sources": {
      if (!input.snapshotQuery) {
        return {
          summary:
            `${hello}сейчас нет открытого поиска, поэтому статусы площадок неизвестны. ` +
            "Выберите товар и дождитесь результатов — тогда покажу, какие источники ответили.",
          warnings: [],
          appliedFilters: filters,
        };
      }
      const lines =
        input.sourceLines.length > 0
          ? input.sourceLines.join("; ")
          : "в текущем снимке статусов источников ещё нет";
      return {
        summary:
          `${hello}запрос «${input.snapshotQuery}»: ${input.offerCount} предложений. ` +
          `Статусы площадок: ${lines}. ` +
          "Если площадка не ответила — источник временно недоступен.",
        warnings: [],
        appliedFilters: filters,
      };
    }
    case "admin":
      return {
        summary:
          `${hello}этот вопрос не про выбор предложений в таблице. ` +
          "Если площадка не ответила, источник временно недоступен. " +
          "В чате нет технических подробностей сбора.",
        warnings: ["Запрос вне сценария закупки отклонён без технических деталей."],
        appliedFilters: filters,
      };
  }
}

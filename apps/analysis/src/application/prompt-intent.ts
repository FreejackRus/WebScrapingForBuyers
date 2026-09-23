import type { ChatIntent, OfferTableFilter, UserRole } from "@peremena/contracts";

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

/** Short form of displayName for greetings («Михаил Иванов» → «Михаил»). */
export function addressName(userName?: string): string | undefined {
  const trimmed = userName?.trim();
  if (!trimmed) return undefined;
  return trimmed.split(/\s+/)[0];
}

export function classifyIntent(normalized: string, searchQuery: string): ChatIntent {
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
  if (
    /vnc|ssh|\bip\b|прогрев|антибот|chrome|консоль админ|админк|удалённ\w* рабоч|удаленн\w* рабоч/.test(
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
    return "demo";
  }
  if (
    /как (?:ты )?выбира|как ранжир|почему лучш|детермин|как считает|по чем(?:у|у) отобр|логик\w* отбор|как работает отбор/.test(
      normalized,
    )
  ) {
    return "ranking";
  }
  if (
    /источник|коннектор|статус сбор|пайплайн|почему нет (?:wb|вб|ozon|озон|dns)|почему (?:пусто|ошибк)|какие площадк|какие источник/.test(
      normalized,
    )
  ) {
    return "sources";
  }

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

export function withGreeting(summary: string, userName?: string): string {
  const name = addressName(userName);
  if (!name) return summary;
  if (new RegExp(`^${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[,!]`, "i").test(summary.trim())) {
    return summary;
  }
  return `${name}, ${summary.charAt(0).toLocaleLowerCase("ru")}${summary.slice(1)}`;
}

export function cannedMetaAnswer(input: {
  intent: Exclude<ChatIntent, "explain" | "filter" | "search" | "blocked">;
  userName?: string;
  userRole?: UserRole;
  snapshotQuery: string;
  sourceLines: string[];
  offerCount: number;
  realCount: number;
  demoCount: number;
}): { summary: string; warnings: string[]; appliedFilters: string[] } {
  const name = addressName(input.userName);
  const hello = name ? `${name}, ` : "";
  const filters = [`Ответ по справочному сценарию «${input.intent}» (без смены ранжирования).`];

  switch (input.intent) {
    case "help":
      return {
        summary:
          `${hello}я копайлот закупок ПЕРЕМЕНА Price Radar — не общий чат. ` +
          "Помогаю по уже собранной таблице предложений: объяснить, какой вариант отобрал код, " +
          "сравнить цены, отфильтровать строки, уточнить модель для нового поиска, " +
          "напомнить про Excel и демо vs реальные цены. Ранжирование считает сервис анализа, " +
          "локальная модель только формулирует объяснение.",
        warnings: [
          "Не отвечаю на вопросы вне закупки, таблицы и источников Price Radar.",
          "Демо-цены нельзя использовать для счёта или ТКП.",
        ],
        appliedFilters: filters,
      };
    case "export":
      return {
        summary:
          `${hello}Excel выгружается кнопкой «Excel» в рабочей области поиска — ` +
          "это снимок уже загруженных предложений текущего сбора (не пересчёт модели). " +
          "Сначала дождитесь строк в таблице или работайте с уже пришедшими.",
        warnings: ["В выгрузку попадают и демо-строки, если они есть в снимке — проверяйте столбец demo."],
        appliedFilters: filters,
      };
    case "ranking":
      return {
        summary:
          `${hello}отбор детерминированный: фильтры из запроса (точность/гарантия/новые/источник/потолок цены), ` +
          "затем исключение демо при наличии реальных строк, сортировка по возрастанию цены, top-N. " +
          "Модель не меняет состав выборки — только объясняет уже посчитанный результат.",
        warnings: ["Если в снимке только демо, ранжирование идёт по демо с явной пометкой."],
        appliedFilters: filters,
      };
    case "demo":
      return {
        summary:
          `${hello}строки с пометкой «демо» — синтетические цены для отладки контура. ` +
          "Для закупочного решения берите только реальные предложения (можно сказать «только реальные» / «без демо»). " +
          "В UI и Excel демо всегда помечены; код анализа по умолчанию их отбрасывает, если есть живые строки.",
        warnings: ["Демо нельзя класть в счёт, ТКП или сравнение для закупки."],
        appliedFilters: filters,
      };
    case "sources": {
      const lines =
        input.sourceLines.length > 0
          ? input.sourceLines.join("; ")
          : "в текущем снимке статусов источников ещё нет";
      return {
        summary:
          `${hello}сбор идёт адаптерами search (коннекторы/MCP/HTTP/демо). ` +
          `Запрос «${input.snapshotQuery}»: ${input.offerCount} предложений ` +
          `(${input.realCount} реальных, ${input.demoCount} демо). Статусы: ${lines}. ` +
          "Пустая витрина или ошибка площадки — смотрите панель источников; менеджеру видны только статусы без сырого транспорта.",
        warnings:
          input.userRole === "admin"
            ? ["Админу доступны сырые message источника (VNC/ssh-подсказки) в панели статусов."]
            : ["Детали транспорта (IP, VNC, ssh) скрыты для роли manager."],
        appliedFilters: filters,
      };
    }
    case "admin":
      if (input.userRole === "admin") {
        return {
          summary:
            `${hello}для прогрева антибота используйте VNC к chrome-контуру на сервере, не ссылки на витрину в UI. ` +
            "Сырые message источников (в т.ч. ssh/VNC-подсказки) видны в панели статусов. " +
            "Копайлот не выполняет ssh и не открывает VNC — только поясняет, куда смотреть.",
          warnings: ["Не публикуйте реквизиты сервера в чате и тикетах."],
          appliedFilters: filters,
        };
      }
      return {
        summary:
          `${hello}темы VNC, ssh и сырого транспорта источников доступны только администратору. ` +
          "Как менеджер вы видите статусы сбора и предложения в таблице; прогрев антибота — зона admin.",
        warnings: ["Запрос вне вашей роли отклонён без технических деталей."],
        appliedFilters: filters,
      };
  }
}

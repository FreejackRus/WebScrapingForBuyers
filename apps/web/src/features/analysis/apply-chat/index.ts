import type { AnalysisResult, UserRole } from "@peremena/contracts";

import { useSearchStore } from "entities/search";

const SEARCH_DIRECTIVE =
  /уточни(?:те)? модель|запусти(?:те)? поиск|найд[иу]|найти|поищи|\bищи\b|новый поиск|собери предлож/i;

/** True only when the user explicitly asks to start/refine a catalog search. */
export function wantsNewSearch(text: string): boolean {
  return SEARCH_DIRECTIVE.test(text.trim());
}

export function applyChatResult(result: AnalysisResult) {
  const search = useSearchStore.getState();
  if (result.intent === "blocked") {
    search.setTableFilter(undefined);
    return;
  }
  search.setTableFilter(result.intent === "filter" ? result.tableFilter : undefined);
  // Never mirror arbitrary chat text into the search box — only explicit search intent.
  if (result.intent === "search" && result.searchQuery && result.searchQuery.trim().length >= 2) {
    search.setQuery(result.searchQuery.trim());
    void search.suggest();
  }
}

export function localSearchQuery(text: string) {
  return text
    .replace(/^уточни(?:те)? модель\s*/i, "")
    .replace(/^(найди|найти|поищи|ищи)\s+/i, "")
    .replace(/^запусти(?:те)? поиск\s*/i, "")
    .replace(/^собери предложени\w*\s*/i, "")
    .replace(/^новый поиск\s*/i, "")
    .trim();
}

/**
 * Answers that do not need a search snapshot (help / demo / export / ranking / admin).
 * Returns undefined when the question needs the offers table.
 */
export function localMetaReply(
  text: string,
  userName: string,
  userRole: UserRole,
): string | undefined {
  const normalized = text.trim().toLocaleLowerCase("ru");
  const hello = userName ? `${userName}, ` : "";

  if (
    /кто ты|что ты (?:умеешь|можешь|такое)|зачем ты|для чего ты|помощь|справк|как пользоват|что умеешь|что такое копайлот|о себе|тво[ея] задач/.test(
      normalized,
    )
  ) {
    return (
      `${hello}я копайлот закупок ПЕРЕМЕНА Price Radar — не общий чат. ` +
      "Помогаю по таблице предложений: объяснить отбор, сравнить цены, отфильтровать строки, " +
      "уточнить модель для нового поиска, напомнить про Excel и демо vs реальные цены. " +
      "Ранжирование считает код анализа; модель только формулирует объяснение."
    );
  }
  if (/excel|экспорт|выгруз|скачать таблиц|xlsx|выгрузк/.test(normalized)) {
    return (
      `${hello}Excel выгружается кнопкой «Excel» в рабочей области поиска — ` +
      "это снимок уже загруженных предложений. Сначала выберите товар слева и дождитесь строк в таблице."
    );
  }
  if (
    /что такое демо|демо[- ]цен|зачем демо|чем демо|demo[- ]цен|пометк\w* демо|строк\w* демо/.test(
      normalized,
    )
  ) {
    return (
      `${hello}строки с пометкой «демо» — синтетические цены для отладки. ` +
      "Для закупки берите только реальные предложения (скажите «только реальные» / «без демо» после сбора)."
    );
  }
  if (
    /как (?:ты )?выбира|как ранжир|почему лучш|детермин|как считает|по чем(?:у|у) отобр|логик\w* отбор|как работает отбор/.test(
      normalized,
    )
  ) {
    return (
      `${hello}отбор детерминированный: фильтры из запроса, исключение демо при наличии реальных строк, ` +
      "сортировка по цене, top-N. Модель не меняет состав выборки — только объясняет результат. " +
      "Чтобы увидеть это на данных, сначала соберите предложения слева."
    );
  }
  if (
    /vnc|ssh|\bip\b|прогрев|антибот|chrome|консоль админ|админк|удалённ\w* рабоч|удаленн\w* рабоч/.test(
      normalized,
    )
  ) {
    if (userRole === "admin") {
      return (
        `${hello}для прогрева антибота используйте VNC к chrome-контуру на сервере. ` +
        "Копайлот не выполняет ssh и не открывает VNC — только поясняет, куда смотреть."
      );
    }
    return (
      `${hello}темы VNC, ssh и сырого транспорта доступны только администратору. ` +
      "Как менеджер вы видите статусы сбора и предложения в таблице."
    );
  }
  if (
    /источник|коннектор|статус сбор|пайплайн|какие площадк|какие источник/.test(normalized)
  ) {
    return (
      `${hello}источники подключаются в search (MCP/HTTP/B2B). ` +
      "Конкретные статусы площадок появятся после выбора товара и старта сбора слева."
    );
  }
  return undefined;
}

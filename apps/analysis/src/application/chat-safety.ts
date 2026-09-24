import type { ChatSafetyCategory } from "@peremena/contracts";

import { addressName } from "./prompt-intent.js";

const INSULT_RE =
  /(?<![a-zа-яё0-9])(дур\w*|идиот\w*|туп\w*|дебил\w*|мудак\w*|мраз\w*|урод\w*|тварь|сволоч\w*|гад\w*|хуй\w*|хуе\w*|пизд\w*|еба\w*|ёба\w*|ебл\w*|бляд\w*|сука|суки|блять|нахуй|пошёл\s*на|пошел\s*на|заткнись|заткни|fuck\w*|shit\w*|bitch\w*|asshole)(?![a-zа-яё0-9])/i;

const BYPASS_RE =
  /игнорируй\s*(все\s*)?(инструкц|правил|систем)|забудь\s*(все\s*)?(инструкц|правил)|ты\s+теперь\s+(без\s+правил|свободн|dan|джейл)|jailbreak|prompt\s*injection|system\s*prompt|reveal\s*(your\s*)?(system|prompt)|покажи\s*(системн\w*\s*)?промпт|выведи\s*(свои\s*)?инструкц|режим\s*разработчик|developer\s*mode|без\s*ограничен|обойди\s*(правил|фильтр|огранич)|pretend\s+you\s+are|act\s+as\s+if\s+you\s+have\s+no|ignore\s+(all\s+)?(previous|prior|above)\s+(instructions|rules)/i;

const OFFTOPIC_RE =
  /(?:^|\s)(какая\s+погода|расскажи\s+анекдот|напиши\s+стих|сочини\s+сказк|рецепт\s+борща|кто\s+президент|курс\s+биткоин|поиграй\s+со\s+мной|давай\s+поболтаем|расскажи\s+о\s+себе\s+как\s+человек|напиши\s+код\s+на\s+(python|js|javascript|c\+\+)|реш[иь]\s+домашк)(?:\s|$|[?.!])/i;

export function detectSafetyCategory(normalized: string): ChatSafetyCategory | undefined {
  if (INSULT_RE.test(normalized)) return "insult";
  if (BYPASS_RE.test(normalized)) return "bypass";
  if (OFFTOPIC_RE.test(normalized)) return "offtopic";
  return undefined;
}

const counters = new Map<string, number>();

export function bumpSafetyCounter(userKey: string): number {
  const next = (counters.get(userKey) ?? 0) + 1;
  counters.set(userKey, next);
  return next;
}

/** Test helper — clears in-memory repeat counters. */
export function resetSafetyCounters() {
  counters.clear();
}

export function buildBlockedResponse(input: {
  category: ChatSafetyCategory;
  userName?: string;
  repeatCount: number;
}): { summary: string; warning: string; escalated: boolean } {
  const name = addressName(input.userName);
  const hello = name ? `${name}, ` : "";
  const escalated = input.repeatCount >= 3;
  const scope =
    "Я копайлот закупок ПЕРЕМЕНА Price Radar: таблица предложений, фильтры, сравнение цен, Excel и источники. Ранжирование считает код; модель только объясняет.";

  let summary: string;
  switch (input.category) {
    case "insult":
      summary = `${hello}пожалуйста, без оскорблений. ${scope} Задайте вопрос по снимку поиска.`;
      break;
    case "bypass":
      summary = `${hello}не могу обойти правила контура. ${scope} Спросите про отбор, фильтр или сравнение офферов.`;
      break;
    case "offtopic":
      summary = `${hello}это вне задач Price Radar. ${scope} Чем помочь по текущей таблице?`;
      break;
  }

  const warning =
    input.category === "insult"
      ? "Запрос отклонён: недопустимые формулировки."
      : input.category === "bypass"
        ? "Запрос отклонён: попытка обхода инструкций копайлота."
        : "Запрос отклонён: тема вне Price Radar.";

  const escalateNote = escalated
    ? ` Повторные нарушения (${input.repeatCount}): продолжайте только по закупке и таблице предложений.`
    : "";

  return {
    summary: summary + (escalated ? " Повторы зафиксированы — держитесь рабочей области закупки." : ""),
    warning: warning + escalateNote,
    escalated,
  };
}

export function logSafetyIncident(input: {
  category: ChatSafetyCategory;
  userLogin?: string;
  userName?: string;
  userRole?: string;
  repeatCount: number;
  escalated: boolean;
  searchId?: string;
}) {
  const line = JSON.stringify({
    event: "chat_safety",
    at: new Date().toISOString(),
    category: input.category,
    userLogin: input.userLogin ?? "anonymous",
    userName: input.userName ? addressName(input.userName) : undefined,
    userRole: input.userRole,
    repeatCount: input.repeatCount,
    escalated: input.escalated,
    searchId: input.searchId,
  });
  console.warn(line);
}

import type { BasketItem, JustificationResponse, RequestPosition, SplitRequestResponse } from "@peremena/contracts";

import type { AnalysisNarrator } from "../domain/analysis-narrator.js";
import { memoIsGrounded } from "./ai-tools.js";

/**
 * AI helpers for the purchase basket and bulk requests. Same rules as ai-tools:
 * the model only sees facts the server hands it, and every answer is checked
 * with a deterministic fallback.
 */

const MAX_MEMO = 2_400;
const MAX_POSITIONS = 50;
const MAX_QUANTITY = 10_000;
const MAX_QUERY = 200;

const money = (value: number) => `${Math.round(value).toLocaleString("ru-RU")} ₽`;
const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

// ---------------------------------------------------------------- basket memo

export const lineTotal = (item: BasketItem) => item.offer.price * item.quantity;
export const basketTotal = (items: BasketItem[]) => items.reduce((sum, item) => sum + lineTotal(item), 0);

function basketFacts(items: BasketItem[]) {
  return {
    positions: items.map((item) => ({
      query: item.query,
      title: item.offer.title,
      ...(item.offer.mpn ? { mpn: item.offer.mpn } : {}),
      supplier: item.offer.source,
      seller: item.offer.seller,
      price: money(item.offer.price),
      quantity: item.quantity,
      lineTotal: money(lineTotal(item)),
      priceCondition: item.offer.priceCondition,
      availability: item.offer.availability,
      ...(item.offer.verificationNote ? { cardCheck: item.offer.verificationNote } : {}),
    })),
    positionCount: items.length,
    unitCount: items.reduce((sum, item) => sum + item.quantity, 0),
    total: money(basketTotal(items)),
    suppliers: [...new Set(items.map((item) => item.offer.source))],
  };
}

/** Deterministic memo for the whole request; always correct. */
export function basketTemplate(items: BasketItem[]): string {
  const facts = basketFacts(items);
  return [
    "Обоснование заявки на закупку",
    "",
    `Позиций: ${facts.positionCount}, единиц: ${facts.unitCount}. Поставщики: ${facts.suppliers.join(", ")}.`,
    "",
    ...items.map(
      (item, index) =>
        `${index + 1}. ${item.offer.title}${item.offer.mpn ? ` (арт. ${item.offer.mpn})` : ""} — ${item.offer.source}` +
        `${item.offer.seller && item.offer.seller !== item.offer.source ? ` (продавец ${item.offer.seller})` : ""}, ` +
        `${money(item.offer.price)} × ${item.quantity} = ${money(lineTotal(item))}; ${item.offer.priceCondition}; ${item.offer.availability}.` +
        `${item.offer.verificationNote ? ` Проверка карточки: ${item.offer.verificationNote}.` : ""}`,
    ),
    "",
    `Итого: ${facts.total}.`,
    "Цены и наличие взяты из выдачи Price Radar на момент добавления в корзину; перед заказом их нужно подтвердить у поставщика.",
  ].join("\n");
}

const BASKET_SYSTEM =
  "Ты пишешь служебную записку руководителю закупок по заявке из нескольких позиций: что закупаем, у кого, по какой цене и на какую сумму. " +
  "Используй только факты из данных. Все суммы и количества пиши ровно так, как они даны. Не придумывай сроки, скидки, альтернативы и характеристики. " +
  "Структура: состав заявки; поставщики; итоговая сумма; оговорки по наличию и проверке карточек. До 1800 символов, по-русски.";

export async function justifyBasket(items: BasketItem[], narrator: AnalysisNarrator | undefined): Promise<JustificationResponse> {
  const template = basketTemplate(items);
  if (!narrator?.askJson) return { text: template, ai: false, provider: "шаблон без AI" };
  const facts = basketFacts(items);
  try {
    const raw = await narrator.askJson(BASKET_SYSTEM, facts, {
      type: "object",
      additionalProperties: false,
      properties: { memo: { type: "string", maxLength: MAX_MEMO } },
      required: ["memo"],
    });
    const memo = isObject(raw) && typeof raw.memo === "string" ? raw.memo.trim().slice(0, MAX_MEMO) : "";
    // Small numbers (quantities, list indices) are also checked: a wrong «5 шт» is as bad as a wrong price.
    if (!memo || !/[а-яё]{20,}/iu.test(memo.replace(/\s/g, "")) || !memoIsGrounded(memo, { query: "", chosen: facts, alternatives: [] }) || !smallNumbersGrounded(memo, items)) {
      return { text: template, ai: false, provider: "AI-текст не прошёл проверку фактов — показан шаблон" };
    }
    return { text: memo, ai: true, provider: narrator.name };
  } catch {
    return { text: template, ai: false, provider: "AI не ответил — показан шаблон" };
  }
}

/** 1–2 digit numbers must be a quantity, a position number or a count from the facts. */
function smallNumbersGrounded(memo: string, items: BasketItem[]): boolean {
  const allowed = new Set<number>([items.length, items.reduce((sum, item) => sum + item.quantity, 0)]);
  items.forEach((item, index) => {
    allowed.add(item.quantity);
    allowed.add(index + 1);
  });
  const known = JSON.stringify(items);
  const small = memo.replace(/\d[\d  ]{2,}\d|\d{3,}/gu, " ").match(/\d{1,2}/gu) ?? [];
  return small.every((value) => allowed.has(Number(value)) || known.includes(value));
}

// ---------------------------------------------------------------- bulk request split

const tokens = (value: string) => value.toLocaleLowerCase("ru").match(/[\p{L}\p{N}]+/gu) ?? [];

/** A position is grounded when most of its words come from the pasted text. */
export function positionIsGrounded(position: RequestPosition, source: string): boolean {
  const words = tokens(position.query);
  if (words.length === 0) return false;
  const known = new Set(tokens(source));
  const hits = words.filter((word) => known.has(word)).length;
  return hits / words.length >= 0.6 && Number.isInteger(position.quantity) && position.quantity >= 1 && position.quantity <= MAX_QUANTITY;
}

const QUANTITY_RE = /(?:^|[\s,;:(—–-])(?:кол-?во|количество)?\s*[:=]?\s*(\d{1,5})\s*(?:шт\.?|штук[иа]?|ед\.?|pcs)(?=$|[\s,;.)])/iu;
const LEADING_QTY_RE = /^(\d{1,5})\s*(?:шт\.?|штук[иа]?|x|х|×)\s+/iu;

/** Pure fallback: one position per line, «;» or numbered item; «N шт» becomes the quantity. */
export function splitRequestFallback(source: string): RequestPosition[] {
  const parts = source
    .replace(/\r/g, "")
    .split(/\n|;|(?:^|\s)(?=\d{1,3}[.)]\s+\S)/u)
    .map((part) => part.trim())
    .filter(Boolean);
  const result: RequestPosition[] = [];
  for (const part of parts) {
    let line = part.replace(/^(?:\d{1,3}[.)]|[-–—•*])\s+/u, "");
    let quantity = 1;
    const tail = QUANTITY_RE.exec(line);
    const head = LEADING_QTY_RE.exec(line);
    if (tail) {
      quantity = Number(tail[1]);
      line = (line.slice(0, tail.index) + line.slice(tail.index + tail[0].length)).trim();
    } else if (head) {
      quantity = Number(head[1]);
      line = line.slice(head[0].length);
    }
    const query = line.replace(/[\s,.:–—-]+$/u, "").replace(/\s+/g, " ").trim().slice(0, MAX_QUERY);
    // Greetings and signatures have no model-like token; still keep anything with at least two letters.
    if (tokens(query).join("").length < 2) continue;
    result.push({ query, quantity: Math.min(Math.max(quantity, 1), MAX_QUANTITY) });
    if (result.length >= MAX_POSITIONS) break;
  }
  return result;
}

const SPLIT_SYSTEM =
  "Ты разбираешь текст заявки или письма закупщику на отдельные позиции товаров. Для каждой позиции дай короткий поисковый запрос " +
  "(тип товара, бренд, модель, артикул — словами из текста, ничего не добавляй) и количество штук (1, если не указано). " +
  "Пропускай приветствия, подписи и всё, что не является товаром.";

export async function splitRequest(source: string, narrator: AnalysisNarrator | undefined): Promise<SplitRequestResponse> {
  const fallback = (): SplitRequestResponse => ({ items: splitRequestFallback(source), ai: false });
  if (!narrator?.askJson) return fallback();
  try {
    const raw = await narrator.askJson(SPLIT_SYSTEM, { text: source }, {
      type: "object",
      additionalProperties: false,
      properties: {
        items: {
          type: "array",
          maxItems: MAX_POSITIONS,
          items: {
            type: "object",
            additionalProperties: false,
            properties: {
              query: { type: "string", maxLength: MAX_QUERY },
              quantity: { type: "integer", minimum: 1, maximum: MAX_QUANTITY },
            },
            required: ["query", "quantity"],
          },
        },
      },
      required: ["items"],
    });
    const items = (isObject(raw) && Array.isArray(raw.items) ? raw.items : []).flatMap((item): RequestPosition[] => {
      if (!isObject(item) || typeof item.query !== "string" || typeof item.quantity !== "number") return [];
      const position = { query: item.query.replace(/\s+/g, " ").trim().slice(0, MAX_QUERY), quantity: item.quantity };
      return positionIsGrounded(position, source) ? [position] : [];
    });
    return items.length > 0 ? { items: items.slice(0, MAX_POSITIONS), ai: true } : fallback();
  } catch {
    return fallback();
  }
}

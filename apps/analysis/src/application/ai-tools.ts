import {
  offerChannel,
  type JustificationResponse,
  type Offer,
  type OfferReviewItem,
  type OfferReviewResponse,
  type QueryUnderstanding,
  type SearchSnapshot,
} from "@peremena/contracts";

import type { AnalysisNarrator } from "../domain/analysis-narrator.js";

/**
 * AI helpers on top of the deterministic search. Each one is optional advice:
 * the model only reads facts the server hands it, its output is checked here,
 * and every function has a plain fallback when the model is off or wrong.
 */

const CONDITIONS = ["new", "refurbished", "used", "display", "unknown"] as const;
const MAX_REVIEW_ROWS = 24;
/** Rows per model call: a whole list overflows the answer budget (live 2026-10-12). */
const REVIEW_CHUNK = 8;
const MAX_REASON = 140;
const MAX_MEMO = 1_800;

const clip = (value: string, max: number) => (value.length > max ? `${value.slice(0, max - 1)}…` : value);
const money = (value: number) => `${Math.round(value).toLocaleString("ru-RU")} ₽`;
const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);
const text = (value: unknown, max: number): string | undefined =>
  typeof value === "string" && value.trim() ? clip(value.trim(), max) : undefined;

// ---------------------------------------------------------------- understanding

const UNDERSTAND_SYSTEM =
  "Ты разбираешь запрос закупщика IT-оборудования. Выдели тип товара (существительное по-русски, например «SSD-накопитель», «мышь», «ИБП»), " +
  "бренд, модель, артикул производителя, количество штук, требуемое состояние и оригинальность. " +
  "Пиши модель и артикул ровно так, как они написаны в запросе, ничего не добавляй и не угадывай. Если чего-то нет в запросе — оставь пустую строку или 0.";

const UNDERSTAND_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    productType: { type: "string", maxLength: 60 },
    brand: { type: "string", maxLength: 40 },
    model: { type: "string", maxLength: 60 },
    mpn: { type: "string", maxLength: 40 },
    quantity: { type: "integer", minimum: 0, maximum: 10_000 },
    condition: { type: "string", enum: ["", ...CONDITIONS] },
    origin: { type: "string", enum: ["", "original", "compatible"] },
  },
  required: ["productType", "brand", "model", "mpn", "quantity", "condition", "origin"],
};

/** Free text → structured request. Undefined when AI is off or answered nonsense. */
export async function understandQuery(query: string, narrator: AnalysisNarrator | undefined): Promise<QueryUnderstanding | undefined> {
  if (!narrator?.askJson) return undefined;
  const raw = await narrator.askJson(UNDERSTAND_SYSTEM, { query: clip(query, 300) }, UNDERSTAND_SCHEMA);
  if (!isObject(raw)) return undefined;
  const condition = CONDITIONS.find((value) => value === raw.condition);
  const origin = raw.origin === "original" || raw.origin === "compatible" ? raw.origin : undefined;
  const quantity = typeof raw.quantity === "number" && Number.isInteger(raw.quantity) && raw.quantity > 0 ? raw.quantity : undefined;
  const result: QueryUnderstanding = {
    ...(text(raw.productType, 60) ? { productType: text(raw.productType, 60)! } : {}),
    ...(text(raw.brand, 40) ? { brand: text(raw.brand, 40)! } : {}),
    ...(text(raw.model, 60) ? { model: text(raw.model, 60)! } : {}),
    ...(text(raw.mpn, 40) ? { mpn: text(raw.mpn, 40)! } : {}),
    ...(quantity ? { quantity } : {}),
    ...(condition ? { condition } : {}),
    ...(origin ? { origin } : {}),
  };
  return Object.keys(result).length > 0 ? result : undefined;
}

// ---------------------------------------------------------------- review

const REVIEW_SYSTEM =
  "Ты помогаешь закупщику разобрать строки, которые автоматическая проверка пометила «требует уточнения». " +
  "Для каждой строки сравни название с запросом и карточкой товара и выбери: fits — это нужный товар; " +
  "not_fit — другой товар, деталь, аксессуар, другая модель или объём; unclear — по названию нельзя понять. " +
  "Причина — одно короткое предложение по-русски, только по тексту строки. Не придумывай характеристики.";

/** Pure fallback: what the deterministic checks already said. */
function reviewFallback(rows: Offer[]): OfferReviewItem[] {
  return rows.map((row) => ({
    offerId: row.id,
    verdict: "unclear",
    reason: clip(row.assessment?.reasons.filter((reason) => !/совпадает/u.test(reason)).join("; ") || "Нужна ручная проверка карточки", MAX_REASON),
  }));
}

export async function reviewOffers(snapshot: SearchSnapshot, narrator: AnalysisNarrator | undefined): Promise<OfferReviewResponse> {
  const rows = snapshot.offers.filter((offer) => !offer.demo && offer.assessment?.group === "needs_review").slice(0, MAX_REVIEW_ROWS);
  if (rows.length === 0) return { items: [], provider: narrator?.name ?? "без AI" };
  if (!narrator?.askJson) return { items: reviewFallback(rows), provider: "AI недоступен — показаны причины автоматической проверки" };
  const ai = narrator as AnalysisNarrator & { askJson: NonNullable<AnalysisNarrator["askJson"]> };
  const chunks: Offer[][] = [];
  for (let index = 0; index < rows.length; index += REVIEW_CHUNK) chunks.push(rows.slice(index, index + REVIEW_CHUNK));
  const answers = await Promise.allSettled(chunks.map((chunk) => reviewChunk(snapshot, chunk, ai)));
  const items = answers.flatMap((answer) => (answer.status === "fulfilled" ? answer.value : []));
  const seen = new Set(items.map((item) => item.offerId));
  // Rows the model skipped or failed on keep the deterministic reasons.
  const missing = reviewFallback(rows.filter((row) => !seen.has(row.id)));
  return {
    items: [...items, ...missing],
    provider: items.length > 0 ? ai.name : "AI не ответил — показаны причины автоматической проверки",
  };
}

async function reviewChunk(snapshot: SearchSnapshot, rows: Offer[], narrator: AnalysisNarrator & { askJson: NonNullable<AnalysisNarrator["askJson"]> }): Promise<OfferReviewItem[]> {
  const ids = rows.map((row) => row.id);
  const raw = await narrator.askJson(
    REVIEW_SYSTEM,
    {
      query: snapshot.query,
      product: { name: snapshot.product.name, brand: snapshot.product.brand, model: snapshot.product.model, mpn: snapshot.product.mpn },
      rows: rows.map((row) => ({
        id: row.id,
        title: clip(row.title, 200),
        mpn: row.mpn ?? null,
        price: row.price,
        checks: row.assessment?.reasons ?? [],
      })),
    },
    {
      type: "object",
      additionalProperties: false,
      properties: {
        items: {
          type: "array",
          maxItems: rows.length,
          items: {
            type: "object",
            additionalProperties: false,
            properties: {
              offerId: { type: "string", enum: ids },
              verdict: { type: "string", enum: ["fits", "not_fit", "unclear"] },
              reason: { type: "string", maxLength: MAX_REASON },
            },
            required: ["offerId", "verdict", "reason"],
          },
        },
      },
      required: ["items"],
    },
  );
  const seen = new Set<string>();
  return (isObject(raw) && Array.isArray(raw.items) ? raw.items : []).flatMap((item): OfferReviewItem[] => {
    if (!isObject(item) || typeof item.offerId !== "string" || !ids.includes(item.offerId) || seen.has(item.offerId)) return [];
    if (item.verdict !== "fits" && item.verdict !== "not_fit" && item.verdict !== "unclear") return [];
    const reason = text(item.reason, MAX_REASON);
    if (!reason || !/[а-яё]/iu.test(reason)) return [];
    seen.add(item.offerId);
    return [{ offerId: item.offerId, verdict: item.verdict, reason }];
  });
}

// ---------------------------------------------------------------- justification

interface MemoFacts {
  query: string;
  chosen: Record<string, unknown>;
  alternatives: Array<Record<string, unknown>>;
}

function rowFacts(offer: Offer) {
  return {
    source: offer.source,
    seller: offer.seller,
    channel: offerChannel(offer) === "distributor" ? "дистрибутор" : "маркетплейс",
    title: clip(offer.title, 200),
    price: money(offer.price),
    priceCondition: offer.priceCondition,
    availability: offer.availability,
    condition: offer.condition,
    ...(offer.verification ? { cardCheck: offer.verification.note } : {}),
    url: offer.url,
  };
}

/** Comparable rows: same assessment group, best rank first, other suppliers. */
function alternativesFor(snapshot: SearchSnapshot, chosen: Offer): Offer[] {
  return snapshot.offers
    .filter((offer) => offer.id !== chosen.id && !offer.demo && offer.priceAnomaly !== "too_low" && offer.assessment?.group !== "needs_review")
    .sort((a, b) => (a.procurementRank ?? Infinity) - (b.procurementRank ?? Infinity))
    .slice(0, 3);
}

/** Deterministic memo: always correct, used when AI is off or its text fails the checks. */
export function justificationTemplate(snapshot: SearchSnapshot, chosen: Offer): string {
  const alternatives = alternativesFor(snapshot, chosen);
  const cheapest = [chosen, ...alternatives].reduce((best, offer) => (offer.price < best.price ? offer : best), chosen);
  const lines = [
    `Обоснование закупки: ${snapshot.product.name || snapshot.query}`,
    "",
    `Предлагаемый поставщик: ${chosen.source}${chosen.seller && chosen.seller !== chosen.source ? ` (продавец ${chosen.seller})` : ""}, ${offerChannel(chosen) === "distributor" ? "дистрибутор" : "маркетплейс"}.`,
    `Товар: ${chosen.title}.`,
    `Цена: ${money(chosen.price)} (${chosen.priceCondition}). Наличие: ${chosen.availability}.`,
    ...(chosen.verification ? [`Проверка карточки: ${chosen.verification.note}.`] : []),
    "",
    alternatives.length ? "Рассмотренные альтернативы:" : "Других подходящих предложений в выдаче нет.",
    ...alternatives.map((offer) => `— ${offer.source}: ${money(offer.price)}, ${offer.availability}.`),
    "",
    cheapest.id === chosen.id
      ? "Выбранное предложение — самое дешёвое среди сопоставимых."
      : `Самое дешёвое сопоставимое предложение — ${cheapest.source} за ${money(cheapest.price)}; выбор другого поставщика нужно обосновать (документы, наличие, сроки).`,
    `Источник: ${chosen.url}`,
  ];
  return lines.join("\n");
}

const MEMO_SYSTEM =
  "Ты пишешь короткую служебную записку для руководителя закупок: почему выбран этот поставщик. " +
  "Используй только факты из данных: поставщик, цена, наличие, условия цены, проверка карточки, альтернативы. " +
  "Все суммы пиши ровно так, как они даны. Не придумывай сроки, скидки, гарантии и характеристики. " +
  "Структура: что закупаем; предлагаемый поставщик и цена; сравнение с альтернативами; вывод. До 1200 символов, по-русски.";

/** Every number in the memo must come from the facts; otherwise the text is not trusted. */
export function memoIsGrounded(memo: string, facts: MemoFacts): boolean {
  const known = JSON.stringify(facts).replace(/[\s  ]/gu, "");
  const numbers = memo.replace(/[  ]/gu, " ").match(/\d[\d ]{2,}\d|\d{3,}/gu) ?? [];
  return numbers.every((number) => known.includes(number.replace(/ /g, "")));
}

export async function justifyPurchase(
  snapshot: SearchSnapshot,
  offerId: string,
  narrator: AnalysisNarrator | undefined,
): Promise<JustificationResponse | undefined> {
  const chosen = snapshot.offers.find((offer) => offer.id === offerId);
  if (!chosen) return undefined;
  const template = justificationTemplate(snapshot, chosen);
  if (!narrator?.askJson) return { text: template, ai: false, provider: "шаблон без AI" };
  const facts: MemoFacts = {
    query: snapshot.query,
    chosen: rowFacts(chosen),
    alternatives: alternativesFor(snapshot, chosen).map(rowFacts),
  };
  try {
    const raw = await narrator.askJson(MEMO_SYSTEM, facts, {
      type: "object",
      additionalProperties: false,
      properties: { memo: { type: "string", maxLength: MAX_MEMO } },
      required: ["memo"],
    });
    const memo = isObject(raw) ? text(raw.memo, MAX_MEMO) : undefined;
    if (!memo || !/[а-яё]{20,}/iu.test(memo.replace(/\s/g, "")) || !memoIsGrounded(memo, facts)) {
      return { text: template, ai: false, provider: "AI-текст не прошёл проверку фактов — показан шаблон" };
    }
    return { text: `${memo}\n\nИсточник: ${chosen.url}`, ai: true, provider: narrator.name };
  } catch {
    return { text: template, ai: false, provider: "AI не ответил — показан шаблон" };
  }
}


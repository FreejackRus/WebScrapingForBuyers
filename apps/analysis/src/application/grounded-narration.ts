import type { Offer } from "@peremena/contracts";

const NEUTRAL_SENTENCES = [
  "Сравните предложения в таблице.",
  "Откройте карточку товара для уточнения условий.",
  "Уточните условия у продавца перед покупкой.",
  "Цена и наличие приведены по данным поставщика.",
  "Это заявленные сведения поставщика, а не проверка фактического остатка.",
];
const normalize = (text: string) => text.normalize("NFKC").replace(/\s+/gu, " ").trim();

/** Extractive, source-attributed statements; no inference about BOX, warranty or physical stock. */
export function groundedOfferFacts(offers: Offer[]): string[] {
  return offers.flatMap((offer) => [
    `${offer.source}: ${offer.title} — ${offer.price.toLocaleString("ru-RU")} ₽.`,
    `${offer.title}: заявленное наличие — ${offer.availability || "не указано"}.`,
    `${offer.title}: гарантия по карточке — ${offer.warranty || "не указана"}.`,
  ]);
}

/**
 * Fail closed: this is an extractive whitelist, NOT semantic verification of arbitrary prose.
 * Accept only exact card statements and neutral prompts. URLs are rendered by server citations.
 * Facts require explicit cited rows, preventing a true value being attached to a different item.
 */
export function validateGroundedNarration(summary: string, offerIds: string[] | undefined, allowed: Offer[]): boolean {
  if (!summary.trim() || summary.length > 1800 || /(?:https?:|www\.|javascript:|\]\(|<|>)/iu.test(summary)) return false;
  const ids = offerIds ?? [];
  if (ids.length > 20 || new Set(ids).size !== ids.length || ids.some((id) => !allowed.some((offer) => offer.id === id))) return false;
  const sentences = [...NEUTRAL_SENTENCES, ...groundedOfferFacts(allowed.filter((offer) => ids.includes(offer.id)))].map(normalize).sort((a, b) => b.length - a.length);
  let remaining = normalize(summary);
  while (remaining) {
    const sentence = sentences.find((candidate) => remaining === candidate || remaining.startsWith(`${candidate} `));
    if (!sentence) return false;
    remaining = remaining.slice(sentence.length).trim();
  }
  return true;
}

import type { Offer, Product } from "@peremena/contracts";

import { hasKnownBrand, inferCategory } from "./product-from-query.js";

const NON_IT_MARKERS = [
  "пылесос", "холодильник", "стиральн", "посудомоечн", "кофемашин", "кофевар",
  "аэрогрил", "микроволнов", "телевизор", "утюг", "фен для волос",
  "косметик", "одежд", "обувь", "кроссовк", "джемпер", "футболк",
  "подгузник", "корм для", "лакомство для", "игрушка для", "удобрен",
  "автозапчаст", "шина автомобиль", "рыбалк", "матрас", "постельн",
];

const IT_CATEGORIES = new Set([
  "Смартфоны", "Планшеты", "Графические планшеты", "Серверы", "Ноутбуки", "Компьютеры", "Мониторы", "Проекторы", "Клавиатуры", "Мыши",
  "SSD", "Видеокарты", "Процессоры", "Материнские платы", "Жёсткие диски",
  "Блоки питания", "Корпуса ПК", "Охлаждение ПК", "Гарнитуры", "Веб-камеры", "Сеть", "ИБП", "Печать", "Док-станции",
  "ОЗУ", "Кабели и адаптеры", "Аксессуары IT",
]);

export function isExplicitlyNonIt(text: string): boolean {
  const normalized = text.toLocaleLowerCase("ru");
  return NON_IT_MARKERS.some((marker) => normalized.includes(marker));
}

export function isItProduct(product: Product): boolean {
  if (isExplicitlyNonIt(product.name)) return false;
  return IT_CATEGORIES.has(inferCategory(product.name)) || IT_CATEGORIES.has(product.category);
}

/** Unknown identifiers are allowed only when the resulting card proves it is IT. */
export function isItIdentifier(text: string): boolean {
  // A model code mixes letters and digits (G102, RTX4060, SNV3S); a bare number ("1000 деталей") is not one.
  return text
    .toLocaleLowerCase("ru")
    .split(/[^a-zа-яё0-9-]+/u)
    .some((token) => token.length >= 3 && /\d/.test(token) && /[a-zа-яё]/u.test(token));
}

function identifierTokens(text: string): string[] {
  return text
    .toLocaleLowerCase("ru")
    .split(/[^a-zа-яё0-9-]+/u)
    .filter((token) => token.length >= 3 && /\d/.test(token) && /[a-zа-яё]/u.test(token));
}

function hasProductIdentity(product: Product, offer: Offer): boolean {
  const text = `${offer.title} ${offer.mpn ?? ""}`.toLocaleLowerCase("ru");
  const mpn = product.mpn.trim().toLocaleLowerCase("ru");
  const model = product.model.trim().toLocaleLowerCase("ru");
  return (
    (mpn.length >= 4 && text.includes(mpn)) ||
    (model.length >= 4 && text.includes(model)) ||
    identifierTokens(product.name).some((token) => text.includes(token))
  );
}

export function isItOfferForProduct(product: Product, offer: Offer): boolean {
  if (isExplicitlyNonIt(offer.title)) return false;
  const expected = inferCategory(product.name);
  const actual = inferCategory(offer.title);
  if (IT_CATEGORIES.has(expected) && IT_CATEGORIES.has(actual) && expected !== actual) return false;
  if (IT_CATEGORIES.has(actual)) return true;
  return hasProductIdentity(product, offer) && (IT_CATEGORIES.has(expected) || isItIdentifier(product.name));
}

/**
 * Scope is an allowlist: IT equipment is a closed domain, "everything else" is not.
 * Anything that is not recognised as an IT category or a model identifier is out, so
 * toys, food or clothes need no entry anywhere. NON_IT_MARKERS only catches the one
 * case an allowlist cannot: a household product from a brand that also makes IT
 * ("Пылесос Samsung").
 */
export type QueryVerdict = "ok" | "non_it" | "unclear";

function looksLikeEquipment(text: string): boolean {
  if (IT_CATEGORIES.has(inferCategory(text)) || isItIdentifier(text)) return true;
  // An IT brand followed only by Latin words/numbers is a product line ("logitech mx keys", "lenovo").
  // A Russian noun after the brand ("samsung пылесос", "logitech игрушка") is not covered.
  return hasKnownBrand(text) && !/[а-яё]/iu.test(text.replace(/логитек/giu, ""));
}

/** Gate for a typed query / chosen suggestion before any source is called. */
export function classifyQuery(product: Product): QueryVerdict {
  if (isExplicitlyNonIt(product.name)) return "non_it";
  if (isItProduct(product) || looksLikeEquipment(product.name) || isItIdentifier(product.mpn)) return "ok";
  return "unclear";
}

/** Keeps only autocomplete phrases that look like equipment. */
export function filterItSuggestions(phrases: string[]): string[] {
  return phrases.filter((phrase) => !isExplicitlyNonIt(phrase) && looksLikeEquipment(phrase));
}

/** Offers must positively look like equipment; marketplace relevance already checks identity. */
export function isOfferInItScope(product: Product, offer: Offer): boolean {
  return isItOfferForProduct(product, offer);
}

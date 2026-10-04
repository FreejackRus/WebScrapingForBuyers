import type { Offer, Product } from "@peremena/contracts";

import { hasKnownBrand, inferCategory, withoutKnownBrands } from "./product-from-query.js";

/**
 * The only blocklist: household goods sold under brands that also make IT equipment
 * ("Пылесос Samsung", "Xiaomi robot vacuum"). Everything else is decided by the allowlist below.
 */
const NON_IT_MARKERS = [
  "пылесос", "холодильник", "стиральн", "посудомоечн", "кофемашин", "кофевар",
  "аэрогрил", "микроволнов", "телевизор", "утюг", "фен для волос",
  "косметик", "одежд", "обувь", "кроссовк", "джемпер", "футболк",
  "подгузник", "корм для", "лакомство для", "игрушка для", "удобрен",
  "автозапчаст", "шина автомобиль", "рыбалк", "матрас", "постельн",
  "vacuum", "refrigerator", "fridge", "washing machine", "dishwasher", "coffee machine",
  "hair dryer", "toothbrush", "air fryer", "juice",
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


function isItCategoryText(text: string): boolean {
  return IT_CATEGORIES.has(inferCategory(text));
}

export function isItProduct(product: Product): boolean {
  if (isExplicitlyNonIt(product.name)) return false;
  return isItCategoryText(product.name) || IT_CATEGORIES.has(product.category);
}

/**
 * A model code mixes a Latin letter and a digit (G102, RTX4060, SNV3S). Quantities are not codes:
 * "500г", "5кг", "2XL", "500gb" are a number followed by a short unit.
 */
function isIdentifierToken(token: string): boolean {
  if (token.length < 3 || !/\d/.test(token) || !/[a-z]/.test(token)) return false;
  return !/^\d+[a-zа-яё]{1,3}$/u.test(token);
}

function identifierTokens(text: string): string[] {
  return text.toLocaleLowerCase("ru").split(/[^a-zа-яё0-9-]+/u).filter(isIdentifierToken);
}

export function isItIdentifier(text: string): boolean {
  return identifierTokens(text).length > 0;
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
  // A bare code ("G102") names no category, so an IT-looking offer must still be this product.
  if (IT_CATEGORIES.has(actual)) return IT_CATEGORIES.has(expected) || hasProductIdentity(product, offer);
  return hasProductIdentity(product, offer) && (IT_CATEGORIES.has(expected) || isItIdentifier(product.name));
}

/**
 * Scope is an allowlist: IT equipment is a closed domain, "everything else" is not.
 * Anything that is not recognised as an IT category, a model code or an IT brand line is out,
 * so toys, food or clothes need no entry anywhere.
 */
export type QueryVerdict = "ok" | "non_it" | "unclear";

function looksLikeEquipment(text: string): boolean {
  if (isItCategoryText(text)) return true;
  const words = withoutKnownBrands(text);
  // A code rescues the query only when the head word is not an unknown Russian noun ("Крем SPF50").
  const headIsRussian = /^[а-яё]/u.test(words[0] ?? "");
  if (isItIdentifier(text) && !headIsRussian) return true;
  // An IT brand followed only by Latin words/numbers is a product line ("logitech mx keys", "леново").
  return hasKnownBrand(text) && words.every((word) => !/[а-яё]/u.test(word));
}

/** Gate for a typed query / chosen suggestion. Judges the text only, never a category sent by the client. */
export function classifyQuery(product: Product): QueryVerdict {
  if (isExplicitlyNonIt(product.name)) return "non_it";
  return looksLikeEquipment(product.name) ? "ok" : "unclear";
}

/** Keeps only autocomplete phrases that look like equipment. */
export function filterItSuggestions(phrases: string[]): string[] {
  return phrases.filter((phrase) => !isExplicitlyNonIt(phrase) && looksLikeEquipment(phrase));
}

/** Offers must positively look like equipment; marketplace relevance already checks identity. */
export function isOfferInItScope(product: Product, offer: Offer): boolean {
  return isItOfferForProduct(product, offer);
}

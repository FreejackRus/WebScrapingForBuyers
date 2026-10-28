import type { Product } from "@peremena/contracts";

import { productFromQuery } from "./product-from-query.js";

/**
 * Article patterns with a wildcard: «С13Т673*4А» asks for every Epson ink colour at once
 * (buyer's request 2026-10-28). `*` stands for 1–4 letters/digits, `?` for exactly one.
 *
 * Shops do not understand wildcards, so they get the fixed part before the first wildcard
 * («C13T673»); the full pattern then keeps only listings whose article matches it.
 */

/** Product characteristic that carries the pattern through the search pipeline. */
export const WILDCARD_CHARACTERISTIC = "шаблон артикула";

/** Buyers type articles in Cyrillic look-alikes as often as in Latin. */
const LOOKALIKES: Record<string, string> = {
  А: "A", В: "B", С: "C", Е: "E", Н: "H", К: "K", М: "M", О: "O", Р: "P", Т: "T", Х: "X", У: "Y",
};
const MIN_FIXED_CHARS = 4;
/** An article split by spaces in a listing («C13 T673 64A») is rejoined from up to this many words. */
const MAX_JOINED_WORDS = 3;

export interface WildcardArticle {
  /** Normalised pattern, e.g. «C13T673*4A». */
  pattern: string;
  /** Fixed part before the first wildcard — what the shops are searched for. */
  prefix: string;
  /** The buyer's query with the pattern replaced by the prefix. */
  sourceQuery: string;
  regex: RegExp;
}

/** Upper case with Cyrillic look-alikes turned into Latin («С13Т» → «C13T»). */
export function normaliseArticleText(text: string): string {
  return normalise(text);
}

function normalise(text: string): string {
  return [...text.toLocaleUpperCase("ru")].map((ch) => LOOKALIKES[ch] ?? ch).join("");
}

function compile(pattern: string): RegExp {
  const body = [...pattern]
    .map((ch) => (ch === "*" ? "[A-Z0-9]{1,4}" : ch === "?" ? "[A-Z0-9]" : ch.replace(/[.+^${}()|[\]\\]/g, "\\$&")))
    .join("");
  return new RegExp(`^${body}$`);
}

/** Parses the first wildcard article in a query, or undefined when there is none worth searching. */
export function parseWildcardArticle(query: string): WildcardArticle | undefined {
  const token = query.match(/[\p{L}\p{N}-]*[*?][\p{L}\p{N}*?-]*/u)?.[0];
  if (!token) return undefined;
  const pattern = normalise(token).replace(/-/g, "");
  const fixed = pattern.replace(/[*?]/g, "");
  const prefix = pattern.slice(0, pattern.search(/[*?]/));
  if (fixed.length < MIN_FIXED_CHARS || prefix.length < MIN_FIXED_CHARS) return undefined;
  if (!/^[A-Z0-9*?]+$/.test(pattern)) return undefined;
  const sourceQuery = query.replace(token, prefix).replace(/\s+/g, " ").trim();
  return { pattern, prefix, sourceQuery, regex: compile(pattern) };
}

/** True when a listing carries an article matching the pattern (separators and look-alikes ignored). */
export function matchesWildcardArticle(wildcard: WildcardArticle, text: string): boolean {
  return matchedWildcardArticle(wildcard, text) !== undefined;
}

/** The article in a listing that matches the pattern, e.g. «C13T67324A». */
export function matchedWildcardArticle(wildcard: WildcardArticle, text: string): string | undefined {
  const words = normalise(text).split(/[^A-Z0-9]+/).filter(Boolean);
  for (let start = 0; start < words.length; start += 1) {
    let joined = "";
    for (let size = 0; size < MAX_JOINED_WORDS && start + size < words.length; size += 1) {
      joined += words[start + size];
      if (wildcard.regex.test(joined)) return joined;
    }
  }
  return undefined;
}

/** The pattern a product was searched with, if any. */
export function wildcardArticleOf(product: { characteristics?: Record<string, unknown> }): WildcardArticle | undefined {
  const value = product.characteristics?.[WILDCARD_CHARACTERISTIC];
  return typeof value === "string" ? parseWildcardArticle(value) : undefined;
}

/** A product built from the fixed part, carrying the pattern for both relevance checks. */
export function productForWildcard<T extends { characteristics: Record<string, string> }>(product: T, wildcard: WildcardArticle): T {
  return { ...product, characteristics: { ...product.characteristics, [WILDCARD_CHARACTERISTIC]: wildcard.pattern } };
}

/** The product a typed query searches for: the fixed part plus the pattern, or the query as is. */
export function productForTypedQuery(query: string): Product {
  const wildcard = parseWildcardArticle(query);
  return wildcard ? productForWildcard(productFromQuery(wildcard.sourceQuery, "query"), wildcard) : productFromQuery(query, "query");
}

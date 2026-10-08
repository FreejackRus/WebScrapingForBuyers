import type { Offer, Product } from "@peremena/contracts";

import { isUnrequestedConsumablePart } from "./consumable-parts.js";

type Assessment = NonNullable<Offer["assessment"]>;

const ORIGINAL = /(?:^|[^\p{L}])(?:оригинал\p{L}*|original|genuine|oem)(?=$|[^\p{L}])/iu;
const COMPATIBLE = /(?:^|[^\p{L}])(?:не\s*оригинал\p{L}*|неоригинал\p{L}*|совместим\p{L}*|аналог\p{L}*|compatible|replacement)(?=$|[^\p{L}])/iu;
const DEVICE_PART = /(?:^|[^\p{L}])(?:плата|форматер|печатающ\p{L}*\s+головк\p{L}*|ролик|шлейф|узел|запчаст\p{L}*|spare\s+part)(?=$|[^\p{L}])/iu;
const THIRD_PARTY_BRANDS = /(?:^|[^\p{L}\p{N}])(?:nv[\s-]?print|hi[\s-]?black|cactus|sakura|easyprint|netproduct|colortek|katun|bion)(?=$|[^\p{L}\p{N}])/iu;

function compact(value: string): string {
  return value.toLocaleLowerCase("ru").replace(/[^a-zа-яё0-9]+/giu, "");
}

function articles(value: string): string[] {
  return value.match(/\b[A-ZА-ЯЁ]{1,8}-?\d{2,}[A-ZА-ЯЁ0-9-]*\b/giu)?.map(compact) ?? [];
}

function identityIn(haystack: string, expected: string): boolean {
  const parts = expected.toLocaleLowerCase("ru").match(/[a-zа-яё0-9]+/giu) ?? [];
  if (parts.length === 0) return false;
  const body = parts.map((part) => part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("[^a-zа-яё0-9]*");
  return new RegExp(`(?:^|[^a-zа-яё0-9])${body}(?=$|[^a-zа-яё0-9])`, "iu").test(haystack);
}

function matchedIdentity(product: Product, title: string): "article" | "model" | undefined {
  const mpn = compact(product.mpn);
  const model = compact(product.model);
  const expected = mpn && identityIn(title, product.mpn) ? mpn : model && identityIn(title, product.model) ? model : "";
  if (!expected) return undefined;
  const expectedDigits = expected.replace(/\D/g, "");
  const rivals = articles(title).filter((article) => article !== expected && !expected.includes(article));
  if (rivals.some((article) => expectedDigits && article.replace(/\D/g, "") === expectedDigits)) return undefined;
  return expected === mpn ? "article" : "model";
}

function originInTitle(title: string): "original" | "compatible" | "unknown" {
  if (COMPATIBLE.test(title)) return "compatible";
  if (THIRD_PARTY_BRANDS.test(title)) return "compatible";
  if (ORIGINAL.test(title)) return "original";
  return "unknown";
}

function requestedOrigin(query: string): "original" | "compatible" | undefined {
  if (COMPATIBLE.test(query)) return "compatible";
  if (ORIGINAL.test(query)) return "original";
  return undefined;
}

function capacities(value: string): number[] {
  const kits = [...value.matchAll(/(\d+)\s*[xх×]\s*(\d+(?:[.,]\d+)?)\s*(тб|tb|гб|gb)(?=$|[^\p{L}])/giu)];
  if (kits.length > 0) {
    return kits.map((match) => {
      const total = Number(match[1]) * Number(match[2]!.replace(",", "."));
      return /тб|tb/iu.test(match[3]!) ? total * 1024 : total;
    });
  }
  const result: number[] = [];
  for (const match of value.matchAll(/(\d+(?:[.,]\d+)?)\s*(тб|tb|гб|gb)(?=$|[^\p{L}])/giu)) {
    const amount = Number(match[1]!.replace(",", "."));
    result.push(/тб|tb/iu.test(match[2]!) ? amount * 1024 : amount);
  }
  return result;
}

function kitQuantity(value: string): number | undefined {
  const match = value.match(/(\d+)\s*[xх×]\s*\d+(?:[.,]\d+)?\s*(?:тб|tb|гб|gb)(?=$|[^\p{L}])/iu);
  return match ? Number(match[1]) : undefined;
}

function requestedPack(value: string): number | undefined {
  const match = value.match(/(?:упаковк\p{L}*|комплект\p{L}*)?\s*(\d+)\s*(?:шт\.?|штук)(?=$|[^\p{L}])/iu);
  return match ? Number(match[1]) : undefined;
}

function pageYield(value: string): number | undefined {
  const match = value.match(/(\d+(?:[\s\u00a0]\d{3})*)\s*(?:страниц\p{L}*|pages?)(?=$|[^\p{L}])/iu);
  return match ? Number(match[1]!.replace(/\s/g, "")) : undefined;
}

function assessConditions(query: string, fallback: string, title: string, reasons: string[]): "match" | "review" | "reject" {
  let state: "match" | "review" = "match";
  const wantedCapacity = capacities(query).length > 0 ? capacities(query) : capacities(fallback);
  if (wantedCapacity.length > 0) {
    const offeredCapacity = capacities(title);
    if (offeredCapacity.length === 0) {
      reasons.push("Объём не указан");
      state = "review";
    } else if (wantedCapacity.some((value) => !offeredCapacity.includes(value))) {
      return "reject";
    } else {
      reasons.push("Объём совпадает");
    }
  }
  const wantedPack = kitQuantity(query) ?? requestedPack(query) ?? kitQuantity(fallback) ?? requestedPack(fallback);
  if (wantedPack !== undefined) {
    const offeredPack = kitQuantity(title) ?? requestedPack(title);
    if (offeredPack === undefined) {
      reasons.push("Количество в комплекте не указано");
      state = "review";
    } else if (offeredPack !== wantedPack) {
      return "reject";
    } else {
      reasons.push("Количество в комплекте совпадает");
    }
  }
  const wantedYield = pageYield(query) ?? pageYield(fallback);
  if (wantedYield !== undefined) {
    const offeredYield = pageYield(title);
    if (offeredYield === undefined) {
      reasons.push("Ресурс не указан");
      state = "review";
    } else if (offeredYield !== wantedYield) {
      return "reject";
    } else {
      reasons.push("Ресурс совпадает");
    }
  }
  return state;
}

function selectedFacts(product: Product): string {
  const characteristics = Object.entries(product.characteristics ?? {})
    .map(([name, value]) => `${name} ${String(value)}`)
    .join(" ");
  return `${product.name} ${characteristics}`;
}

/** Conservatively classifies a row using product facts only; shop/seller names are never manufacturer evidence. */
export function assessOffer(product: Product, offer: Offer, query: string): Offer | null {
  const identity = matchedIdentity(product, `${offer.title} ${offer.mpn ?? ""}`);
  if (!identity) return null;
  if ((DEVICE_PART.test(offer.title) && !DEVICE_PART.test(query)) || isUnrequestedConsumablePart(offer, query)) return null;

  const reasons = [identity === "article" ? "Артикул совпадает" : "Модель совпадает"];
  let group: Assessment["group"] = "match";
  const wantedOrigin = requestedOrigin(query);
  const offeredOrigin = originInTitle(offer.title);
  if (wantedOrigin && offeredOrigin !== "unknown" && wantedOrigin !== offeredOrigin) return null;
  if (wantedOrigin === "original") {
    if (offeredOrigin === "original") {
      reasons.push("Продавец указывает оригинальность; подлинность не проверена");
    } else {
      reasons.push("Оригинальность не указана");
      group = "needs_review";
    }
  } else if (wantedOrigin === "compatible" && offeredOrigin === "compatible") {
    reasons.push("Совместимость указана продавцом");
  }

  const conditions = assessConditions(query, selectedFacts(product), offer.title, reasons);
  if (conditions === "reject") return null;
  if (conditions === "review") group = "needs_review";
  return { ...offer, assessment: { group, reasons } };
}

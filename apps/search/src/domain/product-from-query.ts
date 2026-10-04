import { createHash } from "node:crypto";

import type { Product } from "@peremena/contracts";

const KNOWN_BRANDS = [
  "logitech",
  "логитек",
  "dell",
  "hp",
  "lenovo",
  "asus",
  "acer",
  "apple",
  "samsung",
  "lg",
  "kingston",
  "cisco",
  "mikrotik",
  "apc",
  "brother",
  "canon",
  "epson",
  "jabra",
  "poly",
  "microsoft",
  "intel",
  "amd",
  "nvidia",
  "xiaomi",
  "huawei",
  "icl",
  "zte",
  "tp-link",
  "ubiquiti",
];

/**
 * Category rules. The rule whose keyword appears FIRST in the text wins, so
 * "SSD для ноутбука" is an SSD and "Ноутбук ... SSD" is a laptop. Keywords match
 * from a word start only ("ups" must not hit "groups"). On equal positions the
 * earlier rule wins.
 */
const CATEGORY_HINTS: Array<{ pattern: RegExp; category: string }> = [
  { pattern: /чех(?:ол|л)|коврик|защитн[а-яё]* (?:стекло|плёнк|пленк)|подставк[а-яё]* для (?:ноутбук|телефон|планшет)|сумк[а-яё]* для ноутбук|рюкзак для ноутбук/u, category: "Аксессуары IT" },
  { pattern: /кабел|displayport|hdmi|переходник|адаптер|type-c|usb-c|патч-корд|patch ?cord/u, category: "Кабели и адаптеры" },
  { pattern: /графическ[а-яё]* планшет|graphics tablet|wacom|xp-?pen/u, category: "Графические планшеты" },
  { pattern: /клавиатур|keyboard/u, category: "Клавиатуры" },
  { pattern: /мышь|мыши|мышк|mouse/u, category: "Мыши" },
  { pattern: /ssd|nvme|накопител/u, category: "SSD" },
  { pattern: /жестк[а-яё]* диск|жёстк[а-яё]* диск|hdd/u, category: "Жёсткие диски" },
  { pattern: /оперативн|ddr[2-5]|dimm|sodimm|модул[а-яё]* памяти|ram/u, category: "ОЗУ" },
  { pattern: /видеокарт|geforce|radeon|rtx ?\d|gpu/u, category: "Видеокарты" },
  { pattern: /процессор|cpu|ryzen|core i[3579]|xeon/u, category: "Процессоры" },
  { pattern: /материнск|motherboard/u, category: "Материнские платы" },
  { pattern: /блок[а-яё]* питания|psu/u, category: "Блоки питания" },
  { pattern: /корпус[а-яё]* (?:для )?(?:пк|компьютер)|pc case|midi tower/u, category: "Корпуса ПК" },
  { pattern: /кулер|охлажден|водян[а-яё]* охлажд|вентилятор для (?:пк|корпус)/u, category: "Охлаждение ПК" },
  { pattern: /сервер|poweredge|proliant|thinksystem|rack|стоечн/u, category: "Серверы" },
  { pattern: /ибп|ups|источник бесперебойн/u, category: "ИБП" },
  { pattern: /принтер|мфу|сканер|scanner|картридж|тонер/u, category: "Печать" },
  { pattern: /коммутатор|switch|маршрутиз|router|роутер|wi-?fi|точк[а-яё]* доступа|access point|nas|mikrotik|ubiquiti|tp-link/u, category: "Сеть" },
  { pattern: /док-станц|docking|dock/u, category: "Док-станции" },
  { pattern: /наушник|гарнитур|headset|headphone/u, category: "Гарнитуры" },
  { pattern: /веб-?камер|webcam|камер[а-яё]* для (?:пк|компьютер)/u, category: "Веб-камеры" },
  { pattern: /проектор|projector/u, category: "Проекторы" },
  { pattern: /монитор|monitor/u, category: "Мониторы" },
  { pattern: /ноутбук|laptop|notebook|macbook|legion|thinkpad|ideapad|latitude|inspiron|vivobook|zenbook|nitro|omen|predator/u, category: "Ноутбуки" },
  { pattern: /планшет|ipad|galaxy tab|matepad|mi pad|redmi pad|tablet/u, category: "Планшеты" },
  { pattern: /смартфон|телефон|iphone|galaxy [sazm]\d|pixel \d|redmi|poco|honor|realme/u, category: "Смартфоны" },
  { pattern: /системн[а-яё]* блок|десктоп|настольн[а-яё]* (?:пк|компьютер)|мини-?пк|моноблок|компьютер|mac mini|nuc/u, category: "Компьютеры" },
];

function collapseWs(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function titleCaseWords(value: string): string {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => {
      if (/^\d/.test(part) || part.includes("-")) return part;
      if (part.length <= 3 && part === part.toUpperCase()) return part;
      return part.charAt(0).toLocaleUpperCase("ru") + part.slice(1);
    })
    .join(" ");
}

export function inferCategory(text: string): string {
  const hay = text.toLocaleLowerCase("ru");
  let best: { index: number; category: string } | undefined;
  for (const hint of CATEGORY_HINTS) {
    const index = hay.search(new RegExp(`(?<![a-zа-яё0-9])(?:${hint.pattern.source})`, "u"));
    if (index >= 0 && (!best || index < best.index)) best = { index, category: hint.category };
  }
  return best?.category ?? "Каталог";
}

export function hasKnownBrand(text: string): boolean {
  const tokens = text.toLocaleLowerCase("ru").match(/[a-zа-яё0-9-]+/giu) ?? [];
  return tokens.some((token) => KNOWN_BRANDS.includes(token));
}

export function extractMpn(text: string): string {
  const match =
    text.match(/\b(\d{3}-\d{6,})\b/) ??
    text.match(/\b([A-Z]{0,3}\d{2,}[A-Z0-9-]{2,})\b/i) ??
    text.match(/\b(\d{8,14})\b/);
  return match?.[1]?.trim() ?? "";
}

export function splitBrandModel(text: string): { brand: string; model: string } {
  const tokens = collapseWs(text).split(" ").filter(Boolean);
  if (tokens.length === 0) return { brand: "", model: "" };
  const lower = tokens.map((token) => token.toLocaleLowerCase("ru"));
  const brandIndex = lower.findIndex((token) => KNOWN_BRANDS.includes(token));
  if (brandIndex >= 0) {
    const brand = titleCaseWords(tokens[brandIndex]!);
    const model = collapseWs([...tokens.slice(0, brandIndex), ...tokens.slice(brandIndex + 1)].join(" "));
    return { brand, model: model || brand };
  }
  if (tokens.length === 1) return { brand: titleCaseWords(tokens[0]!), model: titleCaseWords(tokens[0]!) };
  return {
    brand: titleCaseWords(tokens[0]!),
    model: titleCaseWords(tokens.slice(1).join(" ")),
  };
}

/** Build a Product from free-text suggestion or typed query (no static catalog). */
export function productFromQuery(text: string, source = "suggest"): Product {
  const name = collapseWs(text);
  if (!name) throw new Error("Пустой запрос");
  const { brand, model } = splitBrandModel(name);
  const mpn = extractMpn(name);
  const id = `${source}-${createHash("sha256").update(name.toLocaleLowerCase("ru")).digest("hex").slice(0, 12)}`;
  return {
    id,
    brand: brand || "—",
    model: model || name,
    name,
    mpn,
    category: inferCategory(name),
    characteristics: { источник: source },
  };
}

export function isProductPayload(value: unknown): value is Product {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const product = value as Record<string, unknown>;
  return (
    typeof product.id === "string" &&
    typeof product.brand === "string" &&
    typeof product.model === "string" &&
    typeof product.name === "string" &&
    typeof product.mpn === "string" &&
    typeof product.category === "string" &&
    !!product.characteristics &&
    typeof product.characteristics === "object"
  );
}

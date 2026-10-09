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
  "самсунг",
  "леново",
  "асус",
  "асер",
  "эйсер",
  "хуавей",
  "ксиаоми",
  "сяоми",
  "эппл",
  "делл",
  "кингстон",
  "интел",
  "логитеч",
  "pantum",
  "пантум",
];

const BRAND_ALIASES: ReadonlyArray<{ aliases: string[]; canonical: string }> = [
  { aliases: ["hewlett packard"], canonical: "Hewlett Packard" },
  { aliases: ["pantum", "пантум"], canonical: "Pantum" },
  { aliases: ["nv print", "nvprint", "nv-print"], canonical: "NV Print" },
  { aliases: ["hi-black", "hiblack", "хай-блэк"], canonical: "Hi-Black" },
  { aliases: ["kingston", "кингстон"], canonical: "Kingston" },
  { aliases: ["samsung", "самсунг"], canonical: "Samsung" },
  { aliases: ["logitech", "логитек", "логитеч"], canonical: "Logitech" },
  { aliases: ["dell", "делл"], canonical: "Dell" },
  { aliases: ["lenovo", "леново"], canonical: "Lenovo" },
];

const MODEL_NOISE = new Set([
  "картридж", "принтер", "мфу", "процессор", "ssd", "накопитель", "оригинальный", "оригинал",
  "совместимый", "совместимая", "совместимое", "упаковка", "комплект", "шт", "штук",
  "страниц", "страницы", "страницa", "ресурс", "original", "oem", "compatible",
]);
const COUNT_NOISE = new Set(["упаковка", "комплект", "ресурс", "страниц", "страницы", "страницa", "шт", "штук"]);

function cleanModelTokens(tokens: string[]): string[] {
  return tokens.filter((token, index) => {
    const value = token.toLocaleLowerCase("ru").replace(/[.,]/g, "");
    const next = (tokens[index + 1] ?? "").toLocaleLowerCase("ru").replace(/[.,]/g, "");
    const previous = (tokens[index - 1] ?? "").toLocaleLowerCase("ru").replace(/[.,]/g, "");
    if (MODEL_NOISE.has(value)) return false;
    if (/^оригинальн(?:ый|ая|ое|ые|ого|ой|ому|ым|ую|ых|ыми)$/iu.test(value)) return false;
    if (/^\d+[xх×]\d+(?:гб|gb|тб|tb)?$/iu.test(value)) return false;
    if (/^\d+(?:гб|gb|тб|tb)$/iu.test(value) || /^(?:гб|gb|тб|tb)$/iu.test(value)) return false;
    if (/^\d+$/.test(value) && (COUNT_NOISE.has(previous) || COUNT_NOISE.has(next) || /^(?:гб|gb|тб|tb)$/iu.test(next))) return false;
    return true;
  });
}

/**
 * Category rules. The product type is the head noun (text before the first preposition) and,
 * within it, the rule whose keyword appears FIRST wins: "SSD для ноутбука" is an SSD, "Ноутбук … SSD"
 * a laptop. Keywords match from a word start; short Latin tokens also need a word end ("ups" must not
 * hit "upstream"). Weak rules are modifiers or series names (Wi-Fi, Legion, "компьютер") and only
 * decide when no specific product type is present.
 */
interface CategoryHint {
  pattern: RegExp;
  category: string;
  weak?: true;
}

const CATEGORY_HINTS: CategoryHint[] = [
  { pattern: /(?:i[3579][- ](?:\d{4,5})(?:kf|ks|k|f|t)?|1\d{4}(?:kf|ks|k|f|t)?)(?![a-z0-9])/u, category: "Процессоры", weak: true },
  { pattern: /legion go(?:\s|$)|rog ally|steam deck|msi claw|портативн[а-яё]* (?:игров[а-яё]* )?(?:консол|приставк)|handheld gaming/u, category: "Игровые консоли" },
  { pattern: /чех(?:ол|л)|коврик|защитн[а-яё]* (?:стекло|плёнк|пленк)|подставк[а-яё]* для (?:ноутбук|телефон|планшет)|сумк[а-яё]* для ноутбук|рюкзак для ноутбук/u, category: "Аксессуары IT" },
  { pattern: /кабел|displayport|hdmi(?![a-z])|переходник|адаптер|type-c|usb-c|патч-корд|patch ?cord/u, category: "Кабели и адаптеры" },
  { pattern: /графическ[а-яё]* планшет|graphics tablet|wacom|xp-?pen/u, category: "Графические планшеты" },
  { pattern: /клавиатур|keyboard/u, category: "Клавиатуры" },
  { pattern: /мышь|мыши|мышк|mouse/u, category: "Мыши" },
  { pattern: /ssd(?![a-z])|nvme|накопител/u, category: "SSD" },
  { pattern: /жестк[а-яё]* диск|жёстк[а-яё]* диск|hdd(?![a-z0-9])/u, category: "Жёсткие диски" },
  { pattern: /оперативн|ddr[2-5]|s?o?dimm(?![a-z])|модул[а-яё]* памяти|ram(?![a-z0-9])/u, category: "ОЗУ" },
  { pattern: /видеокарт|geforce|radeon|rtx ?\d|gpu(?![a-z0-9])/u, category: "Видеокарты" },
  { pattern: /процессор|cpu(?![a-z0-9])|ryzen|core i[3579]|xeon/u, category: "Процессоры" },
  { pattern: /материнск|motherboard/u, category: "Материнские платы" },
  { pattern: /блок[а-яё]* питания|psu(?![a-z0-9])/u, category: "Блоки питания" },
  { pattern: /корпус[а-яё]* (?:для )?(?:пк|компьютер)|pc case|midi tower/u, category: "Корпуса ПК" },
  { pattern: /кулер|охлажден|вентилятор[а-яё]* для (?:пк|корпус)/u, category: "Охлаждение ПК" },
  { pattern: /сервер|poweredge|proliant|thinksystem|rack(?![a-z])|стоечн/u, category: "Серверы" },
  { pattern: /ибп(?![а-яё])|ups(?![a-z0-9])|источник[а-яё]* бесперебойн/u, category: "ИБП" },
  { pattern: /принтер|мфу(?![а-яё])|сканер|scanner|картридж|тонер/u, category: "Печать" },
  { pattern: /коммутатор|switch(?![a-z])|маршрутиз|router|роутер|точк[а-яё]* доступа|access point|nas(?![a-z0-9])|mikrotik|ubiquiti|tp-link/u, category: "Сеть" },
  { pattern: /wi-?fi(?![a-z])/u, category: "Сеть", weak: true },
  { pattern: /док-станц|docking|dock(?![a-z])/u, category: "Док-станции" },
  { pattern: /наушник|гарнитур|headset|headphone/u, category: "Гарнитуры" },
  { pattern: /веб-?камер|webcam|камер[а-яё]* для (?:пк|компьютер)/u, category: "Веб-камеры" },
  { pattern: /проектор|projector/u, category: "Проекторы" },
  { pattern: /монитор|monitor/u, category: "Мониторы" },
  { pattern: /ноутбук|laptop|notebook|macbook|thinkpad|ideapad|latitude|inspiron|vivobook|zenbook/u, category: "Ноутбуки" },
  { pattern: /legion|nitro|omen(?![a-z])|predator/u, category: "Ноутбуки", weak: true },
  { pattern: /планшет|ipad(?![a-z])|galaxy tab|matepad|mi pad|redmi pad|tablet/u, category: "Планшеты" },
  { pattern: /смартфон|телефон|iphone|galaxy [sazm]\d|галакси|pixel \d|redmi|poco(?![a-z])|honor(?![a-z])|realme/u, category: "Смартфоны" },
  { pattern: /системн[а-яё]* блок|десктоп|настольн[а-яё]* (?:пк|компьютер)|мини-?пк|моноблок|mac mini|nuc(?![a-z0-9])/u, category: "Компьютеры" },
  { pattern: /компьютер(?!н)/u, category: "Компьютеры" },
];

interface CompiledHint {
  re: RegExp;
  category: string;
  weak: boolean;
  /** Rules that spell out a preposition ("корпус для ПК") can only match the full text. */
  fullText: boolean;
}

const COMPILED_HINTS: CompiledHint[] = CATEGORY_HINTS.map((hint) => ({
  re: new RegExp(`(?<![a-zа-яё0-9])(?:${hint.pattern.source})`, "u"),
  category: hint.category,
  weak: hint.weak === true,
  fullText: /\bдля\b|для /u.test(hint.pattern.source) || hint.category === "Аксессуары IT",
}));

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

function matchCategory(hay: string, hints: CompiledHint[]): string | undefined {
  let best: { index: number; category: string } | undefined;
  for (const hint of hints) {
    const index = hay.search(hint.re);
    if (index >= 0 && (!best || index < best.index)) best = { index, category: hint.category };
  }
  return best?.category;
}

const STRONG_HINTS = COMPILED_HINTS.filter((hint) => !hint.weak);
const WEAK_HINTS = COMPILED_HINTS.filter((hint) => hint.weak);
const FULL_TEXT_HINTS = STRONG_HINTS.filter((hint) => hint.fullText);
const PREPOSITION_SPLIT = /\s+(?:для|на|под|от|к|с|со|из|без|по|при)\s+/u;

/** Search classifies the same product name for every offer, so results are remembered. */
const categoryCache = new Map<string, string>();
const CATEGORY_CACHE_LIMIT = 2000;

/**
 * The product type is the head noun: the text before the first preposition. "Игрушки для
 * детей на 3д принтере" is a toy even though "принтер" appears later, while "SSD для
 * ноутбука" is an SSD. Rules that contain a preposition are matched on the full text.
 */
function categorize(hay: string): string {
  const head = hay.split(PREPOSITION_SPLIT)[0] ?? hay;
  return (
    matchCategory(head, STRONG_HINTS) ??
    matchCategory(hay, FULL_TEXT_HINTS) ??
    matchCategory(head, WEAK_HINTS) ??
    "Каталог"
  );
}

/**
 * "Switch" is ambiguous (game consoles, light switches, KVM). Instead of listing what else it can
 * be, it counts as network gear only when the rest of the text still points to networking.
 */
const AMBIGUOUS_SWITCH = /switch(?![a-z])/gu;
const NETWORK_SIGNALS = /(?<![a-z])(?:ports?|lan|poe\+?|sfp\+?|rj-?45|ethernet|gigabit|managed|unmanaged|l2|l3)(?![a-z])|порт|гигабит|управляем|сетев|\d+\s*(?:x\s*)?(?:gbe|gbps|mbps)(?![a-z])/u;

export function inferCategory(text: string): string {
  const hay = text.toLocaleLowerCase("ru");
  const cached = categoryCache.get(hay);
  if (cached) return cached;
  let category = categorize(hay);
  if (category === "Сеть" && hay.search(AMBIGUOUS_SWITCH) >= 0) {
    const rest = hay.replace(AMBIGUOUS_SWITCH, " ").replace(/\s+/gu, " ").trim();
    const withoutSwitch = categorize(rest);
    category = withoutSwitch === "Сеть" || NETWORK_SIGNALS.test(rest) ? "Сеть" : withoutSwitch;
  }
  if (categoryCache.size >= CATEGORY_CACHE_LIMIT) categoryCache.clear();
  categoryCache.set(hay, category);
  return category;
}

function textTokens(text: string): string[] {
  return text.toLocaleLowerCase("ru").match(/[a-zа-яё0-9-]+/giu) ?? [];
}

export function hasKnownBrand(text: string): boolean {
  return textTokens(text).some((token) => KNOWN_BRANDS.includes(token));
}

/** The words of a query without brand names, Latin or Cyrillic ("самсунг", "логитек"). */
export function withoutKnownBrands(text: string): string[] {
  return textTokens(text).filter((token) => !KNOWN_BRANDS.includes(token));
}

export function extractMpn(text: string): string {
  const match =
    text.match(/\b(\d{3}-\d{6,})\b/) ??
    text.match(/\b([A-Z]{1,8}-\d{2,}[A-Z0-9-]*)\b/i) ??
    text.match(/\b([A-Z]{1,8}\d{2,}[A-Z0-9-]{1,})\b/i) ??
    text.match(/\b(\d{8,14})\b/);
  return match?.[1]?.trim() ?? "";
}

export function splitBrandModel(text: string): { brand: string; model: string } {
  const tokens = collapseWs(text).split(" ").filter(Boolean);
  if (tokens.length === 0) return { brand: "", model: "" };
  const lower = tokens.map((token) => token.toLocaleLowerCase("ru"));
  for (const entry of BRAND_ALIASES) {
    let aliasTokens: string[] = [];
    let start = -1;
    for (const alias of entry.aliases) {
      aliasTokens = alias.split(" ");
      start = lower.findIndex((_, index) => lower.slice(index, index + aliasTokens.length).join(" ") === alias);
      if (start >= 0) break;
    }
    if (start < 0) continue;
    const remainder = tokens.filter((_, index) => index < start || index >= start + aliasTokens.length);
    const model = cleanModelTokens(remainder);
    return { brand: entry.canonical, model: collapseWs(model.join(" ")) || entry.canonical };
  }
  const brandIndex = lower.findIndex((token) => KNOWN_BRANDS.includes(token));
  if (brandIndex >= 0) {
    const brand = titleCaseWords(tokens[brandIndex]!);
    const model = collapseWs(cleanModelTokens([...tokens.slice(0, brandIndex), ...tokens.slice(brandIndex + 1)]).join(" "));
    return { brand, model: model || brand };
  }
  const model = cleanModelTokens(tokens);
  return { brand: "", model: collapseWs(model.join(" ")) };
}

/** Build a Product from free-text suggestion or typed query (no static catalog). */
export function productFromQuery(text: string, source = "suggest"): Product {
  let name = collapseWs(text);
  const cpu = name.match(/(?:^|\s)(?:i[3579][- ])?(1\d{4}(?:kf|ks|k|f|t)?)(?=\s|$)/i);
  if (cpu && inferCategory(name) === "Процессоры") {
    name = `Процессор Intel ${name.replace(/^процессор\s+/i, "").replace(/^intel\s+(?:core\s+)?/i, "")}`;
  }
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

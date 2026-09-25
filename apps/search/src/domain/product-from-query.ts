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

const CATEGORY_HINTS: Array<{ tokens: string[]; category: string }> = [
  {
    tokens: [
      "ноутбук",
      "laptop",
      "notebook",
      "macbook",
      "legion",
      "thinkpad",
      "ideapad",
      "latitude",
      "inspiron",
      "vivobook",
      "zenbook",
    ],
    category: "Ноутбуки",
  },
  { tokens: ["монитор", "monitor", "display"], category: "Мониторы" },
  { tokens: ["клавиатур", "keyboard"], category: "Клавиатуры" },
  { tokens: ["мышь", "мыши", "mouse"], category: "Мыши" },
  { tokens: ["ssd", "nvme", "накопител"], category: "SSD" },
  { tokens: ["наушник", "гарнитур", "headset"], category: "Гарнитуры" },
  { tokens: ["камер", "webcam"], category: "Веб-камеры" },
  { tokens: ["коммутатор", "switch", "маршрутиз", "router"], category: "Сеть" },
  { tokens: ["ибп", "ups"], category: "ИБП" },
  { tokens: ["принтер", "мфу", "scanner"], category: "Печать" },
  { tokens: ["док", "dock"], category: "Док-станции" },
  { tokens: ["оперативн", "ddr", "память", "ram"], category: "ОЗУ" },
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
  for (const hint of CATEGORY_HINTS) {
    if (hint.tokens.some((token) => hay.includes(token))) return hint.category;
  }
  return "Каталог";
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

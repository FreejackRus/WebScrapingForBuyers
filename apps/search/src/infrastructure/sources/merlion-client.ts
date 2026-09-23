import { createHash } from "node:crypto";

import type { MatchKind, Offer, Product } from "@peremena/contracts";

/**
 * MERLION B2B SOAP mlservice3.
 * WSDL prod: https://api.merlion.com/rl/mlservice3?wsdl
 * WSDL test: https://apitest.merlion.com/rl/mlservice3?wsdl
 * Auth: HTTP Basic, login must end with `|API` (e.g. BRT12345|API).
 * Access: api@merlion.ru / B2B manager. Rate limits (partner docs):
 * catalog 1/s, items 3/s, shipment refs 1/min.
 */
export const MERLION_WSDL_PROD = "https://api.merlion.com/rl/mlservice3?wsdl";
export const MERLION_WSDL_TEST = "https://apitest.merlion.com/rl/mlservice3?wsdl";
export const MERLION_ENDPOINT_PROD = "https://api.merlion.com/rl/mlservice3";
export const MERLION_ENDPOINT_TEST = "https://apitest.merlion.com/rl/mlservice3";

export interface MerlionConfig {
  login: string;
  password: string;
  /** Use apitest host when true. */
  test?: boolean;
  endpoint?: string;
}

interface MerlionItem {
  no: string;
  name: string;
  brand?: string;
  vendorPart?: string;
  warranty?: number;
}

interface MerlionAvail {
  no: string;
  priceRub?: number;
  available?: number;
}

function endpointOf(config: MerlionConfig): string {
  if (config.endpoint?.trim()) return config.endpoint.trim().replace(/\?wsdl$/i, "");
  return config.test ? MERLION_ENDPOINT_TEST : MERLION_ENDPOINT_PROD;
}

function soapEnvelope(bodyInner: string): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns1="https://api.merlion.com/rl/mlservice3" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:SOAP-ENC="http://schemas.xmlsoap.org/soap/encoding/" SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
  <SOAP-ENV:Body>${bodyInner}</SOAP-ENV:Body>
</SOAP-ENV:Envelope>`;
}

function arrayOfString(values: string[]): string {
  if (values.length === 0) {
    return `<item_id xsi:type="SOAP-ENC:Array" SOAP-ENC:arrayType="xsd:string[0]"></item_id>`;
  }
  const items = values.map((value) => `<item xsi:type="xsd:string">${escapeXml(value)}</item>`).join("");
  return `<item_id xsi:type="ns1:ArrayOfString" SOAP-ENC:arrayType="xsd:string[${values.length}]">${items}</item_id>`;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function textOf(xml: string, tag: string): string | undefined {
  const re = new RegExp(`<(?:[A-Za-z0-9_]+:)?${tag}[^>]*>([^<]*)</(?:[A-Za-z0-9_]+:)?${tag}>`, "i");
  const match = xml.match(re);
  return match?.[1]?.trim() || undefined;
}

function floatOf(xml: string, tag: string): number | undefined {
  const raw = textOf(xml, tag);
  if (!raw) return undefined;
  const n = Number(raw);
  return Number.isFinite(n) ? n : undefined;
}

function intOf(xml: string, tag: string): number | undefined {
  const raw = textOf(xml, tag);
  if (!raw) return undefined;
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) ? n : undefined;
}

function splitItems(xml: string, wrapperTag: string): string[] {
  const re = new RegExp(
    `<(?:[A-Za-z0-9_]+:)?${wrapperTag}\\b[^>]*>[\\s\\S]*?</(?:[A-Za-z0-9_]+:)?${wrapperTag}>`,
    "gi",
  );
  // Prefer nested <item>…</item> blocks inside ArrayOf*
  const itemRe = /<(?:[A-Za-z0-9_]+:)?item\b[^>]*>[\s\S]*?<\/(?:[A-Za-z0-9_]+:)?item>/gi;
  const items = xml.match(itemRe);
  if (items && items.length > 0) return items;
  return xml.match(re) ?? [];
}

async function soapCall(
  config: MerlionConfig,
  operation: string,
  bodyInner: string,
  signal?: AbortSignal,
): Promise<string> {
  const endpoint = endpointOf(config);
  const auth = Buffer.from(`${config.login}:${config.password}`, "utf8").toString("base64");
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: `"${operation}"`,
      Authorization: `Basic ${auth}`,
    },
    body: soapEnvelope(bodyInner),
    ...(signal ? { signal } : {}),
  });
  const text = await response.text();
  if (!response.ok) {
    throw new Error(`MERLION SOAP ${operation} HTTP ${response.status}: ${text.slice(0, 240)}`);
  }
  if (/<faultstring>/i.test(text) || /soap:Fault/i.test(text)) {
    const fault = textOf(text, "faultstring") ?? text.slice(0, 240);
    throw new Error(`MERLION SOAP ${operation}: ${fault}`);
  }
  return text;
}

export async function merlionHello(config: MerlionConfig, signal?: AbortSignal): Promise<string> {
  const xml = await soapCall(config, "helloWorld", `<ns1:helloWorld/>`, signal);
  return textOf(xml, "return") ?? textOf(xml, "helloWorldResult") ?? "ok";
}

export async function merlionDefaultShipmentMethod(
  config: MerlionConfig,
  signal?: AbortSignal,
): Promise<string> {
  const xml = await soapCall(
    config,
    "getShipmentMethods",
    `<ns1:getShipmentMethods><code xsi:type="xsd:string"></code></ns1:getShipmentMethods>`,
    signal,
  );
  for (const block of splitItems(xml, "ShipmentMethodsResult")) {
    if (intOf(block, "IsDefault") === 1) {
      const code = textOf(block, "Code");
      if (code) return code;
    }
  }
  const first = splitItems(xml, "ShipmentMethodsResult")[0];
  const code = first ? textOf(first, "Code") : undefined;
  if (!code) throw new Error("MERLION: no shipment methods");
  return code;
}

export async function merlionNearestShipmentDate(
  config: MerlionConfig,
  shipmentMethod: string,
  signal?: AbortSignal,
): Promise<string> {
  const xml = await soapCall(
    config,
    "getShipmentDates",
    `<ns1:getShipmentDates><code xsi:type="xsd:string"></code><ShipmentMethodCode xsi:type="xsd:string">${escapeXml(shipmentMethod)}</ShipmentMethodCode></ns1:getShipmentDates>`,
    signal,
  );
  const first = splitItems(xml, "ShipmentDatesResult")[0];
  const date = first ? textOf(first, "Date") : textOf(xml, "Date");
  if (!date) throw new Error("MERLION: no shipment dates");
  return date;
}

export async function merlionGetItems(
  config: MerlionConfig,
  itemIds: string[],
  signal?: AbortSignal,
): Promise<MerlionItem[]> {
  const xml = await soapCall(
    config,
    "getItems",
    `<ns1:getItems>
      <cat_id xsi:type="xsd:string"></cat_id>
      ${arrayOfString(itemIds)}
      <shipment_method xsi:type="xsd:string"></shipment_method>
      <page xsi:type="xsd:int">0</page>
      <rows_on_page xsi:type="xsd:int">50</rows_on_page>
      <last_time_change xsi:type="xsd:string"></last_time_change>
    </ns1:getItems>`,
    signal,
  );
  const items: MerlionItem[] = [];
  for (const block of splitItems(xml, "ItemsResult")) {
    const no = textOf(block, "No");
    const name = textOf(block, "Name");
    if (!no || !name) continue;
    const item: MerlionItem = { no, name };
    const brand = textOf(block, "Brand");
    if (brand) item.brand = brand;
    const vendorPart = textOf(block, "Vendor_part");
    if (vendorPart) item.vendorPart = vendorPart;
    const warranty = intOf(block, "Warranty");
    if (warranty !== undefined) item.warranty = warranty;
    items.push(item);
  }
  return items;
}

export async function merlionGetItemsAvail(
  config: MerlionConfig,
  itemIds: string[],
  shipmentMethod: string,
  shipmentDate: string,
  signal?: AbortSignal,
): Promise<MerlionAvail[]> {
  const xml = await soapCall(
    config,
    "getItemsAvail",
    `<ns1:getItemsAvail>
      <cat_id xsi:type="xsd:string"></cat_id>
      <shipment_method xsi:type="xsd:string">${escapeXml(shipmentMethod)}</shipment_method>
      <shipment_date xsi:type="xsd:string">${escapeXml(shipmentDate)}</shipment_date>
      <only_avail xsi:type="xsd:string">0</only_avail>
      ${arrayOfString(itemIds)}
    </ns1:getItemsAvail>`,
    signal,
  );
  const rows: MerlionAvail[] = [];
  for (const block of splitItems(xml, "ItemsAvailResult")) {
    const no = textOf(block, "No");
    if (!no) continue;
    const row: MerlionAvail = { no };
    const priceRub =
      floatOf(block, "PriceClientRUB") ??
      floatOf(block, "PriceClientRUB_MSK") ??
      floatOf(block, "PriceClient");
    if (priceRub !== undefined) row.priceRub = priceRub;
    const available =
      intOf(block, "AvailableClient") ??
      intOf(block, "AvailableClient_MSK") ??
      intOf(block, "AvailableClient_RG");
    if (available !== undefined) row.available = available;
    rows.push(row);
  }
  return rows;
}

function candidateItemIds(product: Product): string[] {
  const ids = [product.mpn, product.model, product.id]
    .map((value) => value?.trim())
    .filter((value): value is string => Boolean(value));
  return [...new Set(ids)].slice(0, 8);
}

function matchKind(item: MerlionItem, product: Product): MatchKind {
  const hay = `${item.no} ${item.vendorPart ?? ""} ${item.name}`.toLocaleLowerCase("ru");
  const mpn = product.mpn.trim().toLocaleLowerCase("ru");
  const model = product.model.trim().toLocaleLowerCase("ru");
  if (mpn && (hay.includes(mpn) || item.no.toLocaleLowerCase("ru") === mpn)) return "exact";
  if (model && hay.includes(model)) return "probable";
  return "doubtful";
}

export async function searchMerlion(
  config: MerlionConfig,
  product: Product,
  signal?: AbortSignal,
): Promise<Offer[]> {
  const login = config.login.trim();
  if (!login.includes("|API")) {
    throw new Error('MERLION: login must end with "|API" (example: BRT12345|API)');
  }
  const ids = candidateItemIds(product);
  if (ids.length === 0) return [];

  const shipmentMethod = await merlionDefaultShipmentMethod(config, signal);
  const shipmentDate = await merlionNearestShipmentDate(config, shipmentMethod, signal);
  const items = await merlionGetItems(config, ids, signal);
  if (items.length === 0) return [];

  const nos = items.map((item) => item.no);
  const avail = await merlionGetItemsAvail(config, nos, shipmentMethod, shipmentDate, signal);
  const availByNo = new Map(avail.map((row) => [row.no, row]));
  const fetchedAt = new Date().toISOString();

  const offers: Offer[] = [];
  for (const item of items) {
      const stock = availByNo.get(item.no);
      const price = stock?.priceRub;
      if (!stock || price === undefined || !(price > 0)) continue;
      const qty = stock.available ?? 0;
    const offer: Offer = {
      id: `merlion-${createHash("sha256").update(`${item.no}:${price}`).digest("hex").slice(0, 10)}`,
      source: "MERLION",
      seller: "MERLION",
      title: item.brand ? `${item.brand} ${item.name}` : item.name,
      price: Math.round(price),
      priceCondition: "B2B MERLION",
      currency: "RUB",
      availability: qty > 0 ? `В наличии: ${qty}` : "Под заказ",
      delivery: `Отгрузка ${shipmentDate} (${shipmentMethod})`,
      condition: "new",
      match: matchKind(item, product),
      url: "https://b2b.merlion.com/",
      fetchedAt,
      demo: false,
    };
    const mpn = item.vendorPart ?? item.no;
    if (mpn) offer.mpn = mpn;
    if (item.warranty) offer.warranty = `${item.warranty} мес.`;
    offers.push(offer);
  }
  return offers.slice(0, 12);
}

export function merlionConfigFromEnv(): MerlionConfig | undefined {
  const login = process.env.MERLION_API_LOGIN?.trim();
  const password = process.env.MERLION_API_PASSWORD?.trim();
  if (!login || !password) return undefined;
  const test =
    process.env.MERLION_API_TEST?.trim().toLowerCase() === "1" ||
    process.env.MERLION_API_TEST?.trim().toLowerCase() === "true";
  const config: MerlionConfig = { login, password, test };
  const endpoint = process.env.MERLION_API_URL?.trim();
  if (endpoint) config.endpoint = endpoint;
  return config;
}

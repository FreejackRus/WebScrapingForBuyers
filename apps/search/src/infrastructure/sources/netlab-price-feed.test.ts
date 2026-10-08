import { productFromQuery } from "../../domain/product-from-query.js";
import { deflateRawSync } from "node:zlib";

import { describe, expect, it, vi } from "vitest";

import {
  NetlabPriceFeedAdapter,
  NetlabXmlCollector,
  inflateFirstZipEntry,
  isNetlabCandidate,
  netlabAvailability,
  parseNetlabOffer,
} from "./netlab-price-feed.js";

// Trimmed copy of the live pricexml.zip markup (2026-10-07).
const XML = `<?xml version="1.0" encoding="windows-1251"?>
<xml_catalog date="2026-10-07 16:03">
  <shop><currencies><currency  id="RUR" rate="1"/><currency  id="USD" rate="85.71"/></currencies>
  <categories><category id="1" OrderBy="1">Расходные материалы</category></categories>
  <offers>
    <offer id="1001188" OrderBy="402886">
      <uid>11001188</uid>
      <url>http://serv.netlab.ru/descr.asp?id=1001188</url>
      <priceR>92.6</priceR><priceB>85.39</priceB><priceC>82.19</priceC><priceD>81.63</priceD><priceE>81.06</priceE><priceF>80.5</priceF>
      <priceRRP>0.0</priceRRP><currencyId>USD</currencyId>
      <picture>https://nlimg.netlab.ru/23D39C9B.jpg</picture>
      <count>0</count>
      <name>Pantum TL-5120P Тонер- Картридж для BP5100DN/BP5100DW 3k </name>
      <warranty>1 год</warranty>
      <PN>TL-5120P</PN>
      <remote>***</remote>
      <Model>TL-5120P</Model><Vendor>Pantum</Vendor><OutOfProd>false</OutOfProd>
    </offer>
    <offer id="1000179" OrderBy="997498">
      <url>http://serv.netlab.ru/descr.asp?id=1000179</url>
      <priceR>20.3</priceR><priceB>17.39</priceB>
      <count>*</count>
      <name>910-007185/910-007119 Logitech Wireless Mouse M240 SILENT - Graphite </name>
      <PN>910-007119</PN><Model>Wireless  M240 (910-007119)</Model><Vendor>Logitech</Vendor>
    </offer>
  </offers></shop></xml_catalog>`;

function cp1251(text: string): Buffer {
  const out: number[] = [];
  for (const ch of text) {
    const code = ch.codePointAt(0)!;
    if (code < 0x80) out.push(code);
    else if (code >= 0x410 && code <= 0x44f) out.push(code - 0x410 + 0xc0);
    else if (code === 0x401) out.push(0xa8);
    else if (code === 0x451) out.push(0xb8);
    else if (code === 0x2013) out.push(0x96);
    else out.push(0x3f);
  }
  return Buffer.from(out);
}

function zipOf(name: string, content: Buffer): Buffer {
  const data = deflateRawSync(content);
  const header = Buffer.alloc(30);
  header.writeUInt32LE(0x04034b50, 0);
  header.writeUInt16LE(8, 8);
  header.writeUInt32LE(data.length, 18);
  header.writeUInt32LE(content.length, 22);
  header.writeUInt16LE(name.length, 26);
  return Buffer.concat([header, Buffer.from(name), data]);
}

const cartridge = {
  id: "c",
  brand: "Pantum",
  model: "TL-5120P",
  name: "Картридж Pantum TL-5120P",
  mpn: "TL-5120P",
  category: "Картриджи",
  characteristics: {},
};

describe("NETLAB price feed parsing", () => {
  it("reads one offer", () => {
    const item = parseNetlabOffer(XML.slice(XML.indexOf('<offer id="1001188"'), XML.indexOf("</offer>")));
    expect(item).toMatchObject({ id: "1001188", pn: "TL-5120P", vendor: "Pantum", count: "0", remote: "***" });
    expect(item?.prices).toMatchObject({ R: 92.6, B: 85.39, F: 80.5 });
    expect(item?.picture).toBe("https://nlimg.netlab.ru/23D39C9B.jpg");
  });

  it("streams header and offers split across chunks", () => {
    const collector = new NetlabXmlCollector();
    for (let i = 0; i < XML.length; i += 37) collector.push(XML.slice(i, i + 37));
    expect(collector.usdRate).toBe(85.71);
    expect(collector.date).toBe("2026-10-07 16:03");
    expect(collector.items.map((item) => item.pn)).toEqual(["TL-5120P", "910-007119"]);
  });

  it("inflates a windows-1251 zip entry", async () => {
    let text = "";
    await inflateFirstZipEntry(zipOf("Price.xml", cp1251(XML)), (chunk) => (text += chunk));
    expect(text).toContain("Тонер- Картридж");
  });

  it("describes star stock levels", () => {
    expect(netlabAvailability({ count: "0", remote: "***", transit: "", transitDate: "" })).toBe("удалённый склад: более 50 шт.");
    expect(netlabAvailability({ count: "*", remote: "", transit: "**", transitDate: "2026.10.20" })).toBe(
      "склад: 1–20 шт.; в пути: 21–50 шт. (2026.10.20)",
    );
    expect(netlabAvailability({ count: "0", remote: "", transit: "", transitDate: "" })).toBe("Нет в наличии");
  });
});

describe("NetlabPriceFeedAdapter", () => {
  it("downloads once, converts USD by the file rate and matches by part number", async () => {
    const fetchImpl = vi.fn(async () => new Response(new Uint8Array(zipOf("Price.xml", cp1251(XML)))));
    const adapter = new NetlabPriceFeedAdapter({ fetchImpl: fetchImpl as unknown as typeof fetch, column: "B" });
    const offers = await adapter.search(cartridge);
    await adapter.search(cartridge);
    expect(fetchImpl).toHaveBeenCalledOnce();
    expect(offers).toHaveLength(1);
    expect(offers[0]).toMatchObject({
      source: "NETLAB",
      match: "exact",
      mpn: "TL-5120P",
      price: Math.round(85.39 * 85.71),
      availability: "удалённый склад: более 50 шт.",
      demo: false,
    });
    expect(offers[0]?.priceCondition).toContain("дилерская категория B");
  });

  it("keeps the previous feed when a refresh fails", async () => {
    let now = 0;
    const fetchImpl = vi
      .fn()
      .mockResolvedValueOnce(new Response(new Uint8Array(zipOf("Price.xml", cp1251(XML)))))
      .mockResolvedValueOnce(new Response("down", { status: 503 }));
    const adapter = new NetlabPriceFeedAdapter({ fetchImpl, ttlMs: 1000, now: () => now });
    await adapter.search(cartridge);
    now = 5000;
    await expect(adapter.search(cartridge)).resolves.toHaveLength(1);
    expect(fetchImpl).toHaveBeenCalledTimes(2);
  });

  it("matches model digits as whole tokens", () => {
    const sw = parseNetlabOffer(
      '<offer id="9"><name>TP-Link TL-SG1024S Коммутатор 24 порта</name><PN>TL-SG1024S</PN><priceR>1</priceR>',
    )!;
    const mouse = { ...cartridge, brand: "Logitech", model: "G102", mpn: "", name: "Мышь Logitech G102" };
    expect(isNetlabCandidate(sw, mouse)).toBe(false);
  });

  it("does not offer unrelated items", () => {
    const mouse = parseNetlabOffer(XML.slice(XML.indexOf('<offer id="1000179"'), XML.lastIndexOf("</offer>")))!;
    expect(isNetlabCandidate(mouse, cartridge)).toBe(false);
  });
});

it.each(["12400F", "i5-12400F", "процессор 12400F"])("finds the CPU in the feed for %s", async (query) => {
  const xml = XML.replace("<offers>", '<offers><offer id="900"><name>Intel Core i5-12400F OEM Процессор LGA1700</name><PN>CM8071504650609</PN><Model>i5-12400F</Model><Vendor>Intel</Vendor><priceR>100</priceR><count>*</count></offer>');
  const adapter = new NetlabPriceFeedAdapter({ fetchImpl: vi.fn(async () => new Response(new Uint8Array(zipOf("Price.xml", cp1251(xml))))) });
  const offers = await adapter.search(productFromQuery(query));
  expect(offers.map((row) => row.title)).toEqual(["Intel Core i5-12400F OEM Процессор LGA1700"]);
});

it("uses NETLAB's product type to exclude complete systems with the requested CPU", () => {
  const pc = parseNetlabOffer('<offer id="10"><name>NORBEL i5-12400F / 16GB / SSD</name><RussianName>[Компьютер] NORBEL i5-12400F</RussianName><priceR>100</priceR>')!;
  expect(isNetlabCandidate(pc, productFromQuery("12400F"))).toBe(false);
});

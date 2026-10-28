import { describe, expect, it, vi } from "vitest";
import type { Offer, SearchSnapshot } from "@peremena/contracts";
import { analyzeSnapshot, answerCopilot } from "./analyze.js";
import { filterOffers } from "./procurement-dialogue.js";
import { parseSources } from "./prompt-intent.js";
const offer = (id: string, title: string, price: number, availability = "склад: более 50 шт."): Offer => ({id,title,price,availability,source:"NETLAB",seller:"NETLAB",priceCondition:"Обычная цена",currency:"RUB",match:"exact",condition:"new",url:`https://example.test/${id}`,fetchedAt:new Date(0).toISOString(),demo:false,assessment:{group:"match",reasons:["Модель совпадает"]}});
const snapshot: SearchSnapshot = {id:"s",query:"12400F",product:{id:"p",name:"Процессор Intel 12400F",model:"12400F",brand:"Intel",mpn:"",category:"Процессоры",characteristics:{}},status:"complete",sources:[{source:"NETLAB",status:"done"}],offers:[offer("oem","Intel i5-12400F OEM",12000),offer("box","Intel i5-12400F BOX",14500),offer("unknown","Intel i5-12400F BOX",13500,"Неизвестно")]};
const narrator = () => ({name:"test",summarize:vi.fn(async()=>({summary:"Выдуманная цена 1 ₽, в наличии 999 шт.",warnings:[]})),answer:vi.fn(async()=>({summary:"Найдено 100 товаров",warnings:[],intent:"search" as const,searchQuery:"ошибочная модель"}))});
describe("reliable procurement dialogue",()=>{
 it("applies condition filters during contextual refinement",()=>{const rows=[offer("new","Intel i5-12400F",12000),{...offer("used","Intel i5-12400F Б/У",10000),condition:"used" as const}];expect(filterOffers(rows,{conditions:["used"]}).map(row=>row.id)).toEqual(["used"])});
 it("describes condition filters in current conditions",async()=>{const r=await analyzeSnapshot(snapshot,"какие фильтры сейчас?",undefined,{context:{tableFilter:{conditions:["used"]}}});expect(r.summary).toMatch(/б\/у/i)});
 it.each(["12400F","i5-12400F","процессор 12400F"])("launches %s without calling model",async query=>{const n=narrator();const r=await answerCopilot(`Привет, найди мне \`${query}\``,n);expect(r.searchQuery).toBe(query);expect(n.answer).not.toHaveBeenCalled();expect(r.summary).not.toMatch(/найдено/i)});
 it("preserves BOX while applying budget without model",async()=>{const n=narrator();const r=await analyzeSnapshot(snapshot,"до 15 тысяч",n,{context:{tableFilter:{titleIncludeAny:["BOX"],inStockOnly:true}}});expect(r.intent).toBe("filter");expect(r.selectedOfferIds).toEqual(["box"]);expect(r.tableFilter).toMatchObject({maxPrice:15000,inStockOnly:true,titleIncludeAny:["BOX"]});expect(n.summarize).not.toHaveBeenCalled();});
 it("BOX refines current results",async()=>{const r=await analyzeSnapshot(snapshot,"а BOX?");expect(r.intent).toBe("filter");expect(r.selectedOfferIds).toEqual(["unknown","box"]);expect(r.searchQuery).toBeUndefined()});
 it("uses supplier stock, excludes unknown",async()=>{const r=await analyzeSnapshot(snapshot,"только в наличии");expect(r.selectedOfferIds).toEqual(["oem","box"])});
 it("explains selected offer instead of switching to cheapest",async()=>{const r=await analyzeSnapshot(snapshot,"почему этот?",undefined,{context:{selectedOfferIds:["box"]}});expect(r.selectedOfferIds).toEqual(["box"]);expect(r.summary).not.toContain("Лучший вариант");expect(r.summary).toContain("14");});
 it("does not invent warranty or BOX contents",async()=>{const n=narrator();const r=await analyzeSnapshot(snapshot,"какая гарантия и комплектация BOX?",n);expect(r.summary).toMatch(/не указан|нет сведений/i);expect(r.summary).not.toMatch(/лицензи|официальная гарантия/i);expect(n.summarize).not.toHaveBeenCalled()});
 it("asks clarification without a snapshot for contextual refinement",async()=>{const r=await answerCopilot("а BOX?");expect(r.clarificationQuestion).toBeTruthy();expect(r.searchQuery).toBeUndefined()});
 it("rejects invented facts in explanation",async()=>{const r=await analyzeSnapshot(snapshot,"сравни лучшие предложения",narrator());expect(r.summary).not.toMatch(/999|1 ₽/);});
 it("«почему именно он?» explains the pick by the selection rule, not the cheapest row",async()=>{
  // Live 2026-10-28, K380: best = WB 2 273 ₽ in stock; the answer listed five cheaper Avito rows of unknown stock.
  const best={...offer("wb","Клавиатура Logitech K380",2273,"В наличии"),source:"Wildberries",procurementRank:0};
  const cheap1={...offer("av1","Клавиатура Logitech K380",900,"Неизвестно"),source:"Авито",condition:"unknown" as const,procurementRank:1};
  const cheap2={...offer("av2","Клавиатура Logitech K380",989,"Неизвестно"),source:"Авито",procurementRank:2};
  const snap={...snapshot,offers:[cheap1,cheap2,best]};
  const r=await analyzeSnapshot(snap,"а почему именно он?",undefined,{context:{selectedOfferIds:["wb","av1","av2"]}});
  expect(r.selectedOfferIds).toEqual(["wb"]);
  expect(r.summary).toMatch(/^Wildberries, 2\s273 ₽/u);
  expect(r.summary).toMatch(/наличие подтверждено/);
  expect(r.summary).toMatch(/Дешевле — 2 предложения \(от 900 ₽\): наличие не подтверждено/u);
  expect(r.summary.split("\n")).toHaveLength(1);
 });
 it("keeps partial collection explicit",async()=>{const r=await analyzeSnapshot({...snapshot,status:"running"},"почему этот?",undefined,{context:{selectedOfferIds:["box"]}});expect(r.warnings.join(" ")).toMatch(/сбор ещё идёт/i)});
});
describe("clarification and incremental results",()=>{
 it.each(["найди такой же","найди другой","а не BOX, а OEM","только не в наличии"])("asks instead of reversing ambiguous %s",async prompt=>{const r=await analyzeSnapshot(snapshot,prompt,narrator());expect(r.intent).toBe("help");expect(r.clarificationQuestion).toBeTruthy();expect(r.searchQuery).toBeUndefined();expect(r.tableFilter).toBeUndefined()});
 it("never starts raw ambiguous search after model clarification",async()=>{const n={name:"test",summarize:vi.fn(),answer:vi.fn(async()=>({summary:"Какой товар?",clarificationQuestion:"Какой товар?",warnings:[],intent:"help" as const}))};const r=await analyzeSnapshot(snapshot,"хочу найти замену",n);expect(r.clarificationQuestion).toBeTruthy();expect(r.searchQuery).toBeUndefined()});
 it("keeps predicates open for late matching offers",async()=>{const r=await analyzeSnapshot({...snapshot,status:"running",offers:[snapshot.offers[0]!] },"только в наличии");expect(r.tableFilter?.inStockOnly).toBe(true);expect(r.tableFilter?.selectedOfferIds).toBeUndefined()});
 it("recognizes Cyrillic supplier name",async()=>{const snap={...snapshot,offers:[{...snapshot.offers[0]!,source:"Wildberries"},snapshot.offers[1]!]};const r=await analyzeSnapshot(snap,"только вайлдберриз");expect(r.selectedOfferIds).toEqual(["oem"])});
 it("keeps both shops in «Чем Wildberries лучше Авито?» (Avito rows are named «Авито»)",()=>{const rows=[{...offer("wb","Logitech K380",2273),source:"Wildberries"},{...offer("av","Logitech K380",989),source:"Авито"},{...offer("oz","Logitech K380",2490),source:"Ozon"}];expect(filterOffers(rows,{sources:parseSources("чем wildberries лучше авито?")}).map(row=>row.id)).toEqual(["wb","av"])});
});

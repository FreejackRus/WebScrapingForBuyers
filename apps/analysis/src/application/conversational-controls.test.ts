import { describe, expect, it } from "vitest";
import type { OfferTableFilter, SearchSnapshot } from "@peremena/contracts";
import { routeProcurementDialogue } from "./procurement-dialogue.js";

const snapshot: SearchSnapshot = {id:"s",query:"12400F",product:{id:"p",name:"Процессор Intel 12400F",model:"12400F",brand:"Intel",mpn:"",category:"Процессоры",characteristics:{}},status:"running",sources:[],offers:[]};
const filter: OfferTableFilter = {realOnly:true,packaging:"BOX",maxPrice:15000,inStockOnly:true,sources:["NETLAB"],titleExcludeAny:["комплект"],selectedOfferIds:["old"]};
const route = (prompt:string) => routeProcurementDialogue(snapshot,prompt,{tableFilter:filter});
describe("conversational controls",()=>{
 it("separates compound CPU search from its new conditions",()=>{const r=route("Привет, найди мне `12400F` BOX до 15 тысяч только в наличии");expect(r?.searchQuery).toBe("12400F");expect(r?.tableFilter).toEqual({realOnly:true,packaging:"BOX",maxPrice:15000,inStockOnly:true});});
 it.each(["теперь найди мне 13400F","теперь ищем 13400F"])("cleans explicit product change %s",prompt=>{const r=route(prompt);expect(r?.searchQuery).toBe("13400F");expect(r?.tableFilter).toEqual({realOnly:true});});
 it("preserves arbitrary device characteristics",()=>{expect(route("найди TP-Link Archer AX3000")?.searchQuery).toBe("TP-Link Archer AX3000");});
 it("asks when year wording could be mistaken for a budget",()=>{const r=route("найди ноутбук до 2025 года");expect(r?.clarificationQuestion).toBeTruthy();expect(r?.searchQuery).toBeUndefined();});
 it("removes only the budget and stale IDs",()=>{const r=route("убери ограничение по цене");expect(r?.intent).toBe("filter");expect(r?.tableFilter).toEqual({realOnly:true,packaging:"BOX",inStockOnly:true,sources:["NETLAB"],titleExcludeAny:["комплект"]});});
 it.each(["покажи все варианты","сбрось фильтры"])("clears dynamic constraints with %s",prompt=>{expect(route(prompt)?.tableFilter).toEqual({realOnly:true});});
 it("allows ordered offers without dropping unrelated constraints",()=>{expect(route("и под заказ тоже")?.tableFilter).toEqual({realOnly:true,packaging:"BOX",maxPrice:15000,sources:["NETLAB"],titleExcludeAny:["комплект"]});});
 it.each(["убери ограничение по цене","сбрось фильтры","и под заказ тоже"])("asks product first when resetting without snapshot %s",prompt=>{expect(routeProcurementDialogue(undefined,prompt)?.clarificationQuestion).toBeTruthy();});
 it.each(["что мы сейчас ищем?","какие фильтры сейчас?"])("reports actual product, filters and collection in %s",prompt=>{const r=route(prompt);expect(r?.intent).toBe("help");expect(r?.summary).toMatch(/12400F/);expect(r?.summary).toMatch(/BOX/);expect(r?.summary).toMatch(/15.?000/);expect(r?.summary).toMatch(/NETLAB/);expect(r?.summary).toMatch(/сбор.*идёт/i);expect(r?.tableFilter).toBeUndefined();});
 it.each(["привет","спасибо"])("responds tersely to %s without changing filters",prompt=>{const r=route(prompt);expect(r?.intent).toBe("help");expect(r?.summary.length).toBeLessThan(250);expect(r?.searchQuery).toBeUndefined();expect(r?.tableFilter).toBeUndefined();});
 it.each(["найди 12400F BOX OEM","а BOX и OEM","до 15 тысяч и до 20 тысяч","только в наличии и под заказ"])("asks for incompatible conditions %s",prompt=>{const r=route(prompt);expect(r?.clarificationQuestion).toBeTruthy();expect(r?.searchQuery).toBeUndefined();expect(r?.tableFilter).toBeUndefined();});
});

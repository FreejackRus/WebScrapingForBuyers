/** Fixed synthetic procurement dialogues against the configured real local model.
 * OLLAMA_BASE_URL=http://127.0.0.1:11434 OLLAMA_MODEL=... npx tsx apps/analysis/scripts/evaluate-procurement.ts
 * Fixture prices/stock are never presented as live marketplace data.
 */
import { strict as assert } from "node:assert";
import type { AnalysisResult, Offer, SearchSnapshot } from "@peremena/contracts";
import { analyzeSnapshot, answerCopilot } from "../src/application/analyze.js";
import { OllamaAnalysisNarrator } from "../src/infrastructure/ollama-analysis-narrator.js";
const baseUrl=process.env.OLLAMA_BASE_URL;const model=process.env.OLLAMA_MODEL;
if(!baseUrl||!model)throw new Error("Set OLLAMA_BASE_URL and OLLAMA_MODEL");
const real=new OllamaAnalysisNarrator(baseUrl,model);
let calls=0;
const rawModelAnswers: unknown[]=[];
const narrator={name:real.name,summarize:async(...args:Parameters<typeof real.summarize>)=>{calls++;const result=await real.summarize(...args);rawModelAnswers.push(result);return result},answer:async(...args:Parameters<typeof real.answer>)=>{calls++;return real.answer(...args)}};
const row=(id:string,pack:string,price:number,availability:string):Offer=>({id,title:`Intel Core i5-12400F ${pack}`,source:"NETLAB",seller:"NETLAB",price,availability,currency:"RUB",priceCondition:"Обычная цена",condition:"new",match:"exact",fetchedAt:"2026-10-09T00:00:00Z",demo:false,url:`https://example.test/${id}`,assessment:{group:"match",reasons:["Модель совпадает"]}});
const snapshot:SearchSnapshot={id:"fixture-evaluation",query:"12400F",status:"complete",product:{id:"p",name:"Процессор Intel 12400F",model:"12400F",brand:"Intel",mpn:"",category:"Процессоры",characteristics:{}},sources:[{source:"NETLAB",status:"done"}],offers:[row("oem","OEM",12000,"склад: более 50 шт."),row("box","BOX",14500,"удалённый склад: 1–20 шт."),row("unknown","BOX",13500,"Неизвестно")]};
const results:Array<Record<string,unknown>>=[];
async function check(name:string,run:()=>Promise<AnalysisResult>,grade:(r:AnalysisResult)=>void){const before=calls;const started=Date.now();const result=await run();grade(result);results.push({name,passed:true,modelCalls:calls-before,elapsedMs:Date.now()-started,provider:result.provider??"deterministic",warnings:result.warnings,summary:result.summary});}
for(const query of ["12400F","i5-12400F","процессор 12400F"])await check(`search ${query}`,()=>answerCopilot(`Привет, найди мне \`${query}\``,narrator),r=>assert.equal(r.searchQuery,query));
assert.equal(calls,0,"explicit commands must bypass model");
await check("BOX refinement",()=>analyzeSnapshot(snapshot,"а BOX?",narrator),r=>assert.deepEqual(r.selectedOfferIds,["unknown","box"]));
await check("budget keeps stock and BOX",()=>analyzeSnapshot(snapshot,"до 15 тысяч",narrator,{context:{tableFilter:{packaging:"BOX",inStockOnly:true}}}),r=>assert.deepEqual(r.selectedOfferIds,["box"]));
await check("supplier stock",()=>analyzeSnapshot(snapshot,"только в наличии",narrator),r=>assert.deepEqual(r.selectedOfferIds,["oem","box"]));
await check("ambiguous replacement",()=>analyzeSnapshot(snapshot,"хочу найти замену",narrator),r=>{assert.ok(r.clarificationQuestion);assert.equal(r.searchQuery,undefined)});
await check("warranty unknown",()=>analyzeSnapshot(snapshot,"какая гарантия BOX?",narrator),r=>{assert.match(r.summary,/не указана/);assert.doesNotMatch(r.summary,/официальная|лицензи/)});
await check("real model explanation",()=>analyzeSnapshot(snapshot,"Сравни лучшие предложения",narrator,{userRole:"admin"}),r=>{assert.deepEqual(r.selectedOfferIds,["oem","unknown","box"]);assert.ok(r.citations?.every(c=>snapshot.offers.some(o=>o.id===c.offerId&&o.url===c.url)));});
console.log(JSON.stringify({fixture:true,model,passed:results.length,modelCalls:calls,rawModelAnswers,groundedExplanationsAccepted:results.filter(result=>String(result.provider).startsWith("Ollama")).length,results},null,2));

assert.ok(results.some(result=>String(result.provider).startsWith("Ollama")),"real model must produce at least one accepted grounded explanation");

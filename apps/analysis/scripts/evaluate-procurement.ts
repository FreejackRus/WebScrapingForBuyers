/** Fixed synthetic procurement dialogues against the configured real local model.
 * OLLAMA_BASE_URL=http://127.0.0.1:11434 OLLAMA_MODEL=... npx tsx apps/analysis/scripts/evaluate-procurement.ts
 * AI_PROVIDER=vllm VLLM_BASE_URL=http://127.0.0.1:8000/v1 VLLM_MODEL=... npx tsx apps/analysis/scripts/evaluate-procurement.ts
 * Fixture prices/stock are never presented as live marketplace data.
 */
import { strict as assert } from "node:assert";
import type { AnalysisResult, Offer, SearchSnapshot } from "@peremena/contracts";
import { analyzeSnapshot, answerCopilot } from "../src/application/analyze.js";
import { VllmAnalysisNarrator } from "../src/infrastructure/vllm-analysis-narrator.js";
import { OllamaAnalysisNarrator } from "../src/infrastructure/ollama-analysis-narrator.js";
const isVllm=process.env.AI_PROVIDER==="vllm";
const baseUrl=isVllm?process.env.VLLM_BASE_URL:process.env.OLLAMA_BASE_URL;const model=isVllm?process.env.VLLM_MODEL:process.env.OLLAMA_MODEL;
if(!baseUrl||!model)throw new Error("Set provider base URL and model");
const real=isVllm?new VllmAnalysisNarrator(baseUrl,model,process.env.VLLM_API_KEY):new OllamaAnalysisNarrator(baseUrl,model);
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
await check("compound CPU command",()=>answerCopilot("Привет, найди мне `12400F` BOX до 15 тысяч только в наличии",narrator),r=>{assert.equal(r.searchQuery,"12400F");assert.deepEqual(r.tableFilter,{realOnly:true,packaging:"BOX",maxPrice:15000,inStockOnly:true})});
await check("remove only budget",()=>analyzeSnapshot(snapshot,"убери ограничение по цене",narrator,{context:{tableFilter:{packaging:"BOX",maxPrice:15000,inStockOnly:true}}}),r=>assert.deepEqual(r.tableFilter,{realOnly:true,packaging:"BOX",inStockOnly:true}));
await check("recall actual conditions",()=>analyzeSnapshot(snapshot,"что мы сейчас ищем?",narrator,{context:{tableFilter:{packaging:"BOX",maxPrice:15000}}}),r=>{assert.match(r.summary,/12400F/);assert.match(r.summary,/BOX/);assert.equal(r.searchQuery,undefined)});
await check("allow ordered offers",()=>analyzeSnapshot(snapshot,"и под заказ тоже",narrator,{context:{tableFilter:{packaging:"BOX",inStockOnly:true}}}),r=>assert.deepEqual(r.tableFilter,{realOnly:true,packaging:"BOX"}));
await check("new product resets old conditions",()=>analyzeSnapshot(snapshot,"теперь ищем 13400F",narrator,{context:{tableFilter:{packaging:"BOX",maxPrice:15000}}}),r=>{assert.equal(r.searchQuery,"13400F");assert.deepEqual(r.tableFilter,{realOnly:true})});
await check("decimal compound budget",()=>answerCopilot("найди 12400F BOX, до 15,5 тысяч",narrator),r=>{assert.equal(r.searchQuery,"12400F");assert.deepEqual(r.tableFilter,{realOnly:true,packaging:"BOX",maxPrice:15500})});
await check("Cyrillic thousand",()=>analyzeSnapshot(snapshot,"до 15к",narrator),r=>assert.equal(r.tableFilter?.maxPrice,15000));
await check("reset all conditions",()=>analyzeSnapshot(snapshot,"сбрось фильтры",narrator,{context:{tableFilter:{packaging:"BOX",maxPrice:15000,inStockOnly:true}}}),r=>assert.deepEqual(r.tableFilter,{realOnly:true}));
await check("real model explanation",()=>analyzeSnapshot(snapshot,"Сравни лучшие предложения",narrator,{userRole:"admin"}),r=>{assert.deepEqual(r.selectedOfferIds,["oem","unknown","box"]);assert.ok(r.citations?.every(c=>snapshot.offers.some(o=>o.id===c.offerId&&o.url===c.url)));});
// Mixed-shop dialogue (research 2026-10-28 §2.6): how often the model's own explanation passes the fact check.
const shopRow=(id:string,source:string,price:number,status:"in_stock"|"unknown",condition:Offer["condition"]):Offer=>({id,title:`Клавиатура Logitech K380 ${id}`,source,seller:source,price,availability:status==="in_stock"?"В наличии":"Неизвестно",availabilityStatus:status,currency:"RUB",priceCondition:"Публичная цена",condition,match:"probable",fetchedAt:"2026-10-28T00:00:00Z",demo:false,url:`https://example.test/${id}`,assessment:{group:"match",reasons:["Модель совпадает"]}});
const shops:SearchSnapshot={id:"fixture-shops",query:"Logitech K380",status:"complete",product:{id:"k380",name:"Клавиатура Logitech K380",model:"K380",brand:"Logitech",mpn:"",category:"Клавиатуры",characteristics:{}},sources:[{source:"Wildberries",status:"done"},{source:"Авито",status:"done"},{source:"Ozon",status:"done"}],offers:[shopRow("wb","Wildberries",2273,"in_stock","new"),shopRow("ozon","Ozon",2490,"in_stock","new"),shopRow("avito","Авито",989,"unknown","unknown"),shopRow("avito2","Авито",1000,"unknown","unknown")]};
shops.offers.forEach((offer,index)=>{offer.procurementRank=index+1;});
const modelProvider=isVllm?"vLLM":"Ollama";
const dialogue:Array<{prompt:string;accepted:boolean;summary:string}>=[];
for(const prompt of ["Сравни лучшие предложения","Чем Wildberries лучше Авито?","Какое самое дешёвое и стоит ли его брать?","Объясни выбор"]){
  await check(`dialogue: ${prompt}`,()=>analyzeSnapshot(shops,prompt,narrator,{userRole:"admin"}),r=>{
    for(const name of ["Яндекс","DNS","Ситилинк","Мегамаркет"])assert.ok(!r.summary.includes(name),`invented shop ${name}`);
    assert.doesNotMatch(r.summary,/Авито[^.]*в наличии(?![^.]*не)/u);
    dialogue.push({prompt,accepted:String(r.provider).startsWith(modelProvider),summary:r.summary});
  });
}
const dialogueAccepted=dialogue.filter(item=>item.accepted).length;
console.log(JSON.stringify({dialogue,dialogueAcceptedShare:dialogue.length?dialogueAccepted/dialogue.length:0},null,2));

console.log(JSON.stringify({fixture:true,model,passed:results.length,modelCalls:calls,rawModelAnswers,groundedExplanationsAccepted:results.filter(result=>String(result.provider).startsWith(isVllm?"vLLM":"Ollama")).length,results},null,2));

assert.ok(results.some(result=>String(result.provider).startsWith(isVllm?"vLLM":"Ollama")),"real model must produce at least one accepted grounded explanation");

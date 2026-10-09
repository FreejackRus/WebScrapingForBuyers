import { afterEach, expect, it, vi } from "vitest";
import { buildAnalysisApp } from "./app.js";
const apps: ReturnType<typeof buildAnalysisApp>[]=[];
afterEach(async()=>{vi.unstubAllGlobals();await Promise.all(apps.splice(0).map(app=>app.close()))});
const snapshot={id:"s",query:"12400F",status:"complete",sources:[],product:{id:"p",name:"Процессор Intel 12400F",brand:"Intel",model:"12400F",mpn:"",category:"Процессоры",characteristics:{}},offers:[{id:"box",title:"Intel 12400F BOX",source:"NETLAB",seller:"NETLAB",price:14500,priceCondition:"Обычная цена",currency:"RUB",availability:"склад: более 50 шт.",match:"exact",condition:"new",demo:false,url:"https://example.test/box",fetchedAt:"2026-10-09T00:00:00Z"},{id:"oem",title:"Intel 12400F OEM",source:"NETLAB",seller:"NETLAB",price:12000,priceCondition:"Обычная цена",currency:"RUB",availability:"Неизвестно",match:"exact",condition:"new",demo:false,url:"https://example.test/oem",fetchedAt:"2026-10-09T00:00:00Z"}]};
it("resolves request context against the server snapshot",async()=>{
 vi.stubGlobal("fetch",vi.fn(async()=>new Response(JSON.stringify(snapshot))));const app=buildAnalysisApp();apps.push(app);
 const response=await app.inject({method:"POST",url:"/searches/s/analyze",payload:{prompt:"до 15 тысяч",context:{tableFilter:{packaging:"BOX",inStockOnly:true},selectedOfferIds:["fake"]}}});
 expect(response.statusCode).toBe(200);expect(response.json().selectedOfferIds).toEqual(["box"]);expect(response.json().searchId).toBe("s");
});
it("rejects malformed context before calling upstream",async()=>{
 const upstream=vi.fn();vi.stubGlobal("fetch",upstream);const app=buildAnalysisApp();apps.push(app);
 const response=await app.inject({method:"POST",url:"/searches/s/analyze",payload:{prompt:"до 15 тысяч",context:{tableFilter:{maxPrice:-1}}}});
 expect(response.statusCode).toBe(400);expect(upstream).not.toHaveBeenCalled();
});

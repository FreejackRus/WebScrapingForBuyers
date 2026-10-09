import { afterEach, expect, it, vi } from "vitest";
import { buildGatewayApp } from "./app.js";
const apps: ReturnType<typeof buildGatewayApp>[]=[];
afterEach(async()=>{vi.unstubAllGlobals();await Promise.all(apps.splice(0).map(app=>app.close()))});
it("forwards bounded analysis hints while injecting session identity",async()=>{
 let forwarded:unknown;
 vi.stubGlobal("fetch",vi.fn(async(url:unknown,options?:RequestInit)=>{
   if(String(url).endsWith("/auth/me"))return new Response(JSON.stringify({user:{id:"u",login:"manager",displayName:"Михаил",role:"manager",city:"Воронеж",analysisPrompt:""}}));
   forwarded=JSON.parse(String(options?.body));return new Response(JSON.stringify({summary:"Ответ",selectedOfferIds:[],appliedFilters:[],warnings:[]}));
 }));
 const app=buildGatewayApp();apps.push(app);const context={tableFilter:{packaging:"BOX",inStockOnly:true},selectedOfferIds:["box"]};
 const response=await app.inject({method:"POST",url:"/api/v1/searches/s/analyze",headers:{cookie:"pr_session=test"},payload:{prompt:"до 15 тысяч",context,userName:"подмена",userRole:"admin"}});
 expect(response.statusCode).toBe(200);expect(forwarded).toMatchObject({context,userName:"Михаил",userRole:"manager"});
});

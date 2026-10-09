import { beforeEach, expect, it, vi } from "vitest";
import type { OfferTableFilter, Product } from "@peremena/contracts";
const api=vi.hoisted(()=>({start:vi.fn(),subscribe:vi.fn(()=>({close:vi.fn()})),history:vi.fn(async()=>({entries:[]}))}));
vi.mock("../api",()=>({searchApi:api}));
import { useSearchStore } from "./index";
const product:Product={id:"typed",name:"12400F",model:"12400F",brand:"Intel",mpn:"",category:"Процессоры",characteristics:{источник:"typed"}};
beforeEach(()=>{vi.clearAllMocks();useSearchStore.getState().reset()});
it("keeps compound command filters while first results are loading",async()=>{
 let finish!:(value:unknown)=>void;api.start.mockReturnValue(new Promise(resolve=>{finish=resolve}));
 const filter:OfferTableFilter={realOnly:true,packaging:"BOX",maxPrice:15000};
 const start=useSearchStore.getState().start as (p:Product,f?:OfferTableFilter)=>Promise<void>;
 const pending=start(product,filter);
 expect(useSearchStore.getState().tableFilter).toEqual(filter);
 finish({id:"s",query:"12400F",product,status:"running",sources:[],offers:[]});await pending;
 expect(useSearchStore.getState().tableFilter).toEqual(filter);
});

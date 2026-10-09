import {beforeEach,expect,it,vi} from "vitest";
const api=vi.hoisted(()=>({sources:vi.fn()}));
vi.mock("../api",()=>({searchApi:api}));
import {useSearchStore} from "./index";
beforeEach(()=>{vi.resetAllMocks();useSearchStore.getState().reset();api.sources.mockResolvedValue({sources:["DNS","NETLAB"],disabledSources:[{name:"DNS",reason:"Временно недоступен"}]})});
it("removes saved disabled choices and keeps disabled metadata for display",async()=>{
 useSearchStore.setState({selectedSources:["DNS"]});await useSearchStore.getState().loadSources();
 expect(useSearchStore.getState().availableSources).toEqual(["NETLAB"]);expect(useSearchStore.getState().selectedSources).toEqual(["NETLAB"]);
 expect((useSearchStore.getState() as unknown as {disabledSources:unknown[]}).disabledSources).toEqual([{name:"DNS",reason:"Временно недоступен"}]);
});
it("cannot select a disabled source after loading availability",async()=>{
 await useSearchStore.getState().loadSources();useSearchStore.getState().setSelectedSources(["NETLAB","DNS"]);
 expect(useSearchStore.getState().selectedSources).toEqual(["NETLAB"]);
});
it("supports older source responses without availability metadata",async()=>{
 api.sources.mockResolvedValue({sources:["NETLAB"]});await useSearchStore.getState().loadSources();
 expect(useSearchStore.getState().availableSources).toEqual(["NETLAB"]);
 expect((useSearchStore.getState() as unknown as {disabledSources:unknown[]}).disabledSources).toEqual([]);
});

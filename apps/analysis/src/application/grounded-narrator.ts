import type { AnalysisNarrator, CopilotChatInput, TrustedNarrationContext } from "../domain/analysis-narrator.js";
import { NarrationError } from "../domain/narration-error.js";
import { validateGroundedNarration } from "./grounded-narration.js";

/** Model prose cannot introduce facts or actions outside the current server snapshot. */
export function groundedNarrator(narrator: AnalysisNarrator | undefined, context: TrustedNarrationContext): AnalysisNarrator | undefined {
  if (!narrator) return undefined;
  return {
    name:narrator.name,
    summarize:async input=>{
      const selected=input.rankedOffers.filter(o=>input.selectedOfferIds.includes(o.id));
      const result=await narrator.summarize({...input,trustedContext:{...context,offers:input.rankedOffers,selectedOfferIds:input.selectedOfferIds}});
      if(!validateGroundedNarration(result.summary,result.offerIds,selected) || result.warnings.some(w=>!validateGroundedNarration(w,[],[]))) throw new NarrationError("invalid_response");
      return result;
    },
    ...(narrator.answer ? {answer:async(input:CopilotChatInput)=>{
      const result=await narrator.answer!({...input,trustedContext:context});
      if(result.clarificationQuestion) {const {searchQuery:ignored,...rest}=result;return {...rest,summary:"Что нужно уточнить в текущем товаре: модель, комплектацию или условия предложения?",clarificationQuestion:"Что нужно уточнить в текущем товаре: модель, комплектацию или условия предложения?",intent:"help" as const};}
      // Only the deterministic command router may start a new search from an open table.
      if(result.intent==="search") return {summary:"Уточнить текущий товар или найти другую модель? Напишите модель либо нужное отличие.",warnings:[],intent:"help" as const,clarificationQuestion:"Уточнить текущий товар или найти другую модель?"};
      if(!validateGroundedNarration(result.summary,result.offerIds,context.offers) || result.warnings.some(w=>!validateGroundedNarration(w,[],[]))) throw new NarrationError("invalid_response");
      return result;
    }} : {}),
    // LLM relevance rejection is deliberately omitted: deterministic assessment owns selection.
  };
}

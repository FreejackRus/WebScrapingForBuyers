import type { AnalysisNarrator, CopilotChatInput, TrustedNarrationContext } from "../domain/analysis-narrator.js";
import { NarrationError } from "../domain/narration-error.js";
import { groundedNarrationProblem } from "./grounded-narration.js";

/** Refuses the model's text and logs why (server log only: prices and titles, no user data). */
function refuse(kind: "summary" | "answer", problem: string): never {
  console.warn(JSON.stringify({ msg: "narration_rejected", kind, problem }));
  throw new NarrationError("invalid_response");
}

/**
 * The summary must pass the fact check or the whole answer falls back to the deterministic text.
 * A warning that cannot be checked is dropped on its own instead of sinking a valid summary.
 */
function check<T extends { summary: string; offerIds?: string[]; warnings: string[] }>(kind: "summary" | "answer", result: T, allowed: Parameters<typeof groundedNarrationProblem>[2]): T {
  const problem = groundedNarrationProblem(result.summary, result.offerIds, allowed);
  if (problem) refuse(kind, problem);
  const warnings = result.warnings.filter((warning) => groundedNarrationProblem(warning, [], []) === undefined);
  if (warnings.length < result.warnings.length) {
    console.warn(JSON.stringify({ msg: "narration_warning_dropped", kind, dropped: result.warnings.length - warnings.length }));
  }
  return { ...result, warnings };
}

/** Model prose cannot introduce facts or actions outside the current server snapshot. */
export function groundedNarrator(narrator: AnalysisNarrator | undefined, context: TrustedNarrationContext): AnalysisNarrator | undefined {
  if (!narrator) return undefined;
  return {
    name:narrator.name,
    summarize:async input=>{
      const result=await narrator.summarize({...input,trustedContext:{...context,offers:input.rankedOffers,selectedOfferIds:input.selectedOfferIds}});
      // Any row the model was shown may be cited; each price must still sit next to its own row.
      return check("summary",result,input.rankedOffers);
    },
    ...(narrator.answer ? {answer:async(input:CopilotChatInput)=>{
      const result=await narrator.answer!({...input,trustedContext:context});
      if(result.clarificationQuestion) {const {searchQuery:ignored,...rest}=result;return {...rest,summary:"Что нужно уточнить в текущем товаре: модель, комплектацию или условия предложения?",clarificationQuestion:"Что нужно уточнить в текущем товаре: модель, комплектацию или условия предложения?",intent:"help" as const};}
      // Only the deterministic command router may start a new search from an open table.
      if(result.intent==="search") return {summary:"Уточнить текущий товар или найти другую модель? Напишите модель либо нужное отличие.",warnings:[],intent:"help" as const,clarificationQuestion:"Уточнить текущий товар или найти другую модель?"};
      return check("answer",result,context.offers);
    }} : {}),
    // LLM relevance rejection is deliberately omitted: deterministic assessment owns selection.
  };
}

import type { AnalyzeRequest, AnalysisResult, ChatTurn, JustificationResponse, OfferReviewResponse } from "@peremena/contracts";

import { apiUrl, request } from "shared/api";

export const analysisApi = {
  analyze: (searchId: string, prompt: string, history: ChatTurn[] = [], context?: AnalyzeRequest["context"]) =>
    request<AnalysisResult>(apiUrl(`/searches/${searchId}/analyze`), {
      method: "POST",
      body: JSON.stringify({ prompt, history, ...(context ? { context } : {}) }),
    }),
  /** AI verdicts on rows the checks sent to «требует уточнения». */
  review: (searchId: string) =>
    request<OfferReviewResponse>(apiUrl(`/searches/${searchId}/review`), { method: "POST", body: "{}" }),
  /** Purchase justification memo for one row (AI text, or the template). */
  justify: (searchId: string, offerId: string) =>
    request<JustificationResponse>(apiUrl(`/searches/${searchId}/justify`), { method: "POST", body: JSON.stringify({ offerId }) }),
  /** Free-form copilot chat via Ollama (no search snapshot required). */
  chat: (prompt: string, history: ChatTurn[] = []) =>
    request<AnalysisResult>(apiUrl("/copilot/chat"), {
      method: "POST",
      body: JSON.stringify({ prompt, history }),
    }),
};

import type { AnalysisResult, ChatTurn } from "@peremena/contracts";

import { apiUrl, request } from "shared/api";

export const analysisApi = {
  analyze: (searchId: string, prompt: string, history: ChatTurn[] = []) =>
    request<AnalysisResult>(apiUrl(`/searches/${searchId}/analyze`), {
      method: "POST",
      body: JSON.stringify({ prompt, history }),
    }),
  /** Free-form copilot chat via Ollama (no search snapshot required). */
  chat: (prompt: string, history: ChatTurn[] = []) =>
    request<AnalysisResult>(apiUrl("/copilot/chat"), {
      method: "POST",
      body: JSON.stringify({ prompt, history }),
    }),
};

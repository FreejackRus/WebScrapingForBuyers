import type { AnalysisResult } from "@peremena/contracts";

import { apiUrl, request } from "shared/api";

export const analysisApi = {
  analyze: (searchId: string, prompt: string) =>
    request<AnalysisResult>(apiUrl(`/searches/${searchId}/analyze`), {
      method: "POST",
      body: JSON.stringify({ prompt }),
    }),
};

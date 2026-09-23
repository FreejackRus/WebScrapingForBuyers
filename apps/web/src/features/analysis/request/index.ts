import { useAnalysisStore } from "entities/analysis";

export function useRequestAnalysis() {
  return useAnalysisStore((state) => state.run);
}

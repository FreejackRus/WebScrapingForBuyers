import { useAnalysisStore } from "entities/analysis";
import { useSearchStore } from "entities/search";
import type { Product } from "@peremena/contracts";

export async function startSearch(product: Product) {
  useAnalysisStore.getState().reset();
  await useSearchStore.getState().start(product);
}

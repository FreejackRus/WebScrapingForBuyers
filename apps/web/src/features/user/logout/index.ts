import { useAnalysisStore } from "entities/analysis";
import { useSearchStore } from "entities/search";
import { useUserStore } from "entities/user";

export async function logout() {
  useSearchStore.getState().reset();
  useAnalysisStore.getState().reset();
  await useUserStore.getState().signOut();
}

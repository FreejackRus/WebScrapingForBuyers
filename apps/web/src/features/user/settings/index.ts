import { useUserStore } from "entities/user";

export function useUpdateSettings() {
  return useUserStore((state) => state.saveSettings);
}

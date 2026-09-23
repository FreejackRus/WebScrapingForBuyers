import { useEffect } from "react";

import { useSearchStore } from "entities/search";
import { useUserStore } from "entities/user";

export function useBootSession() {
  useEffect(() => {
    void useUserStore.getState().boot();
  }, []);

  useEffect(() => () => useSearchStore.getState().source?.close(), []);
}

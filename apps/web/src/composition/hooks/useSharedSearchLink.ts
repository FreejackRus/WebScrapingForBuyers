import { useEffect, useRef } from "react";

import { decodeSearchLink, startSearch } from "features/search";
import { useSearchStore } from "entities/search";

/** Opens a search shared by link (`#search=…`) once the buyer is signed in. */
export function useSharedSearchLink(signedIn: boolean) {
  const done = useRef(false);
  useEffect(() => {
    if (!signedIn || done.current) return;
    const shared = decodeSearchLink(window.location.hash);
    if (!shared) return;
    done.current = true;
    history.replaceState(null, "", window.location.pathname + window.location.search);
    void startSearch(shared.product).then(() => {
      if (shared.channel) useSearchStore.getState().setOfferChannel(shared.channel);
    });
  }, [signedIn]);
}

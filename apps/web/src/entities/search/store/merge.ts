import type { SearchSnapshot } from "@peremena/contracts";

export function sourceRank(status: SearchSnapshot["sources"][number]["status"]): number {
  if (status === "done" || status === "error") return 2;
  if (status === "loading") return 1;
  return 0;
}

export function mergeSnapshotOffers(
  current: SearchSnapshot | undefined,
  incoming: SearchSnapshot,
): SearchSnapshot {
  if (!current || current.id !== incoming.id) return incoming;
  const ids = new Set(incoming.offers.map((offer) => offer.id));
  const sources = incoming.sources.map((source) => {
    const previous = current.sources.find((entry) => entry.source === source.source);
    if (previous && sourceRank(previous.status) > sourceRank(source.status)) return previous;
    return source;
  });
  return {
    ...incoming,
    sources,
    offers: [...incoming.offers, ...current.offers.filter((offer) => !ids.has(offer.id))],
  };
}

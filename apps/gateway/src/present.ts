import type { SearchSnapshot, SessionUser, SourceState } from "@peremena/contracts";

function presentSource(source: SourceState, user?: SessionUser): SourceState {
  if (user?.role === "admin") return source;
  return {
    source: source.source,
    status: source.status,
  };
}

export function presentSnapshot(snapshot: SearchSnapshot | undefined, user?: SessionUser) {
  if (!snapshot) return snapshot;
  if (user?.role === "admin") return snapshot;
  return {
    ...snapshot,
    sources: snapshot.sources.map((source) => presentSource(source, user)),
  };
}

export function presentEvent(event: unknown, user?: SessionUser) {
  if (!event || typeof event !== "object" || !("type" in event)) return event;
  const typed = event as { type: string; data: unknown };
  if (typed.type === "source" && user?.role !== "admin") {
    return { type: "source", data: presentSource(typed.data as SourceState, user) };
  }
  if ((typed.type === "snapshot" || typed.type === "complete") && typed.data) {
    return {
      type: typed.type,
      data: presentSnapshot(typed.data as SearchSnapshot, user),
    };
  }
  return event;
}

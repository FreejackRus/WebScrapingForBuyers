import type { SessionUser } from "@peremena/contracts";

interface Entry {
  user: SessionUser;
  expiresAt: number;
}

/**
 * Short-lived cache of the identity lookup so every API call, SSE stream and export
 * does not cost an extra hop. Cleared on logout and on settings changes.
 */
export class UserCache {
  private readonly entries = new Map<string, Entry>();

  constructor(
    private readonly ttlMs = 10_000,
    private readonly maxEntries = 500,
    private readonly now: () => number = Date.now,
  ) {}

  get(cookie: string): SessionUser | undefined {
    const entry = this.entries.get(cookie);
    if (!entry) return undefined;
    if (entry.expiresAt <= this.now()) {
      this.entries.delete(cookie);
      return undefined;
    }
    return entry.user;
  }

  set(cookie: string, user: SessionUser): void {
    this.entries.delete(cookie);
    this.entries.set(cookie, { user, expiresAt: this.now() + this.ttlMs });
    while (this.entries.size > this.maxEntries) {
      const oldest = this.entries.keys().next().value;
      if (oldest === undefined) break;
      this.entries.delete(oldest);
    }
  }

  clear(): void {
    this.entries.clear();
  }
}

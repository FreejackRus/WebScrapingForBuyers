interface Attempts {
  count: number;
  windowEndsAt: number;
}

/**
 * Counts failed sign-ins per login. The key is the login, not the address: the
 * gateway sits behind nginx and the client-supplied X-Forwarded-For can be forged,
 * so an address-based limit would be trivial to dodge. The trade-off is that someone
 * on the network can lock a colleague out for one window; the window is short.
 */
export class LoginLimiter {
  private readonly attempts = new Map<string, Attempts>();

  constructor(
    private readonly maxFailures = 5,
    private readonly windowMs = 10 * 60_000,
    private readonly maxKeys = 5_000,
    private readonly now: () => number = Date.now,
  ) {}

  /** Seconds the caller must wait, or 0 when another attempt is allowed. */
  retryAfterSeconds(login: string): number {
    const key = normalize(login);
    const entry = this.attempts.get(key);
    if (!entry) return 0;
    if (entry.windowEndsAt <= this.now()) {
      this.attempts.delete(key);
      return 0;
    }
    return entry.count >= this.maxFailures ? Math.ceil((entry.windowEndsAt - this.now()) / 1000) : 0;
  }

  recordFailure(login: string): void {
    const key = normalize(login);
    const current = this.attempts.get(key);
    const fresh = !current || current.windowEndsAt <= this.now();
    this.attempts.delete(key);
    this.attempts.set(key, {
      count: fresh ? 1 : current.count + 1,
      windowEndsAt: fresh ? this.now() + this.windowMs : current.windowEndsAt,
    });
    while (this.attempts.size > this.maxKeys) {
      const oldest = this.attempts.keys().next().value;
      if (oldest === undefined) break;
      this.attempts.delete(oldest);
    }
  }

  reset(login: string): void {
    this.attempts.delete(normalize(login));
  }
}

function normalize(login: string): string {
  return login.trim().toLocaleLowerCase("ru");
}

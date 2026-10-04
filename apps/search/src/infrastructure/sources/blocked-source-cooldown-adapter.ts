import type { Offer, Product } from "@peremena/contracts";

import type { SourceAdapter } from "../../domain/source-adapter.js";

const DEFAULT_COOLDOWN_MS = 15 * 60 * 1000;

/** Avoid repeatedly probing an upstream that has explicitly blocked this session. */
export class BlockedSourceCooldownAdapter implements SourceAdapter {
  readonly name: string;
  private blockedUntil = 0;
  private recoveryProbeInFlight = false;

  constructor(
    private readonly source: SourceAdapter,
    private readonly isBlocked: (message: string) => boolean,
    private readonly now: () => number = Date.now,
    private readonly cooldownMs = DEFAULT_COOLDOWN_MS,
  ) {
    this.name = source.name;
  }

  async search(product: Product, signal?: AbortSignal): Promise<Offer[]> {
    const currentTime = this.now();
    if (currentTime < this.blockedUntil) {
      throw new Error(`${this.name}: источник временно недоступен; автоматическая проверка при следующем поиске.`);
    }

    const recoveryProbe = this.blockedUntil > 0;
    if (recoveryProbe && this.recoveryProbeInFlight) {
      throw new Error(`${this.name}: проверка доступности уже выполняется.`);
    }
    if (recoveryProbe) this.recoveryProbeInFlight = true;

    try {
      const offers = await this.source.search(product, signal);
      this.blockedUntil = 0;
      return offers;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.blockedUntil = this.isBlocked(message) ? this.now() + this.cooldownMs : 0;
      throw error;
    } finally {
      if (recoveryProbe) this.recoveryProbeInFlight = false;
    }
  }
}

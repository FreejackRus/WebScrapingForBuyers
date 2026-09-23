import { afterEach, describe, expect, it } from "vitest";

import {
  assertWbCatalogAllowed,
  noteWbRateLimited,
  presentWbRateLimited,
  remainingWbCooldownMs,
  resetWbRateLimitForTests,
} from "./wb-rate-limit.js";

afterEach(() => {
  resetWbRateLimitForTests();
});

describe("wb rate-limit cooldown", () => {
  it("stays clear until a 429 is recorded", () => {
    expect(remainingWbCooldownMs()).toBe(0);
    expect(() => assertWbCatalogAllowed()).not.toThrow();
  });

  it("blocks the next catalog call after a rate-limit and keeps the status short", () => {
    noteWbRateLimited();
    expect(remainingWbCooldownMs()).toBeGreaterThan(0);
    expect(() => assertWbCatalogAllowed()).toThrow(/WB rate-limited/);
    expect(presentWbRateLimited("HTTP 429")).not.toContain("VNC");
    expect(presentWbRateLimited("HTTP 429")).not.toContain("headed Chrome");
  });
});

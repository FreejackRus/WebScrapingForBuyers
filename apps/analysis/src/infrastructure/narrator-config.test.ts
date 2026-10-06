import { describe, expect, it } from "vitest";

import { DEFAULT_SAMPLING, keepAliveFromEnv, samplingFromEnv } from "./ollama-analysis-narrator.js";

describe("narrator config from env", () => {
  it("keeps the A/B-chosen sampling unless overridden with valid numbers", () => {
    expect(samplingFromEnv(undefined)).toEqual(DEFAULT_SAMPLING);
    expect(samplingFromEnv("not json")).toEqual(DEFAULT_SAMPLING);
    expect(samplingFromEnv('{"temperature":0.3,"top_k":20,"presence_penalty":"x"}')).toEqual({
      temperature: 0.3,
      top_p: 0.8,
      top_k: 20,
      min_p: 0,
    });
  });

  it("reads keep_alive as a number for -1 and as a duration otherwise", () => {
    expect(keepAliveFromEnv(undefined)).toBe("10m");
    expect(keepAliveFromEnv("-1")).toBe(-1);
    expect(keepAliveFromEnv("30m")).toBe("30m");
  });
});

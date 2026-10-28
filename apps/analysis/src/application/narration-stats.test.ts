import { describe, expect, it } from "vitest";

import { NarrationStatsRecorder } from "./narration-stats.js";

describe("NarrationStatsRecorder", () => {
  it("counts answers and keeps the latest ten refusals, newest first", () => {
    const recorder = new NarrationStatsRecorder(() => new Date("2026-10-29T00:00:00Z"));
    recorder.accepted();
    for (let index = 0; index < 12; index += 1) recorder.rejected("summary", `причина ${index}`);
    recorder.warningsDropped(2);
    const stats = recorder.snapshot();
    expect(stats).toMatchObject({ accepted: 1, rejected: 12, warningsDropped: 2 });
    expect(stats.recent).toHaveLength(10);
    expect(stats.recent[0]?.problem).toBe("причина 11");
  });
});

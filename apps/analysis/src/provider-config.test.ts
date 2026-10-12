import { afterEach, describe, expect, it, vi } from "vitest";

import { buildAnalysisApp } from "./app.js";

const apps: Array<ReturnType<typeof buildAnalysisApp>> = [];

afterEach(async () => {
  vi.unstubAllEnvs();
  await Promise.all(apps.splice(0).map((app) => app.close()));
});

describe("analysis provider configuration", () => {
  it("selects vLLM explicitly", async () => {
    vi.stubEnv("AI_PROVIDER", "vllm");
    vi.stubEnv("VLLM_BASE_URL", "http://vllm:8000/v1");
    vi.stubEnv("VLLM_MODEL", "Qwen/Qwen3");
    vi.stubEnv("VLLM_API_KEY", "local-token");
    const app = buildAnalysisApp();
    apps.push(app);
    expect((await app.inject({ method: "GET", url: "/health" })).json().provider).toBe("vLLM · Qwen/Qwen3");
  });

  it("keeps Ollama as the legacy default", async () => {
    vi.stubEnv("AI_PROVIDER", "");
    vi.stubEnv("OLLAMA_BASE_URL", "http://ollama:11434");
    vi.stubEnv("OLLAMA_MODEL", "qwen3.8:27b-q8_0");
    const app = buildAnalysisApp();
    apps.push(app);
    expect((await app.inject({ method: "GET", url: "/health" })).json().provider).toBe("Ollama · qwen3.8:27b-q8_0");
  });

  it.each([
    ["missing vLLM URL", { AI_PROVIDER: "vllm", VLLM_BASE_URL: "", VLLM_MODEL: "qwen" }],
    ["missing vLLM model", { AI_PROVIDER: "vllm", VLLM_BASE_URL: "http://vllm/v1", VLLM_MODEL: "" }],
    ["unknown provider", { AI_PROVIDER: "paid-cloud" }],
  ])("fails explicitly for %s", (_case, env) => {
    for (const [key, value] of Object.entries(env)) vi.stubEnv(key, value);
    expect(() => buildAnalysisApp()).toThrow(/AI_PROVIDER|VLLM_/);
  });
});

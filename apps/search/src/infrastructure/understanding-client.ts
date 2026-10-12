import type { QueryUnderstanding } from "@peremena/contracts";

/** Asks the analysis service (local LLM) how to read a request. Any failure → undefined, the search goes on. */
export async function fetchUnderstanding(query: string, timeoutMs = 8_000): Promise<QueryUnderstanding | undefined> {
  const base = process.env.ANALYSIS_URL?.trim();
  if (!base || /^(?:0|false|no|off)$/i.test(process.env.AI_QUERY_UNDERSTANDING?.trim() ?? "")) return undefined;
  try {
    const response = await fetch(`${base.replace(/\/$/, "")}/understand`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ query }),
      signal: AbortSignal.timeout(timeoutMs),
    });
    if (!response.ok) return undefined;
    const payload = (await response.json()) as { understanding?: QueryUnderstanding | null };
    return payload.understanding ?? undefined;
  } catch {
    return undefined;
  }
}

import { beforeEach, describe, expect, it, vi } from "vitest";

describe("request()", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("sets Content-Type: application/json only when body is a string", async () => {
    const mockFetch = vi.fn();
    globalThis.fetch = mockFetch;

    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ result: "ok" }),
    });

    const { request } = await import("./index");

    // String body should get Content-Type header
    await request("/api/test", { method: "POST", body: '{"foo":"bar"}' });
    expect(mockFetch).toHaveBeenCalledWith(
      "/api/test",
      expect.objectContaining({
        headers: expect.objectContaining({ "Content-Type": "application/json" }),
      })
    );

    mockFetch.mockClear();

    // FormData should NOT get Content-Type header (browser will set it with boundary)
    const formData = new FormData();
    formData.append("file", new Blob(["test"], { type: "text/plain" }));
    await request("/api/upload", { method: "POST", body: formData });

    const callArgs = mockFetch.mock.calls[0];
    expect(callArgs).toBeDefined();
    if (callArgs?.[1]) {
      expect(callArgs[1].headers).not.toHaveProperty("Content-Type", "application/json");
    }

    mockFetch.mockClear();

    // No body should not get Content-Type header
    await request("/api/delete", { method: "DELETE" });
    expect(mockFetch).toHaveBeenCalledWith(
      "/api/delete",
      expect.objectContaining({
        headers: expect.not.objectContaining({ "Content-Type": "application/json" }),
      })
    );
  });
});

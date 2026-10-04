import type { Offer, Product } from "@peremena/contracts";
import { describe, expect, it, vi } from "vitest";

import type { SourceAdapter } from "../../domain/source-adapter.js";
import { BlockedSourceCooldownAdapter } from "./blocked-source-cooldown-adapter.js";

const product: Product = {
  id: "test",
  brand: "Logitech",
  model: "K380",
  name: "Logitech K380",
  mpn: "920-007580",
  category: "Клавиатуры",
  characteristics: {},
};

function makeAdapter(search: SourceAdapter["search"], now: () => number) {
  return new BlockedSourceCooldownAdapter(
    { name: "Яндекс Маркет", search },
    (message) => /blocked/i.test(message),
    now,
    1_000,
  );
}

describe("BlockedSourceCooldownAdapter", () => {
  it("skips a blocked source until its cooldown expires, then retries automatically", async () => {
    let time = 100;
    const search = vi.fn<SourceAdapter["search"]>()
      .mockRejectedValueOnce(new Error("blocked"))
      .mockResolvedValue([]);
    const adapter = makeAdapter(search, () => time);

    await expect(adapter.search(product)).rejects.toThrow("blocked");
    time = 500;
    await expect(adapter.search(product)).rejects.toThrow("временно недоступен");
    expect(search).toHaveBeenCalledTimes(1);

    time = 1_100;
    await expect(adapter.search(product)).resolves.toEqual([]);
    await expect(adapter.search(product)).resolves.toEqual([]);
    expect(search).toHaveBeenCalledTimes(3);
  });

  it("allows only one recovery probe at a time", async () => {
    let time = 100;
    let finish: (offers: Offer[]) => void = () => undefined;
    const search = vi.fn<SourceAdapter["search"]>()
      .mockRejectedValueOnce(new Error("blocked"))
      .mockImplementationOnce(() => new Promise<Offer[]>((resolve) => { finish = resolve; }));
    const adapter = makeAdapter(search, () => time);

    await expect(adapter.search(product)).rejects.toThrow("blocked");
    time = 1_100;
    const first = adapter.search(product);
    await expect(adapter.search(product)).rejects.toThrow("уже выполняется");
    expect(search).toHaveBeenCalledTimes(2);
    finish([]);
    await expect(first).resolves.toEqual([]);
  });

  it("does not cool down unrelated transport errors", async () => {
    const search = vi.fn<SourceAdapter["search"]>()
      .mockRejectedValueOnce(new Error("temporary network failure"))
      .mockResolvedValueOnce([]);
    const adapter = makeAdapter(search, () => 100);

    await expect(adapter.search(product)).rejects.toThrow("temporary network failure");
    await expect(adapter.search(product)).resolves.toEqual([]);
    expect(search).toHaveBeenCalledTimes(2);
  });
});

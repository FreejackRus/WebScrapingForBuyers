import { describe, expect, it } from "vitest";

import { isUnrequestedConsumablePart } from "./consumable-parts.js";
import { matchesOriginIntent, offerOrigin, originIntent } from "./origin-intent.js";

const pantum = { brand: "Pantum" };
const offer = (title: string, seller = "Продавец") => ({ title, seller });

describe("originIntent", () => {
  it("reads original and compatible wording in the query", () => {
    expect(originIntent("картридж pantum tl-5120 оригинальный")).toBe("original");
    expect(originIntent("TL-5120 original")).toBe("original");
    expect(originIntent("картридж TL-5120 совместимый")).toBe("compatible");
    expect(originIntent("картридж TL-5120 неоригинальный")).toBe("compatible");
    expect(originIntent("аналог TL-5120")).toBe("compatible");
    expect(originIntent("картридж pantum tl-5120")).toBeUndefined();
  });
});

describe("offerOrigin", () => {
  it("classifies compatible listings by wording, third-party brand and «для <бренд>»", () => {
    expect(offerOrigin(offer("Картридж совместимый TL-5120 для Pantum BP5100"), pantum)).toBe("compatible");
    expect(offerOrigin(offer("Картридж NV Print TL-5120 черный"), pantum)).toBe("compatible");
    expect(offerOrigin(offer("Картридж TL-5120", "Cactus"), pantum)).toBe("compatible");
    expect(offerOrigin(offer("Картридж для Pantum TL-5120, 3000 стр."), pantum)).toBe("compatible");
  });

  it("classifies originals and leaves plain listings unknown", () => {
    expect(offerOrigin(offer("Картридж Pantum TL-5120 оригинальный"), pantum)).toBe("original");
    expect(offerOrigin(offer("Pantum TL-5120 Original toner cartridge"), pantum)).toBe("original");
    expect(offerOrigin(offer("Картридж Pantum TL-5120 черный"), pantum)).toBe("unknown");
    expect(offerOrigin(offer("Тонер-картридж Pantum TL-5120 для Pantum BP5100DN"), pantum)).toBe("unknown");
  });
});

describe("matchesOriginIntent", () => {
  it("drops only rows that contradict the request", () => {
    const compatible = offer("Картридж Hi-Black TL-5120");
    const original = offer("Картридж Pantum TL-5120 оригинал");
    const plain = offer("Картридж Pantum TL-5120");
    expect(matchesOriginIntent(compatible, pantum, "original")).toBe(false);
    expect(matchesOriginIntent(original, pantum, "original")).toBe(true);
    expect(matchesOriginIntent(plain, pantum, "original")).toBe(true);
    expect(matchesOriginIntent(original, pantum, "compatible")).toBe(false);
    expect(matchesOriginIntent(compatible, pantum, "compatible")).toBe(true);
    expect(matchesOriginIntent(compatible, pantum, undefined)).toBe(true);
  });
});

describe("isUnrequestedConsumablePart", () => {
  it("drops chips, toner and drums for a cartridge query", () => {
    expect(isUnrequestedConsumablePart({ title: "Чип для картриджа Pantum TL-5120" }, "картридж 5120")).toBe(true);
    expect(isUnrequestedConsumablePart({ title: "Тонер для Pantum TL-5120, 100 г" }, "картридж 5120")).toBe(true);
    expect(isUnrequestedConsumablePart({ title: "Фотобарабан Pantum DL-5120" }, "картридж 5120")).toBe(true);
  });

  it("keeps cartridges and keeps parts the buyer asked for", () => {
    expect(isUnrequestedConsumablePart({ title: "Картридж Pantum TL-5120" }, "картридж 5120")).toBe(false);
    expect(isUnrequestedConsumablePart({ title: "Тонер-картридж Pantum TL-5120" }, "картридж 5120")).toBe(false);
    expect(isUnrequestedConsumablePart({ title: "Чип для картриджа Pantum TL-5120" }, "чип TL-5120")).toBe(false);
    expect(isUnrequestedConsumablePart({ title: "Фотобарабан Pantum DL-5120" }, "драм-картридж DL-5120")).toBe(false);
  });
});

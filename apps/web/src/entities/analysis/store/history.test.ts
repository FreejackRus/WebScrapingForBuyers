import { describe, expect, it } from "vitest";

import { chatHistory, type ChatMessage } from "./index";

function message(role: ChatMessage["role"], text: string): ChatMessage {
  return { id: text, role, text, citations: [] };
}

describe("chatHistory", () => {
  it("sends the last six shown turns, oldest first, without transport failures", () => {
    const messages = [
      message("user", "Сравни лучшие предложения"),
      message("assistant", "Лучший — Авито за 290 ₽."),
      message("user", "где есть наличие"),
      message("assistant", "Не удалось обратиться к анализу. Повторите запрос."),
      message("user", "где есть наличие"),
      message("assistant", "Подтверждённого наличия нет ни у одного."),
      message("user", "так стопэ"),
      message("assistant", "Слышу вас."),
    ];
    const history = chatHistory(messages);
    expect(history).toHaveLength(6);
    expect(history.map((turn) => turn.text)).not.toContain("Не удалось обратиться к анализу. Повторите запрос.");
    expect(history.at(-1)).toEqual({ role: "assistant", text: "Слышу вас." });
  });
});

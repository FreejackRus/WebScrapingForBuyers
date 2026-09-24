export type NarrationFailure =
  | "timeout"
  | "unavailable"
  | "incomplete"
  | "invalid_response"
  | "context_limit"
  | "language";

const FAILURE_MESSAGES: Record<NarrationFailure, string> = {
  timeout: "истекло время ожидания локальной модели",
  unavailable: "локальная модель временно недоступна",
  incomplete: "локальная модель не завершила ответ",
  invalid_response: "ответ локальной модели не прошёл проверку формата",
  context_limit: "данные превышают лимит контекста локальной модели",
  language: "локальная модель не сформировала ответ на русском языке",
};

/** Only these closed, non-sensitive reasons may cross into a user-facing fallback. */
export class NarrationError extends Error {
  constructor(readonly reason: NarrationFailure) {
    super(FAILURE_MESSAGES[reason]);
    this.name = "NarrationError";
  }
}

export function narrationFailureMessage(error: unknown): string {
  return error instanceof NarrationError
    ? FAILURE_MESSAGES[error.reason]
    : FAILURE_MESSAGES.unavailable;
}

/**
 * Cheap heuristic: user-facing narrator prose that is clearly English.
 * Allows Latin product names (Lenovo, MX Master) inside otherwise Russian text.
 */
export function looksStronglyEnglish(text: string): boolean {
  const trimmed = text.trim();
  if (!trimmed) return false;

  if (
    /^(The |This |Based on |According to |Here |I |I've |I'll |We |Please |Following |Provided )/i.test(
      trimmed,
    )
  ) {
    return true;
  }

  if (/\b(provided JSON|contains a list|based on the (data|JSON|offers))\b/i.test(trimmed)) {
    return true;
  }

  const hasCyrillic = /[А-Яа-яЁё]/.test(trimmed);
  const words = trimmed.match(/[A-Za-zА-Яа-яЁё]+/g) ?? [];
  if (words.length < 4) return false;

  const asciiWords = words.filter((w) => /^[A-Za-z]+$/.test(w));
  if (!hasCyrillic && asciiWords.length >= 4) {
    return true;
  }

  const markers =
    trimmed.match(
      /\b(the|and|with|from|that|this|contains|provided|offers|based|following|laptops|gaming)\b/gi,
    ) ?? [];
  if (!hasCyrillic && markers.length >= 2) return true;
  if (markers.length >= 4 && asciiWords.length / words.length > 0.75) return true;

  return false;
}

export function narrationNeedsRussianRetry(summary: string, warnings: string[]): boolean {
  if (looksStronglyEnglish(summary)) return true;
  return warnings.some((w) => looksStronglyEnglish(w));
}

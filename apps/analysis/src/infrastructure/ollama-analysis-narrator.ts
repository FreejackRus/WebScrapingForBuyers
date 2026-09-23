import type { Offer } from "@peremena/contracts";

import type { AnalysisNarration, AnalysisNarrator } from "../domain/analysis-narrator.js";

interface OllamaChatResponse {
  message?: { content?: string };
}

interface StructuredAnalysis {
  summary: string;
  warnings: string[];
}

export function toExplanationRow(offer: Offer, selected: boolean) {
  return {
    id: offer.id,
    source: offer.source,
    seller: offer.seller,
    title: offer.title,
    mpn: offer.mpn ?? null,
    price: offer.price,
    priceCondition: offer.priceCondition,
    availability: offer.availability,
    delivery: offer.delivery ?? null,
    warranty: offer.warranty ?? null,
    match: offer.match,
    condition: offer.condition,
    demo: offer.demo,
    url: offer.url,
    selected,
  };
}

export class OllamaAnalysisNarrator implements AnalysisNarrator {
  readonly name: string;

  constructor(
    private readonly baseUrl: string,
    private readonly model: string,
  ) {
    this.name = `Ollama · ${model}`;
  }

  async summarize(input: AnalysisNarration): Promise<StructuredAnalysis> {
    const selected = new Set(input.selectedOfferIds);
    const compactOffers = input.rankedOffers
      .slice(0, 20)
      .map((offer) => toExplanationRow(offer, selected.has(offer.id)));
    const response = await fetch(`${this.baseUrl.replace(/\/$/, "")}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(120_000),
      body: JSON.stringify({
        model: this.model,
        stream: false,
        think: false,
        keep_alive: "10m",
        options: { temperature: 0.1, top_p: 0.9 },
        format: {
          type: "object",
          properties: {
            summary: { type: "string" },
            warnings: { type: "array", items: { type: "string" } },
          },
          required: ["summary", "warnings"],
        },
        messages: [
          {
            role: "system",
            content:
              "Ты аналитик закупок IT-компании. Объясняй только переданные данные на русском. " +
              "В поле offers — уже отранжированная таблица из кода поиска (source, price, demo, seller, url). " +
              "Строки с selected=true выбраны детерминированным отбором; не меняй состав выборки. " +
              "Не придумывай цены, наличие, доставку, URL или продавцов. Ссылки рисует клиент из citations. " +
              "Кратко объясни результат и риски.",
          },
          {
            role: "user",
            content: JSON.stringify({
              request: input.prompt,
              query: input.snapshotQuery,
              product: input.productName,
              snapshotStatus: input.snapshotStatus,
              deterministicSummary: input.deterministicSummary,
              appliedFilters: input.appliedFilters,
              selectedOfferIds: input.selectedOfferIds,
              offers: compactOffers,
            }),
          },
        ],
      }),
    });
    if (!response.ok) {
      throw new Error(`Ollama вернула HTTP ${response.status}`);
    }
    const payload = (await response.json()) as OllamaChatResponse;
    const content = payload.message?.content;
    if (!content) throw new Error("Ollama вернула пустой ответ");
    const parsed = JSON.parse(content) as Partial<StructuredAnalysis>;
    if (typeof parsed.summary !== "string" || !Array.isArray(parsed.warnings)) {
      throw new Error("Ollama вернула ответ неверного формата");
    }
    return {
      summary: parsed.summary,
      warnings: parsed.warnings.filter((warning): warning is string => typeof warning === "string"),
    };
  }
}

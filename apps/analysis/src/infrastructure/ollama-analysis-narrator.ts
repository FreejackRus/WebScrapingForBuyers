import type { ChatIntent, Offer } from "@peremena/contracts";

import type {
  AnalysisNarration,
  AnalysisNarrator,
  CopilotChatAnswer,
  CopilotChatInput,
  RelevanceFilterInput,
  RelevanceFilterResult,
} from "../domain/analysis-narrator.js";

interface OllamaChatResponse {
  message?: { content?: string };
}

interface StructuredAnalysis {
  summary: string;
  warnings: string[];
}

const CHAT_INTENTS = new Set<ChatIntent>([
  "explain",
  "filter",
  "search",
  "help",
  "export",
  "sources",
  "ranking",
  "demo",
  "admin",
  "blocked",
]);

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

const SYSTEM_PROMPT =
  "Ты копайлот закупок ПЕРЕМЕНА Price Radar — не общий чат-бот. " +
  "Твоя задача: кратко объяснить детерминированный отбор предложений в таблице поиска для менеджера закупок. " +
  "Отвечай только про таблицу предложений, фильтры, источники/коннекторы, демо vs реальные цены, Excel-выгрузку, сравнение цен и выбор оффера. " +
  "Не веди светскую беседу и не отвечай на темы вне Price Radar. " +
  "Формат ответа строго JSON: summary (2–5 предложений на русском) и warnings (массив коротких рисков). " +
  "В поле offers — уже отранжированная таблица из кода (source, price, demo, seller, url). " +
  "Строки с selected=true выбраны детерминированным отбором; не меняй состав выборки и не придумывай цены, наличие, доставку, URL или продавцов. " +
  "Ссылки рисует клиент из citations. Если передано addressAs — обратись по этому имени в начале summary.";

const CHAT_SYSTEM_PROMPT =
  "Ты копайлот закупок ПЕРЕМЕНА Price Radar — не общий чат-бот и не свободный ассистент. " +
  "Отвечай по-русски, коротко (2–5 предложений), только про Price Radar: кто ты, как пользоваться, " +
  "таблица предложений, фильтры, источники, демо vs REAL, Excel, ранжирование по цене (его считает код), " +
  "релевантность наименования (модель может отсеять лишние ID), как уточнить модель для нового поиска. " +
  "На приветствие поздоровайся по addressAs (если есть) и кратко напомни, чем помогаешь в закупках. " +
  "Если пользователь просит найти/поискать/уточнить модель товара — поставь intent=«search» и searchQuery = чистый бренд/модель/артикул без глаголов «найди/поищи». " +
  "Не выдумывай цены, наличие, URL и не обещай действий вне UI. " +
  "Формат строго JSON: summary (строка), warnings (массив строк), опционально intent (строка) и searchQuery (строка).";

const RELEVANCE_SYSTEM_PROMPT =
  "Ты фильтр релевантности офферов Price Radar. " +
  "Сравни карточку товара (brand/model/name/mpn) с title/mpn кандидатов. " +
  "Верни JSON: rejectedOfferIds — id явно чужих товаров (другая модель, чехол/кабель/аксессуар вместо самого товара, другой бренд без совпадения). " +
  "Пустой rejectedOfferIds = оставить всех. Не отбрасывай спорные близкие варианты (цвет, комплектация той же модели). " +
  "Не меняй цены и не ранжируй — только отсев ID. warnings — короткий массив (можно пустой).";

export class OllamaAnalysisNarrator implements AnalysisNarrator {
  readonly name: string;

  constructor(
    private readonly baseUrl: string,
    private readonly model: string,
  ) {
    this.name = `Ollama · ${model}`;
  }

  private async chatJson<T>(
    system: string,
    userPayload: unknown,
    format: Record<string, unknown>,
  ): Promise<T> {
    const response = await fetch(`${this.baseUrl.replace(/\/$/, "")}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(120_000),
      body: JSON.stringify({
        model: this.model,
        stream: false,
        think: false,
        keep_alive: "10m",
        options: { temperature: 0.2, top_p: 0.9 },
        format,
        messages: [
          { role: "system", content: system },
          { role: "user", content: JSON.stringify(userPayload) },
        ],
      }),
    });
    if (!response.ok) {
      throw new Error(`Ollama вернула HTTP ${response.status}`);
    }
    const payload = (await response.json()) as OllamaChatResponse;
    const content = payload.message?.content;
    if (!content) throw new Error("Ollama вернула пустой ответ");
    return JSON.parse(content) as T;
  }

  async summarize(input: AnalysisNarration): Promise<StructuredAnalysis> {
    const selected = new Set(input.selectedOfferIds);
    const compactOffers = input.rankedOffers
      .slice(0, 20)
      .map((offer) => toExplanationRow(offer, selected.has(offer.id)));
    const parsed = await this.chatJson<Partial<StructuredAnalysis>>(
      SYSTEM_PROMPT,
      {
        purpose: "Объясни результат отбора для закупки в Price Radar; ranking уже посчитан кодом.",
        addressAs: input.addressAs ?? null,
        userName: input.userName ?? null,
        userRole: input.userRole ?? null,
        request: input.prompt,
        query: input.snapshotQuery,
        product: input.productName,
        snapshotStatus: input.snapshotStatus,
        deterministicSummary: input.deterministicSummary,
        appliedFilters: input.appliedFilters,
        selectedOfferIds: input.selectedOfferIds,
        offers: compactOffers,
      },
      {
        type: "object",
        properties: {
          summary: { type: "string" },
          warnings: { type: "array", items: { type: "string" } },
        },
        required: ["summary", "warnings"],
      },
    );
    if (typeof parsed.summary !== "string" || !Array.isArray(parsed.warnings)) {
      throw new Error("Ollama вернула ответ неверного формата");
    }
    return {
      summary: parsed.summary,
      warnings: parsed.warnings.filter((warning): warning is string => typeof warning === "string"),
    };
  }

  async answer(input: CopilotChatInput): Promise<CopilotChatAnswer> {
    const parsed = await this.chatJson<{
      summary?: unknown;
      warnings?: unknown;
      intent?: unknown;
      searchQuery?: unknown;
    }>(
      CHAT_SYSTEM_PROMPT,
      {
        purpose: "Ответь как копайлот Price Radar на вопрос пользователя (без выдуманных цен).",
        addressAs: input.addressAs ?? null,
        userName: input.userName ?? null,
        userRole: input.userRole ?? null,
        request: input.prompt,
        intentHint: input.intentHint ?? null,
        query: input.snapshotQuery ?? null,
        product: input.productName ?? null,
        offerCount: input.offerCount ?? 0,
        realCount: input.realCount ?? 0,
        demoCount: input.demoCount ?? 0,
        sources: input.sourceLines ?? [],
      },
      {
        type: "object",
        properties: {
          summary: { type: "string" },
          warnings: { type: "array", items: { type: "string" } },
          intent: { type: "string" },
          searchQuery: { type: "string" },
        },
        required: ["summary", "warnings"],
      },
    );
    if (typeof parsed.summary !== "string" || !Array.isArray(parsed.warnings)) {
      throw new Error("Ollama вернула ответ неверного формата");
    }
    const intentRaw = typeof parsed.intent === "string" ? parsed.intent.trim() : "";
    const intent = CHAT_INTENTS.has(intentRaw as ChatIntent) ? (intentRaw as ChatIntent) : undefined;
    const searchQuery =
      typeof parsed.searchQuery === "string" && parsed.searchQuery.trim().length >= 2
        ? parsed.searchQuery.trim()
        : undefined;
    return {
      summary: parsed.summary,
      warnings: parsed.warnings.filter((warning): warning is string => typeof warning === "string"),
      ...(intent ? { intent } : {}),
      ...(searchQuery ? { searchQuery } : {}),
    };
  }

  async filterRelevance(input: RelevanceFilterInput): Promise<RelevanceFilterResult> {
    const allowed = new Set(input.candidates.map((row) => row.id));
    const parsed = await this.chatJson<{
      rejectedOfferIds?: unknown;
      warnings?: unknown;
    }>(
      RELEVANCE_SYSTEM_PROMPT,
      {
        purpose: "Отсей нерелевантные офферы по названию относительно карточки товара.",
        addressAs: input.addressAs ?? null,
        request: input.prompt,
        query: input.snapshotQuery,
        product: {
          name: input.productName,
          brand: input.productBrand,
          model: input.productModel,
          mpn: input.productMpn,
        },
        candidates: input.candidates,
      },
      {
        type: "object",
        properties: {
          rejectedOfferIds: { type: "array", items: { type: "string" } },
          warnings: { type: "array", items: { type: "string" } },
        },
        required: ["rejectedOfferIds", "warnings"],
      },
    );
    const rejected = Array.isArray(parsed.rejectedOfferIds)
      ? parsed.rejectedOfferIds.filter(
          (id): id is string => typeof id === "string" && allowed.has(id),
        )
      : [];
    const warnings = Array.isArray(parsed.warnings)
      ? parsed.warnings.filter((warning): warning is string => typeof warning === "string")
      : [];
    return { rejectedOfferIds: rejected, warnings };
  }
}

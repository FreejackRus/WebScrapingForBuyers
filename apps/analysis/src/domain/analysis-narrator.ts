import type { ChatIntent, Offer, SearchSnapshot, UserRole } from "@peremena/contracts";

export interface AnalysisNarration {
  prompt: string;
  rankedOffers: Offer[];
  selectedOfferIds: string[];
  deterministicSummary: string;
  appliedFilters: string[];
  snapshotQuery: string;
  snapshotStatus: SearchSnapshot["status"];
  productName: string;
  userName?: string;
  userRole?: UserRole;
  /** First token of displayName for greetings. */
  addressAs?: string;
}

/** Free-form copilot Q&A (help, greetings, Excel, demo FAQ) — still Price Radar scoped. */
export interface CopilotChatInput {
  prompt: string;
  userName?: string;
  userRole?: UserRole;
  addressAs?: string;
  snapshotQuery?: string;
  productName?: string;
  offerCount?: number;
  realCount?: number;
  demoCount?: number;
  sourceLines?: string[];
  intentHint?: string;
}

export interface CopilotChatAnswer {
  summary: string;
  warnings: string[];
  /** Optional structured intent from the model (prefer for search). */
  intent?: ChatIntent;
  /** Clean brand/model query when intent is search. */
  searchQuery?: string;
}

/**
 * Compact offer rows for title/MPN relevance judgement.
 * LLM returns rejectedOfferIds only — empty means keep all.
 */
export interface RelevanceFilterInput {
  prompt: string;
  snapshotQuery: string;
  productName: string;
  productBrand: string;
  productModel: string;
  productMpn: string;
  candidates: Array<{
    id: string;
    title: string;
    mpn: string | null;
    match: Offer["match"];
    price: number;
    demo: boolean;
    source: string;
  }>;
  userName?: string;
  addressAs?: string;
}

export interface RelevanceFilterResult {
  rejectedOfferIds: string[];
  warnings: string[];
}

export interface AnalysisNarrator {
  readonly name: string;
  summarize(input: AnalysisNarration): Promise<{ summary: string; warnings: string[] }>;
  /** Optional: answer without ranking. Falls back to canned templates if missing. */
  answer?(input: CopilotChatInput): Promise<CopilotChatAnswer>;
  /**
   * Optional: drop irrelevant offer IDs by title/name/MPN vs product card.
   * Does not reorder by price — code still ranks. Fallback = keep all.
   */
  filterRelevance?(input: RelevanceFilterInput): Promise<RelevanceFilterResult>;
}

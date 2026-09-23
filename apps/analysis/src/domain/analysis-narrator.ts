import type { Offer, SearchSnapshot } from "@peremena/contracts";

export interface AnalysisNarration {
  prompt: string;
  rankedOffers: Offer[];
  selectedOfferIds: string[];
  deterministicSummary: string;
  appliedFilters: string[];
  snapshotQuery: string;
  snapshotStatus: SearchSnapshot["status"];
  productName: string;
}

export interface AnalysisNarrator {
  readonly name: string;
  summarize(input: AnalysisNarration): Promise<{ summary: string; warnings: string[] }>;
}

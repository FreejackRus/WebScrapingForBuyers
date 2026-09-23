import type { Offer, SearchSnapshot, UserRole } from "@peremena/contracts";

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

export interface AnalysisNarrator {
  readonly name: string;
  summarize(input: AnalysisNarration): Promise<{ summary: string; warnings: string[] }>;
}

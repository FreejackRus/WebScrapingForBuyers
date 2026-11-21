---
type: community
cohesion: 0.12
members: 45
---

# ollama-analysis-narrator.ts

**Cohesion:** 0.12 - loosely connected
**Members:** 45 nodes

## Members
- [[dot-answer()]] - code - apps/analysis/src/infrastructure/ollama-analysis-narrator.ts
- [[dot-askJson()_1]] - code - apps/analysis/src/infrastructure/ollama-analysis-narrator.ts
- [[dot-chatJson()_1]] - code - apps/analysis/src/infrastructure/ollama-analysis-narrator.ts
- [[dot-chatJson()_2]] - code - apps/analysis/src/infrastructure/vllm-analysis-narrator.ts
- [[dot-constructor()_18]] - code - apps/analysis/src/domain/narration-error.ts
- [[dot-constructor()_19]] - code - apps/analysis/src/infrastructure/ollama-analysis-narrator.ts
- [[dot-filterRelevance()]] - code - apps/analysis/src/infrastructure/ollama-analysis-narrator.ts
- [[dot-narrateWithRussianRetry()]] - code - apps/analysis/src/infrastructure/ollama-analysis-narrator.ts
- [[dot-summarize()]] - code - apps/analysis/src/infrastructure/ollama-analysis-narrator.ts
- [[2026-09-24 — narrator summarywarnings всегда по-русски]] - document - docs/PROJECT_CONTEXT.md
- [[CHAT_INTENTS]] - code - apps/analysis/src/infrastructure/ollama-analysis-narrator.ts
- [[FAILURE_MESSAGES]] - code - apps/analysis/src/domain/narration-error.ts
- [[MAX_CONTEXT_CHARS]] - code - apps/analysis/src/infrastructure/ollama-analysis-narrator.ts
- [[MAX_RESPONSE_BYTES]] - code - apps/analysis/src/infrastructure/ollama-analysis-narrator.ts
- [[NARRATION_PROPERTIES]] - code - apps/analysis/src/infrastructure/ollama-analysis-narrator.ts
- [[NarrationError]] - code - apps/analysis/src/domain/narration-error.ts
- [[NarrationFailure]] - code - apps/analysis/src/domain/narration-error.ts
- [[OllamaAnalysisNarrator]] - code - apps/analysis/src/infrastructure/ollama-analysis-narrator.ts
- [[RelevanceFilterInput]] - code - apps/analysis/src/domain/analysis-narrator.ts
- [[RelevanceFilterResult]] - code - apps/analysis/src/domain/analysis-narrator.ts
- [[StructuredAnalysis]] - code - apps/analysis/src/infrastructure/ollama-analysis-narrator.ts
- [[UNTRUSTED_DATA_RULE]] - code - apps/analysis/src/infrastructure/ollama-analysis-narrator.ts
- [[boundedString()]] - code - apps/analysis/src/infrastructure/ollama-analysis-narrator.ts
- [[clip()]] - code - apps/analysis/src/infrastructure/ollama-analysis-narrator.ts
- [[historyPayload()]] - code - apps/analysis/src/infrastructure/ollama-analysis-narrator.ts
- [[looks-strongly-english.test.ts]] - code - apps/analysis/src/infrastructure/looks-strongly-english.test.ts
- [[looks-strongly-english.ts]] - code - apps/analysis/src/infrastructure/looks-strongly-english.ts
- [[looksStronglyEnglish()]] - code - apps/analysis/src/infrastructure/looks-strongly-english.ts
- [[narration-error.ts]] - code - apps/analysis/src/domain/narration-error.ts
- [[narrationNeedsRussianRetry()]] - code - apps/analysis/src/infrastructure/looks-strongly-english.ts
- [[narrator-history.test.ts]] - code - apps/analysis/src/infrastructure/narrator-history.test.ts
- [[object()]] - code - apps/analysis/src/infrastructure/ollama-analysis-narrator.ts
- [[ollama-analysis-narrator.ts]] - code - apps/analysis/src/infrastructure/ollama-analysis-narrator.ts
- [[ollamaReply()]] - code - apps/analysis/src/infrastructure/narrator-history.test.ts
- [[parseAnswer()]] - code - apps/analysis/src/infrastructure/ollama-analysis-narrator.ts
- [[parseNarration()]] - code - apps/analysis/src/infrastructure/ollama-analysis-narrator.ts
- [[parseOfferIds()]] - code - apps/analysis/src/infrastructure/ollama-analysis-narrator.ts
- [[parseWarnings()]] - code - apps/analysis/src/infrastructure/ollama-analysis-narrator.ts
- [[readResponse()]] - code - apps/analysis/src/infrastructure/ollama-analysis-narrator.ts
- [[recording()]] - code - apps/analysis/scripts/compare-models.ts
- [[schemaForVllm()]] - code - apps/analysis/src/infrastructure/vllm-analysis-narrator.ts
- [[toExplanationRow()]] - code - apps/analysis/src/infrastructure/ollama-analysis-narrator.ts
- [[trustedContextPayload()]] - code - apps/analysis/src/infrastructure/ollama-analysis-narrator.ts
- [[validateReturnedIds()]] - code - apps/analysis/src/infrastructure/ollama-analysis-narrator.ts
- [[vllm-analysis-narrator.ts]] - code - apps/analysis/src/infrastructure/vllm-analysis-narrator.ts

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/ollama-analysis-narratorts
SORT file.name ASC
```

## Connections to other communities
- 19 edges to [[_COMMUNITY_analysis-narrator.ts]]
- 13 edges to [[_COMMUNITY_analysispackage.json]]
- 9 edges to [[_COMMUNITY_compare-models.ts]]
- 8 edges to [[_COMMUNITY_analysissrcapp.ts]]
- 7 edges to [[_COMMUNITY_packages_contracts_dist_index]]
- 5 edges to [[_COMMUNITY_analyze.ts]]
- 3 edges to [[_COMMUNITY_grounded-narration.ts]]
- 1 edge to [[_COMMUNITY_Итерации]]

## Top bridge nodes
- [[ollama-analysis-narrator.ts]] - degree 51, connects to 7 communities
- [[OllamaAnalysisNarrator]] - degree 18, connects to 5 communities
- [[NarrationError]] - degree 23, connects to 3 communities
- [[vllm-analysis-narrator.ts]] - degree 16, connects to 3 communities
- [[narration-error.ts]] - degree 10, connects to 3 communities
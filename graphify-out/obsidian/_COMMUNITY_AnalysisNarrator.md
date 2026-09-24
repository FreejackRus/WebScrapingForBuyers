---
type: community
cohesion: 0.22
members: 9
---

# AnalysisNarrator

**Cohesion:** 0.22 - loosely connected
**Members:** 9 nodes

## Members
- [[dot-answer()]] - code - apps/analysis/src/domain/analysis-narrator.ts
- [[dot-filterRelevance()]] - code - apps/analysis/src/domain/analysis-narrator.ts
- [[dot-summarize()]] - code - apps/analysis/src/domain/analysis-narrator.ts
- [[AnalysisNarrator]] - code - apps/analysis/src/domain/analysis-narrator.ts
- [[FAILURE_MESSAGES]] - code - apps/analysis/src/domain/narration-error.ts
- [[NarrationFailure]] - code - apps/analysis/src/domain/narration-error.ts
- [[applyLlmRelevanceFilter()]] - code - apps/analysis/src/application/analyze.ts
- [[narration-error.ts]] - code - apps/analysis/src/domain/narration-error.ts
- [[narrationFailureMessage()]] - code - apps/analysis/src/domain/narration-error.ts

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/AnalysisNarrator
SORT file.name ASC
```

## Connections to other communities
- 10 edges to [[_COMMUNITY_analyze.ts]]
- 5 edges to [[_COMMUNITY_ollama-analysis-narrator.ts]]
- 1 edge to [[_COMMUNITY_analysissrcapp.ts]]

## Top bridge nodes
- [[AnalysisNarrator]] - degree 8, connects to 3 communities
- [[narration-error.ts]] - degree 6, connects to 2 communities
- [[narrationFailureMessage()]] - degree 5, connects to 1 community
- [[applyLlmRelevanceFilter()]] - degree 4, connects to 1 community
- [[dot-answer()]] - degree 3, connects to 1 community
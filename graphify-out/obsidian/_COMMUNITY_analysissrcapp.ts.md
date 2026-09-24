---
type: community
cohesion: 0.36
members: 8
---

# analysis/src/app.ts

**Cohesion:** 0.36 - loosely connected
**Members:** 8 nodes

## Members
- [[analysissrcapp.ts]] - code - apps/analysis/src/app.ts
- [[analysissrcserver.ts]] - code - apps/analysis/src/server.ts
- [[analyzeSnapshot()]] - code - apps/analysis/src/application/analyze.ts
- [[answerCopilot()]] - code - apps/analysis/src/application/analyze.ts
- [[buildAnalysisApp()]] - code - apps/analysis/src/app.ts
- [[packages_contracts_dist_index_analyzerequest]] - concept
- [[packages_service_kit_dist_index_createservice]] - concept
- [[packages_service_kit_dist_index_serviceurl]] - concept

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/analysis/src/appts
SORT file.name ASC
```

## Connections to other communities
- 5 edges to [[_COMMUNITY_analyze.ts]]
- 4 edges to [[_COMMUNITY_ollama-analysis-narrator.ts]]
- 4 edges to [[_COMMUNITY_identitysrcapp.ts]]
- 3 edges to [[_COMMUNITY_packages_contracts_dist_index]]
- 2 edges to [[_COMMUNITY_infra-leak.ts]]
- 2 edges to [[_COMMUNITY_analyze.test.ts]]
- 2 edges to [[_COMMUNITY_gatewaysrcapp.ts]]
- 1 edge to [[_COMMUNITY_AnalysisNarrator]]

## Top bridge nodes
- [[analysissrcapp.ts]] - degree 15, connects to 5 communities
- [[analyzeSnapshot()]] - degree 6, connects to 3 communities
- [[answerCopilot()]] - degree 6, connects to 3 communities
- [[packages_service_kit_dist_index_createservice]] - degree 4, connects to 3 communities
- [[buildAnalysisApp()]] - degree 5, connects to 1 community
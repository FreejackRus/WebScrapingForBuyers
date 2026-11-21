---
type: community
cohesion: 0.25
members: 20
---

# system-health/ui/index.tsx

**Cohesion:** 0.25 - loosely connected
**Members:** 20 nodes

## Members
- [[AdminAlertBanner()]] - code - apps/web/src/widgets/admin/system-health/ui/index.tsx
- [[SystemHealthPanel()]] - code - apps/web/src/widgets/admin/system-health/ui/index.tsx
- [[adminindex.ts]] - code - apps/web/src/widgets/admin/index.ts
- [[adminAlerts()]] - code - apps/web/src/widgets/admin/system-health/lib/index.ts
- [[formatTime()]] - code - apps/web/src/widgets/admin/system-health/lib/index.ts
- [[health()]] - code - apps/web/src/widgets/admin/system-health/lib/index.test.ts
- [[narrationSummary()]] - code - apps/web/src/widgets/admin/system-health/lib/index.ts
- [[packages_contracts_dist_index_qualityresult]] - concept
- [[packages_contracts_dist_index_sourcehealth]] - concept
- [[packages_contracts_dist_index_sourcehealthreport]] - concept
- [[percent()]] - code - apps/web/src/widgets/admin/system-health/lib/index.ts
- [[sourceTone]] - code - apps/web/src/widgets/admin/system-health/lib/index.ts
- [[system-healthindex.ts]] - code - apps/web/src/widgets/admin/system-health/index.ts
- [[system-healthlibindex.test.ts]] - code - apps/web/src/widgets/admin/system-health/lib/index.test.ts
- [[system-healthlibindex.ts]] - code - apps/web/src/widgets/admin/system-health/lib/index.ts
- [[system-healthuiindex.tsx]] - code - apps/web/src/widgets/admin/system-health/ui/index.tsx
- [[systemHealthApi]] - code - apps/web/src/widgets/admin/system-health/lib/index.ts
- [[toneLabel]] - code - apps/web/src/widgets/admin/system-health/ui/index.tsx
- [[trendPoints()]] - code - apps/web/src/widgets/admin/system-health/lib/index.ts
- [[useSystemHealth()]] - code - apps/web/src/widgets/admin/system-health/ui/index.tsx

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/system-health/ui/indextsx
SORT file.name ASC
```

## Connections to other communities
- 8 edges to [[_COMMUNITY_useUserStore]]
- 4 edges to [[_COMMUNITY_quality-eval.ts]]
- 4 edges to [[_COMMUNITY_packages_contracts_dist_index]]
- 2 edges to [[_COMMUNITY_workspaceuiindex.tsx]]
- 2 edges to [[_COMMUNITY_analysisstoreindex.ts]]
- 2 edges to [[_COMMUNITY_SourceAdapter]]
- 2 edges to [[_COMMUNITY_narration-stats.ts]]
- 1 edge to [[_COMMUNITY_aliexpress_selfcheck]]

## Top bridge nodes
- [[system-healthlibindex.ts]] - degree 19, connects to 5 communities
- [[system-healthuiindex.tsx]] - degree 20, connects to 4 communities
- [[system-healthlibindex.test.ts]] - degree 12, connects to 2 communities
- [[AdminAlertBanner()]] - degree 7, connects to 2 communities
- [[adminindex.ts]] - degree 5, connects to 2 communities
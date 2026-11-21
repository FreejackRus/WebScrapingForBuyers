---
type: community
cohesion: 0.43
members: 8
---

# identity/src/app.ts

**Cohesion:** 0.43 - moderately connected
**Members:** 8 nodes

## Members
- [[analysissrcserver.ts]] - code - apps/analysis/src/server.ts
- [[buildIdentityApp()]] - code - apps/identity/src/app.ts
- [[gatewaysrcserver.ts]] - code - apps/gateway/src/server.ts
- [[identitysrcapp.ts]] - code - apps/identity/src/app.ts
- [[identitysrcserver.ts]] - code - apps/identity/src/server.ts
- [[packages_service_kit_dist_index]] - concept
- [[packages_service_kit_dist_index_listenservice]] - concept
- [[searchsrcserver.ts]] - code - apps/search/src/server.ts

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/identity/src/appts
SORT file.name ASC
```

## Connections to other communities
- 4 edges to [[_COMMUNITY_LoginLimiter]]
- 4 edges to [[_COMMUNITY_memory-auth-store.ts]]
- 4 edges to [[_COMMUNITY_gatewaysrcapp.ts]]
- 3 edges to [[_COMMUNITY_identitysrchttproutes.ts]]
- 3 edges to [[_COMMUNITY_SourceAdapter]]
- 3 edges to [[_COMMUNITY_analysissrcapp.ts]]
- 1 edge to [[_COMMUNITY_AuthStore]]
- 1 edge to [[_COMMUNITY_watchlist-checker.ts]]

## Top bridge nodes
- [[identitysrcapp.ts]] - degree 13, connects to 5 communities
- [[packages_service_kit_dist_index]] - degree 9, connects to 4 communities
- [[buildIdentityApp()]] - degree 5, connects to 3 communities
- [[analysissrcserver.ts]] - degree 4, connects to 1 community
- [[gatewaysrcserver.ts]] - degree 4, connects to 1 community
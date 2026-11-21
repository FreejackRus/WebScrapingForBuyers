---
type: community
cohesion: 0.67
members: 3
---

# MarketplaceSourcesResponse

**Cohesion:** 0.67 - moderately connected
**Members:** 3 nodes

## Members
- [[BaseModel_14]] - code
- [[MarketplaceSourcesResponse]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/src/marketplace_connector/server.py
- [[Which connectors mounted, and why the others did not.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/src/marketplace_connector/server.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/MarketplaceSourcesResponse
SORT file.name ASC
```

## Connections to other communities
- 1 edge to [[_COMMUNITY_compare_prices]]
- 1 edge to [[_COMMUNITY_json]]

## Top bridge nodes
- [[MarketplaceSourcesResponse]] - degree 4, connects to 2 communities
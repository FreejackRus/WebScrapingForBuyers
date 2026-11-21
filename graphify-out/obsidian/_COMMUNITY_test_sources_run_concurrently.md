---
type: community
cohesion: 0.40
members: 5
---

# test_sources_run_concurrently

**Cohesion:** 0.40 - moderately connected
**Members:** 5 nodes

## Members
- [[Serial queries would make a four-source comparison unusably slow.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[fake_runner()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_server.py
- [[impl()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[make()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[test_sources_run_concurrently()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/test_sources_run_concurrently
SORT file.name ASC
```

## Connections to other communities
- 2 edges to [[_COMMUNITY_offer]]
- 1 edge to [[_COMMUNITY__patch_tier1]]
- 1 edge to [[_COMMUNITY_compare-connectorteststest_server.py]]

## Top bridge nodes
- [[test_sources_run_concurrently()]] - degree 4, connects to 2 communities
- [[impl()]] - degree 3, connects to 1 community
- [[fake_runner()]] - degree 2, connects to 1 community
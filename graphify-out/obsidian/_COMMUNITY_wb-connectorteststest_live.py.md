---
type: community
cohesion: 0.50
members: 4
---

# wb-connector/tests/test_live.py

**Cohesion:** 0.50 - moderately connected
**Members:** 4 nodes

## Members
- [[Live smoke tests for the Wildberries connector. These hit the real endpoint and…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_live.py
- [[test_wb_search_returns_priced_items()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_live.py
- [[test_wb_selfcheck_reaches_a_verdict()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_live.py
- [[wb-connectorteststest_live.py]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_live.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/wb-connector/tests/test_livepy
SORT file.name ASC
```

## Connections to other communities
- 1 edge to [[_COMMUNITY_log_event]]
- 1 edge to [[_COMMUNITY_pytest]]

## Top bridge nodes
- [[wb-connectorteststest_live.py]] - degree 4, connects to 1 community
- [[test_wb_selfcheck_reaches_a_verdict()]] - degree 2, connects to 1 community
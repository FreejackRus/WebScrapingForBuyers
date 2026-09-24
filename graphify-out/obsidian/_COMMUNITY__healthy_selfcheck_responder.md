---
type: community
cohesion: 0.50
members: 4
---

# _healthy_selfcheck_responder

**Cohesion:** 0.50 - moderately connected
**Members:** 4 nodes

## Members
- [[Every canary probe healthy except v9, which answers with ``v9_response``.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[_healthy_selfcheck_responder()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[responder()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[scenario()_28]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/_healthy_selfcheck_responder
SORT file.name ASC
```

## Connections to other communities
- 1 edge to [[_COMMUNITY_no_wait]]
- 1 edge to [[_COMMUNITY_test_helpers.py]]
- 1 edge to [[_COMMUNITY_responder]]
- 1 edge to [[_COMMUNITY__clear_wb_cache]]

## Top bridge nodes
- [[_healthy_selfcheck_responder()]] - degree 5, connects to 2 communities
- [[scenario()_28]] - degree 3, connects to 2 communities
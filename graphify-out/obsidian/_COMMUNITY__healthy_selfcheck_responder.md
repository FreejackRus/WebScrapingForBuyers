---
type: community
cohesion: 0.29
members: 7
---

# _healthy_selfcheck_responder

**Cohesion:** 0.29 - loosely connected
**Members:** 7 nodes

## Members
- [[A refused v9 must show up the fallback used to answer in its place. When v9…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[Every canary probe healthy except v9, which answers with ``v9_response``.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[_healthy_selfcheck_responder()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[no_wait()_22]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[responder()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[scenario()_31]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[test_the_canary_sees_the_primary_search_path()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/_healthy_selfcheck_responder
SORT file.name ASC
```

## Connections to other communities
- 2 edges to [[_COMMUNITY_test_helpers.py]]
- 1 edge to [[_COMMUNITY_no_wait]]
- 1 edge to [[_COMMUNITY__patch_questions]]
- 1 edge to [[_COMMUNITY__clear_wb_cache]]

## Top bridge nodes
- [[_healthy_selfcheck_responder()]] - degree 5, connects to 2 communities
- [[test_the_canary_sees_the_primary_search_path()]] - degree 5, connects to 2 communities
- [[scenario()_31]] - degree 3, connects to 1 community
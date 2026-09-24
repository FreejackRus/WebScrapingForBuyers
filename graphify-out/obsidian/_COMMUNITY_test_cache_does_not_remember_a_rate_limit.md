---
type: community
cohesion: 0.25
members: 8
---

# test_cache_does_not_remember_a_rate_limit

**Cohesion:** 0.25 - loosely connected
**Members:** 8 nodes

## Members
- [[A cached 429 would keep reporting rate-limited after the limit lifted.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[__aenter__()_11]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[__aexit__()_11]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[aiter_bytes()_2]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[no_wait()_31]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[scenario()_81]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[stream()_6]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[test_cache_does_not_remember_a_rate_limit()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/test_cache_does_not_remember_a_rate_limit
SORT file.name ASC
```

## Connections to other communities
- 2 edges to [[_COMMUNITY__clear_wb_cache]]
- 1 edge to [[_COMMUNITY_no_wait]]
- 1 edge to [[_COMMUNITY_test_helpers.py]]

## Top bridge nodes
- [[test_cache_does_not_remember_a_rate_limit()]] - degree 9, connects to 2 communities
- [[scenario()_81]] - degree 3, connects to 2 communities
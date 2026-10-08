---
type: community
cohesion: 0.25
members: 8
---

# test_cache_serves_a_repeated_successful_read

**Cohesion:** 0.25 - loosely connected
**Members:** 8 nodes

## Members
- [[An agent walks the same SKU repeatedly; the second look must not re-hit WB.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[__aenter__()_3]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[__aexit__()_3]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[aiter_bytes()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[no_wait()_30]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[scenario()_69]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[stream()_4]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[test_cache_serves_a_repeated_successful_read()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/test_cache_serves_a_repeated_successful_read
SORT file.name ASC
```

## Connections to other communities
- 2 edges to [[_COMMUNITY__clear_wb_cache]]
- 1 edge to [[_COMMUNITY_no_wait]]
- 1 edge to [[_COMMUNITY_test_helpers.py]]

## Top bridge nodes
- [[test_cache_serves_a_repeated_successful_read()]] - degree 9, connects to 2 communities
- [[scenario()_69]] - degree 3, connects to 2 communities
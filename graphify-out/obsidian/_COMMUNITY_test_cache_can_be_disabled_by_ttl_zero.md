---
type: community
cohesion: 0.25
members: 8
---

# test_cache_can_be_disabled_by_ttl_zero

**Cohesion:** 0.25 - loosely connected
**Members:** 8 nodes

## Members
- [[WB_CACHE_TTL=0 means every read goes upstream.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[__aenter__()_12]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[__aexit__()_12]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[aiter_bytes()_3]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[no_wait()_32]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[scenario()_82]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[stream()_7]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[test_cache_can_be_disabled_by_ttl_zero()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/test_cache_can_be_disabled_by_ttl_zero
SORT file.name ASC
```

## Connections to other communities
- 2 edges to [[_COMMUNITY_TTLCache]]
- 1 edge to [[_COMMUNITY_no_wait]]
- 1 edge to [[_COMMUNITY_test_helpers.py]]

## Top bridge nodes
- [[test_cache_can_be_disabled_by_ttl_zero()]] - degree 9, connects to 2 communities
- [[scenario()_82]] - degree 3, connects to 2 communities
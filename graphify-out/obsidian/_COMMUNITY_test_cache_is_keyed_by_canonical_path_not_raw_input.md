---
type: community
cohesion: 0.29
members: 8
---

# test_cache_is_keyed_by_canonical_path_not_raw_input

**Cohesion:** 0.29 - loosely connected
**Members:** 8 nodes

## Members
- [[A cache hit skips a Cloudflare challenge and a whole CDP round-trip.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_server.py
- [[Two spellings of the same product must share one cache entry.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_server.py
- [[counting_get()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_server.py
- [[counting_get()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_server.py
- [[scenario()_32]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_server.py
- [[scenario()_33]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_server.py
- [[test_cache_is_keyed_by_canonical_path_not_raw_input()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_server.py
- [[test_fetch_composer_serves_a_repeat_read_from_cache()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_server.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/test_cache_is_keyed_by_canonical_path_not_raw_input
SORT file.name ASC
```

## Connections to other communities
- 2 edges to [[_COMMUNITY__run]]
- 2 edges to [[_COMMUNITY_ozon-connectorteststest_server.py]]
- 2 edges to [[_COMMUNITY__patch_tier1]]

## Top bridge nodes
- [[test_cache_is_keyed_by_canonical_path_not_raw_input()]] - degree 5, connects to 2 communities
- [[test_fetch_composer_serves_a_repeat_read_from_cache()]] - degree 5, connects to 2 communities
- [[scenario()_32]] - degree 3, connects to 1 community
- [[scenario()_33]] - degree 3, connects to 1 community
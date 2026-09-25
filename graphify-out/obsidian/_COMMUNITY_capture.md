---
type: community
cohesion: 0.13
members: 15
---

# capture

**Cohesion:** 0.13 - loosely connected
**Members:** 15 nodes

## Members
- [[withregion= is silently ignored upstream; only filter=withregion works.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[Region lives in the URL, and the cache keys on URL — so cities stay separate.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[capture()_6]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[capture()_7]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[capture()_8]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[capture()_9]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[capture()_10]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[capture()_11]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[capture()_12]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[test_card_sends_the_region_as_a_filter_not_a_query_parameter()]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[test_categories_numeric_parent_uses_parent_id_filter()]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[test_categories_tree_passes_the_region_through()]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[test_category_listing_passes_the_region_through()]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[test_category_passes_region_from_settings()]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[test_different_regions_do_not_share_a_cache_entry()]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/capture
SORT file.name ASC
```

## Connections to other communities
- 6 edges to [[_COMMUNITY_detmir-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_error_payload]]

## Top bridge nodes
- [[capture()_10]] - degree 7, connects to 1 community
- [[test_card_sends_the_region_as_a_filter_not_a_query_parameter()]] - degree 4, connects to 1 community
- [[test_different_regions_do_not_share_a_cache_entry()]] - degree 4, connects to 1 community
- [[test_categories_numeric_parent_uses_parent_id_filter()]] - degree 3, connects to 1 community
- [[test_categories_tree_passes_the_region_through()]] - degree 3, connects to 1 community
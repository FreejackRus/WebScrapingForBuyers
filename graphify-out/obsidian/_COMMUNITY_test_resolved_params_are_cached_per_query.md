---
type: community
cohesion: 0.29
members: 7
---

# test_resolved_params_are_cached_per_query

**Cohesion:** 0.29 - loosely connected
**Members:** 7 nodes

## Members
- [[Each resolution costs a page load plus an API call.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/tests/test_server.py
- [[counting_post()]] - code - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/tests/test_server.py
- [[counting_post()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/tests/test_server.py
- [[counting_post()_2]] - code - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/tests/test_server.py
- [[test_address_cache_is_scoped_to_the_attached_profile()]] - code - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/tests/test_server.py
- [[test_resolved_params_are_cached_per_query()]] - code - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/tests/test_server.py
- [[test_the_address_is_resolved_once_per_process()]] - code - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/tests/test_server.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/test_resolved_params_are_cached_per_query
SORT file.name ASC
```

## Connections to other communities
- 3 edges to [[_COMMUNITY_megamarket-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_fake_post]]

## Top bridge nodes
- [[test_resolved_params_are_cached_per_query()]] - degree 5, connects to 2 communities
- [[test_address_cache_is_scoped_to_the_attached_profile()]] - degree 3, connects to 1 community
- [[test_the_address_is_resolved_once_per_process()]] - degree 2, connects to 1 community
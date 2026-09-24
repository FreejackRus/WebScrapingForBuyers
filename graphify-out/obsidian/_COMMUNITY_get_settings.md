---
type: community
cohesion: 0.22
members: 9
---

# get_settings

**Cohesion:** 0.22 - loosely connected
**Members:** 9 nodes

## Members
- [[Current WB_SEARCH_TRANSPORT (storefronthttp). Re-reads settings for tests.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[Marks this directory as its own pytest rootdir package. Several connectors have…_15]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/conftest.py
- [[_search_transport()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[_wb_http_transport_for_unit_tests()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/conftest.py
- [[fixture_30]] - code
- [[fixture_31]] - code
- [[get_settings()_12]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/settings.py
- [[storefront_transport()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_storefront_search.py
- [[wb-connectortestsconftest.py]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/conftest.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/get_settings
SORT file.name ASC
```

## Connections to other communities
- 4 edges to [[_COMMUNITY_log_event]]
- 2 edges to [[_COMMUNITY_pydantic]]
- 2 edges to [[_COMMUNITY_wb_connectorserver.py]]
- 2 edges to [[_COMMUNITY_pytest]]

## Top bridge nodes
- [[get_settings()_12]] - degree 8, connects to 3 communities
- [[_search_transport()]] - degree 5, connects to 2 communities
- [[storefront_transport()]] - degree 3, connects to 1 community
- [[wb-connectortestsconftest.py]] - degree 3, connects to 1 community
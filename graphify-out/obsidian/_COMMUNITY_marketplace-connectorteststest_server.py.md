---
type: community
cohesion: 0.20
members: 10
---

# marketplace-connector/tests/test_server.py

**Cohesion:** 0.20 - loosely connected
**Members:** 10 nodes

## Members
- [[A skipped source must be visible to the client, not just to stderr.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_server.py
- [[Offline tests for the unified marketplace server. The unified server is a mount…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_server.py
- [[Simulate the broken-install case the defensive import exists for.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_server.py
- [[marketplace-connectorteststest_server.py]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_server.py
- [[test_all_installed_sources_are_mounted()]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_server.py
- [[test_marketplace_sources_capabilities_mark_skipped_sources()]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_server.py
- [[test_marketplace_sources_reports_what_mounted()]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_server.py
- [[test_marketplace_sources_surfaces_a_skipped_source()]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_server.py
- [[test_the_mounted_count_matches_the_imported_sources()]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_server.py
- [[test_tool_names_keep_their_source_prefixes()]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_server.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/marketplace-connector/tests/test_serverpy
SORT file.name ASC
```

## Connections to other communities
- 1 edge to [[_COMMUNITY_json]]
- 1 edge to [[_COMMUNITY_marketplace_connector__init__.py]]

## Top bridge nodes
- [[marketplace-connectorteststest_server.py]] - degree 9, connects to 2 communities
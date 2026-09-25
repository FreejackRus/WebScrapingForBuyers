---
type: community
cohesion: 0.29
members: 7
---

# test_all_requested_sources_missing_is_an_error

**Cohesion:** 0.29 - loosely connected
**Members:** 7 nodes

## Members
- [[No installed source means the answer would be empty and misleading.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[ToolError_2]] - code
- [[error_payload()_2]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[test_all_requested_sources_missing_is_an_error()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[test_unknown_source_names_are_rejected()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[wb()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[wb()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/test_all_requested_sources_missing_is_an_error
SORT file.name ASC
```

## Connections to other communities
- 3 edges to [[_COMMUNITY_compare-connectorteststest_server.py]]
- 3 edges to [[_COMMUNITY_offer]]

## Top bridge nodes
- [[test_all_requested_sources_missing_is_an_error()]] - degree 5, connects to 2 communities
- [[test_unknown_source_names_are_rejected()]] - degree 5, connects to 2 communities
- [[error_payload()_2]] - degree 4, connects to 1 community
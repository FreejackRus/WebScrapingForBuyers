---
type: community
cohesion: 0.40
members: 6
---

# test_card_rejects_non_numeric_ids

**Cohesion:** 0.40 - moderately connected
**Members:** 6 nodes

## Members
- [[The id goes into a URL path, so it is validated as digits, never escaped.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_server.py
- [[fail_fetch()_2]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_server.py
- [[fail_fetch()_3]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_server.py
- [[parametrize_9]] - code
- [[test_card_rejects_non_numeric_ids()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_server.py
- [[test_search_rejects_too_short_queries()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_server.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/test_card_rejects_non_numeric_ids
SORT file.name ASC
```

## Connections to other communities
- 2 edges to [[_COMMUNITY_yandex-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_error_payload_1]]

## Top bridge nodes
- [[test_card_rejects_non_numeric_ids()]] - degree 6, connects to 2 communities
- [[test_search_rejects_too_short_queries()]] - degree 3, connects to 1 community
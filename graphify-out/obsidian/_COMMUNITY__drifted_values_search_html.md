---
type: community
cohesion: 0.40
members: 5
---

# _drifted_values_search_html

**Cohesion:** 0.40 - moderately connected
**Members:** 5 nodes

## Members
- [[Items with ids but no titleprice anywhere is a moved SSR state, not a result…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_server.py
- [[The washer capture with its titleprice nodes renamed in the SSR state. This is…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_server.py
- [[_drifted_values_search_html()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_server.py
- [[test_search_flags_drift_when_items_lose_their_values()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_server.py
- [[test_selfcheck_reports_value_drift()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_server.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/_drifted_values_search_html
SORT file.name ASC
```

## Connections to other communities
- 3 edges to [[_COMMUNITY_stub_html]]
- 3 edges to [[_COMMUNITY_yandex-connectorteststest_server.py]]

## Top bridge nodes
- [[_drifted_values_search_html()]] - degree 5, connects to 2 communities
- [[test_search_flags_drift_when_items_lose_their_values()]] - degree 4, connects to 2 communities
- [[test_selfcheck_reports_value_drift()]] - degree 3, connects to 2 communities
---
type: community
cohesion: 0.33
members: 6
---

# _relevance_warnings

**Cohesion:** 0.33 - loosely connected
**Members:** 6 nodes

## Members
- [[Flag a cheapest offer that probably answers a different question. Deliberately…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[Whether a title advertises a used, refurbished or display unit. A query that…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[Whether a title reads as an accessory the query did not ask for. Asking for a…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[_looks_like_an_accessory()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[_looks_like_another_condition()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[_relevance_warnings()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/_relevance_warnings
SORT file.name ASC
```

## Connections to other communities
- 3 edges to [[_COMMUNITY_compare_prices]]
- 3 edges to [[_COMMUNITY_json]]
- 1 edge to [[_COMMUNITY_compare-connectorteststest_server.py]]

## Top bridge nodes
- [[_relevance_warnings()]] - degree 6, connects to 3 communities
- [[_looks_like_an_accessory()]] - degree 4, connects to 2 communities
- [[_looks_like_another_condition()]] - degree 4, connects to 2 communities
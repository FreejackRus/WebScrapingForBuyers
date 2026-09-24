---
type: community
cohesion: 0.33
members: 7
---

# detmir_selfcheck

**Cohesion:** 0.33 - loosely connected
**Members:** 7 nodes

## Members
- [[DetmirSelfcheckEntry]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/src/detmir_connector/models_output.py
- [[Live smoke tests for the Detsky Mir connector. Excluded from CI; see wb-…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_live.py
- [[Probe every Detsky Mir endpoint family and report a tri-state verdict.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/src/detmir_connector/server.py
- [[detmir-connectorteststest_live.py]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_live.py
- [[detmir_selfcheck()]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/src/detmir_connector/server.py
- [[probe()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/src/detmir_connector/server.py
- [[test_detmir_selfcheck_reaches_a_verdict()]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_live.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/detmir_selfcheck
SORT file.name ASC
```

## Connections to other communities
- 5 edges to [[_COMMUNITY_detmir_categories]]
- 2 edges to [[_COMMUNITY_json]]
- 2 edges to [[_COMMUNITY_Detsky Mir Connector]]
- 1 edge to [[_COMMUNITY_ozon_card]]
- 1 edge to [[_COMMUNITY_models.py]]
- 1 edge to [[_COMMUNITY_detmir_connectormodels_output.py]]
- 1 edge to [[_COMMUNITY_yandex_selfcheck]]
- 1 edge to [[_COMMUNITY_log_event]]
- 1 edge to [[_COMMUNITY_pytest]]

## Top bridge nodes
- [[detmir_selfcheck()]] - degree 15, connects to 6 communities
- [[DetmirSelfcheckEntry]] - degree 5, connects to 3 communities
- [[detmir-connectorteststest_live.py]] - degree 3, connects to 1 community
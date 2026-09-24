---
type: community
cohesion: 0.20
members: 11
---

# yandex_selfcheck

**Cohesion:** 0.20 - loosely connected
**Members:** 11 nodes

## Members
- [[Live smoke tests for the Yandex Market connector. Excluded from CI; see wb-…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_live.py
- [[Probe Yandex Market's search and card pages and report a tri-state verdict.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/src/yandex_connector/server.py
- [[Run every connector's selfcheck and summarise what works from here. uv run…]] - rationale - mcp-servers/ru-marketplace-mcp/examples/health_check.py
- [[Tools_2]] - document - mcp-servers/ru-marketplace-mcp/dsh/skills/yandex-connector/SKILL.md
- [[Tools_3]] - document - mcp-servers/ru-marketplace-mcp/skills/yandex-connector/SKILL.md
- [[health_check.py]] - code - mcp-servers/ru-marketplace-mcp/examples/health_check.py
- [[main()_3]] - code - mcp-servers/ru-marketplace-mcp/examples/health_check.py
- [[run_one()]] - code - mcp-servers/ru-marketplace-mcp/examples/health_check.py
- [[test_yandex_selfcheck_reaches_a_verdict()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_live.py
- [[yandex-connectorteststest_live.py]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_live.py
- [[yandex_selfcheck()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/src/yandex_connector/server.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/yandex_selfcheck
SORT file.name ASC
```

## Connections to other communities
- 3 edges to [[_COMMUNITY_yandex_card]]
- 2 edges to [[_COMMUNITY_models.py]]
- 2 edges to [[_COMMUNITY_log_event]]
- 2 edges to [[_COMMUNITY_json]]
- 1 edge to [[_COMMUNITY_ozon_card]]
- 1 edge to [[_COMMUNITY_detmir_selfcheck]]
- 1 edge to [[_COMMUNITY_detmir_categories]]
- 1 edge to [[_COMMUNITY_Shipped sources]]
- 1 edge to [[_COMMUNITY_pathlib]]
- 1 edge to [[_COMMUNITY_pytest]]
- 1 edge to [[_COMMUNITY_Yandex Market Connector]]
- 1 edge to [[_COMMUNITY_Yandex Market Connector_1]]

## Top bridge nodes
- [[yandex_selfcheck()]] - degree 14, connects to 6 communities
- [[main()_3]] - degree 6, connects to 3 communities
- [[health_check.py]] - degree 5, connects to 2 communities
- [[yandex-connectorteststest_live.py]] - degree 3, connects to 1 community
- [[Tools_2]] - degree 2, connects to 1 community
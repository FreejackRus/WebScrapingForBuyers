---
type: community
cohesion: 0.31
members: 9
---

# detmir-connector/tests/test_parser_live.py

**Cohesion:** 0.31 - loosely connected
**Members:** 9 nodes

## Members
- [[Detsky Mir MCP connector.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/src/detmir_connector/__init__.py
- [[The Detsky Mir parser against LIVE captured API bodies.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_parser_live.py
- [[The doctrine pinned by the audit waves, checked against live bytes a Detsky…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_parser_live.py
- [[_load()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_parser_live.py
- [[detmir-connectorteststest_parser_live.py]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_parser_live.py
- [[detmir_connector__init__.py]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/src/detmir_connector/__init__.py
- [[test_live_card_parses_to_the_displayed_values()]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_parser_live.py
- [[test_live_category_parses_its_products_and_meta()]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_parser_live.py
- [[test_live_prices_are_finite_positive_rubles()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_parser_live.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/detmir-connector/tests/test_parser_livepy
SORT file.name ASC
```

## Connections to other communities
- 2 edges to [[_COMMUNITY_json]]
- 1 edge to [[_COMMUNITY_test_card_verification_records.py]]
- 1 edge to [[_COMMUNITY_detmir-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_shape_signature]]
- 1 edge to [[_COMMUNITY_pathlib]]

## Top bridge nodes
- [[detmir_connector__init__.py]] - degree 5, connects to 3 communities
- [[detmir-connectorteststest_parser_live.py]] - degree 9, connects to 2 communities
---
type: community
cohesion: 0.19
members: 14
---

# test_search_parser_live.py

**Cohesion:** 0.19 - loosely connected
**Members:** 14 nodes

## Members
- [[Golden shape for the normalized Ozon composer search tiles.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_shape_reference.py
- [[The Ozon search parse path against a LIVE captured composer payload.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_search_parser_live.py
- [[The display strings the live tiles carry must coerce to the numbers the page…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_search_parser_live.py
- [[The tile carries the raw label («N шт осталось» or nothing); mapping it to…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_search_parser_live.py
- [[_items()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_search_parser_live.py
- [[compareozon_card chain depends on card_input surviving the parse.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_search_parser_live.py
- [[ozon-connectorteststest_shape_reference.py]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_shape_reference.py
- [[ozon_connector__init__.py]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/__init__.py
- [[test_live_composer_normalization_matches_shape_golden()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_shape_reference.py
- [[test_live_composer_payload_parses_to_the_three_tiles()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_search_parser_live.py
- [[test_live_price_strings_parse_to_the_displayed_numbers()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_search_parser_live.py
- [[test_live_stock_labels_survive_the_parse_verbatim()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_search_parser_live.py
- [[test_live_tiles_carry_a_canonical_card_input()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_search_parser_live.py
- [[test_search_parser_live.py]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_search_parser_live.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/test_search_parser_livepy
SORT file.name ASC
```

## Connections to other communities
- 3 edges to [[_COMMUNITY_shape_signature]]
- 2 edges to [[_COMMUNITY_json]]
- 2 edges to [[_COMMUNITY_pathlib]]
- 1 edge to [[_COMMUNITY_coerce_price]]
- 1 edge to [[_COMMUNITY_ozon-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_test_card_verification_records.py]]

## Top bridge nodes
- [[test_search_parser_live.py]] - degree 10, connects to 3 communities
- [[ozon-connectorteststest_shape_reference.py]] - degree 6, connects to 3 communities
- [[ozon_connector__init__.py]] - degree 4, connects to 2 communities
- [[test_live_price_strings_parse_to_the_displayed_numbers()]] - degree 4, connects to 1 community
- [[test_live_composer_normalization_matches_shape_golden()]] - degree 2, connects to 1 community
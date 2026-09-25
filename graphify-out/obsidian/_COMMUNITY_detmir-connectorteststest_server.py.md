---
type: community
cohesion: 0.09
members: 34
---

# detmir-connector/tests/test_server.py

**Cohesion:** 0.09 - loosely connected
**Members:** 34 nodes

## Members
- [[NOTE this endpoint returns rows under data, unlike v4products.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[v2categories nests rows under 'data' — not 'items' like v4products.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[A 0 price would rank a dead listing as the cheapest option.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[If upstream renames 'data' to 'items', keep working rather than break.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[Offline tests for the Detsky Mir connector. Every upstream call is…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[One session must be able to compare cities without a restart.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[Prices arrive as a dict, a bare number, or under 'prices''final_price'.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[Route ``_fetch_json`` to canned payloads, matched by URL substring.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[The tool surface is a public contract — renames break client configs.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[Without meta= the endpoint returns a plain array; both shapes are valid.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[detmir-connectorteststest_server.py]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[fake_fetch()_14]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[stub_json()]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[test_all_three_tools_are_still_registered()]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[test_body_error_status_only_flags_real_errors()]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[test_card_falls_back_through_price_shapes()]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[test_card_never_reports_zero_as_a_price()]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[test_card_parses_price_rating_and_stock()]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[test_card_region_defaults_to_the_configured_one()]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[test_card_reports_the_region_it_actually_queried()]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[test_card_warns_when_price_is_missing()]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[test_categories_reads_rows_from_the_data_key()]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[test_categories_tolerates_an_items_key()]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[test_category_accepts_a_bare_array_payload()]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[test_category_lists_products_with_upstream_total()]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[test_category_warns_on_empty_result()]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[test_parse_product_handles_string_brands()]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[test_parse_product_synthesises_url_from_id()]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[test_region_argument_overrides_the_environment()]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[test_region_is_normalised_to_upper_case()]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[test_registered_tools_are_stable()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[test_selfcheck_flags_drift_on_unparseable_payload()]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[test_selfcheck_reports_success_when_every_family_is_healthy()]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[test_server_version_matches_pyproject()_4]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/detmir-connector/tests/test_serverpy
SORT file.name ASC
```

## Connections to other communities
- 9 edges to [[_COMMUNITY_error_payload]]
- 6 edges to [[_COMMUNITY_capture]]
- 2 edges to [[_COMMUNITY_clear_cache]]
- 2 edges to [[_COMMUNITY_TransportDownError]]
- 2 edges to [[_COMMUNITY_json]]
- 2 edges to [[_COMMUNITY_pathlib]]
- 1 edge to [[_COMMUNITY_test_a_418_is_reported_as_an_edge_block]]
- 1 edge to [[_COMMUNITY_test_no_search_tool_is_exposed]]
- 1 edge to [[_COMMUNITY_test_parse_product_survives_a_non_dict_input]]
- 1 edge to [[_COMMUNITY_detmir-connectorteststest_parser_live.py]]
- 1 edge to [[_COMMUNITY_pytest]]
- 1 edge to [[_COMMUNITY_test_card_verification_records.py]]

## Top bridge nodes
- [[detmir-connectorteststest_server.py]] - degree 51, connects to 12 communities
- [[stub_json()]] - degree 20, connects to 1 community
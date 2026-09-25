---
type: community
cohesion: 0.06
members: 58
---

# mpstats-connector/tests/test_server.py

**Cohesion:** 0.06 - loosely connected
**Members:** 58 nodes

## Members
- [[A delisted item (all-zero graphs) reports None pricestock, never 0.0.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_server.py
- [[A faithful MPStats warehouses response, trimmed.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_server.py
- [[A trimmed-but-structurally-faithful MPStats item analytics response. Built from…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_server.py
- [[Golden shape for the trimmed MPStats parser fixtures.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_shape_reference.py
- [[MPStats returns code403 behind HTTP 200 for a bad token — must surface as…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_server.py
- [[Offline tests for the MPStats connector. Never touches the network every test…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_server.py
- [[The upstream keys items by SKU id, not by request order; the connector walks…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_server.py
- [[The warehouses endpoint does not echo the SKU in each entry, so the connector…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_server.py
- [[Without mp_auth the real ``_call`` raises auth_missing before any HTTP, so the…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_server.py
- [[_item_payload()]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_server.py
- [[_tool_error_payload()_2]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_server.py
- [[_warehouses_payload()]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_server.py
- [[asyncio_1]] - code
- [[coerce_intcoerce_price refuse ambiguous forms (sign, price range).]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_server.py
- [[fake_call()_3]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_server.py
- [[fake_call()_4]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_server.py
- [[fake_call()_5]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_server.py
- [[fake_call()_6]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_server.py
- [[fake_call()_7]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_server.py
- [[fake_call()_8]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_server.py
- [[fake_call()_9]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_server.py
- [[fake_call()_10]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_server.py
- [[forbidden()_9]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_server.py
- [[forbidden_client()]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_server.py
- [[mpstats-connectorteststest_server.py]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_server.py
- [[mpstats-connectorteststest_shape_reference.py]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_shape_reference.py
- [[raise_tool_error serializes a ConnectorError as JSON inside ToolError._3]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_server.py
- [[test_inner_code_403_maps_to_auth_missing()]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_server.py
- [[test_int_graph_coerces_and_zero_fills()]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_server.py
- [[test_invalid_place_rejected()]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_server.py
- [[test_item_and_warehouse_normalization_match_shape_golden()]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_shape_reference.py
- [[test_item_auth_missing_without_token()]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_server.py
- [[test_item_batch_preserves_request_order_and_warns_missing()]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_server.py
- [[test_item_happy_path()]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_server.py
- [[test_item_no_results_raises_not_found()]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_server.py
- [[test_item_shape_drift_raises_parser_drift()]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_server.py
- [[test_last_nonzero_skips_zeros_from_the_end()]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_server.py
- [[test_parse_item_entry_all_zero_price_is_none_all_zero_stock_is_zero()]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_server.py
- [[test_parse_item_entry_empty_graphs_return_none()]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_server.py
- [[test_parse_item_entry_extracts_fields()]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_server.py
- [[test_parse_item_entry_non_dict_returns_none()]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_server.py
- [[test_parse_item_entry_rejects_ambiguous_totals()]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_server.py
- [[test_parse_warehouses_entry_collapses_fbo_list_to_total()]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_server.py
- [[test_parse_warehouses_entry_empty_fbo_list_yields_none_total()]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_server.py
- [[test_parse_warehouses_entry_non_dict_returns_none()]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_server.py
- [[test_selfcheck_drift_when_anchors_missing()]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_server.py
- [[test_selfcheck_inconclusive_on_transport_failure()]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_server.py
- [[test_selfcheck_inconclusive_without_token()]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_server.py
- [[test_selfcheck_success_on_healthy_payload()]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_server.py
- [[test_server_version_matches_pyproject()_2]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_server.py
- [[test_two_tools_registered()]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_server.py
- [[test_validate_skus_rejects_empty()]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_server.py
- [[test_validate_skus_rejects_non_positive_and_bool()]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_server.py
- [[test_validate_skus_rejects_too_many()]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_server.py
- [[test_warehouses_auth_missing_without_token()]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_server.py
- [[test_warehouses_happy_path()]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_server.py
- [[test_warehouses_shape_drift_raises_parser_drift()]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_server.py
- [[test_warehouses_stamps_sku_from_request_when_upstream_omits_it()]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_server.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/mpstats-connector/tests/test_serverpy
SORT file.name ASC
```

## Connections to other communities
- 4 edges to [[_COMMUNITY_payload]]
- 3 edges to [[_COMMUNITY_mpstats_connectorserver.py]]
- 3 edges to [[_COMMUNITY_TransportDownError]]
- 3 edges to [[_COMMUNITY_json]]
- 2 edges to [[_COMMUNITY_shape_signature]]
- 2 edges to [[_COMMUNITY_test_call_envelope.py]]
- 2 edges to [[_COMMUNITY_pathlib]]
- 1 edge to [[_COMMUNITY_pytest]]
- 1 edge to [[_COMMUNITY_test_card_verification_records.py]]

## Top bridge nodes
- [[mpstats-connectorteststest_server.py]] - degree 42, connects to 6 communities
- [[fake_call()_3]] - degree 13, connects to 2 communities
- [[mpstats-connectorteststest_shape_reference.py]] - degree 7, connects to 2 communities
- [[test_item_happy_path()]] - degree 6, connects to 2 communities
- [[test_inner_code_403_maps_to_auth_missing()]] - degree 6, connects to 1 community
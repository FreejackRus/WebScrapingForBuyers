---
type: community
cohesion: 0.06
members: 36
---

# test_helpers.py

**Cohesion:** 0.06 - loosely connected
**Members:** 36 nodes

## Members
- [[A quantity with no price is unsellable; calling it available would rank it…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[If v9's response shape moves, the legacy path still answers.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[WB answers some datacenter requests with a self-referential 307.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[fake_safe_get_text()_27]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[in_stock=False is ambiguous, so an unreported quantity must be visible.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[json.loads admits Infinity by default, so a poisoned priceU cell can reach the…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[no_probe()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[no_wait()_36]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[no_wait()_37]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[probe()_4]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[scenario()_84]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[scenario()_85]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[scenario()_86]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[scenario()_87]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[stream()_9]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[test_attach_image_urls_uses_a_probed_host_for_new_vols()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[test_attach_image_urls_uses_the_table_and_skips_unknown_vols()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[test_basket_for_sku_uses_expected_boundaries()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[test_card_item_dict_never_calls_an_unpriced_listing_in_stock()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[test_category_products_is_registered_and_v1_tools_are_intact()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[test_client_is_built_without_following_redirects()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[test_helpers.py]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[test_known_quantities_produce_no_stock_warning()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[test_kopeck_to_rub_never_returns_or_raises_on_non_finite_values()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[test_kopeck_to_rub_rejects_non_ascii_digit()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[test_missing_quantity_is_flagged_rather_than_read_as_out_of_stock()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[test_proxy_falls_back_to_standard_variables()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[test_proxy_prefers_the_connector_specific_variable()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[test_questions_is_registered_as_a_tool()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[test_recover_search_ids_accepts_live_shapes()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[test_recover_search_ids_rejects_non_lists()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[test_recover_search_ids_skips_invalid_and_boolean_values()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[test_safe_get_text_classifies_httpx_timeout_as_timeout()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[test_server_version_matches_pyproject()_2]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[test_wb_search_handles_v9_shape_drift_by_falling_back()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py
- [[test_wb_selfcheck_null_roots_are_drift()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_helpers.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/test_helperspy
SORT file.name ASC
```

## Connections to other communities
- 23 edges to [[_COMMUNITY_no_wait]]
- 23 edges to [[_COMMUNITY__patch_questions]]
- 13 edges to [[_COMMUNITY__clear_wb_cache]]
- 11 edges to [[_COMMUNITY__tool_error_payload]]
- 7 edges to [[_COMMUNITY_json]]
- 4 edges to [[_COMMUNITY_test_safe_get_text_does_not_retry_http_status_errors]]
- 2 edges to [[_COMMUNITY__RecordingPacer]]
- 2 edges to [[_COMMUNITY__healthy_selfcheck_responder]]
- 2 edges to [[_COMMUNITY_test_card_verification_records.py]]
- 1 edge to [[_COMMUNITY__FakeCurlResponse]]
- 1 edge to [[_COMMUNITY_test_cache_serves_a_repeated_successful_read]]
- 1 edge to [[_COMMUNITY_test_cache_does_not_remember_a_rate_limit]]
- 1 edge to [[_COMMUNITY_test_safe_get_text_does_not_retry_after_wall_timeout]]
- 1 edge to [[_COMMUNITY_test_safe_get_text_has_wall_clock_timeout]]
- 1 edge to [[_COMMUNITY_test_cache_can_be_disabled_by_ttl_zero]]
- 1 edge to [[_COMMUNITY_pytest]]
- 1 edge to [[_COMMUNITY_test_distribution_contract.py]]
- 1 edge to [[_COMMUNITY_pydantic]]
- 1 edge to [[_COMMUNITY_pathlib]]

## Top bridge nodes
- [[test_helpers.py]] - degree 114, connects to 19 communities
- [[scenario()_87]] - degree 3, connects to 1 community
- [[test_wb_selfcheck_null_roots_are_drift()]] - degree 3, connects to 1 community
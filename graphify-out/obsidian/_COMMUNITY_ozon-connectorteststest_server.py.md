---
type: community
cohesion: 0.08
members: 24
---

# ozon-connector/tests/test_server.py

**Cohesion:** 0.08 - loosely connected
**Members:** 24 nodes

## Members
- [[Composer reads are cached, so scenarios must not inherit each other's bodies.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_server.py
- [[clear_cache()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_server.py
- [[fixture]] - code
- [[local()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_server.py
- [[ozon-connectorteststest_server.py]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_server.py
- [[scenario()_20]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_server.py
- [[test_canonical_composer_path_rejects_unsafe_search_query_keys()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_server.py
- [[test_canonical_product_path_ignores_relative_query_digits()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_server.py
- [[test_ozon_proxy_falls_back_to_standard_variables()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_server.py
- [[test_parse_search_tile_canonicalizes_absolute_ozon_product_link()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_server.py
- [[test_parse_search_tile_exposes_canonical_card_input_for_slug_link()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_server.py
- [[test_parse_search_tile_ignores_hostile_nested_shapes()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_server.py
- [[test_parse_search_tile_non_dict_returns_empty()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_server.py
- [[test_parse_search_tile_non_list_main_state_no_crash()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_server.py
- [[test_parse_search_tile_omits_unsafe_or_non_product_links()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_server.py
- [[test_parse_search_tile_reads_textds_tile_name()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_server.py
- [[test_run_sync_bounded_rejects_local_callables()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_server.py
- [[test_safe_review_page_path_rejects_non_string_next_button()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_server.py
- [[test_scrapling_disabled_by_default()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_server.py
- [[test_scrapling_disabled_when_chrome_path_missing()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_server.py
- [[test_server_version_matches_pyproject()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_server.py
- [[test_sync_call_in_process_redacts_url_userinfo_from_child_errors()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_server.py
- [[test_sync_call_in_process_scrubs_child_env()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_server.py
- [[test_sync_call_in_process_times_out_and_next_call_still_works()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_server.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/ozon-connector/tests/test_serverpy
SORT file.name ASC
```

## Connections to other communities
- 7 edges to [[_COMMUNITY__run]]
- 6 edges to [[_COMMUNITY_json]]
- 4 edges to [[_COMMUNITY_test_ozon_selfcheck_includes_runtime_identity]]
- 4 edges to [[_COMMUNITY__patch_tier1]]
- 2 edges to [[_COMMUNITY_test_cache_is_keyed_by_canonical_path_not_raw_input]]
- 2 edges to [[_COMMUNITY_test_cdp_fetch_json_times_out_open_page_and_releases_lock]]
- 1 edge to [[_COMMUNITY_test_fetch_composer_reports_cdp_navigation_block_as_blocked]]
- 1 edge to [[_COMMUNITY_test_fetch_composer_times_out_blocking_curl_and_falls_back_to_cdp]]
- 1 edge to [[_COMMUNITY_test_sync_curl_get_closes_non_context_manager_response]]
- 1 edge to [[_COMMUNITY_test_fetch_composer_does_not_cache_a_block]]
- 1 edge to [[_COMMUNITY_test_tier1_proxy_is_passed_as_an_argument_not_an_env_var]]
- 1 edge to [[_COMMUNITY_test_ozon_search_reports_actionable_cdp_block]]
- 1 edge to [[_COMMUNITY_test_search_parser_live.py]]
- 1 edge to [[_COMMUNITY_test_distribution_contract.py]]
- 1 edge to [[_COMMUNITY_pytest]]
- 1 edge to [[_COMMUNITY_pydantic]]
- 1 edge to [[_COMMUNITY_pathlib]]

## Top bridge nodes
- [[ozon-connectorteststest_server.py]] - degree 55, connects to 17 communities
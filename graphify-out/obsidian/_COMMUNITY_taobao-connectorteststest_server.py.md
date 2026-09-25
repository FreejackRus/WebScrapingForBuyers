---
type: community
cohesion: 0.18
members: 19
---

# taobao-connector/tests/test_server.py

**Cohesion:** 0.18 - loosely connected
**Members:** 19 nodes

## Members
- [[Offline tests for the Taobao connector. CDP rendering is monkeypatched out the…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_server.py
- [[_patch_render()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_server.py
- [[taobao-connectorteststest_server.py]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_server.py
- [[test_a_bare_numeric_id_is_accepted()]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_server.py
- [[test_a_real_taobao_url_still_yields_its_id()]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_server.py
- [[test_card_accepts_a_full_url()]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_server.py
- [[test_card_flags_drift_when_neither_title_nor_price()]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_server.py
- [[test_card_maps_a_gone_item_to_not_found()]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_server.py
- [[test_card_parses_the_item()]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_server.py
- [[test_extract_item_id_handles_every_accepted_shape()]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_server.py
- [[test_product_card_mentioning_captcha_remains_product_data()]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_server.py
- [[test_search_a_hidden_price_is_none_never_zero()]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_server.py
- [[test_search_maps_a_login_wall_to_transport_down()]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_server.py
- [[test_search_maps_zero_items_to_parser_drift()]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_server.py
- [[test_search_parses_items()]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_server.py
- [[test_search_warns_when_no_item_has_a_price()]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_server.py
- [[test_selfcheck_healthy_when_items_extract()]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_server.py
- [[test_selfcheck_login_wall_is_inconclusive_never_drift()]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_server.py
- [[test_selfcheck_zero_items_is_drift()]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_server.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/taobao-connector/tests/test_serverpy
SORT file.name ASC
```

## Connections to other communities
- 7 edges to [[_COMMUNITY__error_payload]]
- 4 edges to [[_COMMUNITY__no_cache_1]]
- 3 edges to [[_COMMUNITY_test_challenge_recovery_reads_browser_again_and_caches_only_success]]
- 2 edges to [[_COMMUNITY_test_card_survives_a_drifted_description_images_with_a_warning]]
- 2 edges to [[_COMMUNITY_test_card_with_a_login_worded_product_name_parses_and_is_not_a_wall]]
- 2 edges to [[_COMMUNITY_test_selfcheck_anti_bot_page_is_inconclusive]]
- 2 edges to [[_COMMUNITY_test_selfcheck_cries_shape_drift_when_the_price_family_vanishes]]
- 2 edges to [[_COMMUNITY_test_selfcheck_genuine_challenge_is_inconclusive_blocked]]
- 2 edges to [[_COMMUNITY_test_selfcheck_runs_the_shape_canary_past_hidden_challenge_text]]
- 2 edges to [[_COMMUNITY_test_selfcheck_title_less_wall_is_inconclusive_never_drift]]
- 1 edge to [[_COMMUNITY_payload]]
- 1 edge to [[_COMMUNITY_test_login_wall_markers_title_branch]]
- 1 edge to [[_COMMUNITY_test_login_wall_markers_read_the_document_title_per_payload_kind]]
- 1 edge to [[_COMMUNITY_test_login_wall_markers_login_routes_branch]]
- 1 edge to [[_COMMUNITY_test_login_wall_markers_ignore_missing_and_garbage_fields]]
- 1 edge to [[_COMMUNITY_test_anti_bot_challenge_is_gated_on_zero_items]]
- 1 edge to [[_COMMUNITY_test_anti_bot_challenge_honors_the_legacy_marker_and_ignores_garbage]]
- 1 edge to [[_COMMUNITY_compare-connectorteststest_browser_handoff.py]]
- 1 edge to [[_COMMUNITY_json]]
- 1 edge to [[_COMMUNITY_pytest]]
- 1 edge to [[_COMMUNITY_test_card_verification_records.py]]

## Top bridge nodes
- [[taobao-connectorteststest_server.py]] - degree 46, connects to 20 communities
- [[_patch_render()_1]] - degree 25, connects to 9 communities
---
type: community
cohesion: 0.18
members: 21
---

# lamoda-connector/tests/test_server.py

**Cohesion:** 0.18 - loosely connected
**Members:** 21 nodes

## Members
- [[Offline tests for the Lamoda connector. GraphQL and CDP rendering are…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/tests/test_server.py
- [[Tiles still extract, but every key the parser binds a price through is gone —…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/tests/test_server.py
- [[Visible challenge wording in product copy cannot suppress shape drift.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/tests/test_server.py
- [[_patch_graphql()]] - code - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/tests/test_server.py
- [[_patch_render()_4]] - code - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/tests/test_server.py
- [[fake_render()_5]] - code - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/tests/test_server.py
- [[lamoda-connectorteststest_server.py]] - code - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/tests/test_server.py
- [[test_card_accepts_a_product_url()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/tests/test_server.py
- [[test_card_parses_graphql_product()]] - code - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/tests/test_server.py
- [[test_extract_sku()]] - code - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/tests/test_server.py
- [[test_search_a_pricelss_item_is_none_never_zero()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/tests/test_server.py
- [[test_search_empty_visible_challenge_is_transport_down()]] - code - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/tests/test_server.py
- [[test_search_maps_zero_skus_to_parser_drift()]] - code - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/tests/test_server.py
- [[test_search_parses_tiles()_2]] - code - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/tests/test_server.py
- [[test_search_warns_when_no_tile_has_a_price()]] - code - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/tests/test_server.py
- [[test_selfcheck_anti_bot_page_is_inconclusive()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/tests/test_server.py
- [[test_selfcheck_cdp_drift_is_flagged()]] - code - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/tests/test_server.py
- [[test_selfcheck_cries_shape_drift_when_the_price_family_vanishes()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/tests/test_server.py
- [[test_selfcheck_healthy_when_both_tiers_answer()]] - code - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/tests/test_server.py
- [[test_selfcheck_price_shape_drift_survives_challenge_copy()]] - code - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/tests/test_server.py
- [[test_the_query_asks_for_the_published_field_names()]] - code - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/tests/test_server.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/lamoda-connector/tests/test_serverpy
SORT file.name ASC
```

## Connections to other communities
- 6 edges to [[_COMMUNITY__patch_graphql_response]]
- 4 edges to [[_COMMUNITY_test_selfcheck_graphql_down_is_inconclusive]]
- 2 edges to [[_COMMUNITY_pytest]]
- 1 edge to [[_COMMUNITY_test_the_graphql_request_carries_a_referer_for_the_sku]]
- 1 edge to [[_COMMUNITY_test_a_graphql_error_block_is_reported_verbatim]]
- 1 edge to [[_COMMUNITY_test_a_non_200_carries_a_body_preview]]
- 1 edge to [[_COMMUNITY_test_challenge_recovery_bypasses_failed_payload_cache]]
- 1 edge to [[_COMMUNITY__no_cache]]
- 1 edge to [[_COMMUNITY_test_the_card_reads_either_old_price_name]]
- 1 edge to [[_COMMUNITY_payload]]
- 1 edge to [[_COMMUNITY_test_card_rejects_input_without_a_sku]]
- 1 edge to [[_COMMUNITY_lamoda-connectorteststest_shape_reference.py]]
- 1 edge to [[_COMMUNITY_json]]
- 1 edge to [[_COMMUNITY_test_card_verification_records.py]]

## Top bridge nodes
- [[lamoda-connectorteststest_server.py]] - degree 37, connects to 13 communities
- [[_patch_render()_4]] - degree 13, connects to 1 community
- [[_patch_graphql()]] - degree 9, connects to 1 community
- [[fake_render()_5]] - degree 2, connects to 1 community
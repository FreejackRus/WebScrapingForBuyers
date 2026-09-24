---
type: community
cohesion: 0.09
members: 33
---

# megamarket-connector/tests/test_server.py

**Cohesion:** 0.09 - loosely connected
**Members:** 33 nodes

## Members
- [[A renamed array is a real parser problem and must stay loud.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/tests/test_server.py
- [[An empty array under a known key means the query matched nothing. That must…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/tests/test_server.py
- [[Empty on a canary is a session problem, and must not read as drift. Reporting…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/tests/test_server.py
- [[Megamarket renaming the array must fail loudly, not return zero results.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/tests/test_server.py
- [[Offline tests for the Megamarket connector. CDP posting is monkeypatched out…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/tests/test_server.py
- [[The tolerant reader keeps working if the shape ever flattens.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/tests/test_server.py
- [[_patch_post()]] - code - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/tests/test_server.py
- [[megamarket-connectorteststest_server.py]] - code - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/tests/test_server.py
- [[test_a_flat_payload_still_parses()]] - code - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/tests/test_server.py
- [[test_a_nested_missing_price_is_none_never_zero()]] - code - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/tests/test_server.py
- [[test_a_populated_result_carries_no_such_warning()]] - code - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/tests/test_server.py
- [[test_an_empty_result_warns_that_it_may_mean_logged_out()]] - code - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/tests/test_server.py
- [[test_card_accepts_a_product_url()]] - code - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/tests/test_server.py
- [[test_card_maps_an_empty_card_to_not_found()]] - code - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/tests/test_server.py
- [[test_card_parses_the_goods_envelope()]] - code - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/tests/test_server.py
- [[test_card_rejects_input_without_an_id()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/tests/test_server.py
- [[test_extract_item_id()]] - code - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/tests/test_server.py
- [[test_is_ip_block_detects_code7_and_vpn_text()]] - code - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/tests/test_server.py
- [[test_paging_uses_offset_not_a_page_number()]] - code - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/tests/test_server.py
- [[test_search_a_pricelss_item_is_none_never_zero()]] - code - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/tests/test_server.py
- [[test_search_allows_a_genuinely_empty_result()]] - code - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/tests/test_server.py
- [[test_search_parses_items_and_total()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/tests/test_server.py
- [[test_search_raises_drift_on_empty_items_with_nonzero_total()]] - code - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/tests/test_server.py
- [[test_search_raises_drift_when_the_items_container_disappears()]] - code - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/tests/test_server.py
- [[test_selfcheck_calls_an_empty_canary_not_authenticated()]] - code - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/tests/test_server.py
- [[test_selfcheck_drift_when_no_items()]] - code - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/tests/test_server.py
- [[test_selfcheck_healthy_when_items_parse()]] - code - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/tests/test_server.py
- [[test_selfcheck_still_calls_a_missing_container_drift()]] - code - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/tests/test_server.py
- [[test_stock_is_none_when_the_payload_omits_it()]] - code - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/tests/test_server.py
- [[test_the_address_reaches_the_search_body()]] - code - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/tests/test_server.py
- [[test_the_real_nested_payload_parses()]] - code - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/tests/test_server.py
- [[test_the_search_body_uses_the_real_schema()]] - code - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/tests/test_server.py
- [[total=10 with nothing parseable is a contradiction, not a soft warning. This…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/tests/test_server.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/megamarket-connector/tests/test_serverpy
SORT file.name ASC
```

## Connections to other communities
- 17 edges to [[_COMMUNITY__patch_routes]]
- 6 edges to [[_COMMUNITY_fake_post]]
- 4 edges to [[_COMMUNITY__patch_page]]
- 3 edges to [[_COMMUNITY_test_resolved_params_are_cached_per_query]]
- 2 edges to [[_COMMUNITY_test_search_calls_url_parse_before_searching]]
- 1 edge to [[_COMMUNITY_test_a_dead_browser_does_not_break_the_search]]
- 1 edge to [[_COMMUNITY_test_the_merchant_suffix_is_stripped_from_the_goods_id]]
- 1 edge to [[_COMMUNITY_megamarket-connectorteststest_parser_live.py]]
- 1 edge to [[_COMMUNITY_json]]
- 1 edge to [[_COMMUNITY_pytest]]
- 1 edge to [[_COMMUNITY_test_card_verification_records.py]]

## Top bridge nodes
- [[megamarket-connectorteststest_server.py]] - degree 63, connects to 11 communities
- [[_patch_post()]] - degree 19, connects to 1 community
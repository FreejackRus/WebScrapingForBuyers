---
type: community
cohesion: 0.06
members: 62
---

# cian-connector/tests/test_server.py

**Cohesion:** 0.06 - loosely connected
**Members:** 62 nodes

## Members
- [[Cian (cian.ru) MCP connector — Russian real-estate listings.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/cian-connector/src/cian_connector/__init__.py
- [[Cian accepts the query and answers zero offers, which would read as 'nothing…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/cian-connector/tests/test_server.py
- [[Cian shows 'цена не указана' for some offers; the payload then carries no price…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/cian-connector/tests/test_server.py
- [[Daily and long-term are the same _type with opposite for_day values; omitting…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/cian-connector/tests/test_server.py
- [[Every test starts with an empty cache a cached body from a previous case would…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/cian-connector/tests/test_server.py
- [[Offline tests for the Cian connector. Every upstream call is monkeypatched at…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/cian-connector/tests/test_server.py
- [[Refusal must come from argument parsing, never from a failed fetch.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/cian-connector/tests/test_server.py
- [[The WAF page can arrive as a 200 through the in-page fetch; the marker in the…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/cian-connector/tests/test_server.py
- [[_card_body()]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/tests/test_server.py
- [[_load()]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/tests/test_server.py
- [[_no_cache()_3]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/tests/test_server.py
- [[_ok()]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/tests/test_server.py
- [[_patch_card()]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/tests/test_server.py
- [[_patch_search()]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/tests/test_server.py
- [[cian-connectorteststest_server.py]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/tests/test_server.py
- [[cian_connector__init__.py]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/src/cian_connector/__init__.py
- [[fake()]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/tests/test_server.py
- [[fake()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/tests/test_server.py
- [[fake_post()]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/tests/test_server.py
- [[fake_post()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/tests/test_server.py
- [[fixture_6]] - code
- [[no_wait()_19]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/tests/test_server.py
- [[no_wait()_20]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/tests/test_server.py
- [[parametrize_3]] - code
- [[test_a_block_page_is_never_cached()]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/tests/test_server.py
- [[test_card_maps_a_removed_offer_to_not_found()]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/tests/test_server.py
- [[test_card_maps_a_waf_block_to_transport_down()]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/tests/test_server.py
- [[test_card_parses_a_new_building_sale()]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/tests/test_server.py
- [[test_card_parses_a_rent_offer()]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/tests/test_server.py
- [[test_card_rejects_input_without_an_id()]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/tests/test_server.py
- [[test_card_with_an_error_title_and_no_state_is_a_block()]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/tests/test_server.py
- [[test_card_without_a_price_warns_instead_of_inventing_one()]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/tests/test_server.py
- [[test_card_without_embedded_state_is_parser_drift()]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/tests/test_server.py
- [[test_daily_card_reads_the_nightly_price()]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/tests/test_server.py
- [[test_daily_commercial_is_refused_by_name_not_by_an_empty_page()]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/tests/test_server.py
- [[test_daily_queries_flip_the_for_day_flag_and_keep_the_rent_family()]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/tests/test_server.py
- [[test_daily_rooms_and_houses_keep_their_own_families()]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/tests/test_server.py
- [[test_daily_search_prices_are_per_night_and_say_so()]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/tests/test_server.py
- [[test_extract_offer_id()]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/tests/test_server.py
- [[test_price_unit_derivation()]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/tests/test_server.py
- [[test_query_for_a_flat_sale_carries_rooms_and_price_range()]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/tests/test_server.py
- [[test_query_for_rent_adds_the_long_term_flag_and_open_ranges()]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/tests/test_server.py
- [[test_query_for_rooms_houses_and_commercial_use_their_own_families()]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/tests/test_server.py
- [[test_search_a_priceless_offer_is_none_never_zero()]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/tests/test_server.py
- [[test_search_an_empty_result_with_zero_total_is_healthy()]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/tests/test_server.py
- [[test_search_maps_a_changed_envelope_to_parser_drift()]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/tests/test_server.py
- [[test_search_maps_a_waf_block_to_transport_down()]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/tests/test_server.py
- [[test_search_maps_non_json_to_parser_drift()]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/tests/test_server.py
- [[test_search_parses_a_rent_page_with_period_and_deposit()]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/tests/test_server.py
- [[test_search_parses_a_sale_page()]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/tests/test_server.py
- [[test_search_reads_the_default_region_from_settings()]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/tests/test_server.py
- [[test_search_rejects_a_malformed_region()]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/tests/test_server.py
- [[test_search_rejects_inverted_ranges()]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/tests/test_server.py
- [[test_search_rejects_unknown_room_codes()]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/tests/test_server.py
- [[test_search_serves_a_repeat_query_from_cache()]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/tests/test_server.py
- [[test_search_treats_a_200_block_page_as_a_block_not_drift()]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/tests/test_server.py
- [[test_search_warns_on_empty_items_with_nonzero_total()]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/tests/test_server.py
- [[test_selfcheck_is_inconclusive_on_a_block_never_drift()]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/tests/test_server.py
- [[test_selfcheck_is_success_when_search_and_card_parse()]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/tests/test_server.py
- [[test_selfcheck_reports_drift_when_the_card_lost_its_state()]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/tests/test_server.py
- [[test_selfcheck_reports_drift_when_the_envelope_changed()]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/tests/test_server.py
- [[test_the_server_exposes_exactly_the_two_read_tools()]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/tests/test_server.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/cian-connector/tests/test_serverpy
SORT file.name ASC
```

## Connections to other communities
- 1 edge to [[_COMMUNITY_cian-connectorteststest_shape_reference.py]]
- 1 edge to [[_COMMUNITY_test_public_contract_snapshot.py]]
- 1 edge to [[_COMMUNITY_json]]
- 1 edge to [[_COMMUNITY_pytest]]
- 1 edge to [[_COMMUNITY_pathlib]]
- 1 edge to [[_COMMUNITY_test_card_verification_records.py]]

## Top bridge nodes
- [[cian-connectorteststest_server.py]] - degree 51, connects to 5 communities
- [[cian_connector__init__.py]] - degree 3, connects to 1 community
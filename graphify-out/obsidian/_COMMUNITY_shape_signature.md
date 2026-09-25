---
type: community
cohesion: 0.08
members: 42
---

# shape_signature

**Cohesion:** 0.08 - loosely connected
**Members:** 42 nodes

## Members
- [[Attach a _meta block. Always present (even when healthy) so the agent can rely…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/resilience.py
- [[Empty results are a shape of their own; an empty page must not be fingerprinted…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_shape_reference.py
- [[Fingerprint a parsed payload's structure, dropping every value. Returns a…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/resilience.py
- [[Golden shape checks for normalized Detsky Mir fixture payloads.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_shape_reference.py
- [[Golden shape for the captured Megamarket search normalization.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/tests/test_shape_reference.py
- [[List indices collapse, so page size must not move the fingerprint.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_shape_signature.py
- [[Reduce Ozon widgetStates keys to their stable prefixes (strip the numeric…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/resilience.py
- [[Reference shape signatures for the Yandex Market SSR parsers, pinned to…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_shape_reference.py
- [[Return {'missing' ..., 'added' ...} comparing two key collections.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/resilience.py
- [[Tests for structural drift fingerprinting. The point of shape_signature is to…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_shape_signature.py
- [[Tolerant-reader resilience helpers shared across marketplace connectors.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/resilience.py
- [[WB category trees nest arbitrarily; the walk must terminate.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_shape_signature.py
- [[_load()_2]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_shape_reference.py
- [[attach_meta()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/resilience.py
- [[bool subclasses int in Python; conflating them would hide a real retype.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_shape_signature.py
- [[detmir-connectorteststest_shape_reference.py]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_shape_reference.py
- [[diff_keys()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/resilience.py
- [[megamarket-connectorteststest_shape_reference.py]] - code - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/tests/test_shape_reference.py
- [[price arriving as 52 999 ₽ instead of a number is exactly how a tolerant…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_shape_signature.py
- [[resilience.py]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/resilience.py
- [[shape_signature()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/resilience.py
- [[test_a_different_item_count_does_not_register_as_drift()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_shape_signature.py
- [[test_a_nested_field_disappearing_is_caught()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_shape_signature.py
- [[test_a_renamed_field_shows_up_as_missing()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_shape_signature.py
- [[test_a_retyped_field_shows_up_even_when_the_name_survives()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_shape_signature.py
- [[test_a_scalar_payload_is_handled()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_shape_signature.py
- [[test_an_emptied_container_is_distinguishable_from_a_populated_one()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_shape_signature.py
- [[test_bool_is_not_reported_as_int()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_shape_signature.py
- [[test_card_normalization_matches_shape_golden()]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_shape_reference.py
- [[test_card_shape_matches_the_no_rating_capture()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_shape_reference.py
- [[test_card_shape_matches_the_washer_capture()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_shape_reference.py
- [[test_empty_search_shape_is_its_own_reference()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_shape_reference.py
- [[test_live_search_normalization_matches_shape_golden()]] - code - mcp-servers/ru-marketplace-mcp/packages/megamarket-connector/tests/test_shape_reference.py
- [[test_null_is_its_own_type_rather_than_an_absent_key()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_shape_signature.py
- [[test_recursion_is_bounded()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_shape_signature.py
- [[test_search_normalization_matches_shape_golden()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/tests/test_shape_reference.py
- [[test_search_shape_matches_the_iphone_capture()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_shape_reference.py
- [[test_search_shape_matches_the_washer_capture()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_shape_reference.py
- [[test_shape_signature.py]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_shape_signature.py
- [[test_the_same_shape_with_different_values_fingerprints_identically()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_shape_signature.py
- [[widget_prefixes()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/resilience.py
- [[yandex-connectorteststest_shape_reference.py]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_shape_reference.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/shape_signature
SORT file.name ASC
```

## Connections to other communities
- 8 edges to [[_COMMUNITY_Any]]
- 7 edges to [[_COMMUNITY_json]]
- 5 edges to [[_COMMUNITY_test_resilience.py]]
- 5 edges to [[_COMMUNITY_pathlib]]
- 4 edges to [[_COMMUNITY_taobao-connectorteststest_shape_reference.py]]
- 4 edges to [[_COMMUNITY_avito-connectorteststest_shape_reference.py]]
- 3 edges to [[_COMMUNITY_dns-connectorteststest_card_extractor_dom.py]]
- 3 edges to [[_COMMUNITY_lamoda-connectorteststest_shape_reference.py]]
- 3 edges to [[_COMMUNITY_test_search_parser_live.py]]
- 3 edges to [[_COMMUNITY_chrome_cdp.py]]
- 3 edges to [[_COMMUNITY_aliexpress-connectorteststest_shape_reference.py]]
- 3 edges to [[_COMMUNITY_test_card_out_of_stock_dom.py]]
- 3 edges to [[_COMMUNITY_coerce_price]]
- 2 edges to [[_COMMUNITY_mpstats-connectorteststest_server.py]]
- 2 edges to [[_COMMUNITY_cian-connectorteststest_shape_reference.py]]
- 2 edges to [[_COMMUNITY_test_resilience_properties.py]]
- 2 edges to [[_COMMUNITY_compare_prices]]
- 1 edge to [[_COMMUNITY_Architecture]]
- 1 edge to [[_COMMUNITY_megamarket-connectorteststest_parser_live.py]]
- 1 edge to [[_COMMUNITY_detmir-connectorteststest_parser_live.py]]
- 1 edge to [[_COMMUNITY_test_card_verification_records.py]]

## Top bridge nodes
- [[resilience.py]] - degree 42, connects to 16 communities
- [[shape_signature()]] - degree 44, connects to 13 communities
- [[detmir-connectorteststest_shape_reference.py]] - degree 6, connects to 3 communities
- [[megamarket-connectorteststest_shape_reference.py]] - degree 6, connects to 3 communities
- [[yandex-connectorteststest_shape_reference.py]] - degree 10, connects to 2 communities
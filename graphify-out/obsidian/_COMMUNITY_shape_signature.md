---
type: community
cohesion: 0.08
members: 39
---

# shape_signature

**Cohesion:** 0.08 - loosely connected
**Members:** 39 nodes

## Members
- [[A rename WITHIN an alias family is tolerated; the loss of a whole family is…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_shape_reference.py
- [[Avito moved listings into catalog.items, but the parser binds both shapes and…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_shape_reference.py
- [[Empty results are a shape of their own; an empty page must not be fingerprinted…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_shape_reference.py
- [[Fingerprint a parsed payload's structure, dropping every value. Returns a…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/resilience.py
- [[List indices collapse, so page size must not move the fingerprint.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_shape_signature.py
- [[Reference shape signature of the REAL Avito ``jsitems`` payload.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_shape_reference.py
- [[Reference shape signatures for the Yandex Market SSR parsers, pinned to…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_shape_reference.py
- [[Return {'missing' ..., 'added' ...} comparing two key collections.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/resilience.py
- [[Tests for structural drift fingerprinting. The point of shape_signature is to…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_shape_signature.py
- [[The fields the parser actually binds to must stay in the reference. A fixture…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_shape_reference.py
- [[WB category trees nest arbitrarily; the walk must terminate.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_shape_signature.py
- [[_load()_3]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_shape_reference.py
- [[avito-connectorteststest_shape_reference.py]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_shape_reference.py
- [[avito_connector__init__.py]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/src/avito_connector/__init__.py
- [[bool subclasses int in Python; conflating them would hide a real retype.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_shape_signature.py
- [[diff_keys()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/resilience.py
- [[price arriving as 52 999 ₽ instead of a number is exactly how a tolerant…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_shape_signature.py
- [[shape_signature()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/resilience.py
- [[test_a_different_item_count_does_not_register_as_drift()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_shape_signature.py
- [[test_a_nested_field_disappearing_is_caught()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_shape_signature.py
- [[test_a_renamed_field_shows_up_as_missing()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_shape_signature.py
- [[test_a_retyped_field_shows_up_even_when_the_name_survives()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_shape_signature.py
- [[test_a_scalar_payload_is_handled()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_shape_signature.py
- [[test_an_emptied_container_is_distinguishable_from_a_populated_one()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_shape_signature.py
- [[test_bool_is_not_reported_as_int()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_shape_signature.py
- [[test_card_shape_matches_the_no_rating_capture()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_shape_reference.py
- [[test_card_shape_matches_the_washer_capture()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_shape_reference.py
- [[test_empty_search_shape_is_its_own_reference()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_shape_reference.py
- [[test_live_payload_shape_matches_the_capture()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_shape_reference.py
- [[test_missing_required_families_reports_only_absent_families()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_shape_reference.py
- [[test_null_is_its_own_type_rather_than_an_absent_key()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_shape_signature.py
- [[test_recursion_is_bounded()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_shape_signature.py
- [[test_search_shape_matches_the_iphone_capture()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_shape_reference.py
- [[test_search_shape_matches_the_washer_capture()]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_shape_reference.py
- [[test_shape_signature.py]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_shape_signature.py
- [[test_the_parser_bindings_survive_in_the_reference_shape()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_shape_reference.py
- [[test_the_pre_2026_08_top_level_envelope_still_passes_the_families()]] - code - mcp-servers/ru-marketplace-mcp/packages/avito-connector/tests/test_shape_reference.py
- [[test_the_same_shape_with_different_values_fingerprints_identically()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_shape_signature.py
- [[yandex-connectorteststest_shape_reference.py]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_shape_reference.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/shape_signature
SORT file.name ASC
```

## Connections to other communities
- 7 edges to [[_COMMUNITY_resilience.py]]
- 5 edges to [[_COMMUNITY_pathlib]]
- 3 edges to [[_COMMUNITY_taobao-connectorteststest_shape_reference.py]]
- 2 edges to [[_COMMUNITY_citilink-connectorteststest_card_extractor_dom.py]]
- 2 edges to [[_COMMUNITY_aliexpress-connectorteststest_parser_live.py]]
- 2 edges to [[_COMMUNITY_lamoda-connectorteststest_shape_reference.py]]
- 2 edges to [[_COMMUNITY_diagnose_drift.py]]
- 2 edges to [[_COMMUNITY_domtest.py]]
- 2 edges to [[_COMMUNITY_compare_prices]]
- 1 edge to [[_COMMUNITY_test_search_parser_live.py]]
- 1 edge to [[_COMMUNITY__parse_search_items]]
- 1 edge to [[_COMMUNITY_cian-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_coerce_price]]
- 1 edge to [[_COMMUNITY_avito-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_test_card_verification_records.py]]
- 1 edge to [[_COMMUNITY_json]]

## Top bridge nodes
- [[shape_signature()]] - degree 43, connects to 12 communities
- [[yandex-connectorteststest_shape_reference.py]] - degree 10, connects to 3 communities
- [[avito-connectorteststest_shape_reference.py]] - degree 9, connects to 3 communities
- [[test_shape_signature.py]] - degree 12, connects to 1 community
- [[diff_keys()]] - degree 5, connects to 1 community
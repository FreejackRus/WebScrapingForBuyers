---
type: community
cohesion: 0.10
members: 21
---

# prices_from_tile

**Cohesion:** 0.10 - loosely connected
**Members:** 21 nodes

## Members
- [[A dead listing at 0 would rank cheapest in every comparison.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_dom.py
- [[A payload cached before the split carries no glyph information.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_search_extractor_dom.py
- [[Fail honest a bare number alone is not evidence of a price. Promoting it would…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_search_extractor_dom.py
- [[Mirrors Citilink's shape bare old price, glyph-attached current price.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_search_extractor_dom.py
- [[Numeric payloads predate the text shape; they must not start reading null.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_dom.py
- [[Return ``(price, old_price)`` for one extracted tile. Reads the shapes the…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/dom.py
- [[Without glyph information there is no evidence which number is the price.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_dom.py
- [[_parsed()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/dom.py
- [[`data-meta-price` is the site's own number no parsing, no ambiguity.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_dom.py
- [[old == price is a drifted read, not a discount — the same promise as the below-…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_dom.py
- [[prices_from_tile()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/dom.py
- [[test_a_broken_meta_attribute_falls_back_to_the_display_text()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_dom.py
- [[test_a_cache_entry_from_an_older_build_still_maps()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_dom.py
- [[test_a_flat_candidate_list_is_treated_as_weak()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_dom.py
- [[test_a_strikethrough_equal_to_the_price_is_dropped()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_dom.py
- [[test_a_tile_with_no_glyph_attached_candidate_reports_no_price()]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_search_extractor_dom.py
- [[test_an_empty_tile_yields_no_price_and_no_crash()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_dom.py
- [[test_glyph_attached_candidate_wins_over_a_bare_number()]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_search_extractor_dom.py
- [[test_legacy_flat_candidate_list_is_treated_as_weak()]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_search_extractor_dom.py
- [[test_the_exact_meta_attribute_wins_over_display_text()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_dom.py
- [[test_zero_is_not_a_price()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_dom.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/prices_from_tile
SORT file.name ASC
```

## Connections to other communities
- 12 edges to [[_COMMUNITY_test_dom.py]]
- 7 edges to [[_COMMUNITY_citilink-connectorteststest_search_extractor_dom.py]]
- 3 edges to [[_COMMUNITY_taobao_connectorserver.py]]
- 2 edges to [[_COMMUNITY_coerce_price]]
- 2 edges to [[_COMMUNITY_citilink-connectorteststest_card_extractor_dom.py]]
- 2 edges to [[_COMMUNITY_taobao-connectorteststest_card_extractor_dom.py]]
- 1 edge to [[_COMMUNITY_citilink_connectormodels_output.py]]
- 1 edge to [[_COMMUNITY_test_card_extractor_live_dom.py]]
- 1 edge to [[_COMMUNITY_pytest]]
- 1 edge to [[_COMMUNITY_lamoda_search]]
- 1 edge to [[_COMMUNITY_test_yuan_glyph_in_a_sibling_element_counts_as_a_price]]
- 1 edge to [[_COMMUNITY_test_an_ambiguous_blob_is_refused_rather_than_concatenated]]
- 1 edge to [[_COMMUNITY_test_meta_attribute_beats_a_numeric_price_rub_field]]
- 1 edge to [[_COMMUNITY_test_the_largest_candidate_above_the_price_is_the_strikethrough]]
- 1 edge to [[_COMMUNITY_test_a_flat_candidate_list_still_feeds_the_strikethrough]]
- 1 edge to [[_COMMUNITY_citilink_card]]
- 1 edge to [[_COMMUNITY_title_from_tile]]
- 1 edge to [[_COMMUNITY_json]]
- 1 edge to [[_COMMUNITY_Adding a marketplace]]

## Top bridge nodes
- [[prices_from_tile()]] - degree 42, connects to 19 communities
- [[test_a_tile_with_no_glyph_attached_candidate_reports_no_price()]] - degree 3, connects to 1 community
- [[test_glyph_attached_candidate_wins_over_a_bare_number()]] - degree 3, connects to 1 community
- [[test_legacy_flat_candidate_list_is_treated_as_weak()]] - degree 3, connects to 1 community
- [[test_a_cache_entry_from_an_older_build_still_maps()]] - degree 3, connects to 1 community
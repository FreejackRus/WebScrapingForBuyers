---
type: community
cohesion: 0.10
members: 21
---

# prices_from_tile

**Cohesion:** 0.10 - loosely connected
**Members:** 21 nodes

## Members
- [[A payload cached before the split carries no glyph information.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_search_extractor_dom.py
- [[Fail honest a bare number alone is not evidence of a price. Promoting it would…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_search_extractor_dom.py
- [[Mirrors Citilink's shape bare old price, glyph-attached current price.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_search_extractor_dom.py
- [[Numeric payloads predate the text shape; they must not start reading null.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_dom.py
- [[Older payloads carry a flat candidate list. Its entries are weak — never the…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_dom.py
- [[Return ``(price, old_price)`` for one extracted tile. Reads the shapes the…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/dom.py
- [[Taobao renders 999¥  ¥129.00 with the glyph glued to the digits.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_dom.py
- [[_parsed()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/dom.py
- [[`data-meta-price` is the site's own number no parsing, no ambiguity.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_dom.py
- [[price_meta is the site's own machine-readable number; price_rub is a…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_dom.py
- [[prices_from_tile()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/dom.py
- [[test_a_cache_entry_from_an_older_build_still_maps()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_dom.py
- [[test_a_flat_candidate_list_still_feeds_the_strikethrough()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_dom.py
- [[test_a_tile_with_no_glyph_attached_candidate_reports_no_price()]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_search_extractor_dom.py
- [[test_glyph_attached_candidate_wins_over_a_bare_number()]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_search_extractor_dom.py
- [[test_glyph_attached_number_is_the_price()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_dom.py
- [[test_legacy_flat_candidate_list_is_treated_as_weak()]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_search_extractor_dom.py
- [[test_legacy_numeric_payload_still_maps()]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_search_extractor_dom.py
- [[test_meta_attribute_beats_a_numeric_price_rub_field()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_dom.py
- [[test_the_exact_meta_attribute_wins_over_display_text()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_dom.py
- [[test_yuan_glue_counts_as_a_price()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_dom.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/prices_from_tile
SORT file.name ASC
```

## Connections to other communities
- 13 edges to [[_COMMUNITY_test_dom.py]]
- 4 edges to [[_COMMUNITY_pathlib]]
- 3 edges to [[_COMMUNITY__items]]
- 3 edges to [[_COMMUNITY_taobao_card]]
- 2 edges to [[_COMMUNITY_citilink-connectorteststest_card_extractor_dom.py]]
- 2 edges to [[_COMMUNITY_coerce_price]]
- 2 edges to [[_COMMUNITY_taobao-connectorteststest_card_extractor_dom.py]]
- 1 edge to [[_COMMUNITY_citilink_card]]
- 1 edge to [[_COMMUNITY_models.py]]
- 1 edge to [[_COMMUNITY_test_card_out_of_stock_dom.py]]
- 1 edge to [[_COMMUNITY_TransportDownError]]
- 1 edge to [[_COMMUNITY_test_an_ambiguous_blob_is_refused_rather_than_concatenated]]
- 1 edge to [[_COMMUNITY_test_the_largest_candidate_above_the_price_is_the_strikethrough]]
- 1 edge to [[_COMMUNITY_test_yuan_glyph_in_a_sibling_element_counts_as_a_price]]
- 1 edge to [[_COMMUNITY_test_zero_is_not_a_price]]
- 1 edge to [[_COMMUNITY_test_card_extractor_live_dom.py]]
- 1 edge to [[_COMMUNITY_title_from_tile]]
- 1 edge to [[_COMMUNITY_json]]
- 1 edge to [[_COMMUNITY_Adding a marketplace]]

## Top bridge nodes
- [[prices_from_tile()]] - degree 42, connects to 18 communities
- [[test_a_tile_with_no_glyph_attached_candidate_reports_no_price()]] - degree 3, connects to 1 community
- [[test_glyph_attached_candidate_wins_over_a_bare_number()]] - degree 3, connects to 1 community
- [[test_legacy_flat_candidate_list_is_treated_as_weak()]] - degree 3, connects to 1 community
- [[test_a_cache_entry_from_an_older_build_still_maps()]] - degree 3, connects to 1 community
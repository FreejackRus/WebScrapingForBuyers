---
type: community
cohesion: 0.08
members: 26
---

# test_dom.py

**Cohesion:** 0.08 - loosely connected
**Members:** 26 nodes

## Members
- [[An old price under the current one is a drifted read, not a discount.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_dom.py
- [[Citilink's strikethrough and DNS's `.product-buy__prev` are both bare.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_dom.py
- [[One list of currency glyphs feeds HAS_GLYPH and the pixel check alike.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_dom.py
- [[One list, two consumers. Hand-writing the regex is how they drift apart.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_dom.py
- [[Rouble signs for DNSCitilinkLamoda, both yuan glyphs for Taobao.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_dom.py
- [[Tests for the shared DOM-extraction layer. ``mcp_core.dom`` carries four…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_dom.py
- [[Without glyph information there is no evidence which number is the price.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_dom.py
- [[`%` and `-` are markers; unescaped they would alter the regex's meaning.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_dom.py
- [[`closest()` tests the element itself first — the DNS tile bug in one call.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_dom.py
- [[innerText depends on layout, differs between tabs, and is absent in jsdom.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_dom.py
- [[old == price is a drifted read, not a discount — the same promise as the below-…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_dom.py
- [[test_a_bare_number_alone_is_never_promoted_to_price()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_dom.py
- [[test_a_broken_meta_attribute_falls_back_to_the_display_text()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_dom.py
- [[test_a_flat_candidate_list_is_treated_as_weak()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_dom.py
- [[test_a_strikethrough_below_the_price_is_dropped_not_reported()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_dom.py
- [[test_a_strikethrough_equal_to_the_price_is_dropped()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_dom.py
- [[test_an_empty_tile_yields_no_price_and_no_crash()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_dom.py
- [[test_bare_number_above_the_price_becomes_the_strikethrough()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_dom.py
- [[test_dom.py]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_dom.py
- [[test_regex_punctuation_in_a_marker_cannot_change_the_pattern()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_dom.py
- [[test_the_js_decoy_regex_is_generated_from_the_python_list()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_dom.py
- [[test_the_price_glyph_list_covers_rouble_and_yuan()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_dom.py
- [[test_the_price_glyph_regex_is_generated_from_the_python_list()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_dom.py
- [[test_the_shared_helpers_expose_what_connectors_rely_on()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_dom.py
- [[test_the_shared_helpers_never_reintroduce_closest()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_dom.py
- [[test_the_shared_helpers_read_text_content_not_inner_text()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_dom.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/test_dompy
SORT file.name ASC
```

## Connections to other communities
- 13 edges to [[_COMMUNITY_prices_from_tile]]
- 2 edges to [[_COMMUNITY_title_from_tile]]
- 2 edges to [[_COMMUNITY_json]]
- 1 edge to [[_COMMUNITY_test_yuan_glyph_in_a_sibling_element_counts_as_a_price]]
- 1 edge to [[_COMMUNITY_test_an_ambiguous_blob_is_refused_rather_than_concatenated]]
- 1 edge to [[_COMMUNITY_test_zero_is_not_a_price]]
- 1 edge to [[_COMMUNITY_test_the_largest_candidate_above_the_price_is_the_strikethrough]]

## Top bridge nodes
- [[test_dom.py]] - degree 29, connects to 7 communities
- [[test_a_bare_number_alone_is_never_promoted_to_price()]] - degree 3, connects to 1 community
- [[test_a_flat_candidate_list_is_treated_as_weak()]] - degree 3, connects to 1 community
- [[test_a_strikethrough_below_the_price_is_dropped_not_reported()]] - degree 3, connects to 1 community
- [[test_a_strikethrough_equal_to_the_price_is_dropped()]] - degree 3, connects to 1 community
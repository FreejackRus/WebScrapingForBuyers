---
type: community
cohesion: 0.17
members: 12
---

# _items

**Cohesion:** 0.17 - loosely connected
**Members:** 12 nodes

## Members
- [[- 10%, + 1 655 бонусов, в 1356 пунктов, (от 8 дней) are not prices.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_search_extractor_dom.py
- [[DOM order here is old price, then discount badge, then current price. Anything…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_search_extractor_dom.py
- [[The exact reason Citilink prices were null. This is the core regression.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_search_extractor_dom.py
- [[The first product anchor per tile is an empty overlay link.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_search_extractor_dom.py
- [[_items()_4]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_search_extractor_dom.py
- [[``data-meta-price`` is the site's own numeric amount — no parsing, no ambiguity.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_search_extractor_dom.py
- [[test_badges_bonuses_and_delivery_counts_are_never_prices()]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_search_extractor_dom.py
- [[test_exact_meta_price_attribute_is_preferred()]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_search_extractor_dom.py
- [[test_price_is_found_when_the_currency_glyph_is_a_separate_element()]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_search_extractor_dom.py
- [[test_search_items_carry_the_wire_shape()]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_search_extractor_dom.py
- [[test_strikethrough_before_the_current_price_is_read_as_the_old_price()]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_search_extractor_dom.py
- [[test_title_comes_from_a_text_bearing_anchor_not_the_empty_overlay()]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_search_extractor_dom.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/_items
SORT file.name ASC
```

## Connections to other communities
- 7 edges to [[_COMMUNITY_pathlib]]
- 3 edges to [[_COMMUNITY_prices_from_tile]]
- 1 edge to [[_COMMUNITY_run_extractor]]

## Top bridge nodes
- [[_items()_4]] - degree 8, connects to 2 communities
- [[test_badges_bonuses_and_delivery_counts_are_never_prices()]] - degree 4, connects to 2 communities
- [[test_price_is_found_when_the_currency_glyph_is_a_separate_element()]] - degree 4, connects to 2 communities
- [[test_strikethrough_before_the_current_price_is_read_as_the_old_price()]] - degree 4, connects to 2 communities
- [[test_exact_meta_price_attribute_is_preferred()]] - degree 3, connects to 1 community
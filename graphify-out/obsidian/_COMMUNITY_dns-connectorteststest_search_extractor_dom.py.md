---
type: community
cohesion: 0.12
members: 16
---

# dns-connector/tests/test_search_extractor_dom.py

**Cohesion:** 0.12 - loosely connected
**Members:** 16 nodes

## Members
- [[A cache entry written by the previous build must not start answering nulls.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/dns-connector/tests/test_search_extractor_dom.py
- [[A dead listing must not rank as the cheapest option in compare_prices.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/dns-connector/tests/test_search_extractor_dom.py
- [[An old price under the current one is a drifted read, not a discount._1]] - rationale - mcp-servers/ru-marketplace-mcp/packages/dns-connector/tests/test_search_extractor_dom.py
- [[Guard the exact mechanism of the original bug. ``closest()`` tests the element…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/dns-connector/tests/test_search_extractor_dom.py
- [[If the strikethrough ever glues onto the price, fail loud rather than invent.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/dns-connector/tests/test_search_extractor_dom.py
- [[Real display strings from the live tiles, including the ones that broke.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/dns-connector/tests/test_search_extractor_dom.py
- [[Regression tests for the DNS searchcard extractors, on a real captured DOM.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/dns-connector/tests/test_search_extractor_dom.py
- [[`.product-buy__prev` renders 54 999 with no ₽ — the old filter missed it.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/dns-connector/tests/test_search_extractor_dom.py
- [[dns-connectorteststest_search_extractor_dom.py]] - code - mcp-servers/ru-marketplace-mcp/packages/dns-connector/tests/test_search_extractor_dom.py
- [[test_concatenated_price_blob_is_refused_not_guessed()]] - code - mcp-servers/ru-marketplace-mcp/packages/dns-connector/tests/test_search_extractor_dom.py
- [[test_legacy_numeric_payload_still_maps()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/dns-connector/tests/test_search_extractor_dom.py
- [[test_old_price_without_a_currency_glyph_is_still_parsed()]] - code - mcp-servers/ru-marketplace-mcp/packages/dns-connector/tests/test_search_extractor_dom.py
- [[test_price_text_shapes_seen_on_dns()]] - code - mcp-servers/ru-marketplace-mcp/packages/dns-connector/tests/test_search_extractor_dom.py
- [[test_strikethrough_below_current_price_is_dropped()]] - code - mcp-servers/ru-marketplace-mcp/packages/dns-connector/tests/test_search_extractor_dom.py
- [[test_tile_root_is_not_the_image_anchor()]] - code - mcp-servers/ru-marketplace-mcp/packages/dns-connector/tests/test_search_extractor_dom.py
- [[test_zero_price_is_none_never_zero()]] - code - mcp-servers/ru-marketplace-mcp/packages/dns-connector/tests/test_search_extractor_dom.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/dns-connector/tests/test_search_extractor_dompy
SORT file.name ASC
```

## Connections to other communities
- 4 edges to [[_COMMUNITY__extract]]
- 2 edges to [[_COMMUNITY_pathlib]]
- 1 edge to [[_COMMUNITY_dns-connectorteststest_card_extractor_dom.py]]
- 1 edge to [[_COMMUNITY_pytest]]

## Top bridge nodes
- [[dns-connectorteststest_search_extractor_dom.py]] - degree 16, connects to 4 communities
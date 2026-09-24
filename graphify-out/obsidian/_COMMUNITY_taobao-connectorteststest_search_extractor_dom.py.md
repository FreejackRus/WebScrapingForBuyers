---
type: community
cohesion: 0.21
members: 13
---

# taobao-connector/tests/test_search_extractor_dom.py

**Cohesion:** 0.21 - loosely connected
**Members:** 13 nodes

## Members
- [[999¥ is glyph-attached, so priceTextsIn keeps it as the price candidate.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_search_extractor_dom.py
- [[Both cards are found, deduplicated by item id, with their data intact.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_search_extractor_dom.py
- [[Extractor JS - Python mapping - TaobaoSearchItemOut wire shape.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_search_extractor_dom.py
- [[Guard against a regression back to closest()innerTextparseFloatMath.min.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_search_extractor_dom.py
- [[Regression tests for the Taobao search extractor on a modeled fixture. Taobao's…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_search_extractor_dom.py
- [[_extract()_5]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_search_extractor_dom.py
- [[taobao-connectorteststest_search_extractor_dom.py]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_search_extractor_dom.py
- [[test_a_hidden_price_is_none_never_zero()]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_search_extractor_dom.py
- [[test_items_carry_the_wire_shape()]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_search_extractor_dom.py
- [[test_search_extractor_reads_the_real_grid()]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_search_extractor_dom.py
- [[test_the_extractor_uses_shared_helpers_not_legacy_heuristics()]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_search_extractor_dom.py
- [[test_yuan_glued_price_is_read_from_the_card()]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_search_extractor_dom.py
- [[«面议» carries no digits and must not read as a price or as 0.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_search_extractor_dom.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/taobao-connector/tests/test_search_extractor_dompy
SORT file.name ASC
```

## Connections to other communities
- 2 edges to [[_COMMUNITY_run_extractor]]
- 2 edges to [[_COMMUNITY_pathlib]]
- 1 edge to [[_COMMUNITY_compare-connectorteststest_browser_handoff.py]]
- 1 edge to [[_COMMUNITY_pytest]]

## Top bridge nodes
- [[taobao-connectorteststest_search_extractor_dom.py]] - degree 11, connects to 3 communities
- [[_extract()_5]] - degree 7, connects to 1 community
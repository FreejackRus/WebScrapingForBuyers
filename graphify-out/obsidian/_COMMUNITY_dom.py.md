---
type: community
cohesion: 0.09
members: 30
---

# dom.py

**Cohesion:** 0.09 - loosely connected
**Members:** 30 nodes

## Members
- [[60 630 belongs to a recommendation snippet; it must not surface anywhere in the…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_card_out_of_stock_dom.py
- [[Citilink-Shop MCP connector.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/src/citilink_connector/__init__.py
- [[JavaScript regex for the sibling-text check what remains next to the digits is…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/dom.py
- [[Regression tests for the Citilink card extractor on a captured OUT-OF-STOCK…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_card_out_of_stock_dom.py
- [[Regression tests for the Citilink card extractor on a captured card page.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_card_extractor_dom.py
- [[Shared JavaScript for the CDP text-scraping tiers, plus its Python side. Four…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/dom.py
- [[The DECOY_MARKERS as a JavaScript regex literal. Escaped so a marker containing…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/dom.py
- [[The _PRICE_GLYPHS as a JavaScript regex literal, escaped like the decoys.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/dom.py
- [[The crossed-out price must be the product's own 105 990, not the 97 990…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_card_extractor_dom.py
- [[The day data-meta-price disappears, the glyph-attached display string inside…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_card_extractor_dom.py
- [[The product has no price of its own None, never a recommendation's.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_card_out_of_stock_dom.py
- [[_decoy_regex_literal()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/dom.py
- [[_extract()_9]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_card_extractor_dom.py
- [[_extract()_10]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_card_out_of_stock_dom.py
- [[_glyph_remainder_literal()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/dom.py
- [[_price_glyph_literal()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/dom.py
- [[citilink-connectorteststest_card_extractor_dom.py]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_card_extractor_dom.py
- [[citilink_connector__init__.py]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/src/citilink_connector/__init__.py
- [[dom.py]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/dom.py
- [[test_a_recommendation_price_is_never_the_products()]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_card_out_of_stock_dom.py
- [[test_availability_is_read_from_text_content_not_inner_text()]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_card_extractor_dom.py
- [[test_card_extractor_reads_the_product_card()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_card_extractor_dom.py
- [[test_card_out_of_stock_dom.py]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_card_out_of_stock_dom.py
- [[test_card_prices_are_the_products_own()]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_card_extractor_dom.py
- [[test_credit_and_bonus_amounts_are_not_price_candidates()]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_card_extractor_dom.py
- [[test_out_of_stock_card_reports_no_price()]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_card_out_of_stock_dom.py
- [[test_out_of_stock_is_read_from_the_page_text()]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_card_out_of_stock_dom.py
- [[test_recommendation_prices_are_never_the_products()]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_card_extractor_dom.py
- [[test_split_glyph_price_survives_the_meta_attribute_disappearing()]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_card_extractor_dom.py
- [[«от 3 531 ₽ в месяц» and «1800 бонусов» must not be candidates.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/tests/test_card_extractor_dom.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/dompy
SORT file.name ASC
```

## Connections to other communities
- 8 edges to [[_COMMUNITY_domtest.py]]
- 6 edges to [[_COMMUNITY_prices_from_tile]]
- 4 edges to [[_COMMUNITY_json]]
- 2 edges to [[_COMMUNITY_citilink-connectorteststest_search_extractor_dom.py]]
- 2 edges to [[_COMMUNITY_pytest]]
- 2 edges to [[_COMMUNITY_pathlib]]
- 1 edge to [[_COMMUNITY_coerce_price]]
- 1 edge to [[_COMMUNITY_test_resilience.py]]
- 1 edge to [[_COMMUNITY_citilink-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_resilience.py]]
- 1 edge to [[_COMMUNITY_aliexpress_connectorserver.py]]
- 1 edge to [[_COMMUNITY_taobao-connectorteststest_shape_reference.py]]
- 1 edge to [[_COMMUNITY_taobao-connectorteststest_card_extractor_dom.py]]
- 1 edge to [[_COMMUNITY_lamoda_connectorserver.py]]
- 1 edge to [[_COMMUNITY_taobao_connectorserver.py]]

## Top bridge nodes
- [[dom.py]] - degree 22, connects to 11 communities
- [[citilink-connectorteststest_card_extractor_dom.py]] - degree 13, connects to 3 communities
- [[test_card_out_of_stock_dom.py]] - degree 10, connects to 3 communities
- [[citilink_connector__init__.py]] - degree 6, connects to 3 communities
- [[_extract()_9]] - degree 8, connects to 1 community
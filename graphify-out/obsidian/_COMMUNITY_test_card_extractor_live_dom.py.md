---
type: community
cohesion: 0.29
members: 10
---

# test_card_extractor_live_dom.py

**Cohesion:** 0.29 - loosely connected
**Members:** 10 nodes

## Members
- [[The Taobao card extractor against a LIVE captured item page.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_card_extractor_live_dom.py
- [[The modern page has no h1; before the fix the generic title fallback read the…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_card_extractor_live_dom.py
- [[The rendered body text carries no newlines; an uncapped line scan glued the…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_card_extractor_live_dom.py
- [[_extract()_8]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_card_extractor_live_dom.py
- [[test_card_extractor_live_dom.py]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_card_extractor_live_dom.py
- [[test_live_description_images_are_counted()]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_card_extractor_live_dom.py
- [[test_live_price_is_assembled_from_the_split_spans()]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_card_extractor_live_dom.py
- [[test_live_shop_and_sales_are_the_short_nodes_not_body_blobs()]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_card_extractor_live_dom.py
- [[test_live_title_is_the_product_name_not_a_widget_placeholder()]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_card_extractor_live_dom.py
- [[￥83.6 is what the buyer pays (店铺优惠后); ￥95 is the before-discount figure (优惠前)…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_card_extractor_live_dom.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/test_card_extractor_live_dompy
SORT file.name ASC
```

## Connections to other communities
- 2 edges to [[_COMMUNITY_run_extractor]]
- 2 edges to [[_COMMUNITY_pathlib]]
- 1 edge to [[_COMMUNITY_prices_from_tile]]
- 1 edge to [[_COMMUNITY_compare-connectorteststest_browser_handoff.py]]
- 1 edge to [[_COMMUNITY_pytest]]
- 1 edge to [[_COMMUNITY_json]]

## Top bridge nodes
- [[test_card_extractor_live_dom.py]] - degree 11, connects to 4 communities
- [[_extract()_8]] - degree 7, connects to 1 community
- [[test_live_price_is_assembled_from_the_split_spans()]] - degree 4, connects to 1 community
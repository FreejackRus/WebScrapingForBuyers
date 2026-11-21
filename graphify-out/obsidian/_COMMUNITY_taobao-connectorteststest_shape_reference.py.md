---
type: community
cohesion: 0.14
members: 20
---

# taobao-connector/tests/test_shape_reference.py

**Cohesion:** 0.14 - loosely connected
**Members:** 20 nodes

## Members
- [[Path_11]] - code
- [[Reference shape signatures for the Taobao extractors, pinned to the capture.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_shape_reference.py
- [[Taobao MCP connector.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/src/taobao_connector/__init__.py
- [[The Taobao card extractor against a LIVE captured item page.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_card_extractor_live_dom.py
- [[The modern page has no h1; before the fix the generic title fallback read the…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_card_extractor_live_dom.py
- [[The rendered body text carries no newlines; an uncapped line scan glued the…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_card_extractor_live_dom.py
- [[The selfcheck compares live payloads against SEARCH_SHAPE_REFERENCE; the…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_shape_reference.py
- [[_extract()_4]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_card_extractor_live_dom.py
- [[_extract()_5]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_shape_reference.py
- [[taobao-connectorteststest_shape_reference.py]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_shape_reference.py
- [[taobao_connector__init__.py]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/src/taobao_connector/__init__.py
- [[test_card_extractor_live_dom.py]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_card_extractor_live_dom.py
- [[test_card_payload_shape_matches_the_capture()_2]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_shape_reference.py
- [[test_live_description_images_are_counted()]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_card_extractor_live_dom.py
- [[test_live_price_is_assembled_from_the_split_spans()]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_card_extractor_live_dom.py
- [[test_live_search_shape_matches_the_selfcheck_registry()]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_shape_reference.py
- [[test_live_shop_and_sales_are_the_short_nodes_not_body_blobs()]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_card_extractor_live_dom.py
- [[test_live_title_is_the_product_name_not_a_widget_placeholder()]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_card_extractor_live_dom.py
- [[test_search_payload_shape_matches_the_capture()_2]] - code - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_shape_reference.py
- [[￥83.6 is what the buyer pays (店铺优惠后); ￥95 is the before-discount figure (优惠前)…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/taobao-connector/tests/test_card_extractor_live_dom.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/taobao-connector/tests/test_shape_referencepy
SORT file.name ASC
```

## Connections to other communities
- 7 edges to [[_COMMUNITY_domtest.py]]
- 4 edges to [[_COMMUNITY_taobao_connectorserver.py]]
- 3 edges to [[_COMMUNITY_shape_signature]]
- 2 edges to [[_COMMUNITY_pytest]]
- 2 edges to [[_COMMUNITY_pathlib]]
- 1 edge to [[_COMMUNITY_prices_from_tile]]
- 1 edge to [[_COMMUNITY_taobao-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_resilience.py]]
- 1 edge to [[_COMMUNITY_test_search_login_wall_live_dom.py]]
- 1 edge to [[_COMMUNITY_transport__init__.py]]
- 1 edge to [[_COMMUNITY_test_anti_bot_challenge_dom.py]]
- 1 edge to [[_COMMUNITY_taobao-connectorteststest_card_extractor_dom.py]]
- 1 edge to [[_COMMUNITY_taobao-connectorteststest_search_extractor_dom.py]]
- 1 edge to [[_COMMUNITY_dom.py]]

## Top bridge nodes
- [[taobao_connector__init__.py]] - degree 10, connects to 7 communities
- [[taobao-connectorteststest_shape_reference.py]] - degree 13, connects to 5 communities
- [[test_card_extractor_live_dom.py]] - degree 11, connects to 4 communities
- [[test_live_search_shape_matches_the_selfcheck_registry()]] - degree 5, connects to 2 communities
- [[_extract()_4]] - degree 7, connects to 1 community
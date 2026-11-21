---
type: community
cohesion: 0.08
members: 52
---

# aliexpress_connector/server.py

**Cohesion:** 0.08 - loosely connected
**Members:** 52 nodes

## Members
- [[(price, old_price) from the sticky-offer module, symmetric with tiles. The…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/server.py
- [[(price, old_price, coupon_price) for a SEARCH tile. Measured against the live…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/server.py
- [[AliCardResponse]] - code - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/models_output.py
- [[AliExpress MCP connector. AliExpress gates its site behind x5sec, Alibaba's JS…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/server.py
- [[AliExpress carries the shared envelope unchanged.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/models_output.py
- [[AliExpress connector runtime settings (env-driven via ALI_ prefix).]] - rationale - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/settings.py
- [[AliSearchItemOut]] - code - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/models_output.py
- [[AliSearchResponse]] - code - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/models_output.py
- [[AliSelfcheckResponse]] - code - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/models_output.py
- [[AliSettings]] - code - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/settings.py
- [[Any_4]] - code
- [[BaseModel_1]] - code
- [[BaseSettings]] - code
- [[Fetch one AliExpress product card, rendered in the operator's Chrome. Review…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/server.py
- [[Field_1]] - code
- [[Keep only a real https photo URL; lazy placeholders are data URIs.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/server.py
- [[Map one extracted tile onto the wire shape, prices parsed in Python.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/server.py
- [[MetaOut_1]] - code - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/models_output.py
- [[Open the item in a NEW TAB from the loaded landing page and read its DOM.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/server.py
- [[Open the search URL in the operator's Chrome and extract tiles.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/server.py
- [[Pull the item id out of an aliexpress.ru URL or a bare numeric id. Host-checked…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/server.py
- [[Pydantic output models for the AliExpress MCP connector.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/models_output.py
- [[Search AliExpress, rendered in the operator's Chrome.  Return Format…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/server.py
- [[Space this source's requests out, and back off if it refused us. Reads…_1]] - rationale - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/server.py
- [[Split glyph-attached candidates into (regular prices, coupon value). Returns…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/server.py
- [[The x5sec challenge page is a transport verdict, not data.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/server.py
- [[_aliexpress_selfcheck_impl()]] - code - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/server.py
- [[_card_prices()]] - code - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/server.py
- [[_cdp_card()]] - code - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/server.py
- [[_cdp_render_search()]] - code - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/server.py
- [[_challenge_error()]] - code - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/server.py
- [[_extract_item_id()]] - code - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/server.py
- [[_https_image_url()]] - code - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/server.py
- [[_is_punish()]] - code - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/server.py
- [[_item_from_payload()]] - code - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/server.py
- [[_polite_wait()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/server.py
- [[_scored_prices()]] - code - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/server.py
- [[_tile_prices()]] - code - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/server.py
- [[_unwrap_extract()]] - code - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/server.py
- [[aliexpress_card()]] - code - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/server.py
- [[aliexpress_connectormodels_output.py]] - code - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/models_output.py
- [[aliexpress_connectorserver.py]] - code - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/server.py
- [[aliexpress_connectorsettings.py]] - code - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/settings.py
- [[aliexpress_search()]] - code - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/server.py
- [[description_1]] - code
- [[get_settings()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/settings.py
- [[max_length_1]] - code
- [[min_length_1]] - code
- [[search()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_source_warnings.py
- [[test_coupon_warning_keeps_regular_price_and_does_not_claim_failure()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_source_warnings.py
- [[tool_1]] - code
- [[Добавлено_3]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/aliexpress_connector/serverpy
SORT file.name ASC
```

## Connections to other communities
- 21 edges to [[_COMMUNITY_json]]
- 11 edges to [[_COMMUNITY_TransportDownError]]
- 4 edges to [[_COMMUNITY_citilink_card]]
- 3 edges to [[_COMMUNITY_aliexpress_selfcheck]]
- 2 edges to [[_COMMUNITY_log_event]]
- 2 edges to [[_COMMUNITY_raise_tool_error]]
- 2 edges to [[_COMMUNITY_test_card_verification_records.py]]
- 2 edges to [[_COMMUNITY_functools]]
- 1 edge to [[_COMMUNITY_SourceAdapter]]
- 1 edge to [[_COMMUNITY_prices_from_tile]]
- 1 edge to [[_COMMUNITY_compare_prices]]
- 1 edge to [[_COMMUNITY_dom.py]]
- 1 edge to [[_COMMUNITY_chrome_cdp.py]]
- 1 edge to [[_COMMUNITY_Changelog]]

## Top bridge nodes
- [[aliexpress_connectorserver.py]] - degree 44, connects to 5 communities
- [[aliexpress_search()]] - degree 21, connects to 5 communities
- [[aliexpress_card()]] - degree 21, connects to 4 communities
- [[_cdp_card()]] - degree 12, connects to 2 communities
- [[aliexpress_connectorsettings.py]] - degree 7, connects to 2 communities
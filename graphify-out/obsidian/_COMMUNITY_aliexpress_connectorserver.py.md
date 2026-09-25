---
type: community
cohesion: 0.11
members: 40
---

# aliexpress_connector/server.py

**Cohesion:** 0.11 - loosely connected
**Members:** 40 nodes

## Members
- [[(price, old_price) from the sticky-offer module, symmetric with tiles. The…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/server.py
- [[(price, old_price, coupon_price) for a SEARCH tile. Measured against the live…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/server.py
- [[AliExpress MCP connector. AliExpress gates its site behind x5sec, Alibaba's JS…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/server.py
- [[AliExpress carries the shared envelope unchanged.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/models_output.py
- [[AliSelfcheckResponse]] - code - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/models_output.py
- [[Any_8]] - code
- [[Context_3]] - code
- [[Fetch one AliExpress product card, rendered in the operator's Chrome. Review…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/server.py
- [[Field_2]] - code
- [[Map one extracted tile onto the wire shape, prices parsed in Python.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/server.py
- [[MetaOut_2]] - code - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/models_output.py
- [[Open the item in a NEW TAB from the loaded landing page and read its DOM.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/server.py
- [[Open the search URL in the operator's Chrome and extract tiles.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/server.py
- [[Pull the item id out of an aliexpress.ru URL or a bare numeric id. Host-checked…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/server.py
- [[Search AliExpress, rendered in the operator's Chrome.  Return Format…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/server.py
- [[Space this source's requests out, and back off if it refused us. Reads…_3]] - rationale - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/server.py
- [[Split glyph-attached candidates into (regular prices, coupon value). Returns…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/server.py
- [[Structural drift canary for AliExpress (tri-state). Renders one live search and…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/server.py
- [[The x5sec challenge page is a transport verdict, not data.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/server.py
- [[_aliexpress_selfcheck_impl()]] - code - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/server.py
- [[_card_prices()]] - code - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/server.py
- [[_cdp_card()]] - code - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/server.py
- [[_cdp_render_search()]] - code - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/server.py
- [[_challenge_error()]] - code - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/server.py
- [[_extract_item_id()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/server.py
- [[_is_punish()]] - code - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/server.py
- [[_item_from_payload()]] - code - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/server.py
- [[_polite_wait()_3]] - code - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/server.py
- [[_scored_prices()]] - code - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/server.py
- [[_tile_prices()]] - code - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/server.py
- [[_unwrap_extract()]] - code - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/server.py
- [[aliexpress_card()]] - code - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/server.py
- [[aliexpress_connectorserver.py]] - code - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/server.py
- [[aliexpress_search()]] - code - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/server.py
- [[aliexpress_selfcheck()]] - code - mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/server.py
- [[description_3]] - code
- [[max_length_2]] - code
- [[min_length_2]] - code
- [[tool_2]] - code
- [[Добавлено_6]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/aliexpress_connector/serverpy
SORT file.name ASC
```

## Connections to other communities
- 17 edges to [[_COMMUNITY_json]]
- 12 edges to [[_COMMUNITY_TransportDownError]]
- 9 edges to [[_COMMUNITY_aliexpress_connectormodels_output.py]]
- 3 edges to [[_COMMUNITY_log_event]]
- 3 edges to [[_COMMUNITY_pydantic]]
- 2 edges to [[_COMMUNITY_BadRequestError]]
- 2 edges to [[_COMMUNITY_citilink_card]]
- 2 edges to [[_COMMUNITY_open_page]]
- 1 edge to [[_COMMUNITY_ozon_card]]
- 1 edge to [[_COMMUNITY_packages_contracts_dist_index]]
- 1 edge to [[_COMMUNITY_Anti-bot reality, source by source]]
- 1 edge to [[_COMMUNITY_AliExpress connector]]
- 1 edge to [[_COMMUNITY_ru-marketplace-mcp]]
- 1 edge to [[_COMMUNITY_English version]]
- 1 edge to [[_COMMUNITY_AliExpress connector_1]]
- 1 edge to [[_COMMUNITY_title_from_tile]]
- 1 edge to [[_COMMUNITY_compare_prices]]
- 1 edge to [[_COMMUNITY_Changelog]]
- 1 edge to [[_COMMUNITY_chrome_cdp.py]]

## Top bridge nodes
- [[aliexpress_selfcheck()]] - degree 13, connects to 7 communities
- [[aliexpress_card()]] - degree 22, connects to 5 communities
- [[aliexpress_search()]] - degree 22, connects to 5 communities
- [[aliexpress_connectorserver.py]] - degree 43, connects to 4 communities
- [[_cdp_card()]] - degree 13, connects to 2 communities
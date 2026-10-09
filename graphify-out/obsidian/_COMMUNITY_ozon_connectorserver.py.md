---
type: community
cohesion: 0.10
members: 34
---

# ozon_connector/server.py

**Cohesion:** 0.10 - loosely connected
**Members:** 34 nodes

## Members
- [[Any_8]] - code
- [[Convert a unix-seconds timestamp (int or numeric str) to UTC ISO-8601.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[Extract text from a mainState atom of given type.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[First gallery photo of a search tile tileImage.items.image.link (https only).]] - rationale - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[Map one raw Ozon review object to our compact shape. Text fields are coerced to…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[Ozon MCP connector. Three-tier strategy Tier 1 curl_cffi impersonate — cheap,…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[Parse ``tileGridDesktop-`` widgets of a composer payload into tile dicts.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[Parse a single tileGridDesktop item (Ozon search result, Nov 2026 schema). Top-…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[Parse an Ozon price string like '3u2009983u2009₽' (thin-space grouped) to…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[Retain stock messages without requiring them to contain a unit count.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[RuntimeError_1]] - code
- [[TimeoutError]] - code
- [[_SyncCallError]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[_SyncCallTimeout]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[_atom_text()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[_can_process_call()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[_canonical_product_path_from_input()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[_is_search_stock_label()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[_parse_review_item()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[_parse_search_tile()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[_parse_widgets()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[_price_str_to_float()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[_run_sync_bounded()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[_search_items_from_payload()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[_search_tile_image()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[_search_tile_product_link()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[_smoke_card()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[_smoke_search()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[_sync_call_in_process()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[_text()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[_ts_to_iso()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[ozon_connectorserver.py]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[pickle]] - concept
- [[posixpath]] - concept

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/ozon_connector/serverpy
SORT file.name ASC
```

## Connections to other communities
- 21 edges to [[_COMMUNITY_json]]
- 17 edges to [[_COMMUNITY__fetch_composer]]
- 5 edges to [[_COMMUNITY_ozon_selfcheck]]
- 5 edges to [[_COMMUNITY_ozon_card]]
- 4 edges to [[_COMMUNITY_ozon_connectormodels_output.py]]
- 4 edges to [[_COMMUNITY_process.py]]
- 2 edges to [[_COMMUNITY_ozon_connectorsettings.py]]
- 1 edge to [[_COMMUNITY_subprocess]]
- 1 edge to [[_COMMUNITY_sys]]
- 1 edge to [[_COMMUNITY_domtest.py]]
- 1 edge to [[_COMMUNITY_pathlib]]
- 1 edge to [[_COMMUNITY_avito_connectorserver.py]]
- 1 edge to [[_COMMUNITY_transport__init__.py]]
- 1 edge to [[_COMMUNITY_pydantic]]

## Top bridge nodes
- [[ozon_connectorserver.py]] - degree 73, connects to 14 communities
- [[_canonical_product_path_from_input()]] - degree 5, connects to 2 communities
- [[_sync_call_in_process()]] - degree 9, connects to 1 community
- [[_parse_review_item()]] - degree 6, connects to 1 community
- [[_run_sync_bounded()]] - degree 6, connects to 1 community
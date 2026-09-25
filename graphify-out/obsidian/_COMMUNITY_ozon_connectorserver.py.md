---
type: community
cohesion: 0.07
members: 43
---

# ozon_connector/server.py

**Cohesion:** 0.07 - loosely connected
**Members:** 43 nodes

## Members
- [[Any_4]] - code
- [[Any_5]] - code
- [[Build a minimal environment for a worker process. Windows environment keys are…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/process.py
- [[Convert a unix-seconds timestamp (int or numeric str) to UTC ISO-8601.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[Cross-platform helpers for spawning and reaping short-lived worker processes.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/process.py
- [[Extract text from a mainState atom of given type.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[Map one raw Ozon review object to our compact shape. Text fields are coerced to…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[Ozon MCP connector. Two-tier strategy (Nov 2026 verified on the operator's…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[Parse ``tileGridDesktop-`` widgets of a composer payload into tile dicts.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[Parse a single tileGridDesktop item (Ozon search result, Nov 2026 schema). Top-…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[Parse an Ozon price string like '3u2009983u2009₽' (thin-space grouped) to…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[Popen kwargs that isolate a child so it can be killed as a unit. Windows a new…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/process.py
- [[Retain stock messages without requiring them to contain a unit count.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[Return ``nt`` or ``posix``, honouring the test override.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/process.py
- [[RuntimeError]] - code
- [[TimeoutError]] - code
- [[_SyncCallError]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[_SyncCallTimeout]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[_atom_text()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[_can_process_call()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[_is_search_stock_label()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[_parse_review_item()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[_parse_search_tile()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[_parse_widgets()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[_price_str_to_float()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[_run_sync_bounded()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[_search_items_from_payload()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[_search_tile_product_link()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[_smoke_card()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[_smoke_search()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[_sync_call_in_process()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[_text()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[_ts_to_iso()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[curl_cffi]] - concept
- [[current_platform()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/process.py
- [[is_windows()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/process.py
- [[ozon_connectorserver.py]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[pickle]] - concept
- [[posixpath]] - concept
- [[process.py]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/process.py
- [[safe_child_env()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/process.py
- [[signal]] - concept
- [[worker_process_kwargs()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/process.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/ozon_connector/serverpy
SORT file.name ASC
```

## Connections to other communities
- 22 edges to [[_COMMUNITY_json]]
- 15 edges to [[_COMMUNITY_ozon_card]]
- 10 edges to [[_COMMUNITY_TransportDownError]]
- 7 edges to [[_COMMUNITY_terminate_process_tree]]
- 7 edges to [[_COMMUNITY_pathlib]]
- 5 edges to [[_COMMUNITY_test_card_verification_records.py]]
- 3 edges to [[_COMMUNITY_pydantic]]
- 1 edge to [[_COMMUNITY_test_http_tier.py]]
- 1 edge to [[_COMMUNITY_transport__init__.py]]
- 1 edge to [[_COMMUNITY_chrome_cdp.py]]
- 1 edge to [[_COMMUNITY_wb_connectorserver.py]]

## Top bridge nodes
- [[ozon_connectorserver.py]] - degree 70, connects to 9 communities
- [[process.py]] - degree 16, connects to 3 communities
- [[curl_cffi]] - degree 3, connects to 2 communities
- [[Any_5]] - degree 10, connects to 1 community
- [[_sync_call_in_process()]] - degree 9, connects to 1 community
---
type: community
cohesion: 0.16
members: 17
---

# ozon_card

**Cohesion:** 0.16 - loosely connected
**Members:** 17 nodes

## Members
- [[Added_7]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md
- [[Fetch Ozon product card data via composer-api.bx. Tier-1 (curl_cffi) tried…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[Fetch Ozon product review texts + star distribution via composer-api.bx. Tier-1…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[Field_2]] - code
- [[Fixed_6]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md
- [[Platform-appropriate one-liner for getting CDP running.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/chrome_cdp.py
- [[Search Ozon catalog. curl_cffi → optional Scrapling → CDP. Returns…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[1.6.1 — 2026-09-09]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md
- [[cdp_setup_hint()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/chrome_cdp.py
- [[default]] - code
- [[description_3]] - code
- [[ozon_card()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[ozon_reviews()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[ozon_search()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[tool_2]] - code
- [[Добавлено_8]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md
- [[Исправлено_5]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/ozon_card
SORT file.name ASC
```

## Connections to other communities
- 8 edges to [[_COMMUNITY__fetch_composer]]
- 6 edges to [[_COMMUNITY_TransportDownError]]
- 5 edges to [[_COMMUNITY_ozon_connectormodels_output.py]]
- 5 edges to [[_COMMUNITY_ozon_connectorserver.py]]
- 4 edges to [[_COMMUNITY_wb_connectorserver.py]]
- 3 edges to [[_COMMUNITY_log_event]]
- 2 edges to [[_COMMUNITY_json]]
- 1 edge to [[_COMMUNITY_get_browser]]
- 1 edge to [[_COMMUNITY_avito_connectorserver.py]]
- 1 edge to [[_COMMUNITY_lamoda_search]]
- 1 edge to [[_COMMUNITY_Changelog]]

## Top bridge nodes
- [[ozon_card()]] - degree 21, connects to 8 communities
- [[ozon_reviews()]] - degree 14, connects to 5 communities
- [[ozon_search()]] - degree 12, connects to 5 communities
- [[cdp_setup_hint()]] - degree 8, connects to 5 communities
- [[1.6.1 — 2026-09-09]] - degree 5, connects to 1 community
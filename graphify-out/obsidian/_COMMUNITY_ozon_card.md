---
type: community
cohesion: 0.06
members: 44
---

# ozon_card

**Cohesion:** 0.06 - loosely connected
**Members:** 44 nodes

## Members
- [[Added_6]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md
- [[Changed_8]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md
- [[Context_4]] - code
- [[Deliberately not shipped]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md
- [[DetmirSelfcheckResponse]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/src/detmir_connector/models_output.py
- [[Fetch Ozon product card data via composer-api.bx. Tier-1 (curl_cffi) tried…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[Fetch Ozon product review texts + star distribution via composer-api.bx. Tier-1…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[Field_3]] - code
- [[Fixed_11]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md
- [[MpStatsSelfCheckResponse]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/src/mpstats_connector/models_output.py
- [[OzonSelfcheckResponse]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/models_output.py
- [[Search Ozon catalog. Tier-1 curl_cffi → Tier-2 CDP fallback. Returns…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[SelfCheckResponseBase]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/models.py
- [[Shared shape of every ``_selfcheck()`` tool response. Subclasses narrow…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/models.py
- [[Space this source's requests out, and back off if it refused us. Reads…_4]] - rationale - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[Structural drift canary for Ozon (tri-state success  drift_detected …]] - rationale - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[Tier-1 curl_cffi sync GET with INCREMENTAL body cap. Streams the response and…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[Tier-2 open ozon.ru in the operator's logged-in Chrome, fetch JSON from…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[Try Tier-1 (curl_cffi); fall back to Tier-2 (CDP) on 403non-200. Returns…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[When NOT to use_2]] - document - mcp-servers/ru-marketplace-mcp/dsh/skills/mpstats-connector/SKILL.md
- [[When NOT to use_3]] - document - mcp-servers/ru-marketplace-mcp/skills/mpstats-connector/SKILL.md
- [[1.1.0 — 2026-07-26]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md
- [[1.1.0 — 2026-07-26 (English)]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md
- [[_attempt()_2]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[_canonical_composer_path()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[_cdp_fetch_json()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[_check()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[_fetch_composer()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[_ozon_selfcheck_impl()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[_polite_wait()_4]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[_smoke_reviews()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[_sync_curl_get()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[default]] - code
- [[description_4]] - code
- [[ozon_card()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[ozon_reviews()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[ozon_search()_2]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[ozon_selfcheck implementation — kept separate so the public tool can wrap it in…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[ozon_selfcheck()]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py
- [[tool_3]] - code
- [[Добавлено_7]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md
- [[Изменено_7]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md
- [[Исправлено_9]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md
- [[Не сделано намеренно]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/ozon_card
SORT file.name ASC
```

## Connections to other communities
- 19 edges to [[_COMMUNITY_TransportDownError]]
- 15 edges to [[_COMMUNITY_ozon_connectorserver.py]]
- 12 edges to [[_COMMUNITY_log_event]]
- 6 edges to [[_COMMUNITY_test_card_verification_records.py]]
- 4 edges to [[_COMMUNITY_models.py]]
- 4 edges to [[_COMMUNITY_Changelog]]
- 3 edges to [[_COMMUNITY_mpstats_connectorserver.py]]
- 2 edges to [[_COMMUNITY_dns_card]]
- 2 edges to [[_COMMUNITY_citilink_card]]
- 2 edges to [[_COMMUNITY_get_text_budgeted]]
- 1 edge to [[_COMMUNITY_avito_seller]]
- 1 edge to [[_COMMUNITY_megamarket_connectormodels_output.py]]
- 1 edge to [[_COMMUNITY_aliexpress_connectorserver.py]]
- 1 edge to [[_COMMUNITY_detmir_selfcheck]]
- 1 edge to [[_COMMUNITY_json]]
- 1 edge to [[_COMMUNITY_detmir_connectormodels_output.py]]
- 1 edge to [[_COMMUNITY_cian_connectorserver.py]]
- 1 edge to [[_COMMUNITY_wb_connectorserver.py]]
- 1 edge to [[_COMMUNITY_success]]
- 1 edge to [[_COMMUNITY_BadRequestError]]
- 1 edge to [[_COMMUNITY_open_page]]
- 1 edge to [[_COMMUNITY_test_http_tier.py]]
- 1 edge to [[_COMMUNITY_yandex_selfcheck]]
- 1 edge to [[_COMMUNITY_Ozon Connector]]
- 1 edge to [[_COMMUNITY_Ozon Connector_1]]
- 1 edge to [[_COMMUNITY_pydantic]]
- 1 edge to [[_COMMUNITY_detmir_categories]]
- 1 edge to [[_COMMUNITY_MPStats Connector_1]]
- 1 edge to [[_COMMUNITY_MPStats Connector]]

## Top bridge nodes
- [[SelfCheckResponseBase]] - degree 16, connects to 9 communities
- [[ozon_card()]] - degree 23, connects to 6 communities
- [[ozon_selfcheck()]] - degree 11, connects to 6 communities
- [[ozon_reviews()]] - degree 14, connects to 5 communities
- [[_fetch_composer()]] - degree 14, connects to 4 communities
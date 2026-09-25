---
type: community
cohesion: 0.07
members: 35
---

# BadRequestError

**Cohesion:** 0.07 - loosely connected
**Members:** 35 nodes

## Members
- [[dot-__init__()_25]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/errors.py
- [[dot-__init__()_26]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/errors.py
- [[dot-__init__()_27]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/errors.py
- [[dot-__init__()_28]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/errors.py
- [[dot-__init__()_29]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/errors.py
- [[dot-__init__()_30]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/errors.py
- [[dot-__init__()_31]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/errors.py
- [[dot-__init__()_32]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/errors.py
- [[dot-__init__()_33]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/errors.py
- [[Accept the source's numeric ID or canonical product path, never a stray digit.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[BadRequestError]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/errors.py
- [[Context_10]] - code
- [[Fetch per-SKU 30-day sales analytics from MPStats (Ozon or Wildberries).…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/src/mpstats_connector/server.py
- [[Fetch per-SKU warehouse stock split from MPStats (Ozon or Wildberries).…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/src/mpstats_connector/server.py
- [[Field_10]] - code
- [[Lamoda carries the shared envelope unchanged.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/src/lamoda_connector/models_output.py
- [[MPStats carries the shared envelope unchanged.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/src/mpstats_connector/models_output.py
- [[MetaOut_7]] - code - mcp-servers/ru-marketplace-mcp/packages/lamoda-connector/src/lamoda_connector/models_output.py
- [[MetaOut_8]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/src/mpstats_connector/models_output.py
- [[MetaOut_9]] - code - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/models_output.py
- [[MetaOutBase]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/models.py
- [[NotFoundError]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/errors.py
- [[Ozon carries the shared envelope unchanged.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/models_output.py
- [[Per-response provenance which tool answered, and can you trust it.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/models.py
- [[Shape-validate a SKU list non-empty, =MAX_SKUS, all positive ints. Validation…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/src/mpstats_connector/server.py
- [[_numeric_card_id()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[_validate_region()]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/src/cian_connector/server.py
- [[_validate_skus()]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/src/mpstats_connector/server.py
- [[default_3]] - code
- [[description_12]] - code
- [[mpstats_item()]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/src/mpstats_connector/server.py
- [[mpstats_warehouses()]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/src/mpstats_connector/server.py
- [[test_blocked_and_not_found_are_distinct_taxonomy_codes()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_contract.py
- [[tool_11]] - code
- [[transport_down and not_found must stay separate one is 'we were refused', the…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_contract.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/BadRequestError
SORT file.name ASC
```

## Connections to other communities
- 21 edges to [[_COMMUNITY_TransportDownError]]
- 15 edges to [[_COMMUNITY_json]]
- 12 edges to [[_COMMUNITY_log_event]]
- 11 edges to [[_COMMUNITY_mpstats_connectorserver.py]]
- 7 edges to [[_COMMUNITY_cian_connectorserver.py]]
- 5 edges to [[_COMMUNITY_avito_seller]]
- 5 edges to [[_COMMUNITY_detmir_categories]]
- 4 edges to [[_COMMUNITY_taobao_card]]
- 4 edges to [[_COMMUNITY_compare_verify_offer]]
- 4 edges to [[_COMMUNITY_yandex_card]]
- 3 edges to [[_COMMUNITY_megamarket_search]]
- 3 edges to [[_COMMUNITY_models.py]]
- 2 edges to [[_COMMUNITY_dns_card]]
- 2 edges to [[_COMMUNITY_aliexpress_connectorserver.py]]
- 2 edges to [[_COMMUNITY_citilink_card]]
- 1 edge to [[_COMMUNITY_compare_prices]]
- 1 edge to [[_COMMUNITY_ozon_card]]
- 1 edge to [[_COMMUNITY_read_with_handoff]]
- 1 edge to [[_COMMUNITY_test_termination_settles_queued_snapshot_before_getter_resumes]]
- 1 edge to [[_COMMUNITY_test_handoff_reporting.py]]
- 1 edge to [[_COMMUNITY_test_card_verification_records.py]]
- 1 edge to [[_COMMUNITY_success]]
- 1 edge to [[_COMMUNITY_test_contract.py]]

## Top bridge nodes
- [[BadRequestError]] - degree 38, connects to 15 communities
- [[NotFoundError]] - degree 25, connects to 13 communities
- [[MetaOutBase]] - degree 16, connects to 11 communities
- [[mpstats_item()]] - degree 18, connects to 3 communities
- [[mpstats_warehouses()]] - degree 17, connects to 3 communities
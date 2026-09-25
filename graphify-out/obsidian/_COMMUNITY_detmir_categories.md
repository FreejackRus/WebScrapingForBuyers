---
type: community
cohesion: 0.15
members: 26
---

# detmir_categories

**Cohesion:** 0.15 - loosely connected
**Members:** 26 nodes

## Members
- [[Added_14]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md
- [[Browse the Detsky Mir catalog tree and get the aliases `detmir_category` needs.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/src/detmir_connector/server.py
- [[Context_11]] - code
- [[Detsky Mir flags cache hits so a caller can tell fresh data from a replay.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/src/detmir_connector/models_output.py
- [[Extract an error status embedded in a 200 body. Detsky Mir signals a missing…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/src/detmir_connector/server.py
- [[Fetch price, rating, stock and seller for one Detsky Mir product. Covers the…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/src/detmir_connector/server.py
- [[Field_11]] - code
- [[GET ``url`` and parse it as JSON, with caching and bounded retries.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/src/detmir_connector/server.py
- [[List products in a Detsky Mir category, with the total match count. This is the…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/src/detmir_connector/server.py
- [[MetaOut_10]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/src/detmir_connector/models_output.py
- [[Pick the region for one call the argument wins, else ``DETMIR_REGION``. A per-…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/src/detmir_connector/server.py
- [[The Detsky Mir search trap]] - document - mcp-servers/ru-marketplace-mcp/docs/ANTI_BOT.md
- [[_body_error_status()]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/src/detmir_connector/server.py
- [[_fetch_json()]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/src/detmir_connector/server.py
- [[_resolve_region()]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/src/detmir_connector/server.py
- [[default_4]] - code
- [[description_13]] - code
- [[detmir_card()]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/src/detmir_connector/server.py
- [[detmir_categories()]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/src/detmir_connector/server.py
- [[detmir_category()]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/src/detmir_connector/server.py
- [[ge_4]] - code
- [[gt_2]] - code
- [[le_5]] - code
- [[max_length_9]] - code
- [[min_length_9]] - code
- [[tool_12]] - code

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/detmir_categories
SORT file.name ASC
```

## Connections to other communities
- 14 edges to [[_COMMUNITY_TransportDownError]]
- 9 edges to [[_COMMUNITY__parse_product]]
- 7 edges to [[_COMMUNITY_json]]
- 5 edges to [[_COMMUNITY_BadRequestError]]
- 5 edges to [[_COMMUNITY_detmir_connectormodels_output.py]]
- 5 edges to [[_COMMUNITY_detmir_selfcheck]]
- 4 edges to [[_COMMUNITY_Detsky Mir Connector]]
- 3 edges to [[_COMMUNITY_log_event]]
- 2 edges to [[_COMMUNITY_compare_prices]]
- 2 edges to [[_COMMUNITY_terminate_process_tree]]
- 2 edges to [[_COMMUNITY_Cross-Marketplace Price Comparison_1]]
- 2 edges to [[_COMMUNITY_Cross-Marketplace Price Comparison]]
- 1 edge to [[_COMMUNITY_yandex_selfcheck]]
- 1 edge to [[_COMMUNITY_ozon_card]]
- 1 edge to [[_COMMUNITY_Shipped sources]]
- 1 edge to [[_COMMUNITY_yandex_card]]
- 1 edge to [[_COMMUNITY_Traps and refusals worth their own section]]

## Top bridge nodes
- [[detmir_categories()]] - degree 31, connects to 9 communities
- [[detmir_category()]] - degree 31, connects to 9 communities
- [[detmir_card()]] - degree 25, connects to 9 communities
- [[Added_14]] - degree 9, connects to 5 communities
- [[_fetch_json()]] - degree 11, connects to 3 communities
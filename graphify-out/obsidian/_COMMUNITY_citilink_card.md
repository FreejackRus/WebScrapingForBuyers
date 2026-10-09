---
type: community
cohesion: 0.17
members: 16
---

# citilink_card

**Cohesion:** 0.17 - loosely connected
**Members:** 16 nodes

## Members
- [[2026-09-23 — Citilink Готово без строки и WB «Сомнительное»]] - document - docs/PROJECT_CONTEXT.md
- [[2026-09-23 — Citilink отсев чужого SKU]] - document - docs/PROJECT_CONTEXT.md
- [[2026-09-23 — WB rate-limited MCP + HTTP double-hit]] - document - docs/PROJECT_CONTEXT.md
- [[DNS carries the shared envelope unchanged._1]] - rationale - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/src/citilink_connector/models_output.py
- [[Fetch one Citilink product card.  Return Format CitilinkCardResponse…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/src/citilink_connector/server.py
- [[Field_12]] - code
- [[MetaOut_10]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/src/citilink_connector/models_output.py
- [[Pull the product id out of a citilink.ru product URL or a bare id. Host-checked…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/src/citilink_connector/server.py
- [[Search Citilink, rendered in the operator's Chrome.  Return Format…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/src/citilink_connector/server.py
- [[_extract_product_id()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/src/citilink_connector/server.py
- [[citilink_card()]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/src/citilink_connector/server.py
- [[citilink_search()]] - code - mcp-servers/ru-marketplace-mcp/packages/citilink-connector/src/citilink_connector/server.py
- [[description_14]] - code
- [[max_length_11]] - code
- [[min_length_11]] - code
- [[tool_13]] - code

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/citilink_card
SORT file.name ASC
```

## Connections to other communities
- 6 edges to [[_COMMUNITY_wb_connectorserver.py]]
- 5 edges to [[_COMMUNITY_json]]
- 4 edges to [[_COMMUNITY_citilink_connectormodels_output.py]]
- 4 edges to [[_COMMUNITY_TransportDownError]]
- 4 edges to [[_COMMUNITY_citilink_selfcheck]]
- 3 edges to [[_COMMUNITY_SourceAdapter]]
- 3 edges to [[_COMMUNITY_Итерации]]
- 2 edges to [[_COMMUNITY_mcp-marketplace-adapter.ts]]
- 2 edges to [[_COMMUNITY_log_event]]
- 2 edges to [[_COMMUNITY_compare_prices]]
- 1 edge to [[_COMMUNITY_dns_card]]
- 1 edge to [[_COMMUNITY_title_from_tile]]
- 1 edge to [[_COMMUNITY_prices_from_tile]]
- 1 edge to [[_COMMUNITY_Аудит ru-marketplace-mcp v1.2.0 — независимая перепроверка]]

## Top bridge nodes
- [[citilink_card()]] - degree 27, connects to 10 communities
- [[citilink_search()]] - degree 22, connects to 8 communities
- [[MetaOut_10]] - degree 6, connects to 3 communities
- [[2026-09-23 — Citilink отсев чужого SKU]] - degree 3, connects to 2 communities
- [[2026-09-23 — WB rate-limited MCP + HTTP double-hit]] - degree 3, connects to 2 communities
---
type: community
members: 12
---

# _card_item_dict

**Members:** 12 nodes

## Members
- [[Flatten one WB product object into the shared card-item shape. Used by wb_card,…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[Keep only unambiguous typed color evidence, never infer it from a title.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[Return (current_rub, original_rub), or (None, None) if no live offer. WB v4…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[WB integer kopecks - float rubles, tolerant of a number-string drift. Returns…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[1.1.0 — 2026-07-26]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md
- [[_card_item_dict()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[_extract_price_rub()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[_kopeck_to_rub()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[_single_product_color()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[Добавлено_15]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md
- [[Изменено_7]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md
- [[Не сделано намеренно]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/_card_item_dict
SORT file.name ASC
```

## Connections to other communities
- 7 edges to [[_COMMUNITY_raise_tool_error]]
- 4 edges to [[_COMMUNITY_wb_connectorserver.py]]
- 2 edges to [[_COMMUNITY_Any]]
- 2 edges to [[_COMMUNITY_ozon_connectormodels_output.py]]
- 1 edge to [[_COMMUNITY_get_text_budgeted]]
- 1 edge to [[_COMMUNITY_wb_selfcheck]]
- 1 edge to [[_COMMUNITY_wb_card]]
- 1 edge to [[_COMMUNITY_parse_search]]
- 1 edge to [[_COMMUNITY_Ключевые изменения выпуска]]
- 1 edge to [[_COMMUNITY_ozon_connectorserver.py]]
- 1 edge to [[_COMMUNITY_Changelog]]

## Top bridge nodes
- [[_card_item_dict()]] - degree 11, connects to 5 communities
- [[_extract_price_rub()]] - degree 6, connects to 3 communities
- [[_kopeck_to_rub()]] - degree 5, connects to 3 communities
- [[_single_product_color()]] - degree 5, connects to 3 communities
- [[1.1.0 — 2026-07-26]] - degree 5, connects to 2 communities
---
type: community
cohesion: 0.29
members: 7
---

# _search_wildberries

**Cohesion:** 0.29 - loosely connected
**Members:** 7 nodes

## Members
- [[6. Расхождения контракта, найденные сверкой]] - document - mcp-servers/ru-marketplace-mcp/docs/archive/AUDIT_REPORT_2026-08_v1.2.0-snapshot.md
- [[6.1 Wildberries поиск и карточка отдают разную цену]] - document - mcp-servers/ru-marketplace-mcp/docs/archive/AUDIT_REPORT_2026-08_v1.2.0-snapshot.md
- [[6.2 Яндекс цена на странице — это цена с Плюсом]] - document - mcp-servers/ru-marketplace-mcp/docs/archive/AUDIT_REPORT_2026-08_v1.2.0-snapshot.md
- [[6.3 Яндекс товарный id — это карточка модели]] - document - mcp-servers/ru-marketplace-mcp/docs/archive/AUDIT_REPORT_2026-08_v1.2.0-snapshot.md
- [[Adapt ``wb_search`` results. Fields are read as typed attributes on…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[_search_wildberries()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py
- [[_wb_product_url()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/_search_wildberries
SORT file.name ASC
```

## Connections to other communities
- 2 edges to [[_COMMUNITY_json]]
- 1 edge to [[_COMMUNITY_compare-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_OfferBatch]]
- 1 edge to [[_COMMUNITY_log_event]]
- 1 edge to [[_COMMUNITY_compare_prices]]
- 1 edge to [[_COMMUNITY_dns_card]]

## Top bridge nodes
- [[_search_wildberries()]] - degree 6, connects to 3 communities
- [[6.1 Wildberries поиск и карточка отдают разную цену]] - degree 4, connects to 2 communities
- [[6. Расхождения контракта, найденные сверкой]] - degree 4, connects to 1 community
- [[_wb_product_url()]] - degree 2, connects to 1 community
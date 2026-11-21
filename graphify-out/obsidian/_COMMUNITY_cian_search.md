---
type: community
cohesion: 0.15
members: 13
---

# cian_search

**Cohesion:** 0.15 - loosely connected
**Members:** 13 nodes

## Members
- [[DealType]] - code
- [[Field_7]] - code
- [[OfferType]] - code
- [[Offers and the total from a search payload. ValueError on the wrong shape.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/cian-connector/src/cian_connector/server.py
- [[Search Cian offers by filters (there is no free-text search). Long-term rent…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/cian-connector/src/cian_connector/server.py
- [[_parse_offers()]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/src/cian_connector/server.py
- [[_search_smoke()]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/src/cian_connector/server.py
- [[cian_search()]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/src/cian_connector/server.py
- [[description_9]] - code
- [[ge_3]] - code
- [[gt_2]] - code
- [[le_3]] - code
- [[tool_7]] - code

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/cian_search
SORT file.name ASC
```

## Connections to other communities
- 7 edges to [[_COMMUNITY_TransportDownError]]
- 6 edges to [[_COMMUNITY_cian_connectorserver.py]]
- 2 edges to [[_COMMUNITY_raise_tool_error]]
- 2 edges to [[_COMMUNITY__cian_selfcheck_impl]]
- 2 edges to [[_COMMUNITY_compare_prices]]
- 2 edges to [[_COMMUNITY_Any_1]]
- 1 edge to [[_COMMUNITY_log_event]]
- 1 edge to [[_COMMUNITY__fetch_search]]
- 1 edge to [[_COMMUNITY_2.2.0 — 2026-09-11]]

## Top bridge nodes
- [[cian_search()]] - degree 27, connects to 8 communities
- [[_parse_offers()]] - degree 6, connects to 2 communities
- [[_search_smoke()]] - degree 2, connects to 1 community
- [[description_9]] - degree 2, connects to 1 community
- [[Field_7]] - degree 2, connects to 1 community
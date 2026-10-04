---
type: community
members: 9
---

# wb_selfcheck

**Members:** 9 nodes

## Members
- [[Compute basket CDN host. Probe range up to 28 for new SKUs.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[Current WB_SEARCH_TRANSPORT (storefronthttp). Re-reads settings for tests.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[Fixed_9]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md
- [[Structural drift canary for WB (tri-state success  drift_detected …]] - rationale - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[_basket_for_sku()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[_has_review_text()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[_search_transport()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py
- [[get_settings()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/settings.py
- [[wb_selfcheck()]] - code - mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/wb_selfcheck
SORT file.name ASC
```

## Connections to other communities
- 8 edges to [[_COMMUNITY_raise_tool_error]]
- 5 edges to [[_COMMUNITY_wb_connectorserver.py]]
- 3 edges to [[_COMMUNITY_Any]]
- 2 edges to [[_COMMUNITY_pydantic]]
- 2 edges to [[_COMMUNITY_pytest]]
- 2 edges to [[_COMMUNITY_wb_card]]
- 1 edge to [[_COMMUNITY__polite_wait]]
- 1 edge to [[_COMMUNITY_main]]
- 1 edge to [[_COMMUNITY__safe_get_text]]
- 1 edge to [[_COMMUNITY__card_item_dict]]
- 1 edge to [[_COMMUNITY_success]]
- 1 edge to [[_COMMUNITY_test_storefront_search.py]]
- 1 edge to [[_COMMUNITY_Changelog]]

## Top bridge nodes
- [[wb_selfcheck()]] - degree 22, connects to 10 communities
- [[get_settings()]] - degree 8, connects to 4 communities
- [[Fixed_9]] - degree 4, connects to 3 communities
- [[_basket_for_sku()]] - degree 6, connects to 2 communities
- [[_search_transport()]] - degree 5, connects to 2 communities
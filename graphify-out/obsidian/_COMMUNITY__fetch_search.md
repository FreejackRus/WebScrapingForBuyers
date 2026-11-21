---
type: community
cohesion: 0.18
members: 12
---

# _fetch_search

**Cohesion:** 0.18 - loosely connected
**Members:** 12 nodes

## Members
- [[Open an offer page and serialise its ``_cianConfig`` card state.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/cian-connector/src/cian_connector/server.py
- [[POST ``jsonQuery`` to the search API from inside a cian.ru tab. Serialised via…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/cian-connector/src/cian_connector/server.py
- [[Read one offer's card state over CDP. Returns (status, body, tier). The page is…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/cian-connector/src/cian_connector/server.py
- [[Run one search query over CDP. Returns (status, body, tier). Only JSON-shaped…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/cian-connector/src/cian_connector/server.py
- [[Space this source's requests out, and back off if it refused us.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/cian-connector/src/cian_connector/server.py
- [[_attempt()_3]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/src/cian_connector/server.py
- [[_cdp_page_config()]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/src/cian_connector/server.py
- [[_cdp_post_json()]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/src/cian_connector/server.py
- [[_fetch_card()]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/src/cian_connector/server.py
- [[_fetch_search()]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/src/cian_connector/server.py
- [[_looks_like_json()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/src/cian_connector/server.py
- [[_polite_wait()_5]] - code - mcp-servers/ru-marketplace-mcp/packages/cian-connector/src/cian_connector/server.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/_fetch_search
SORT file.name ASC
```

## Connections to other communities
- 6 edges to [[_COMMUNITY_cian_connectorserver.py]]
- 4 edges to [[_COMMUNITY_citilink_card]]
- 2 edges to [[_COMMUNITY_Any_1]]
- 2 edges to [[_COMMUNITY__cian_selfcheck_impl]]
- 1 edge to [[_COMMUNITY_cian_search]]
- 1 edge to [[_COMMUNITY_TransportDownError]]

## Top bridge nodes
- [[_fetch_search()]] - degree 9, connects to 5 communities
- [[_fetch_card()]] - degree 8, connects to 4 communities
- [[_cdp_post_json()]] - degree 5, connects to 3 communities
- [[_cdp_page_config()]] - degree 4, connects to 1 community
- [[_polite_wait()_5]] - degree 4, connects to 1 community
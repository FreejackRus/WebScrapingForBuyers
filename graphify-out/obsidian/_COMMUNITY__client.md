---
type: community
cohesion: 0.40
members: 5
---

# _client

**Cohesion:** 0.40 - moderately connected
**Members:** 5 nodes

## Members
- [[AsyncClient_3]] - code
- [[Build the MPStats HTTP client. Redirects stay off (matching the runtime…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/src/mpstats_connector/server.py
- [[Resolve MPStats' proxy explicit ``MPSTATS_PROXY`` first, then standard vars.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/src/mpstats_connector/server.py
- [[_client()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/src/mpstats_connector/server.py
- [[_proxy()_5]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/src/mpstats_connector/server.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/_client
SORT file.name ASC
```

## Connections to other communities
- 2 edges to [[_COMMUNITY_mpstats_connectorserver.py]]
- 1 edge to [[_COMMUNITY__post_json_budgeted]]
- 1 edge to [[_COMMUNITY_test_http_tier.py]]
- 1 edge to [[_COMMUNITY_TransportDownError]]

## Top bridge nodes
- [[_client()_1]] - degree 5, connects to 2 communities
- [[_proxy()_5]] - degree 4, connects to 2 communities
- [[AsyncClient_3]] - degree 2, connects to 1 community
---
type: community
cohesion: 0.67
members: 3
---

# test_rate_limit_status_is_never_retried

**Cohesion:** 0.67 - moderately connected
**Members:** 3 nodes

## Members
- [[Retrying a 429 deepens the rate-limit hole, so it must pass straight through.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py
- [[handler()_35]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py
- [[test_rate_limit_status_is_never_retried()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/test_rate_limit_status_is_never_retried
SORT file.name ASC
```

## Connections to other communities
- 2 edges to [[_COMMUNITY_make_client]]
- 1 edge to [[_COMMUNITY_transport__init__.py]]
- 1 edge to [[_COMMUNITY_test_http_tier.py]]

## Top bridge nodes
- [[test_rate_limit_status_is_never_retried()]] - degree 6, connects to 3 communities
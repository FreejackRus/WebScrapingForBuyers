---
type: community
cohesion: 0.27
members: 6
---

# test_a_generic_failure_is_reported_as_error_not_blocked

**Cohesion:** 0.27 - loosely connected
**Members:** 6 nodes

## Members
- [[A Plus price must not masquerade as the everyday price in the ranking. Live…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[Anti-bot blocks and ordinary bugs need different responses, so they differ.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[degraded_yandex()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[test_a_generic_failure_is_reported_as_error_not_blocked()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[test_degraded_yandex_rows_never_rank_with_a_subscription_price()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[wb()_16]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/test_a_generic_failure_is_reported_as_error_not_blocked
SORT file.name ASC
```

## Connections to other communities
- 4 edges to [[_COMMUNITY_offer]]
- 2 edges to [[_COMMUNITY_compare-connectorteststest_server.py]]

## Top bridge nodes
- [[test_a_generic_failure_is_reported_as_error_not_blocked()]] - degree 5, connects to 2 communities
- [[test_degraded_yandex_rows_never_rank_with_a_subscription_price()]] - degree 4, connects to 2 communities
- [[degraded_yandex()]] - degree 2, connects to 1 community
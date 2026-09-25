---
type: community
cohesion: 0.20
members: 10
---

# HostRefusingError

**Cohesion:** 0.20 - loosely connected
**Members:** 10 nodes

## Members
- [[dot-__init__()_14]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/cdp_budget.py
- [[dot-__init__()_15]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/cdp_budget.py
- [[A host answered 4xx often enough that the breaker is open. Carries the host and…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/cdp_budget.py
- [[An open breaker must not make the rest of the fan-out wait on it.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cdp_budget.py
- [[HostRefusingError]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/cdp_budget.py
- [[One marketplace is one key, however the URL spells the host.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cdp_budget.py
- [[RuntimeError_2]] - code
- [[test_a_host_that_keeps_refusing_is_dropped_and_says_for_how_long()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cdp_budget.py
- [[test_a_refusing_host_fails_fast_instead_of_queueing()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cdp_budget.py
- [[test_host_keys_are_case_and_dot_insensitive()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cdp_budget.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/HostRefusingError
SORT file.name ASC
```

## Connections to other communities
- 4 edges to [[_COMMUNITY_NavigationBudget]]
- 4 edges to [[_COMMUNITY_test_cdp_budget.py]]
- 2 edges to [[_COMMUNITY_transport__init__.py]]
- 1 edge to [[_COMMUNITY_Slot]]

## Top bridge nodes
- [[HostRefusingError]] - degree 10, connects to 3 communities
- [[test_a_refusing_host_fails_fast_instead_of_queueing()]] - degree 4, connects to 2 communities
- [[test_host_keys_are_case_and_dot_insensitive()]] - degree 4, connects to 2 communities
- [[test_a_host_that_keeps_refusing_is_dropped_and_says_for_how_long()]] - degree 3, connects to 2 communities
- [[dot-__init__()_15]] - degree 2, connects to 1 community
---
type: community
cohesion: 0.29
members: 7
---

# Community 223

**Cohesion:** 0.29 - loosely connected
**Members:** 7 nodes

## Members
- [[A key present with a null value is upstream saying no data, not a value.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[Return the first alias key whose value is present (not Nonemissing). Multi-…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/resilience.py
- [[first_present()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/resilience.py
- [[test_first_present_falls_through_to_a_later_alias()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[test_first_present_returns_the_first_bound_alias()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[test_first_present_treats_none_as_absent()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[test_first_present_uses_the_default_when_nothing_binds()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Community_223
SORT file.name ASC
```

## Connections to other communities
- 4 edges to [[_COMMUNITY_Community 53]]
- 3 edges to [[_COMMUNITY_Community 66]]
- 3 edges to [[_COMMUNITY_Community 48]]

## Top bridge nodes
- [[first_present()]] - degree 11, connects to 2 communities
- [[test_first_present_treats_none_as_absent()]] - degree 3, connects to 1 community
- [[test_first_present_falls_through_to_a_later_alias()]] - degree 2, connects to 1 community
- [[test_first_present_returns_the_first_bound_alias()]] - degree 2, connects to 1 community
- [[test_first_present_uses_the_default_when_nothing_binds()]] - degree 2, connects to 1 community
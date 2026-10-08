---
type: community
cohesion: 0.27
members: 10
---

# check_test_count.py

**Cohesion:** 0.27 - loosely connected
**Members:** 10 nodes

## Members
- [[Ask pytest how many tests the documented selection collects.]] - rationale - mcp-servers/ru-marketplace-mcp/scripts/check_test_count.py
- [[Collection failures must not be converted into a successful documentation gate.]] - rationale - mcp-servers/ru-marketplace-mcp/scripts/test_test_count_gate.py
- [[Fail if the documented offline-test count disagrees with the real one. The…]] - rationale - mcp-servers/ru-marketplace-mcp/scripts/check_test_count.py
- [[_collected()]] - code - mcp-servers/ru-marketplace-mcp/scripts/check_test_count.py
- [[check_test_count.py]] - code - mcp-servers/ru-marketplace-mcp/scripts/check_test_count.py
- [[main()_5]] - code - mcp-servers/ru-marketplace-mcp/scripts/check_test_count.py
- [[parametrize_12]] - code
- [[test_partial_collection_with_errors_is_not_a_valid_count()]] - code - mcp-servers/ru-marketplace-mcp/scripts/test_test_count_gate.py
- [[test_successful_collection_returns_selected_count()]] - code - mcp-servers/ru-marketplace-mcp/scripts/test_test_count_gate.py
- [[test_test_count_gate.py]] - code - mcp-servers/ru-marketplace-mcp/scripts/test_test_count_gate.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/check_test_countpy
SORT file.name ASC
```

## Connections to other communities
- 2 edges to [[_COMMUNITY_sys]]
- 2 edges to [[_COMMUNITY_pathlib]]
- 1 edge to [[_COMMUNITY_json]]
- 1 edge to [[_COMMUNITY_subprocess]]
- 1 edge to [[_COMMUNITY_pytest]]
- 1 edge to [[_COMMUNITY_test_card_verification_records.py]]

## Top bridge nodes
- [[check_test_count.py]] - degree 8, connects to 4 communities
- [[test_test_count_gate.py]] - degree 8, connects to 4 communities
---
type: community
cohesion: 0.21
members: 13
---

# Community 150

**Cohesion:** 0.21 - loosely connected
**Members:** 13 nodes

## Members
- [[A required sub-check the caller forgot to populate must not be silently dropped…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[Aggregate per-check tri-state entries into the unified top-level verdict.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/resilience.py
- [[Build one normalized selfcheck sub-check entry. state must be 'healthy' …]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/resilience.py
- [[ok=True only for healthy; False for drift; None for inconclusive, so a caller…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[selfcheck_entry()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/resilience.py
- [[selfcheck_result()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/resilience.py
- [[test_selfcheck_entry_ok_flag_is_tri_state()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[test_selfcheck_entry_unknown_state_is_inconclusive_never_ok()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[test_selfcheck_result_all_healthy_is_success()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[test_selfcheck_result_drift_dominates()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[test_selfcheck_result_inconclusive_beats_all_healthy()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[test_selfcheck_result_missing_required_check_is_injected_inconclusive()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[test_selfcheck_result_no_checks_is_inconclusive_not_vacuous_success()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Community_150
SORT file.name ASC
```

## Connections to other communities
- 7 edges to [[_COMMUNITY_Community 53]]
- 3 edges to [[_COMMUNITY_Community 66]]

## Top bridge nodes
- [[selfcheck_entry()]] - degree 10, connects to 1 community
- [[selfcheck_result()]] - degree 8, connects to 1 community
- [[test_selfcheck_result_missing_required_check_is_injected_inconclusive()]] - degree 4, connects to 1 community
- [[test_selfcheck_entry_ok_flag_is_tri_state()]] - degree 3, connects to 1 community
- [[test_selfcheck_result_all_healthy_is_success()]] - degree 3, connects to 1 community
---
type: community
cohesion: 0.09
members: 26
---

# test_cdp_budget.py

**Cohesion:** 0.09 - loosely connected
**Members:** 26 nodes

## Members
- [[dot-__init__()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/cdp_budget.py
- [[dot-__init__()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/cdp_budget.py
- [[A host answered 4xx often enough that the breaker is open. Carries the host and…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/cdp_budget.py
- [[A settled slot cannot be re-labelled by later code paths.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cdp_budget.py
- [[A typo in an operator's env must not disable the guard.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cdp_budget.py
- [[An open breaker must not make the rest of the fan-out wait on it.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cdp_budget.py
- [[Bad luck must not accumulate into a wall across a healthy minute.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cdp_budget.py
- [[HostRefusingError]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/cdp_budget.py
- [[Offline tests for the CDP navigation budget. The live failure this guards…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cdp_budget.py
- [[One marketplace is one key, however the URL spells the host.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cdp_budget.py
- [[Read-only view R2 asks for lease diagnostics without opening tabs.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cdp_budget.py
- [[RuntimeError]] - code
- [[The permit covers the navigation, not the page's lifetime. Found by a hang…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cdp_budget.py
- [[test_a_host_that_keeps_refusing_is_dropped_and_says_for_how_long()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cdp_budget.py
- [[test_a_long_lived_page_does_not_hold_the_host_slot()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cdp_budget.py
- [[test_a_refusing_host_fails_fast_instead_of_queueing()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cdp_budget.py
- [[test_bad_environment_values_fall_back_to_defaults()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cdp_budget.py
- [[test_budget_snapshot_helper_reads_the_process_budget()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cdp_budget.py
- [[test_cdp_budget.py]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cdp_budget.py
- [[test_cooldown_gives_the_host_another_chance()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cdp_budget.py
- [[test_diagnostics_need_no_navigation()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cdp_budget.py
- [[test_environment_knobs_build_the_process_budget()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cdp_budget.py
- [[test_host_keys_are_case_and_dot_insensitive()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cdp_budget.py
- [[test_one_success_clears_the_refusal_history()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cdp_budget.py
- [[test_outcome_is_reported_once()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cdp_budget.py
- [[test_release_is_idempotent_and_never_double_counts()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cdp_budget.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/test_cdp_budgetpy
SORT file.name ASC
```

## Connections to other communities
- 11 edges to [[_COMMUNITY_NavigationBudget]]
- 5 edges to [[_COMMUNITY_transport__init__.py]]
- 4 edges to [[_COMMUNITY_Tracker]]
- 1 edge to [[_COMMUNITY_Clock]]
- 1 edge to [[_COMMUNITY_json]]
- 1 edge to [[_COMMUNITY_pytest]]

## Top bridge nodes
- [[test_cdp_budget.py]] - degree 22, connects to 5 communities
- [[HostRefusingError]] - degree 10, connects to 2 communities
- [[test_a_refusing_host_fails_fast_instead_of_queueing()]] - degree 4, connects to 1 community
- [[test_host_keys_are_case_and_dot_insensitive()]] - degree 4, connects to 1 community
- [[test_a_host_that_keeps_refusing_is_dropped_and_says_for_how_long()]] - degree 3, connects to 1 community
---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/cdp_budget.py"
type: "code"
community: "Community 151"
location: "L143"
tags:
  - graphify/code
  - graphify/EXTRACTED
  - community/Community_151
---

# NavigationBudget

## Connections
- [[dot-__init__()_9]] - `method` [EXTRACTED]
- [[dot-_host_semaphore()]] - `method` [EXTRACTED]
- [[dot-_note_refusal()]] - `method` [EXTRACTED]
- [[dot-_note_success()]] - `method` [EXTRACTED]
- [[dot-_release()]] - `method` [EXTRACTED]
- [[dot-_state()]] - `method` [EXTRACTED]
- [[dot-acquire()]] - `method` [EXTRACTED]
- [[dot-check()]] - `method` [EXTRACTED]
- [[dot-reset()]] - `method` [EXTRACTED]
- [[dot-slot()]] - `method` [EXTRACTED]
- [[dot-snapshot()]] - `method` [EXTRACTED]
- [[Global + per-host bounds for CDP navigations, with a refusal breaker. One…]] - `rationale_for` [EXTRACTED]
- [[cdp_budget.py]] - `contains` [EXTRACTED]
- [[navigation_budget()]] - `calls` [EXTRACTED]
- [[test_a_host_that_keeps_refusing_is_dropped_and_says_for_how_long()]] - `uses` [INFERRED]
- [[test_a_long_lived_page_does_not_hold_the_host_slot()]] - `uses` [INFERRED]
- [[test_a_refusing_host_fails_fast_instead_of_queueing()]] - `uses` [INFERRED]
- [[test_cooldown_gives_the_host_another_chance()]] - `uses` [INFERRED]
- [[test_diagnostics_need_no_navigation()]] - `uses` [INFERRED]
- [[test_different_hosts_use_the_whole_global_bound()]] - `uses` [INFERRED]
- [[test_fan_out_never_exceeds_the_global_bound()]] - `uses` [INFERRED]
- [[test_host_keys_are_case_and_dot_insensitive()]] - `uses` [INFERRED]
- [[test_one_success_clears_the_refusal_history()]] - `uses` [INFERRED]
- [[test_our_own_policy_error_does_not_reset_the_hosts_refusal_record()]] - `uses` [INFERRED]
- [[test_outcome_is_reported_once()]] - `uses` [INFERRED]
- [[test_release_is_idempotent_and_never_double_counts()]] - `uses` [INFERRED]
- [[test_the_same_host_is_serialized_even_when_the_budget_is_free()]] - `uses` [INFERRED]
- [[transport__init__.py]] - `imports` [EXTRACTED]

#graphify/code #graphify/EXTRACTED #community/Community_151
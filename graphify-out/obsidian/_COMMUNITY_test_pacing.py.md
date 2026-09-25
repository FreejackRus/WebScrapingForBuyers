---
type: community
cohesion: 0.16
members: 21
---

# test_pacing.py

**Cohesion:** 0.16 - loosely connected
**Members:** 21 nodes

## Members
- [[A fan-out refused at the same instant must not retry in lockstep. The drawn…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_pacing.py
- [[Deterministic by default the jitter factor is pinned to 0. Jitter is real…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_pacing.py
- [[Tests for request pacing and refusal backoff. The clock and the sleep are…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_pacing.py
- [[The polite answer to slow down is to slow down.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_pacing.py
- [[Work between calls is not extra punishment.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_pacing.py
- [[_pacer()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_pacing.py
- [[test_a_refusal_lengthens_the_next_gap()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_pacing.py
- [[test_a_second_request_waits_out_the_gap()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_pacing.py
- [[test_a_slow_caller_never_waits()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_pacing.py
- [[test_a_success_also_clears_the_backoff()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_pacing.py
- [[test_a_zero_rotation_threshold_does_not_fire_on_no_refusals()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_pacing.py
- [[test_jitter_can_be_switched_off()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_pacing.py
- [[test_jitter_spreads_the_penalty_without_ever_shortening_it()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_pacing.py
- [[test_pacing.py]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_pacing.py
- [[test_refusals_accumulate_until_they_look_like_a_wall()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_pacing.py
- [[test_reset_forgets_everything()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_pacing.py
- [[test_the_error_delay_is_configurable()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_pacing.py
- [[test_the_first_request_does_not_wait()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_pacing.py
- [[test_the_hint_tells_the_operator_what_to_change()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_pacing.py
- [[test_the_penalty_applies_once_not_forever()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_pacing.py
- [[test_time_already_spent_counts_towards_the_gap()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_pacing.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/test_pacingpy
SORT file.name ASC
```

## Connections to other communities
- 5 edges to [[_COMMUNITY_Pacer]]
- 2 edges to [[_COMMUNITY_FakeClock]]
- 2 edges to [[_COMMUNITY_test_an_overridden_gap_cannot_undercut_the_penalty]]
- 2 edges to [[_COMMUNITY_test_one_success_clears_the_count]]
- 2 edges to [[_COMMUNITY_test_jitter_leaves_the_normal_gap_alone]]
- 2 edges to [[_COMMUNITY_test_concurrent_callers_do_not_both_skip_the_gap]]
- 2 edges to [[_COMMUNITY_test_a_zero_gap_disables_pacing]]
- 2 edges to [[_COMMUNITY_test_the_gap_can_be_overridden_per_call]]
- 1 edge to [[_COMMUNITY_json]]
- 1 edge to [[_COMMUNITY_pytest]]

## Top bridge nodes
- [[test_pacing.py]] - degree 28, connects to 10 communities
- [[_pacer()]] - degree 23, connects to 8 communities
- [[test_a_zero_rotation_threshold_does_not_fire_on_no_refusals()]] - degree 2, connects to 1 community
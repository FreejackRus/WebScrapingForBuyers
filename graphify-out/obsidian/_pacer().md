---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_pacing.py"
type: "code"
community: "Community 93"
location: "L33"
tags:
  - graphify/code
  - graphify/EXTRACTED
  - community/Community_93
---

# _pacer()

## Connections
- [[Deterministic by default the jitter factor is pinned to 0. Jitter is real…]] - `rationale_for` [EXTRACTED]
- [[FakeClock]] - `calls` [EXTRACTED]
- [[Pacer]] - `uses` [INFERRED]
- [[test_a_refusal_lengthens_the_next_gap()]] - `calls` [EXTRACTED]
- [[test_a_second_request_waits_out_the_gap()]] - `calls` [EXTRACTED]
- [[test_a_slow_caller_never_waits()]] - `calls` [EXTRACTED]
- [[test_a_success_also_clears_the_backoff()]] - `calls` [EXTRACTED]
- [[test_a_zero_gap_disables_pacing()]] - `calls` [EXTRACTED]
- [[test_an_overridden_gap_cannot_undercut_the_penalty()]] - `calls` [EXTRACTED]
- [[test_concurrent_callers_do_not_both_skip_the_gap()]] - `calls` [EXTRACTED]
- [[test_jitter_can_be_switched_off()]] - `calls` [EXTRACTED]
- [[test_jitter_leaves_the_normal_gap_alone()]] - `calls` [EXTRACTED]
- [[test_jitter_spreads_the_penalty_without_ever_shortening_it()]] - `calls` [EXTRACTED]
- [[test_one_success_clears_the_count()]] - `calls` [EXTRACTED]
- [[test_pacing.py]] - `contains` [EXTRACTED]
- [[test_refusals_accumulate_until_they_look_like_a_wall()]] - `calls` [EXTRACTED]
- [[test_reset_forgets_everything()]] - `calls` [EXTRACTED]
- [[test_the_error_delay_is_configurable()]] - `calls` [EXTRACTED]
- [[test_the_first_request_does_not_wait()]] - `calls` [EXTRACTED]
- [[test_the_gap_can_be_overridden_per_call()]] - `calls` [EXTRACTED]
- [[test_the_hint_tells_the_operator_what_to_change()]] - `calls` [EXTRACTED]
- [[test_the_penalty_applies_once_not_forever()]] - `calls` [EXTRACTED]
- [[test_time_already_spent_counts_towards_the_gap()]] - `calls` [EXTRACTED]

#graphify/code #graphify/EXTRACTED #community/Community_93
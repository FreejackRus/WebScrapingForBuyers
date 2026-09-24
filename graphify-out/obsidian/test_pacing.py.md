---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_pacing.py"
type: "code"
community: "test_pacing.py"
location: "L1"
tags:
  - graphify/code
  - graphify/EXTRACTED
  - community/test_pacingpy
---

# test_pacing.py

## Connections
- [[FakeClock]] - `contains` [EXTRACTED]
- [[Tests for request pacing and refusal backoff. The clock and the sleep are…]] - `rationale_for` [EXTRACTED]
- [[_pacer()]] - `contains` [EXTRACTED]
- [[pacing.py]] - `imports_from` [EXTRACTED]
- [[pytest]] - `imports` [EXTRACTED]
- [[test_a_negative_gap_is_clamped_rather_than_inverting_time()]] - `contains` [EXTRACTED]
- [[test_a_nonsense_gap_does_not_crash_construction()]] - `contains` [EXTRACTED]
- [[test_a_refusal_lengthens_the_next_gap()]] - `contains` [EXTRACTED]
- [[test_a_second_request_waits_out_the_gap()]] - `contains` [EXTRACTED]
- [[test_a_slow_caller_never_waits()]] - `contains` [EXTRACTED]
- [[test_a_success_also_clears_the_backoff()]] - `contains` [EXTRACTED]
- [[test_a_zero_gap_disables_pacing()]] - `contains` [EXTRACTED]
- [[test_a_zero_rotation_threshold_does_not_fire_on_no_refusals()]] - `contains` [EXTRACTED]
- [[test_an_error_delay_below_the_normal_gap_is_raised_to_it()]] - `contains` [EXTRACTED]
- [[test_an_overridden_gap_cannot_undercut_the_penalty()]] - `contains` [EXTRACTED]
- [[test_concurrent_callers_do_not_both_skip_the_gap()]] - `contains` [EXTRACTED]
- [[test_jitter_can_be_switched_off()]] - `contains` [EXTRACTED]
- [[test_jitter_leaves_the_normal_gap_alone()]] - `contains` [EXTRACTED]
- [[test_jitter_spreads_the_penalty_without_ever_shortening_it()]] - `contains` [EXTRACTED]
- [[test_one_success_clears_the_count()]] - `contains` [EXTRACTED]
- [[test_refusals_accumulate_until_they_look_like_a_wall()]] - `contains` [EXTRACTED]
- [[test_reset_forgets_everything()]] - `contains` [EXTRACTED]
- [[test_the_error_delay_is_configurable()]] - `contains` [EXTRACTED]
- [[test_the_first_request_does_not_wait()]] - `contains` [EXTRACTED]
- [[test_the_gap_can_be_overridden_per_call()]] - `contains` [EXTRACTED]
- [[test_the_hint_tells_the_operator_what_to_change()]] - `contains` [EXTRACTED]
- [[test_the_penalty_applies_once_not_forever()]] - `contains` [EXTRACTED]
- [[test_time_already_spent_counts_towards_the_gap()]] - `contains` [EXTRACTED]

#graphify/code #graphify/EXTRACTED #community/test_pacingpy
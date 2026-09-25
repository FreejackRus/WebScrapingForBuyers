---
type: community
cohesion: 0.09
members: 23
---

# Pacer

**Cohesion:** 0.09 - loosely connected
**Members:** 23 nodes

## Members
- [[dot-__init__()_39]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/pacing.py
- [[dot-consecutive_refusals()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/pacing.py
- [[dot-record_refusal()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/pacing.py
- [[dot-record_success()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/pacing.py
- [[dot-reset()_2]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/pacing.py
- [[dot-rotation_hint()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/pacing.py
- [[dot-should_rotate()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/pacing.py
- [[dot-wait()_5]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/pacing.py
- [[A backoff shorter than the normal pace would be a speed-up.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_pacing.py
- [[A request came back with data. Forget the refusals before it.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/pacing.py
- [[A request was refused — a 401, 403, 429, or an anti-bot wall. Only count what…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/pacing.py
- [[A sentence for the operator, empty until rotation is warranted. Connectors…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/pacing.py
- [[Block until enough time has passed since the previous request. ``min_gap``…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/pacing.py
- [[Configure the pace for one source. ``error_delay`` defaults to twice…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/pacing.py
- [[Forget everything. For tests and for a deliberate session change.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/pacing.py
- [[Keeps one source's requests spaced out, and backs off when refused. One…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/pacing.py
- [[Pacer]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/pacing.py
- [[Whether refusals have stopped looking like bad luck.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/pacing.py
- [[max() with NaN is undefined-ish; just make sure it constructs.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_pacing.py
- [[parametrize_35]] - code
- [[test_a_negative_gap_is_clamped_rather_than_inverting_time()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_pacing.py
- [[test_a_nonsense_gap_does_not_crash_construction()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_pacing.py
- [[test_an_error_delay_below_the_normal_gap_is_raised_to_it()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_pacing.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Pacer
SORT file.name ASC
```

## Connections to other communities
- 5 edges to [[_COMMUNITY_test_pacing.py]]
- 2 edges to [[_COMMUNITY_compare_prices]]
- 1 edge to [[_COMMUNITY_json]]
- 1 edge to [[_COMMUNITY_coerce_price]]

## Top bridge nodes
- [[Pacer]] - degree 18, connects to 4 communities
- [[test_a_nonsense_gap_does_not_crash_construction()]] - degree 4, connects to 1 community
- [[test_an_error_delay_below_the_normal_gap_is_raised_to_it()]] - degree 3, connects to 1 community
- [[test_a_negative_gap_is_clamped_rather_than_inverting_time()]] - degree 2, connects to 1 community
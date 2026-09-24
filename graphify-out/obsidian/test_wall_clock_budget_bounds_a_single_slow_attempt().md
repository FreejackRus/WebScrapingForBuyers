---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier_budgeted.py"
type: "code"
community: "get_text_budgeted"
location: "L91"
tags:
  - graphify/code
  - graphify/EXTRACTED
  - community/get_text_budgeted
---

# test_wall_clock_budget_bounds_a_single_slow_attempt()

## Connections
- [[The deadline fires mid-request, so a hung upstream cannot outlast the budget.]] - `rationale_for` [EXTRACTED]
- [[get_text_budgeted()]] - `calls` [INFERRED]
- [[handler()_11]] - `contains` [EXTRACTED]
- [[handler()_8]] - `indirect_call` [INFERRED]
- [[make_client()]] - `calls` [EXTRACTED]
- [[test_http_tier_budgeted.py]] - `contains` [EXTRACTED]

#graphify/code #graphify/EXTRACTED #community/get_text_budgeted
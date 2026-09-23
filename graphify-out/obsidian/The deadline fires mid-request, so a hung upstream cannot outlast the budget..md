---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier_budgeted.py"
type: "rationale"
community: "Community 13"
location: "L92"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/Community_13
---

# The deadline fires mid-request, so a hung upstream cannot outlast the budget.

## Connections
- [[test_wall_clock_budget_bounds_a_hung_attempt()]] - `rationale_for` [EXTRACTED]
- [[test_wall_clock_budget_bounds_a_single_slow_attempt()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/Community_13
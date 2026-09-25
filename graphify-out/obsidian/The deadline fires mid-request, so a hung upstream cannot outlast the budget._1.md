---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_transport.py"
type: "rationale"
community: "test_transport.py"
location: "L145"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/test_transportpy
---

# The deadline fires mid-request, so a hung upstream cannot outlast the budget.

## Connections
- [[test_wall_clock_budget_bounds_a_hung_attempt()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/test_transportpy
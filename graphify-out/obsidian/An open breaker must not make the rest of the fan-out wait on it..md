---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cdp_budget.py"
type: "rationale"
community: "test_cdp_budget.py"
location: "L121"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/test_cdp_budgetpy
---

# An open breaker must not make the rest of the fan-out wait on it.

## Connections
- [[test_a_refusing_host_fails_fast_instead_of_queueing()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/test_cdp_budgetpy
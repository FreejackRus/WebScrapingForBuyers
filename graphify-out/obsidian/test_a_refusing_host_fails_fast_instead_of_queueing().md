---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cdp_budget.py"
type: "code"
community: "HostRefusingError"
location: "L120"
tags:
  - graphify/code
  - graphify/EXTRACTED
  - community/HostRefusingError
---

# test_a_refusing_host_fails_fast_instead_of_queueing()

## Connections
- [[An open breaker must not make the rest of the fan-out wait on it.]] - `rationale_for` [EXTRACTED]
- [[HostRefusingError]] - `uses` [INFERRED]
- [[NavigationBudget]] - `uses` [INFERRED]
- [[test_cdp_budget.py]] - `contains` [EXTRACTED]

#graphify/code #graphify/EXTRACTED #community/HostRefusingError
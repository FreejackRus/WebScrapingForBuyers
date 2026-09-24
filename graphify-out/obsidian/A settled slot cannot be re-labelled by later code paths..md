---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_cdp_budget.py"
type: "rationale"
community: "test_cdp_budget.py"
location: "L183"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/test_cdp_budgetpy
---

# A settled slot cannot be re-labelled by later code paths.

## Connections
- [[test_outcome_is_reported_once()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/test_cdp_budgetpy
---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier_budgeted.py"
type: "rationale"
community: "get_text_budgeted"
location: "L125"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/get_text_budgeted
---

# Better to report the failure now than sleep past a deadline and report it late.

## Connections
- [[test_backoff_that_would_outlast_the_budget_is_not_taken()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/get_text_budgeted
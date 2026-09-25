---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier_budgeted.py"
type: "code"
community: "get_text_budgeted"
location: "L124"
tags:
  - graphify/code
  - graphify/EXTRACTED
  - community/get_text_budgeted
---

# test_backoff_that_would_outlast_the_budget_is_not_taken()

## Connections
- [[Better to report the failure now than sleep past a deadline and report it late.]] - `rationale_for` [EXTRACTED]
- [[get_text_budgeted()]] - `calls` [INFERRED]
- [[handler()]] - `contains` [EXTRACTED]
- [[handler()_8]] - `indirect_call` [INFERRED]
- [[make_client()]] - `calls` [EXTRACTED]
- [[test_http_tier_budgeted.py]] - `contains` [EXTRACTED]

#graphify/code #graphify/EXTRACTED #community/get_text_budgeted
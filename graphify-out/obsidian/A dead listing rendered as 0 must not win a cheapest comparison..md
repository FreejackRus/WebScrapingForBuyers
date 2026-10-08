---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py"
type: "rationale"
community: "test_resilience.py"
location: "L86"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/test_resiliencepy
---

# A dead listing rendered as 0 must not win a "cheapest" comparison.

## Connections
- [[test_zero_and_negative_are_not_prices()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/test_resiliencepy
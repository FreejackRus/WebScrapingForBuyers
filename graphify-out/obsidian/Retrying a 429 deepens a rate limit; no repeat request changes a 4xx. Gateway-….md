---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier_budgeted.py"
type: "rationale"
community: "get_text_budgeted"
location: "L180"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/get_text_budgeted
---

# Retrying a 429 deepens a rate limit; no repeat request changes a 4xx. Gateway-…

## Connections
- [[test_http_statuses_are_never_retried()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/get_text_budgeted
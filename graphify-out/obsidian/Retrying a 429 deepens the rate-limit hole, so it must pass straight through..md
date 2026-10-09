---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py"
type: "rationale"
community: "test_http_tier.py"
location: "L91"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/test_http_tierpy
---

# Retrying a 429 deepens the rate-limit hole, so it must pass straight through.

## Connections
- [[test_rate_limit_status_is_never_retried()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/test_http_tierpy
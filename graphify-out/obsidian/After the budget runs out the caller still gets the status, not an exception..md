---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py"
type: "rationale"
community: "make_client"
location: "L120"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/make_client
---

# After the budget runs out the caller still gets the status, not an exception.

## Connections
- [[test_exhausted_gateway_retries_return_the_real_response()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/make_client
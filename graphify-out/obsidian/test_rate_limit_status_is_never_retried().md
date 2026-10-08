---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py"
type: "code"
community: "test_http_tier.py"
location: "L90"
tags:
  - graphify/code
  - graphify/EXTRACTED
  - community/test_http_tierpy
---

# test_rate_limit_status_is_never_retried()

## Connections
- [[Retrying a 429 deepens the rate-limit hole, so it must pass straight through.]] - `rationale_for` [EXTRACTED]
- [[get_text_with_retries()]] - `calls` [INFERRED]
- [[handler()_18]] - `contains` [EXTRACTED]
- [[handler()_19]] - `indirect_call` [INFERRED]
- [[make_client()_1]] - `calls` [EXTRACTED]
- [[test_http_tier.py]] - `contains` [EXTRACTED]

#graphify/code #graphify/EXTRACTED #community/test_http_tierpy
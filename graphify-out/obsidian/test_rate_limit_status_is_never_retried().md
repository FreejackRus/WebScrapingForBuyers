---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py"
type: "code"
community: "Community 17"
location: "L90"
tags:
  - graphify/code
  - graphify/EXTRACTED
  - community/Community_17
---

# test_rate_limit_status_is_never_retried()

## Connections
- [[Retrying a 429 deepens the rate-limit hole, so it must pass straight through.]] - `rationale_for` [EXTRACTED]
- [[get_text_with_retries()]] - `calls` [INFERRED]
- [[handler()_27]] - `contains` [EXTRACTED]
- [[handler()_28]] - `indirect_call` [INFERRED]
- [[make_client()_2]] - `calls` [EXTRACTED]
- [[test_http_tier.py]] - `contains` [EXTRACTED]

#graphify/code #graphify/EXTRACTED #community/Community_17
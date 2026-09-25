---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_call_envelope.py"
type: "rationale"
community: "payload"
location: "L71"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/payload
---

# The rule the whole file exists for: HTTP 200 + code 403 is an auth failure.

## Connections
- [[test_inner_403_behind_http_200_is_auth_missing()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/payload
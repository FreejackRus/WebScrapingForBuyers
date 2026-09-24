---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_call_envelope.py"
type: "rationale"
community: "test_no_token_fails_before_any_request"
location: "L160"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/test_no_token_fails_before_any_request
---

# The auth gate must short-circuit ahead of the network, not after it.

## Connections
- [[test_no_token_fails_before_any_request()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/test_no_token_fails_before_any_request
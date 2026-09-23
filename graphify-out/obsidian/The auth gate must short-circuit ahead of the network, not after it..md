---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_call_envelope.py"
type: "rationale"
community: "Community 144"
location: "L160"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/Community_144
---

# The auth gate must short-circuit ahead of the network, not after it.

## Connections
- [[test_no_token_fails_before_any_request()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/Community_144
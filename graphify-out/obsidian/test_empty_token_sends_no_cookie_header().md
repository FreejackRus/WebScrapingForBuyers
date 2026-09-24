---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_transport.py"
type: "code"
community: "test_transport.py"
location: "L160"
tags:
  - graphify/code
  - graphify/EXTRACTED
  - community/test_transportpy
---

# test_empty_token_sends_no_cookie_header()

## Connections
- [[No configured token must never become a ``Cookie`` header on the wire.]] - `rationale_for` [EXTRACTED]
- [[handler()_38]] - `contains` [EXTRACTED]
- [[handler()_41]] - `indirect_call` [INFERRED]
- [[make_client()_2]] - `calls` [EXTRACTED]
- [[test_transport.py]] - `contains` [EXTRACTED]

#graphify/code #graphify/EXTRACTED #community/test_transportpy
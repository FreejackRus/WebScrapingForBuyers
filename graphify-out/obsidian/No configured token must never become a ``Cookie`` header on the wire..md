---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_transport.py"
type: "rationale"
community: "test_transport.py"
location: "L161"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/test_transportpy
---

# No configured token must never become a ``Cookie:`` header on the wire.

## Connections
- [[test_empty_token_sends_no_cookie_header()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/test_transportpy
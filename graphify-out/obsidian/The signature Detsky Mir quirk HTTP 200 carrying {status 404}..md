---
source_file: "mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py"
type: "rationale"
community: "error_payload"
location: "L175"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/error_payload
---

# The signature Detsky Mir quirk: HTTP 200 carrying {"status": 404}.

## Connections
- [[test_card_treats_404_in_a_200_body_as_not_found()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/error_payload
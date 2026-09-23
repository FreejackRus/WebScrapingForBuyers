---
source_file: "mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_server.py"
type: "code"
community: "Community 250"
location: "L244"
tags:
  - graphify/code
  - graphify/EXTRACTED
  - community/Community_250
---

# test_card_rejects_non_numeric_ids()

## Connections
- [[The id goes into a URL path, so it is validated as digits, never escaped.]] - `rationale_for` [EXTRACTED]
- [[error_payload()_1]] - `calls` [EXTRACTED]
- [[fail_fetch()_2]] - `contains` [EXTRACTED]
- [[fail_fetch()_3]] - `indirect_call` [INFERRED]
- [[parametrize_16]] - `references` [EXTRACTED]
- [[yandex-connectorteststest_server.py]] - `contains` [EXTRACTED]

#graphify/code #graphify/EXTRACTED #community/Community_250
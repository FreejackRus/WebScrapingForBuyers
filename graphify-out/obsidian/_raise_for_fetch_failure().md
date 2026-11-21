---
source_file: "mcp-servers/ru-marketplace-mcp/packages/avito-connector/src/avito_connector/server.py"
type: "code"
community: "raise_tool_error"
location: "L374"
tags:
  - graphify/code
  - graphify/EXTRACTED
  - community/raise_tool_error
---

# _raise_for_fetch_failure()

## Connections
- [[Map a failed fetch to the shared error taxonomy. Refusals are reported to the…]] - `rationale_for` [EXTRACTED]
- [[NotFoundError]] - `uses` [INFERRED]
- [[TransportDownError]] - `uses` [INFERRED]
- [[_blocked_error()]] - `calls` [EXTRACTED]
- [[avito_card()]] - `calls` [EXTRACTED]
- [[avito_connectorserver.py]] - `contains` [EXTRACTED]
- [[avito_search()_1]] - `calls` [EXTRACTED]
- [[avito_seller()]] - `calls` [EXTRACTED]
- [[raise_tool_error()]] - `calls` [EXTRACTED]

#graphify/code #graphify/EXTRACTED #community/raise_tool_error
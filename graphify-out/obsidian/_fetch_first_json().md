---
source_file: "mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py"
type: "code"
community: "log_event"
location: "L2182"
tags:
  - graphify/code
  - graphify/EXTRACTED
  - community/log_event
---

# _fetch_first_json()

## Connections
- [[Context_6]] - `references` [EXTRACTED]
- [[GET each URL in turn, returning the first parsed JSON body and its host. Mirror…]] - `rationale_for` [EXTRACTED]
- [[RateLimitedError]] - `uses` [INFERRED]
- [[TransportDownError]] - `uses` [INFERRED]
- [[_polite_wait()_7]] - `calls` [EXTRACTED]
- [[_safe_get_text()]] - `calls` [EXTRACTED]
- [[_wb_client()]] - `calls` [EXTRACTED]
- [[raise_tool_error()]] - `calls` [EXTRACTED]
- [[wb_categories()]] - `calls` [EXTRACTED]
- [[wb_connectorserver.py]] - `contains` [EXTRACTED]
- [[wb_seller()]] - `calls` [EXTRACTED]

#graphify/code #graphify/EXTRACTED #community/log_event
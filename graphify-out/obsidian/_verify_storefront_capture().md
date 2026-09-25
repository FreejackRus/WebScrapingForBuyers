---
source_file: "mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py"
type: "code"
community: "TransportDownError"
location: "L1553"
tags:
  - graphify/code
  - graphify/EXTRACTED
  - community/TransportDownError
---

# _verify_storefront_capture()

## Connections
- [[Any_16]] - `references` [EXTRACTED]
- [[ParserDriftError]] - `uses` [INFERRED]
- [[Raise ToolError when the CDP capture is unusable (empty  403  no route).]] - `rationale_for` [EXTRACTED]
- [[RateLimitedError]] - `uses` [INFERRED]
- [[TransportDownError]] - `uses` [INFERRED]
- [[_search_via_storefront()]] - `calls` [EXTRACTED]
- [[cdp_setup_hint()]] - `calls` [EXTRACTED]
- [[log_event()]] - `calls` [EXTRACTED]
- [[raise_tool_error()]] - `calls` [EXTRACTED]
- [[wb_connectorserver.py]] - `contains` [EXTRACTED]

#graphify/code #graphify/EXTRACTED #community/TransportDownError
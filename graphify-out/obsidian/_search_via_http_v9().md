---
source_file: "mcp-servers/ru-marketplace-mcp/packages/wb-connector/src/wb_connector/server.py"
type: "code"
community: "log_event"
location: "L1879"
tags:
  - graphify/code
  - graphify/EXTRACTED
  - community/log_event
---

# _search_via_http_v9()

## Connections
- [[Any_16]] - `references` [EXTRACTED]
- [[Context_6]] - `references` [EXTRACTED]
- [[Legacy bare HTTP to search.wb.ru v9. Used when WB_SEARCH_TRANSPORT=http.]] - `rationale_for` [EXTRACTED]
- [[RateLimitedError]] - `uses` [INFERRED]
- [[_expect_json_object()]] - `calls` [EXTRACTED]
- [[_polite_wait()_7]] - `calls` [EXTRACTED]
- [[_products_from_search_payload()]] - `calls` [EXTRACTED]
- [[_safe_get_text()]] - `calls` [EXTRACTED]
- [[_wb_client()]] - `calls` [EXTRACTED]
- [[log_event()]] - `calls` [EXTRACTED]
- [[raise_tool_error()]] - `calls` [EXTRACTED]
- [[wb_connectorserver.py]] - `contains` [EXTRACTED]
- [[wb_search()]] - `calls` [EXTRACTED]

#graphify/code #graphify/EXTRACTED #community/log_event
---
source_file: "mcp-servers/ru-marketplace-mcp/packages/detmir-connector/src/detmir_connector/server.py"
type: "code"
community: "TransportDownError"
location: "L133"
tags:
  - graphify/code
  - graphify/EXTRACTED
  - community/TransportDownError
---

# _fetch_json()

## Connections
- [[Any_9]] - `references` [EXTRACTED]
- [[GET ``url`` and parse it as JSON, with caching and bounded retries.]] - `rationale_for` [EXTRACTED]
- [[ParserDriftError]] - `uses` [INFERRED]
- [[RateLimitedError]] - `uses` [INFERRED]
- [[TransportDownError]] - `uses` [INFERRED]
- [[detmir_card()]] - `calls` [EXTRACTED]
- [[detmir_categories()]] - `calls` [EXTRACTED]
- [[detmir_category()]] - `calls` [EXTRACTED]
- [[detmir_connectorserver.py]] - `contains` [EXTRACTED]
- [[fetch()_2]] - `indirect_call` [INFERRED]

#graphify/code #graphify/EXTRACTED #community/TransportDownError
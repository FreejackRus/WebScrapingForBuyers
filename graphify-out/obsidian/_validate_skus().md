---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/src/mpstats_connector/server.py"
type: "code"
community: "BadRequestError"
location: "L500"
tags:
  - graphify/code
  - graphify/EXTRACTED
  - community/BadRequestError
---

# _validate_skus()

## Connections
- [[BadRequestError]] - `uses` [INFERRED]
- [[Shape-validate a SKU list non-empty, =MAX_SKUS, all positive ints. Validation…]] - `rationale_for` [EXTRACTED]
- [[mpstats_connectorserver.py]] - `contains` [EXTRACTED]
- [[mpstats_item()]] - `calls` [EXTRACTED]
- [[mpstats_warehouses()]] - `calls` [EXTRACTED]
- [[raise_tool_error()]] - `calls` [EXTRACTED]

#graphify/code #graphify/EXTRACTED #community/BadRequestError
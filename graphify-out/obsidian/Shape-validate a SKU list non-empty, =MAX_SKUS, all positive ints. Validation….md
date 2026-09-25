---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/src/mpstats_connector/server.py"
type: "rationale"
community: "BadRequestError"
location: "L501"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/BadRequestError
---

# Shape-validate a SKU list: non-empty, <=MAX_SKUS, all positive ints. Validation…

## Connections
- [[_validate_skus()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/BadRequestError
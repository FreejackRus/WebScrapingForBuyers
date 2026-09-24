---
source_file: "mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/server.py"
type: "rationale"
community: "BadRequestError"
location: "L1094"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/BadRequestError
---

# Accept the source's numeric ID or canonical product path, never a stray digit.

## Connections
- [[_numeric_card_id()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/BadRequestError
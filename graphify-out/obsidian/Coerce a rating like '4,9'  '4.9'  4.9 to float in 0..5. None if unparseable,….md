---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/resilience.py"
type: "rationale"
community: "Any"
location: "L209"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/Any
---

# Coerce a rating like '4,9' / '4.9' / 4.9 to float in 0..5. None if unparseable,…

## Connections
- [[coerce_rating()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/Any
---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/http_tier.py"
type: "rationale"
community: "Community 17"
location: "L72"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/Community_17
---

# Serialises requests so consecutive calls stay ``min_gap_s`` apart.

## Connections
- [[RateLimiter]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/Community_17
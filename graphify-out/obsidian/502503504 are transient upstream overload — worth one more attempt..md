---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_http_tier.py"
type: "rationale"
community: "Community 17"
location: "L72"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/Community_17
---

# 502/503/504 are transient upstream overload — worth one more attempt.

## Connections
- [[test_gateway_statuses_are_retried()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/Community_17
---
source_file: "mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py"
type: "rationale"
community: "Community 252"
location: "L414"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/Community_252
---

# Serial queries would make a four-source comparison unusably slow.

## Connections
- [[test_sources_run_concurrently()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/Community_252
---
source_file: "mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_server.py"
type: "rationale"
community: "Community 98"
location: "L501"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/Community_98
---

# 302 is a transient hiccup here; retrying a 429 would deepen the limit.

## Connections
- [[test_retry_statuses_include_302_but_not_429()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/Community_98
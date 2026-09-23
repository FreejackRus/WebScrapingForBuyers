---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_transport.py"
type: "rationale"
community: "Community 13"
location: "L101"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/Community_13
---

# 429/5xx come back immediately: a status is an answer, not a transient fault.

## Connections
- [[test_http_status_is_never_retried()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/Community_13
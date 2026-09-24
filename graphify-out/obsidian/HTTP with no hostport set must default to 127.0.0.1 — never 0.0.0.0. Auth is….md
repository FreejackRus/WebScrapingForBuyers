---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_runtime.py"
type: "rationale"
community: "test_runtime.py"
location: "L82"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/test_runtimepy
---

# HTTP with no host/port set must default to 127.0.0.1 — never 0.0.0.0. Auth is…

## Connections
- [[test_http_defaults_bind_to_loopback()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/test_runtimepy
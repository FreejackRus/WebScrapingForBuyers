---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/runtime.py"
type: "rationale"
community: "taobao_connector/server.py"
location: "L43"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/taobao_connector/serverpy
---

# Resolve direct and mounted tool calls; CLI probes have no MCP session.

## Connections
- [[current_mcp_session_id()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/taobao_connector/serverpy
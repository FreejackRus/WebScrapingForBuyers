---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/process.py"
type: "code"
community: "terminate_process_tree"
location: "L157"
tags:
  - graphify/code
  - graphify/EXTRACTED
  - community/terminate_process_tree
---

# terminate_process_tree()

## Connections
- [[Fixed_22]] - `references` [INFERRED]
- [[Kill ``proc`` and any children it spawned, then close its pipes. Best-effort by…]] - `rationale_for` [EXTRACTED]
- [[Popen_1]] - `references` [EXTRACTED]
- [[_sync_call_in_process()]] - `calls` [EXTRACTED]
- [[is_windows()]] - `calls` [EXTRACTED]
- [[kill_process_group()]] - `calls` [EXTRACTED]
- [[process.py]] - `contains` [EXTRACTED]
- [[taskkill_cmd()]] - `calls` [EXTRACTED]
- [[taskkill_env()]] - `calls` [EXTRACTED]

#graphify/code #graphify/EXTRACTED #community/terminate_process_tree
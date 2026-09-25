---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/process.py"
type: "code"
community: "terminate_process_tree"
location: "L134"
tags:
  - graphify/code
  - graphify/EXTRACTED
  - community/terminate_process_tree
---

# kill_process_group()

## Connections
- [[Fixed_22]] - `references` [INFERRED]
- [[SIGKILL the process group led by ``pid``. POSIX only. ``os.killpg``,…]] - `rationale_for` [EXTRACTED]
- [[`process` — cross-platform worker handling]] - `references` [INFERRED]
- [[process.py]] - `contains` [EXTRACTED]
- [[terminate_process_tree()]] - `calls` [EXTRACTED]

#graphify/code #graphify/EXTRACTED #community/terminate_process_tree
---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_process.py"
type: "rationale"
community: "test_process.py"
location: "L177"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/test_processpy
---

# On Windows os.killpg simply does not exist, so this must raise cleanly.…

## Connections
- [[test_kill_process_group_refuses_where_process_groups_do_not_exist()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/test_processpy
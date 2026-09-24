---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_redact.py"
type: "rationale"
community: "test_redact.py"
location: "L107"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/test_redactpy
---

# No ':' in the userinfo — a bare username is not a credential.

## Connections
- [[test_a_bare_username_before_at_is_left_alone()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/test_redactpy
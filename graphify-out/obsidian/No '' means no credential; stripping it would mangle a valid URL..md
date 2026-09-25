---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_redact.py"
type: "rationale"
community: "test_redact.py"
location: "L123"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/test_redactpy
---

# No ':' means no credential; stripping it would mangle a valid URL.

## Connections
- [[test_a_bare_username_without_a_password_is_left_alone()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/test_redactpy
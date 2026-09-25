---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_process.py"
type: "rationale"
community: "test_process.py"
location: "L189"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/test_processpy
---

# The child env allowlist must not leak proxy configuration.

## Connections
- [[test_proxy_env_vars_are_excluded_from_the_worker_environment()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/test_processpy
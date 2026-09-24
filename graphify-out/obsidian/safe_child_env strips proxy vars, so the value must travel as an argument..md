---
source_file: "mcp-servers/ru-marketplace-mcp/packages/ozon-connector/tests/test_server.py"
type: "rationale"
community: "test_tier1_proxy_is_passed_as_an_argument_not_an_env_var"
location: "L896"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/test_tier1_proxy_is_passed_as_an_argument_not_an_env_var
---

# safe_child_env strips proxy vars, so the value must travel as an argument.

## Connections
- [[test_tier1_proxy_is_passed_as_an_argument_not_an_env_var()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/test_tier1_proxy_is_passed_as_an_argument_not_an_env_var
---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_chrome_cdp.py"
type: "rationale"
community: "test_port_probe_treats_an_os_error_as_closed"
location: "L283"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/test_port_probe_treats_an_os_error_as_closed
---

# An unreachable network or bad address is 'no CDP', not a crash.

## Connections
- [[test_port_probe_treats_an_os_error_as_closed()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/test_port_probe_treats_an_os_error_as_closed
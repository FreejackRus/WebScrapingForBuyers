---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_chrome_cdp.py"
type: "rationale"
community: "parametrize"
location: "L38"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/parametrize
---

# A typo'd port must not become a connection attempt to port 0 or 99999.

## Connections
- [[test_a_nonsense_port_falls_back_to_the_default()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/parametrize
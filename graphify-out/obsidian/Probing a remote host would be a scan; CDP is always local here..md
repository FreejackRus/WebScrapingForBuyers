---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_chrome_cdp.py"
type: "rationale"
community: "Community 255"
location: "L310"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/Community_255
---

# Probing a remote host would be a scan; CDP is always local here.

## Connections
- [[test_port_probe_targets_loopback_only()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/Community_255
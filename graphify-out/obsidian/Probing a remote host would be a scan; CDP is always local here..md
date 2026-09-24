---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_chrome_cdp.py"
type: "rationale"
community: "test_port_probe_targets_loopback_only"
location: "L310"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/test_port_probe_targets_loopback_only
---

# Probing a remote host would be a scan; CDP is always local here.

## Connections
- [[test_port_probe_targets_loopback_only()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/test_port_probe_targets_loopback_only
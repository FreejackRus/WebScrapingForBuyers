---
source_file: "mcp-servers/ru-marketplace-mcp/scripts/diagnose_drift.py"
type: "rationale"
community: "chrome_cdp.py"
location: "L189"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/chrome_cdppy
---

# Megamarket answers JSON, not HTML, so the DOM probe cannot see it. Its drift…

## Connections
- [[diagnose_megamarket()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/chrome_cdppy
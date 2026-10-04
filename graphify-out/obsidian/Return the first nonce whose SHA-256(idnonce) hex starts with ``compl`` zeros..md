---
source_file: "mcp-servers/ru-marketplace-mcp/packages/avito-connector/src/avito_connector/firewall_pow.py"
type: "rationale"
community: "firewall_pow.py"
location: "L58"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/firewall_powpy
---

# Return the first nonce whose SHA-256(id:nonce) hex starts with ``compl`` zeros.

## Connections
- [[find_pow_nonce()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/firewall_powpy
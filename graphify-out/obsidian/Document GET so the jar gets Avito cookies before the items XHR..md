---
source_file: "mcp-servers/ru-marketplace-mcp/packages/avito-connector/src/avito_connector/server.py"
type: "rationale"
community: "_sync_curl_get"
location: "L199"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/_sync_curl_get
---

# Document GET so the jar gets Avito cookies before the items XHR.

## Connections
- [[_warmup_avito_session()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/_sync_curl_get
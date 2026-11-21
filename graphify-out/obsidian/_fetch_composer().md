---
source_file: "mcp-servers/ru-marketplace-mcp/packages/ozon-connector/src/ozon_connector/server.py"
type: "code"
community: "ozon_connector/server.py"
location: "L545"
tags:
  - graphify/code
  - graphify/EXTRACTED
  - community/ozon_connector/serverpy
---

# _fetch_composer()

## Connections
- [[NavBlocked]] - `uses` [INFERRED]
- [[Try curl_cffi, then optional Scrapling, then CDP. Returns (status_code, body,…]] - `rationale_for` [EXTRACTED]
- [[_canonical_composer_path()]] - `calls` [EXTRACTED]
- [[_cdp_fetch_json()]] - `calls` [EXTRACTED]
- [[_check()]] - `calls` [EXTRACTED]
- [[_ozon_reviews_impl()]] - `calls` [EXTRACTED]
- [[_ozon_search_impl()]] - `calls` [EXTRACTED]
- [[_polite_wait()_4]] - `calls` [EXTRACTED]
- [[_proxy()_2]] - `calls` [EXTRACTED]
- [[_run_sync_bounded()]] - `calls` [EXTRACTED]
- [[_scrapling_enabled()]] - `calls` [EXTRACTED]
- [[_sync_curl_get()]] - `indirect_call` [INFERRED]
- [[_sync_scrapling_get()]] - `indirect_call` [INFERRED]
- [[ozon_card()]] - `calls` [EXTRACTED]
- [[ozon_connectorserver.py]] - `contains` [EXTRACTED]

#graphify/code #graphify/EXTRACTED #community/ozon_connector/serverpy
---
source_file: "mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_server.py"
type: "rationale"
community: "fake_get"
location: "L485"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/fake_get
---

# Yandex's transient hiccup: 302 with no body, retried then surfaced.

## Connections
- [[test_fetch_html_treats_an_empty_302_as_transport_failure()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/fake_get
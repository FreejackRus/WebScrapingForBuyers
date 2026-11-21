---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_dom.py"
type: "rationale"
community: "prices_from_tile"
location: "L62"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/prices_from_tile
---

# innerText depends on layout, differs between tabs, and is absent in jsdom.

## Connections
- [[test_the_shared_helpers_read_text_content_not_inner_text()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/prices_from_tile
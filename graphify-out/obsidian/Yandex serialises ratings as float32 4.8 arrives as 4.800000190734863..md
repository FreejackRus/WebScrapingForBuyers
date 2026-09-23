---
source_file: "mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_ssr.py"
type: "rationale"
community: "Community 334"
location: "L143"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/Community_334
---

# Yandex serialises ratings as float32: 4.8 arrives as 4.800000190734863.

## Connections
- [[test_search_rounds_float32_ratings()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/Community_334
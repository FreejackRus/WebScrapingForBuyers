---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_redact.py"
type: "rationale"
community: "test_redact.py"
location: "L199"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/test_redactpy
---

# A cookie-shaped regex that also eats normal words would hide real errors.

## Connections
- [[test_ordinary_text_survives_untouched()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/test_redactpy
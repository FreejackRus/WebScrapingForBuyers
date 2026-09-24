---
source_file: "mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_vision_policy.py"
type: "rationale"
community: "resolve_image_delivery"
location: "L57"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/resolve_image_delivery
---

# Never send pixels to something that just said it cannot read them.

## Connections
- [[test_an_explicit_client_refusal_beats_everything()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/resolve_image_delivery
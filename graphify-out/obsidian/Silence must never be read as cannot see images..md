---
source_file: "mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_vision_policy.py"
type: "rationale"
community: "test_review_regressions.py"
location: "L39"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/test_review_regressionspy
---

# Silence must never be read as "cannot see images".

## Connections
- [[test_a_client_that_says_nothing_is_unknown_not_visionless()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/test_review_regressionspy
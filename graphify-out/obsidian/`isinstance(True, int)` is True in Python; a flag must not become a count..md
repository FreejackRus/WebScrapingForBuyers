---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py"
type: "rationale"
community: "test_resilience.py"
location: "L133"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/test_resiliencepy
---

# `isinstance(True, int)` is True in Python; a flag must not become a count.

## Connections
- [[test_bools_are_not_counts()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/test_resiliencepy
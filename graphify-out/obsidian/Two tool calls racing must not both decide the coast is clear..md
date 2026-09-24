---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_pacing.py"
type: "rationale"
community: "test_concurrent_callers_do_not_both_skip_the_gap"
location: "L276"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/test_concurrent_callers_do_not_both_skip_the_gap
---

# Two tool calls racing must not both decide the coast is clear.

## Connections
- [[test_concurrent_callers_do_not_both_skip_the_gap()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/test_concurrent_callers_do_not_both_skip_the_gap
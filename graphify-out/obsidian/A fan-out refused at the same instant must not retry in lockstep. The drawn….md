---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_pacing.py"
type: "rationale"
community: "test_pacing.py"
location: "L120"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/test_pacingpy
---

# A fan-out refused at the same instant must not retry in lockstep. The drawn…

## Connections
- [[test_jitter_spreads_the_penalty_without_ever_shortening_it()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/test_pacingpy
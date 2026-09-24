---
source_file: "mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_zone_tag_scanning.py"
type: "rationale"
community: "ssr.py"
location: "L56"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/ssrpy
---

# Guards the tag scanner itself: quotes must be tracked, not just '>'.

## Connections
- [[test_a_quoted_angle_bracket_inside_the_payload_does_not_split_the_tag()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/ssrpy
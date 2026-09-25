---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_dom.py"
type: "rationale"
community: "test_dom.py"
location: "L40"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/test_dompy
---

# `%` and `-` are markers; unescaped they would alter the regex's meaning.

## Connections
- [[test_regex_punctuation_in_a_marker_cannot_change_the_pattern()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/test_dompy
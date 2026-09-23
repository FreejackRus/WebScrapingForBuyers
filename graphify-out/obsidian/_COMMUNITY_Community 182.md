---
type: community
cohesion: 0.20
members: 10
---

# Community 182

**Cohesion:** 0.20 - loosely connected
**Members:** 10 nodes

## Members
- [[A bare number is a value upstream chose to send unquoted, not a guess.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[Avito's `location` arrived as a string until it became `{name ...}`, and the…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[Reduce a value upstream ships as EITHER a string OR an object to text. Audit…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/resilience.py
- [[The crash that started this helper a nested object must degrade to a name or…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience_properties.py
- [[flatten_text()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/resilience.py
- [[test_flatten_text_never_returns_a_container_repr()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience_properties.py
- [[test_flatten_text_passes_a_plain_string()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[test_flatten_text_reads_the_named_key_out_of_an_object()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[test_flatten_text_stringifies_a_scalar()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py
- [[test_flatten_text_tries_keys_in_order()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_resilience.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Community_182
SORT file.name ASC
```

## Connections to other communities
- 5 edges to [[_COMMUNITY_Community 53]]
- 3 edges to [[_COMMUNITY_Community 48]]
- 2 edges to [[_COMMUNITY_Community 66]]
- 1 edge to [[_COMMUNITY_Community 18]]
- 1 edge to [[_COMMUNITY_Community 14]]

## Top bridge nodes
- [[flatten_text()]] - degree 13, connects to 5 communities
- [[test_flatten_text_never_returns_a_container_repr()]] - degree 3, connects to 1 community
- [[test_flatten_text_reads_the_named_key_out_of_an_object()]] - degree 3, connects to 1 community
- [[test_flatten_text_stringifies_a_scalar()]] - degree 3, connects to 1 community
- [[test_flatten_text_passes_a_plain_string()]] - degree 2, connects to 1 community
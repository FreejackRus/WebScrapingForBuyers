---
type: community
cohesion: 0.67
members: 3
---

# test_no_token_fails_before_any_request

**Cohesion:** 0.67 - moderately connected
**Members:** 3 nodes

## Members
- [[The auth gate must short-circuit ahead of the network, not after it.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_call_envelope.py
- [[exploding_client()]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_call_envelope.py
- [[test_no_token_fails_before_any_request()]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_call_envelope.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/test_no_token_fails_before_any_request
SORT file.name ASC
```

## Connections to other communities
- 1 edge to [[_COMMUNITY_payload]]
- 1 edge to [[_COMMUNITY_test_call_envelope.py]]

## Top bridge nodes
- [[test_no_token_fails_before_any_request()]] - degree 4, connects to 2 communities
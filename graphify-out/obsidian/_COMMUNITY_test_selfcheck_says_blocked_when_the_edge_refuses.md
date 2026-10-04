---
type: community
members: 6
---

# test_selfcheck_says_blocked_when_the_edge_refuses

**Members:** 6 nodes

## Members
- [[HTTP 418 comes from DDoS-Guard, so the message must name the edge. Verified…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[The canary's note must distinguish a refusal from an unexplained block.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[edge_418()]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[edge_418()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[test_a_418_is_reported_as_an_edge_block()]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py
- [[test_selfcheck_says_blocked_when_the_edge_refuses()]] - code - mcp-servers/ru-marketplace-mcp/packages/detmir-connector/tests/test_server.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/test_selfcheck_says_blocked_when_the_edge_refuses
SORT file.name ASC
```

## Connections to other communities
- 2 edges to [[_COMMUNITY_TransportDownError]]
- 2 edges to [[_COMMUNITY_detmir-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_raise_tool_error]]

## Top bridge nodes
- [[test_selfcheck_says_blocked_when_the_edge_refuses()]] - degree 5, connects to 2 communities
- [[edge_418()_1]] - degree 3, connects to 2 communities
- [[test_a_418_is_reported_as_an_edge_block()]] - degree 3, connects to 1 community
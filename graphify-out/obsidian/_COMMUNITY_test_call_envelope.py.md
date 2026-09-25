---
type: community
cohesion: 0.18
members: 13
---

# test_call_envelope.py

**Cohesion:** 0.18 - loosely connected
**Members:** 13 nodes

## Members
- [[A shared module-level cache would leak state between these tests.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_call_envelope.py
- [[MPStats MCP connector package.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/src/mpstats_connector/__init__.py
- [[Same for the classified-error branch, which reports a string rather than…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_call_envelope.py
- [[Tests for ``_call`` — the RPC envelope every tool shares. ``test_transport.py``…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_call_envelope.py
- [[_instant()]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_call_envelope.py
- [[empty_cache()]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_call_envelope.py
- [[fake_post()_2]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_call_envelope.py
- [[fixture_7]] - code
- [[mpstats_connector__init__.py]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/src/mpstats_connector/__init__.py
- [[no_polite_gap()]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_call_envelope.py
- [[test_a_transport_error_string_does_not_carry_the_token()]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_call_envelope.py
- [[test_call_envelope.py]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_call_envelope.py
- [[token_present()]] - code - mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_call_envelope.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/test_call_envelopepy
SORT file.name ASC
```

## Connections to other communities
- 17 edges to [[_COMMUNITY_payload]]
- 3 edges to [[_COMMUNITY_json]]
- 2 edges to [[_COMMUNITY_mpstats-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_test_no_token_fails_before_any_request]]
- 1 edge to [[_COMMUNITY_test_transport.py]]
- 1 edge to [[_COMMUNITY_pytest]]

## Top bridge nodes
- [[test_call_envelope.py]] - degree 28, connects to 4 communities
- [[mpstats_connector__init__.py]] - degree 5, connects to 2 communities
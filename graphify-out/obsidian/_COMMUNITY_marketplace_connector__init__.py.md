---
type: community
cohesion: 0.22
members: 9
---

# marketplace_connector/__init__.py

**Cohesion:** 0.22 - loosely connected
**Members:** 9 nodes

## Members
- [[Every mounted tool must document its return shape and its error contract. The…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_tool_docstring_sections.py
- [[The mounted MCP surface stays cheap by construction. Two measured levers are…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_wire_frugality.py
- [[Unified marketplace MCP connector.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/src/marketplace_connector/__init__.py
- [[marketplace_connector__init__.py]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/src/marketplace_connector/__init__.py
- [[test_every_output_schema_is_wire_frugal()]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_wire_frugality.py
- [[test_every_tool_documents_its_return_and_error_format()]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_tool_docstring_sections.py
- [[test_no_operator_selfcheck_is_registered_as_a_tool()]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_wire_frugality.py
- [[test_tool_docstring_sections.py]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_tool_docstring_sections.py
- [[test_wire_frugality.py]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_wire_frugality.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/marketplace_connector/__init__py
SORT file.name ASC
```

## Connections to other communities
- 2 edges to [[_COMMUNITY_json]]
- 1 edge to [[_COMMUNITY_marketplace-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_test_cli.py]]
- 1 edge to [[_COMMUNITY_pytest]]
- 1 edge to [[_COMMUNITY_test_public_contract_snapshot.py]]

## Top bridge nodes
- [[marketplace_connector__init__.py]] - degree 7, connects to 4 communities
- [[test_wire_frugality.py]] - degree 5, connects to 1 community
- [[test_tool_docstring_sections.py]] - degree 4, connects to 1 community
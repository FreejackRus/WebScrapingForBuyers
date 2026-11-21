---
type: community
cohesion: 0.18
members: 13
---

# cmd_doctor

**Cohesion:** 0.18 - loosely connected
**Members:** 13 nodes

## Members
- [[Entry point for the unified marketplace MCP server. Exposed as the…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/src/marketplace_connector/__main__.py
- [[Render one sub-check as state plus the reason it reached that state.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/src/marketplace_connector/cli.py
- [[Run every selfcheck and print a per-source health table. ``--status-file PATH``…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/src/marketplace_connector/cli.py
- [[Run one connector's selfcheck, returning (name, status, detail).]] - rationale - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/src/marketplace_connector/cli.py
- [[Run the server, or the installdoctor CLI when a subcommand is given.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/src/marketplace_connector/__main__.py
- [[Sub-checks arrive as dicts from some connectors and models from others.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/src/marketplace_connector/cli.py
- [[_attr()]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/src/marketplace_connector/cli.py
- [[_check_detail()]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/src/marketplace_connector/cli.py
- [[_run_one_selfcheck()]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/src/marketplace_connector/cli.py
- [[cmd_doctor()]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/src/marketplace_connector/cli.py
- [[main()_4]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/src/marketplace_connector/cli.py
- [[main()_5]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/src/marketplace_connector/__main__.py
- [[marketplace_connector__main__.py]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/src/marketplace_connector/__main__.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/cmd_doctor
SORT file.name ASC
```

## Connections to other communities
- 6 edges to [[_COMMUNITY_json]]
- 1 edge to [[_COMMUNITY_test_source_selection.py]]
- 1 edge to [[_COMMUNITY_raise_tool_error]]
- 1 edge to [[_COMMUNITY_test_dsh_bundle.py]]
- 1 edge to [[_COMMUNITY_log_event]]
- 1 edge to [[_COMMUNITY_run_server]]

## Top bridge nodes
- [[cmd_doctor()]] - degree 6, connects to 3 communities
- [[main()_4]] - degree 6, connects to 3 communities
- [[_run_one_selfcheck()]] - degree 5, connects to 1 community
- [[_attr()]] - degree 4, connects to 1 community
- [[_check_detail()]] - degree 4, connects to 1 community
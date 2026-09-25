---
type: community
cohesion: 0.16
members: 18
---

# test_output_schema.py

**Cohesion:** 0.16 - loosely connected
**Members:** 18 nodes

## Members
- [[A deliberately heavy return model.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_output_schema.py
- [[Any]] - code
- [[BaseModel]] - code
- [[FastMCP]] - code
- [[FastMCP_1]] - code
- [[Re-write every registered tool's ``output_schema`` to the compact form. FastMCP…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/output_schema.py
- [[Reduce a FastMCP-generated output schema to top-level field names. ``{}`` as a…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/output_schema.py
- [[The wire-frugal output-schema reducer is the largest context-cost lever. Full…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_output_schema.py
- [[_Named]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_output_schema.py
- [[_heavy_tool()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_output_schema.py
- [[apply_compact_output_schemas()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/output_schema.py
- [[compact_output_schema()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/output_schema.py
- [[named()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_output_schema.py
- [[test_apply_is_idempotent()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_output_schema.py
- [[test_compact_falls_back_to_permissive_object_for_unknown_shapes()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_output_schema.py
- [[test_compact_keeps_only_top_level_names()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_output_schema.py
- [[test_output_schema.py]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_output_schema.py
- [[test_registered_tool_reaches_clients_with_a_compact_schema()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_output_schema.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/test_output_schemapy
SORT file.name ASC
```

## Connections to other communities
- 5 edges to [[_COMMUNITY_json]]
- 1 edge to [[_COMMUNITY_pydantic]]

## Top bridge nodes
- [[test_output_schema.py]] - degree 11, connects to 2 communities
- [[apply_compact_output_schemas()]] - degree 6, connects to 1 community
- [[compact_output_schema()]] - degree 6, connects to 1 community
- [[FastMCP]] - degree 2, connects to 1 community
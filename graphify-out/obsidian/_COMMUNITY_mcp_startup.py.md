---
type: community
cohesion: 0.40
members: 6
---

# mcp_startup.py

**Cohesion:** 0.40 - moderately connected
**Members:** 6 nodes

## Members
- [[Measure stdio startup initialize + toolslist latency for MCP servers. This is…]] - rationale - mcp-servers/ru-marketplace-mcp/scripts/mcp_startup.py
- [[Path_16]] - code
- [[argparse]] - concept
- [[main()_33]] - code - mcp-servers/ru-marketplace-mcp/scripts/mcp_startup.py
- [[mcp_startup.py]] - code - mcp-servers/ru-marketplace-mcp/scripts/mcp_startup.py
- [[measure()]] - code - mcp-servers/ru-marketplace-mcp/scripts/mcp_startup.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/mcp_startuppy
SORT file.name ASC
```

## Connections to other communities
- 4 edges to [[_COMMUNITY_StdioProbe]]
- 3 edges to [[_COMMUNITY_json]]
- 2 edges to [[_COMMUNITY_mcp_wire.py]]
- 1 edge to [[_COMMUNITY_backup-state.py]]
- 1 edge to [[_COMMUNITY_diagnose_drift.py]]
- 1 edge to [[_COMMUNITY_test_stdio_probe.py]]
- 1 edge to [[_COMMUNITY_pathlib]]
- 1 edge to [[_COMMUNITY_model_routing_eval.py]]

## Top bridge nodes
- [[mcp_startup.py]] - degree 11, connects to 4 communities
- [[argparse]] - degree 6, connects to 4 communities
- [[measure()]] - degree 5, connects to 1 community
---
type: community
cohesion: 0.13
members: 15
---

# decision_inspect

**Cohesion:** 0.13 - loosely connected
**Members:** 15 nodes

## Members
- [[1. Install the server]] - document - mcp-servers/ru-marketplace-mcp/docs/QUICKSTART.md
- [[2. Choose one server for your task]] - document - mcp-servers/ru-marketplace-mcp/docs/QUICKSTART.md
- [[3. Check two sources before adding a browser]] - document - mcp-servers/ru-marketplace-mcp/docs/QUICKSTART.md
- [[5. Add browser-backed sources when needed]] - document - mcp-servers/ru-marketplace-mcp/docs/QUICKSTART.md
- [[Any_5]] - code
- [[Field_3]] - code
- [[First successful marketplace query]] - document - mcp-servers/ru-marketplace-mcp/docs/QUICKSTART.md
- [[If the client cannot connect]] - document - mcp-servers/ru-marketplace-mcp/docs/QUICKSTART.md
- [[Inspect one shortlisted offer, optionally including its reviews. This is…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/decision_server.py
- [[decision_inspect()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/src/compare_connector/decision_server.py
- [[default_1]] - code
- [[description_5]] - code
- [[max_length_2]] - code
- [[min_length_2]] - code
- [[tool_3]] - code

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/decision_inspect
SORT file.name ASC
```

## Connections to other communities
- 2 edges to [[_COMMUNITY_json]]
- 2 edges to [[_COMMUNITY_compare_verify_offer]]
- 1 edge to [[_COMMUNITY_mcp-coreteststest_browser_handoff.py]]
- 1 edge to [[_COMMUNITY_ru-marketplace-mcpREADME]]

## Top bridge nodes
- [[decision_inspect()]] - degree 12, connects to 2 communities
- [[First successful marketplace query]] - degree 7, connects to 2 communities
- [[3. Check two sources before adding a browser]] - degree 2, connects to 1 community
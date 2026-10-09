---
type: community
cohesion: 0.36
members: 8
---

# diagnose_drift.py

**Cohesion:** 0.36 - loosely connected
**Members:** 8 nodes

## Members
- [[Diagnose why a CDP source's search extractor found nothing. ``drift_detected``…]] - rationale - mcp-servers/ru-marketplace-mcp/scripts/diagnose_drift.py
- [[Megamarket answers JSON, not HTML, so the DOM probe cannot see it. Its drift…]] - rationale - mcp-servers/ru-marketplace-mcp/scripts/diagnose_drift.py
- [[Turn the raw structure into the one sentence the operator needs.]] - rationale - mcp-servers/ru-marketplace-mcp/scripts/diagnose_drift.py
- [[_verdict()]] - code - mcp-servers/ru-marketplace-mcp/scripts/diagnose_drift.py
- [[diagnose()]] - code - mcp-servers/ru-marketplace-mcp/scripts/diagnose_drift.py
- [[diagnose_drift.py]] - code - mcp-servers/ru-marketplace-mcp/scripts/diagnose_drift.py
- [[diagnose_megamarket()]] - code - mcp-servers/ru-marketplace-mcp/scripts/diagnose_drift.py
- [[main()_27]] - code - mcp-servers/ru-marketplace-mcp/scripts/diagnose_drift.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/diagnose_driftpy
SORT file.name ASC
```

## Connections to other communities
- 4 edges to [[_COMMUNITY_json]]
- 2 edges to [[_COMMUNITY_shape_signature]]
- 1 edge to [[_COMMUNITY_wb_connectorserver.py]]
- 1 edge to [[_COMMUNITY_open_page]]
- 1 edge to [[_COMMUNITY_resilience.py]]
- 1 edge to [[_COMMUNITY_StdioProbe]]

## Top bridge nodes
- [[diagnose_drift.py]] - degree 11, connects to 3 communities
- [[diagnose()]] - degree 7, connects to 3 communities
- [[diagnose_megamarket()]] - degree 4, connects to 1 community
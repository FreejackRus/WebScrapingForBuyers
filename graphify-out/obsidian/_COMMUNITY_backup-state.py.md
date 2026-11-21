---
type: community
cohesion: 0.42
members: 9
---

# backup-state.py

**Cohesion:** 0.42 - moderately connected
**Members:** 9 nodes

## Members
- [[Capture Price Radar JSON state or restore it into an empty staging directory.]] - rationale - scripts/backup-state.py
- [[backup-state.py]] - code - scripts/backup-state.py
- [[capture()_4]] - code - scripts/backup-state.py
- [[checksum()]] - code - scripts/backup-state.py
- [[main()_1]] - code - scripts/backup-state.py
- [[restore()]] - code - scripts/backup-state.py
- [[tempfile]] - concept
- [[verified()]] - code - scripts/backup-state.py
- [[zipfile]] - concept

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/backup-statepy
SORT file.name ASC
```

## Connections to other communities
- 3 edges to [[_COMMUNITY_json]]
- 2 edges to [[_COMMUNITY_pathlib]]
- 1 edge to [[_COMMUNITY_mcp_startup.py]]
- 1 edge to [[_COMMUNITY_domtest.py]]
- 1 edge to [[_COMMUNITY_ozon_connectorserver.py]]

## Top bridge nodes
- [[backup-state.py]] - degree 14, connects to 3 communities
- [[tempfile]] - degree 3, connects to 2 communities
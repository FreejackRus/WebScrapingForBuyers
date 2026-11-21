---
type: community
cohesion: 0.38
members: 7
---

# check_coverage_floor.py

**Cohesion:** 0.38 - loosely connected
**Members:** 7 nodes

## Members
- [[Fail if measured offline coverage drops below the documented floor. The offline…]] - rationale - mcp-servers/ru-marketplace-mcp/scripts/check_coverage_floor.py
- [[Read the floor out of the CI workflow so this check enforces the same number CI…]] - rationale - mcp-servers/ru-marketplace-mcp/scripts/check_coverage_floor.py
- [[Run the offline suite with coverage and read the TOTAL percentage.]] - rationale - mcp-servers/ru-marketplace-mcp/scripts/check_coverage_floor.py
- [[_documented_floor()]] - code - mcp-servers/ru-marketplace-mcp/scripts/check_coverage_floor.py
- [[_measured_coverage()]] - code - mcp-servers/ru-marketplace-mcp/scripts/check_coverage_floor.py
- [[check_coverage_floor.py]] - code - mcp-servers/ru-marketplace-mcp/scripts/check_coverage_floor.py
- [[main()_32]] - code - mcp-servers/ru-marketplace-mcp/scripts/check_coverage_floor.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/check_coverage_floorpy
SORT file.name ASC
```

## Connections to other communities
- 3 edges to [[_COMMUNITY_json]]
- 1 edge to [[_COMMUNITY_pathlib]]

## Top bridge nodes
- [[check_coverage_floor.py]] - degree 8, connects to 2 communities
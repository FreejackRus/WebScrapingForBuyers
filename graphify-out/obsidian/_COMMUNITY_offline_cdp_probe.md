---
type: community
cohesion: 0.50
members: 4
---

# offline_cdp_probe

**Cohesion:** 0.50 - moderately connected
**Members:** 4 nodes

## Members
- [[Even successful doctor runs must not depend on a local Chrome session.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_cli.py
- [[fake_probe()]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_cli.py
- [[fixture_24]] - code
- [[offline_cdp_probe()]] - code - mcp-servers/ru-marketplace-mcp/packages/marketplace-connector/tests/test_cli.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/offline_cdp_probe
SORT file.name ASC
```

## Connections to other communities
- 1 edge to [[_COMMUNITY_test_cli.py]]

## Top bridge nodes
- [[offline_cdp_probe()]] - degree 4, connects to 1 community
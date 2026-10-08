---
type: community
cohesion: 0.13
members: 15
---

# Architecture

**Cohesion:** 0.13 - loosely connected
**Members:** 15 nodes

## Members
- [[Adding a marketplace_2]] - document - mcp-servers/ru-marketplace-mcp/docs/ARCHITECTURE.md
- [[Architecture_1]] - document - mcp-servers/ru-marketplace-mcp/docs/ARCHITECTURE.md
- [[Connector anatomy]] - document - mcp-servers/ru-marketplace-mcp/docs/ARCHITECTURE.md
- [[Cross-cutting rules]] - document - mcp-servers/ru-marketplace-mcp/docs/ARCHITECTURE.md
- [[Input validation over escaping]] - document - mcp-servers/ru-marketplace-mcp/docs/ARCHITECTURE.md
- [[Layout]] - document - mcp-servers/ru-marketplace-mcp/docs/ARCHITECTURE.md
- [[Selfchecks are tri-state]] - document - mcp-servers/ru-marketplace-mcp/docs/ARCHITECTURE.md
- [[Testing]] - document - mcp-servers/ru-marketplace-mcp/docs/ARCHITECTURE.md
- [[The shared runtime]] - document - mcp-servers/ru-marketplace-mcp/docs/ARCHITECTURE.md
- [[Untrusted output]] - document - mcp-servers/ru-marketplace-mcp/docs/ARCHITECTURE.md
- [[`cache` — in-process TTL]] - document - mcp-servers/ru-marketplace-mcp/docs/ARCHITECTURE.md
- [[`errors` — one taxonomy, nine codes]] - document - mcp-servers/ru-marketplace-mcp/docs/ARCHITECTURE.md
- [[`process` — cross-platform worker handling]] - document - mcp-servers/ru-marketplace-mcp/docs/ARCHITECTURE.md
- [[`transport` — two tiers]] - document - mcp-servers/ru-marketplace-mcp/docs/ARCHITECTURE.md
- [[stdout belongs to JSON-RPC]] - document - mcp-servers/ru-marketplace-mcp/docs/ARCHITECTURE.md

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Architecture
SORT file.name ASC
```

## Connections to other communities
- 1 edge to [[_COMMUNITY_process.py]]
- 1 edge to [[_COMMUNITY_log_event]]
- 1 edge to [[_COMMUNITY_compare_prices]]
- 1 edge to [[_COMMUNITY_avito_connectorserver.py]]
- 1 edge to [[_COMMUNITY_mcp-coreteststest_browser_handoff.py]]
- 1 edge to [[_COMMUNITY_coerce_price]]
- 1 edge to [[_COMMUNITY_ru-marketplace-mcpREADME]]

## Top bridge nodes
- [[Architecture_1]] - degree 7, connects to 1 community
- [[The shared runtime]] - degree 6, connects to 1 community
- [[`errors` — one taxonomy, nine codes]] - degree 2, connects to 1 community
- [[`process` — cross-platform worker handling]] - degree 2, connects to 1 community
- [[Selfchecks are tri-state]] - degree 2, connects to 1 community
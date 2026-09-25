---
type: community
cohesion: 0.13
members: 15
---

# Architecture

**Cohesion:** 0.13 - loosely connected
**Members:** 15 nodes

## Members
- [[Adding a marketplace]] - document - mcp-servers/ru-marketplace-mcp/docs/ARCHITECTURE.md
- [[Architecture]] - document - mcp-servers/ru-marketplace-mcp/docs/ARCHITECTURE.md
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
- [[`resilience` — tolerant readers]] - document - mcp-servers/ru-marketplace-mcp/docs/ARCHITECTURE.md
- [[`transport` — two tiers]] - document - mcp-servers/ru-marketplace-mcp/docs/ARCHITECTURE.md
- [[stdout belongs to JSON-RPC]] - document - mcp-servers/ru-marketplace-mcp/docs/ARCHITECTURE.md

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Architecture
SORT file.name ASC
```

## Connections to other communities
- 2 edges to [[_COMMUNITY_coerce_price]]
- 1 edge to [[_COMMUNITY_success]]
- 1 edge to [[_COMMUNITY_log_event]]
- 1 edge to [[_COMMUNITY_compare_prices]]
- 1 edge to [[_COMMUNITY_TransportDownError]]
- 1 edge to [[_COMMUNITY_shape_signature]]
- 1 edge to [[_COMMUNITY_ru-marketplace-mcpREADME]]
- 1 edge to [[_COMMUNITY_terminate_process_tree]]

## Top bridge nodes
- [[`resilience` — tolerant readers]] - degree 4, connects to 2 communities
- [[Architecture]] - degree 7, connects to 1 community
- [[The shared runtime]] - degree 6, connects to 1 community
- [[`errors` — one taxonomy, nine codes]] - degree 2, connects to 1 community
- [[Selfchecks are tri-state]] - degree 2, connects to 1 community
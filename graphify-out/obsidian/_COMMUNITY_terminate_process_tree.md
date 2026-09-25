---
type: community
cohesion: 0.13
members: 17
---

# terminate_process_tree

**Cohesion:** 0.13 - loosely connected
**Members:** 17 nodes

## Members
- [[Absolute path to ``taskkill.exe`` (never resolved through ``PATH``).]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/process.py
- [[Absolute path to the Windows system directory. Resolved via…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/process.py
- [[Fixed_22]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md
- [[Kill ``proc`` and any children it spawned, then close its pipes. Best-effort by…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/process.py
- [[Minimal environment for ``taskkill`` itself.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/process.py
- [[Not included, and why]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md
- [[Popen_1]] - code
- [[PureWindowsPath]] - code
- [[Removed]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md
- [[SIGKILL the process group led by ``pid``. POSIX only. ``os.killpg``,…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/process.py
- [[1.0.0 — 2026-07-26]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md
- [[`process` — cross-platform worker handling]] - document - mcp-servers/ru-marketplace-mcp/docs/ARCHITECTURE.md
- [[kill_process_group()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/process.py
- [[taskkill_cmd()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/process.py
- [[taskkill_env()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/process.py
- [[terminate_process_tree()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/process.py
- [[windows_system_dir()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/process.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/terminate_process_tree
SORT file.name ASC
```

## Connections to other communities
- 7 edges to [[_COMMUNITY_ozon_connectorserver.py]]
- 2 edges to [[_COMMUNITY_detmir_categories]]
- 1 edge to [[_COMMUNITY_Changelog]]
- 1 edge to [[_COMMUNITY_Architecture]]

## Top bridge nodes
- [[1.0.0 — 2026-07-26]] - degree 5, connects to 2 communities
- [[terminate_process_tree()]] - degree 9, connects to 1 community
- [[kill_process_group()]] - degree 5, connects to 1 community
- [[windows_system_dir()]] - degree 5, connects to 1 community
- [[taskkill_cmd()]] - degree 4, connects to 1 community
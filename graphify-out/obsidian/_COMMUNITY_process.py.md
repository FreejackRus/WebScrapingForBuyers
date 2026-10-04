---
type: community
members: 28
---

# process.py

**Members:** 28 nodes

## Members
- [[Absolute path to ``taskkill.exe`` (never resolved through ``PATH``).]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/process.py
- [[Absolute path to the Windows system directory. Resolved via…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/process.py
- [[Any_13]] - code
- [[Build a minimal environment for a worker process. Windows environment keys are…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/process.py
- [[Cross-platform helpers for spawning and reaping short-lived worker processes.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/process.py
- [[Fixed_10]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md
- [[Kill ``proc`` and any children it spawned, then close its pipes. Best-effort by…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/process.py
- [[Minimal environment for ``taskkill`` itself.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/process.py
- [[Not included, and why]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md
- [[Popen]] - code
- [[Popen kwargs that isolate a child so it can be killed as a unit. Windows a new…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/process.py
- [[PureWindowsPath]] - code
- [[Removed_1]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md
- [[Return ``nt`` or ``posix``, honouring the test override.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/process.py
- [[SIGKILL the process group led by ``pid``. POSIX only. ``os.killpg``,…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/process.py
- [[1.0.0 — 2026-07-26]] - document - mcp-servers/ru-marketplace-mcp/CHANGELOG.md
- [[`process` — cross-platform worker handling]] - document - mcp-servers/ru-marketplace-mcp/docs/ARCHITECTURE.md
- [[current_platform()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/process.py
- [[is_windows()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/process.py
- [[kill_process_group()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/process.py
- [[process.py]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/process.py
- [[safe_child_env()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/process.py
- [[signal]] - concept
- [[taskkill_cmd()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/process.py
- [[taskkill_env()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/process.py
- [[terminate_process_tree()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/process.py
- [[windows_system_dir()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/process.py
- [[worker_process_kwargs()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/process.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/processpy
SORT file.name ASC
```

## Connections to other communities
- 4 edges to [[_COMMUNITY_ozon_connectorserver.py]]
- 2 edges to [[_COMMUNITY_detmir_connectorserver.py]]
- 1 edge to [[_COMMUNITY_Changelog]]
- 1 edge to [[_COMMUNITY_os]]
- 1 edge to [[_COMMUNITY_subprocess]]
- 1 edge to [[_COMMUNITY_pathlib]]
- 1 edge to [[_COMMUNITY_avito_connectorserver.py]]
- 1 edge to [[_COMMUNITY_Architecture]]
- 1 edge to [[_COMMUNITY_StdioProbe]]

## Top bridge nodes
- [[process.py]] - degree 16, connects to 5 communities
- [[1.0.0 — 2026-07-26]] - degree 5, connects to 2 communities
- [[terminate_process_tree()]] - degree 9, connects to 1 community
- [[worker_process_kwargs()]] - degree 5, connects to 1 community
- [[safe_child_env()]] - degree 4, connects to 1 community
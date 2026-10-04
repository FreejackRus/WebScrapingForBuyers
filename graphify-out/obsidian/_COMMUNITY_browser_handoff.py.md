---
type: community
members: 39
---

# browser_handoff.py

**Members:** 39 nodes

## Members
- [[dot-__init__()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/browser_handoff.py
- [[0. Что проект уже делает (baseline, не изобретаем заново)]] - document - mcp-servers/ru-marketplace-mcp/work/v23-research/external-approaches.md
- [[A stable fingerprint of one read, so nothing has to be retained to compare.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/browser_handoff.py
- [[An owned tab is already being read, or the bounded registry is full. R3 the…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/browser_handoff.py
- [[Any_2]] - code
- [[Bounded, process-local ownership of browser challenge tabs. No browser storage…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/browser_handoff.py
- [[Capture a retained page in this session; never open or navigate a tab.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/browser_handoff.py
- [[Challenge]] - code
- [[Collection]] - code
- [[Drop a retained page that nobody touched for this long. Clamped to the…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/browser_handoff.py
- [[HandoffBusyError]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/browser_handoff.py
- [[Lifetime of a retained page, in seconds (0 = retention off).]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/browser_handoff.py
- [[Lifetime or idle bound reached — either one ends the retention. Two clocks,…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/browser_handoff.py
- [[Read]] - code
- [[Read once, or resume the exact same session's owned challenge tab. Retention…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/browser_handoff.py
- [[Read-only view of the lease registry — never opens, resumes or closes a tab.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/browser_handoff.py
- [[Release all owned tabs during graceful server shutdown.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/browser_handoff.py
- [[Result]] - code
- [[Return an opaque handle only for this exact live operation's lease. Liveness is…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/browser_handoff.py
- [[Say what changed on this call — the question a resumed read should answer.…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/browser_handoff.py
- [[_Lease]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/browser_handoff.py
- [[_Request]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/browser_handoff.py
- [[_duration_s()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/browser_handoff.py
- [[_env_seconds()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/browser_handoff.py
- [[_expired()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/browser_handoff.py
- [[_idle_s()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/browser_handoff.py
- [[_key()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/browser_handoff.py
- [[_max_leases()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/browser_handoff.py
- [[_payload_digest()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/browser_handoff.py
- [[_resume_note()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/browser_handoff.py
- [[_resume_summary()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/browser_handoff.py
- [[_run()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/browser_handoff.py
- [[_stop()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/browser_handoff.py
- [[browser_handoff.py]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/browser_handoff.py
- [[close_handoffs()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/browser_handoff.py
- [[get_handoff_id()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/browser_handoff.py
- [[handoff_diagnostics()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/browser_handoff.py
- [[read_with_handoff()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/browser_handoff.py
- [[snapshot_handoff()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/browser_handoff.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/browser_handoffpy
SORT file.name ASC
```

## Connections to other communities
- 8 edges to [[_COMMUNITY_TransportDownError]]
- 6 edges to [[_COMMUNITY_PageLike]]
- 5 edges to [[_COMMUNITY_taobao_connectorserver.py]]
- 3 edges to [[_COMMUNITY_lamoda_connectorserver.py]]
- 3 edges to [[_COMMUNITY_open_page]]
- 2 edges to [[_COMMUNITY_pathlib]]
- 2 edges to [[_COMMUNITY_avito_connectorserver.py]]
- 2 edges to [[_COMMUNITY_transport__init__.py]]
- 1 edge to [[_COMMUNITY_compare_verify_offer]]
- 1 edge to [[_COMMUNITY_goto]]
- 1 edge to [[_COMMUNITY_math]]
- 1 edge to [[_COMMUNITY_os]]
- 1 edge to [[_COMMUNITY_sys]]
- 1 edge to [[_COMMUNITY_StdioProbe]]
- 1 edge to [[_COMMUNITY_asyncio]]
- 1 edge to [[_COMMUNITY_ozon-connectorteststest_server.py]]
- 1 edge to [[_COMMUNITY_urllib_parse]]
- 1 edge to [[_COMMUNITY_chrome_cdp.py]]

## Top bridge nodes
- [[browser_handoff.py]] - degree 42, connects to 15 communities
- [[read_with_handoff()]] - degree 21, connects to 4 communities
- [[_run()]] - degree 10, connects to 3 communities
- [[snapshot_handoff()]] - degree 9, connects to 2 communities
- [[get_handoff_id()]] - degree 6, connects to 2 communities
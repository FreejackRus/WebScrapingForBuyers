---
type: community
cohesion: 0.09
members: 29
---

# NavigationBudget

**Cohesion:** 0.09 - loosely connected
**Members:** 29 nodes

## Members
- [[dot-_host_semaphore()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/cdp_budget.py
- [[dot-_note_refusal()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/cdp_budget.py
- [[dot-_note_success()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/cdp_budget.py
- [[dot-_release()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/cdp_budget.py
- [[dot-_state()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/cdp_budget.py
- [[dot-acquire()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/cdp_budget.py
- [[dot-check()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/cdp_budget.py
- [[dot-neutral()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/cdp_budget.py
- [[dot-ok()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/cdp_budget.py
- [[dot-refused()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/cdp_budget.py
- [[dot-release()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/cdp_budget.py
- [[dot-reset()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/cdp_budget.py
- [[dot-slot()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/cdp_budget.py
- [[dot-snapshot()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/cdp_budget.py
- [[Forget every host's history. For tests and a deliberate session change.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/cdp_budget.py
- [[Give the slot back. Idempotent, and separate from the outcome. The permit…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/cdp_budget.py
- [[Global + per-host bounds for CDP navigations, with a refusal breaker. One…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/cdp_budget.py
- [[NavigationBudget]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/cdp_budget.py
- [[One navigation permit. Report the outcome so the breaker can learn.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/cdp_budget.py
- [[Permit held for the whole ``async with`` block. Convenience for callers whose…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/cdp_budget.py
- [[Raise when this host's breaker is open and still cooling down.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/cdp_budget.py
- [[Read-only view of the budget — no tab is opened to answer this.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/cdp_budget.py
- [[Semaphore_1]] - code
- [[Slot]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/cdp_budget.py
- [[Take one navigation permit for ``host``. Order matters the breaker is checked…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/cdp_budget.py
- [[The navigation ended for a reason that is neither success nor refusal. Our own…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/cdp_budget.py
- [[The navigation produced a usable page forget this host's refusals.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/cdp_budget.py
- [[The navigation was refused (4xx5xxblockauth) as reported by the caller. A…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/cdp_budget.py
- [[_HostState]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/transport/cdp_budget.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/NavigationBudget
SORT file.name ASC
```

## Connections to other communities
- 11 edges to [[_COMMUNITY_test_cdp_budget.py]]
- 6 edges to [[_COMMUNITY_transport__init__.py]]
- 3 edges to [[_COMMUNITY_Tracker]]

## Top bridge nodes
- [[NavigationBudget]] - degree 28, connects to 3 communities
- [[Slot]] - degree 8, connects to 1 community
- [[dot-check()]] - degree 4, connects to 1 community
- [[_HostState]] - degree 2, connects to 1 community
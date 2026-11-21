---
type: community
cohesion: 0.25
members: 9
---

# UpstreamTimeoutError

**Cohesion:** 0.25 - loosely connected
**Members:** 9 nodes

## Members
- [[UpstreamTimeoutError]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/errors.py
- [[capture_timeout()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[pending()_2]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[put_at_deadline()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[put_at_deadline()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[record()_3]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[test_deadline_cancels_extractor_and_closes()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[test_idle_expiry_settles_retry_queued_before_getter_resumes()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[test_termination_settles_queued_snapshot_before_getter_resumes()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/UpstreamTimeoutError
SORT file.name ASC
```

## Connections to other communities
- 6 edges to [[_COMMUNITY_mcp-coreteststest_browser_handoff.py]]
- 4 edges to [[_COMMUNITY_TransportDownError]]
- 4 edges to [[_COMMUNITY_parametrize_1]]
- 2 edges to [[_COMMUNITY_browser_handoff.py]]
- 1 edge to [[_COMMUNITY_test_snapshot_and_resume_cannot_overlap]]

## Top bridge nodes
- [[UpstreamTimeoutError]] - degree 10, connects to 3 communities
- [[test_termination_settles_queued_snapshot_before_getter_resumes()]] - degree 9, connects to 2 communities
- [[test_deadline_cancels_extractor_and_closes()]] - degree 5, connects to 2 communities
- [[test_idle_expiry_settles_retry_queued_before_getter_resumes()]] - degree 5, connects to 1 community
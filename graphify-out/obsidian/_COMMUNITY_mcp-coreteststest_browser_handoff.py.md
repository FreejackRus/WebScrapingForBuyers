---
type: community
cohesion: 0.09
members: 38
---

# mcp-core/tests/test_browser_handoff.py

**Cohesion:** 0.09 - loosely connected
**Members:** 38 nodes

## Members
- [[Ownership, bounded recovery and cancellation checks without real browser data.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[The lifetime cap moved 300 s - 900 s with R2 (2026-09-18). R2 aligns the…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[The registry is bounded, and a full registry refuses rather than evicts. The…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[__call__()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[blocked()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[call()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[delayed_stop()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[fail()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[gc]] - concept
- [[mcp-coreteststest_browser_handoff.py]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[navigate()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[parametrize_26]] - code
- [[pending()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[pending()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[pending()_2]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[read()_2]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[test_busy_initial_and_resume_never_open_duplicate()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[test_caller_cancellation_cleans_worker_and_owned_page()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[test_capacity_does_not_evict_an_existing_handoff()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[test_challenge_worker_does_not_hold_caller_closure_or_payload()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[test_deadline_cancels_extractor_and_closes()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[test_disabled_or_invalid_duration_preserves_short_lifecycle()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[test_duration_has_hard_fifteen_minute_cap()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[test_expired_retry_cleanup_cannot_create_two_replacements()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[test_extractor_failure_releases_retained_page()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[test_missing_scope_and_headless_disable_retention()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[test_moved_page_is_closed_before_new_extraction()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[test_new_policy_checked_on_resume_and_navigation_during_read_rejected()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[test_other_endpoint_or_profile_never_adopts_retained_page()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[test_other_session_operation_or_query_never_adopts_retained_page()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[test_pending_lookup_includes_busy_expired_lease_without_mutation()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[test_prestart_cancellation_releases_registry_and_pending_caller()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[test_raw_current_url_refreshes_cached_navigation_without_dom_evaluation()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[test_raw_reveal_restores_only_owned_window()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[test_retention_expires_and_closes_without_a_retry()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[test_reveal_failure_is_honest_and_nonfatal()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[test_shutdown_releases_all_pages()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[weakref]] - concept

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/mcp-core/tests/test_browser_handoffpy
SORT file.name ASC
```

## Connections to other communities
- 20 edges to [[_COMMUNITY_test_termination_settles_queued_snapshot_before_getter_resumes]]
- 10 edges to [[_COMMUNITY_success]]
- 4 edges to [[_COMMUNITY_pytest]]
- 3 edges to [[_COMMUNITY_json]]
- 1 edge to [[_COMMUNITY_browser]]
- 1 edge to [[_COMMUNITY_transport__init__.py]]

## Top bridge nodes
- [[mcp-coreteststest_browser_handoff.py]] - degree 47, connects to 6 communities
- [[call()_1]] - degree 29, connects to 2 communities
- [[parametrize_26]] - degree 8, connects to 1 community
- [[test_deadline_cancels_extractor_and_closes()]] - degree 5, connects to 1 community
- [[test_capacity_does_not_evict_an_existing_handoff()]] - degree 4, connects to 1 community
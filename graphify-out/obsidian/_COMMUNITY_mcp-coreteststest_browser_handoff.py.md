---
type: community
cohesion: 0.07
members: 53
---

# mcp-core/tests/test_browser_handoff.py

**Cohesion:** 0.07 - loosely connected
**Members:** 53 nodes

## Members
- [[Ownership, bounded recovery and cancellation checks without real browser data.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[The lifetime cap moved 300 s - 900 s with R2 (2026-09-18). R2 aligns the…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[The registry is bounded, and a full registry refuses rather than evicts. The…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[__call__()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[blocked()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[browser()_2]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[call()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[capture()_17]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[capture()_18]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[delayed_close()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[delayed_close()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[delayed_stop()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[fail()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[fixture_24]] - code
- [[gc]] - concept
- [[mcp-coreteststest_browser_handoff.py]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[navigate()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[open_page()_4]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[parametrize_29]] - code
- [[pending()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[pending()_2]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[read()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[snapshot_id()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[success()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[test_busy_initial_and_resume_never_open_duplicate()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[test_caller_cancellation_cleans_worker_and_owned_page()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[test_cancel_during_success_cleanup_waits_for_exact_owned_close()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[test_capacity_does_not_evict_an_existing_handoff()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[test_challenge_resumes_exact_page_with_new_read_and_immutable_expiry()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[test_challenge_worker_does_not_hold_caller_closure_or_payload()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[test_disabled_or_invalid_duration_preserves_short_lifecycle()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[test_duration_has_hard_fifteen_minute_cap()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[test_expired_retry_cleanup_cannot_create_two_replacements()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[test_extractor_failure_releases_retained_page()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[test_hide_guard_is_active_only_for_owned_workers()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
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
- [[test_second_caller_cancellation_keeps_lease_until_worker_closes()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[test_shutdown_releases_all_pages()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[test_snapshot_and_resume_cannot_overlap()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[test_snapshot_keeps_exact_lease_deadline_page_and_returns_sanitized_origin()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[test_snapshot_rechecks_original_host_policy_before_and_after_capture()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[test_unavailable_snapshot_never_opens_or_captures()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py
- [[weakref]] - concept

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/mcp-core/tests/test_browser_handoffpy
SORT file.name ASC
```

## Connections to other communities
- 14 edges to [[_COMMUNITY_UpstreamTimeoutError]]
- 3 edges to [[_COMMUNITY_json]]
- 2 edges to [[_COMMUNITY_coerce_price]]
- 2 edges to [[_COMMUNITY_Живая проверка источников]]
- 2 edges to [[_COMMUNITY_Чек-лист выпуска релиза]]
- 2 edges to [[_COMMUNITY_ozon_selfcheck]]
- 2 edges to [[_COMMUNITY_English version]]
- 2 edges to [[_COMMUNITY_pytest]]
- 1 edge to [[_COMMUNITY_wb_connectorserver.py]]
- 1 edge to [[_COMMUNITY_Anti-bot reality, source by source]]
- 1 edge to [[_COMMUNITY_Architecture]]
- 1 edge to [[_COMMUNITY_Authenticated transport driving your own Chrome]]
- 1 edge to [[_COMMUNITY_decision_inspect]]
- 1 edge to [[_COMMUNITY_v1.3.0 — MPStats и разбор аудита]]
- 1 edge to [[_COMMUNITY_ru-marketplace-mcp]]
- 1 edge to [[_COMMUNITY_compare_prices]]
- 1 edge to [[_COMMUNITY_transport__init__.py]]
- 1 edge to [[_COMMUNITY_test_card_verification_records.py]]

## Top bridge nodes
- [[success()]] - degree 25, connects to 12 communities
- [[mcp-coreteststest_browser_handoff.py]] - degree 47, connects to 5 communities
- [[call()]] - degree 29, connects to 1 community
- [[parametrize_29]] - degree 8, connects to 1 community
- [[snapshot_id()]] - degree 7, connects to 1 community
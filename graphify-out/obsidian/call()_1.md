---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_browser_handoff.py"
type: "code"
community: "mcp-core/tests/test_browser_handoff.py"
location: "L53"
tags:
  - graphify/code
  - graphify/EXTRACTED
  - community/mcp-core/tests/test_browser_handoffpy
---

# call()

## Connections
- [[blocked()_1]] - `indirect_call` [INFERRED]
- [[mcp-coreteststest_browser_handoff.py]] - `contains` [EXTRACTED]
- [[test_busy_initial_and_resume_never_open_duplicate()]] - `calls` [EXTRACTED]
- [[test_caller_cancellation_cleans_worker_and_owned_page()]] - `calls` [EXTRACTED]
- [[test_cancel_during_success_cleanup_waits_for_exact_owned_close()]] - `calls` [EXTRACTED]
- [[test_capacity_does_not_evict_an_existing_handoff()]] - `calls` [EXTRACTED]
- [[test_challenge_resumes_exact_page_with_new_read_and_immutable_expiry()]] - `calls` [EXTRACTED]
- [[test_challenge_worker_does_not_hold_caller_closure_or_payload()]] - `calls` [EXTRACTED]
- [[test_deadline_cancels_extractor_and_closes()]] - `calls` [EXTRACTED]
- [[test_disabled_or_invalid_duration_preserves_short_lifecycle()]] - `calls` [EXTRACTED]
- [[test_expired_retry_cleanup_cannot_create_two_replacements()]] - `calls` [EXTRACTED]
- [[test_extractor_failure_releases_retained_page()]] - `calls` [EXTRACTED]
- [[test_hide_guard_is_active_only_for_owned_workers()]] - `calls` [EXTRACTED]
- [[test_idle_expiry_settles_retry_queued_before_getter_resumes()]] - `calls` [EXTRACTED]
- [[test_missing_scope_and_headless_disable_retention()]] - `calls` [EXTRACTED]
- [[test_moved_page_is_closed_before_new_extraction()]] - `calls` [EXTRACTED]
- [[test_new_policy_checked_on_resume_and_navigation_during_read_rejected()]] - `calls` [EXTRACTED]
- [[test_other_endpoint_or_profile_never_adopts_retained_page()]] - `calls` [EXTRACTED]
- [[test_other_session_operation_or_query_never_adopts_retained_page()]] - `calls` [EXTRACTED]
- [[test_pending_lookup_includes_busy_expired_lease_without_mutation()]] - `calls` [EXTRACTED]
- [[test_retention_expires_and_closes_without_a_retry()]] - `calls` [EXTRACTED]
- [[test_second_caller_cancellation_keeps_lease_until_worker_closes()]] - `calls` [EXTRACTED]
- [[test_shutdown_releases_all_pages()]] - `calls` [EXTRACTED]
- [[test_snapshot_and_resume_cannot_overlap()]] - `calls` [EXTRACTED]
- [[test_snapshot_cancellation_or_deadline_cleans_exact_page()]] - `calls` [EXTRACTED]
- [[test_snapshot_keeps_exact_lease_deadline_page_and_returns_sanitized_origin()]] - `calls` [EXTRACTED]
- [[test_snapshot_rechecks_original_host_policy_before_and_after_capture()]] - `calls` [EXTRACTED]
- [[test_termination_settles_queued_snapshot_before_getter_resumes()]] - `calls` [EXTRACTED]
- [[test_unavailable_snapshot_never_opens_or_captures()]] - `calls` [EXTRACTED]

#graphify/code #graphify/EXTRACTED #community/mcp-core/tests/test_browser_handoffpy
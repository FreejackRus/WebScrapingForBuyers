---
type: community
cohesion: 0.09
members: 38
---

# test_redact.py

**Cohesion:** 0.09 - loosely connected
**Members:** 38 nodes

## Members
- [[A '' in the password terminates the RFC authority, so a regex that stops at…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_redact.py
- [[A connect error can quote the URL cut off at the host the credential must not…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_redact.py
- [[A connection failure can truncate the URL at the host, leaving the whole…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_redact.py
- [[A cookie-shaped regex that also eats normal words would hide real errors.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_redact.py
- [[No '' in the userinfo — a bare username is not a credential.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_redact.py
- [[No '' means no credential; stripping it would mangle a valid URL.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_redact.py
- [[Scrubbing must not eat the part that says what went wrong.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_redact.py
- [[Tests for the secret-scrubbing helpers. Redaction is the last thing standing…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_redact.py
- [[The MPStats connector holds the only secret this project ever sees — a live…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_redact.py
- [[The userinfo rule is anchored to  so ordinary text stays readable.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_redact.py
- [[The userinfo shape is userpass — it contains ''. A path-embedded '@' without…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_redact.py
- [[_strip_userinfo()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/redact.py
- [[hostportpath@ — the part between the first '' and the '' is a numeric port,…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_redact.py
- [[parametrize_16]] - code
- [[redact_error_text()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/redact.py
- [[redact_url()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/redact.py
- [[test_a_bare_username_before_at_is_left_alone()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_redact.py
- [[test_a_bare_username_without_a_password_is_left_alone()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_redact.py
- [[test_a_path_capped_with_at_is_not_mistaken_for_a_credential()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_redact.py
- [[test_a_plain_url_is_left_alone()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_redact.py
- [[test_a_truncated_credential_without_a_slash_is_redacted_too()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_redact.py
- [[test_a_truncated_proxy_url_with_a_slash_password_is_still_redacted()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_redact.py
- [[test_a_truncated_url_still_loses_its_password()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_redact.py
- [[test_an_at_in_the_path_is_not_mistaken_for_userinfo()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_redact.py
- [[test_an_email_in_prose_is_not_mangled()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_redact.py
- [[test_empty_input_is_safe()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_redact.py
- [[test_known_secret_shapes_are_scrubbed()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_redact.py
- [[test_ordinary_text_survives_untouched()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_redact.py
- [[test_output_is_capped()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_redact.py
- [[test_proxy_password_with_a_second_at_is_fully_stripped()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_redact.py
- [[test_proxy_password_with_a_slash_is_fully_stripped()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_redact.py
- [[test_proxy_userinfo_never_survives_redaction()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_redact.py
- [[test_redact.py]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_redact.py
- [[test_redact_url_strips_userinfo_too()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_redact.py
- [[test_redact_url_survives_exotic_userinfo_too()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_redact.py
- [[test_redaction_keeps_the_diagnosis_readable()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_redact.py
- [[test_redaction_keeps_the_host_so_the_error_stays_useful()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_redact.py
- [[test_session_cookies_and_jwts_are_scrubbed()]] - code - mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_redact.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/test_redactpy
SORT file.name ASC
```

## Connections to other communities
- 5 edges to [[_COMMUNITY_json]]
- 1 edge to [[_COMMUNITY_pytest]]

## Top bridge nodes
- [[test_redact.py]] - degree 24, connects to 2 communities
- [[redact_error_text()]] - degree 20, connects to 1 community
- [[redact_url()]] - degree 7, connects to 1 community
- [[_strip_userinfo()]] - degree 3, connects to 1 community
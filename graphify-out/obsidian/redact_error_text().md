---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/src/mcp_core/redact.py"
type: "code"
community: "test_redact.py"
location: "L59"
tags:
  - graphify/code
  - graphify/EXTRACTED
  - community/test_redactpy
---

# redact_error_text()

## Connections
- [[_strip_userinfo()]] - `calls` [EXTRACTED]
- [[mcp_core__init__.py]] - `imports` [EXTRACTED]
- [[redact.py]] - `contains` [EXTRACTED]
- [[test_a_bare_username_before_at_is_left_alone()]] - `calls` [EXTRACTED]
- [[test_a_path_capped_with_at_is_not_mistaken_for_a_credential()]] - `calls` [EXTRACTED]
- [[test_a_truncated_credential_without_a_slash_is_redacted_too()]] - `calls` [EXTRACTED]
- [[test_a_truncated_proxy_url_with_a_slash_password_is_still_redacted()]] - `calls` [EXTRACTED]
- [[test_a_truncated_url_still_loses_its_password()]] - `calls` [EXTRACTED]
- [[test_an_at_in_the_path_is_not_mistaken_for_userinfo()]] - `calls` [EXTRACTED]
- [[test_an_email_in_prose_is_not_mangled()]] - `calls` [EXTRACTED]
- [[test_empty_input_is_safe()]] - `calls` [EXTRACTED]
- [[test_known_secret_shapes_are_scrubbed()]] - `calls` [EXTRACTED]
- [[test_ordinary_text_survives_untouched()]] - `calls` [EXTRACTED]
- [[test_output_is_capped()]] - `calls` [EXTRACTED]
- [[test_proxy_password_with_a_second_at_is_fully_stripped()]] - `calls` [EXTRACTED]
- [[test_proxy_password_with_a_slash_is_fully_stripped()]] - `calls` [EXTRACTED]
- [[test_proxy_userinfo_never_survives_redaction()]] - `calls` [EXTRACTED]
- [[test_redaction_keeps_the_diagnosis_readable()]] - `calls` [EXTRACTED]
- [[test_redaction_keeps_the_host_so_the_error_stays_useful()]] - `calls` [EXTRACTED]
- [[test_session_cookies_and_jwts_are_scrubbed()]] - `calls` [EXTRACTED]

#graphify/code #graphify/EXTRACTED #community/test_redactpy
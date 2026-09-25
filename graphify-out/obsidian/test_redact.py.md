---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mcp-core/tests/test_redact.py"
type: "code"
community: "test_redact.py"
location: "L1"
tags:
  - graphify/code
  - graphify/EXTRACTED
  - community/test_redactpy
---

# test_redact.py

## Connections
- [[Tests for the secret-scrubbing helpers. Redaction is the last thing standing…]] - `rationale_for` [EXTRACTED]
- [[pytest]] - `imports` [EXTRACTED]
- [[redact.py]] - `imports_from` [EXTRACTED]
- [[test_a_bare_username_before_at_is_left_alone()]] - `contains` [EXTRACTED]
- [[test_a_bare_username_without_a_password_is_left_alone()]] - `contains` [EXTRACTED]
- [[test_a_path_capped_with_at_is_not_mistaken_for_a_credential()]] - `contains` [EXTRACTED]
- [[test_a_plain_url_is_left_alone()]] - `contains` [EXTRACTED]
- [[test_a_truncated_credential_without_a_slash_is_redacted_too()]] - `contains` [EXTRACTED]
- [[test_a_truncated_proxy_url_with_a_slash_password_is_still_redacted()]] - `contains` [EXTRACTED]
- [[test_a_truncated_url_still_loses_its_password()]] - `contains` [EXTRACTED]
- [[test_an_at_in_the_path_is_not_mistaken_for_userinfo()]] - `contains` [EXTRACTED]
- [[test_an_email_in_prose_is_not_mangled()]] - `contains` [EXTRACTED]
- [[test_empty_input_is_safe()]] - `contains` [EXTRACTED]
- [[test_known_secret_shapes_are_scrubbed()]] - `contains` [EXTRACTED]
- [[test_ordinary_text_survives_untouched()]] - `contains` [EXTRACTED]
- [[test_output_is_capped()]] - `contains` [EXTRACTED]
- [[test_proxy_password_with_a_second_at_is_fully_stripped()]] - `contains` [EXTRACTED]
- [[test_proxy_password_with_a_slash_is_fully_stripped()]] - `contains` [EXTRACTED]
- [[test_proxy_userinfo_never_survives_redaction()]] - `contains` [EXTRACTED]
- [[test_redact_url_strips_userinfo_too()]] - `contains` [EXTRACTED]
- [[test_redact_url_survives_exotic_userinfo_too()]] - `contains` [EXTRACTED]
- [[test_redaction_keeps_the_diagnosis_readable()]] - `contains` [EXTRACTED]
- [[test_redaction_keeps_the_host_so_the_error_stays_useful()]] - `contains` [EXTRACTED]
- [[test_session_cookies_and_jwts_are_scrubbed()]] - `contains` [EXTRACTED]

#graphify/code #graphify/EXTRACTED #community/test_redactpy
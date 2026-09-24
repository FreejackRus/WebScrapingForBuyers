---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_call_envelope.py"
type: "code"
community: "payload"
location: "L46"
tags:
  - graphify/code
  - graphify/EXTRACTED
  - community/payload
---

# wire()

## Connections
- [[Point ``_call``'s client at a mock transport, counting the requests made.]] - `rationale_for` [EXTRACTED]
- [[_client()]] - `indirect_call` [INFERRED]
- [[counting()]] - `contains` [EXTRACTED]
- [[test_a_good_call_clears_the_backoff()]] - `calls` [EXTRACTED]
- [[test_a_refusal_lengthens_the_gap()]] - `calls` [EXTRACTED]
- [[test_a_transport_exception_does_not_carry_the_token()]] - `calls` [EXTRACTED]
- [[test_auth_failure_is_not_cached()]] - `calls` [EXTRACTED]
- [[test_call_envelope.py]] - `contains` [EXTRACTED]
- [[test_html_body_reads_as_a_block_not_as_drift()]] - `calls` [EXTRACTED]
- [[test_http_429_is_rate_limited()]] - `calls` [EXTRACTED]
- [[test_inner_200_returns_the_parsed_object()]] - `calls` [EXTRACTED]
- [[test_inner_403_behind_http_200_is_auth_missing()]] - `calls` [EXTRACTED]
- [[test_inner_500_behind_http_200_is_transport_down()]] - `calls` [EXTRACTED]
- [[test_inner_error_is_not_cached()]] - `calls` [EXTRACTED]
- [[test_inner_error_message_redacts_secret_in_tool_error()]] - `calls` [EXTRACTED]
- [[test_json_array_instead_of_object_is_parser_drift()]] - `calls` [EXTRACTED]
- [[test_missing_inner_code_is_accepted()]] - `calls` [EXTRACTED]
- [[test_non_json_body_is_parser_drift()]] - `calls` [EXTRACTED]
- [[test_success_is_cached()]] - `calls` [EXTRACTED]

#graphify/code #graphify/EXTRACTED #community/payload
---
source_file: "mcp-servers/ru-marketplace-mcp/packages/mpstats-connector/tests/test_call_envelope.py"
type: "code"
community: "payload"
location: "L73"
tags:
  - graphify/code
  - graphify/INFERRED
  - community/payload
---

# handler()

## Connections
- [[counting()]] - `calls` [EXTRACTED]
- [[test_a_good_call_clears_the_backoff()]] - `indirect_call` [INFERRED]
- [[test_a_refusal_lengthens_the_gap()]] - `indirect_call` [INFERRED]
- [[test_a_transport_exception_does_not_carry_the_token()]] - `indirect_call` [INFERRED]
- [[test_auth_failure_is_not_cached()]] - `indirect_call` [INFERRED]
- [[test_html_body_reads_as_a_block_not_as_drift()]] - `indirect_call` [INFERRED]
- [[test_http_429_is_rate_limited()]] - `indirect_call` [INFERRED]
- [[test_inner_200_returns_the_parsed_object()]] - `indirect_call` [INFERRED]
- [[test_inner_403_behind_http_200_is_auth_missing()]] - `indirect_call` [INFERRED]
- [[test_inner_500_behind_http_200_is_transport_down()]] - `indirect_call` [INFERRED]
- [[test_inner_error_is_not_cached()]] - `indirect_call` [INFERRED]
- [[test_inner_error_message_redacts_secret_in_tool_error()]] - `indirect_call` [INFERRED]
- [[test_json_array_instead_of_object_is_parser_drift()]] - `indirect_call` [INFERRED]
- [[test_missing_inner_code_is_accepted()]] - `indirect_call` [INFERRED]
- [[test_non_json_body_is_parser_drift()]] - `indirect_call` [INFERRED]
- [[test_success_is_cached()]] - `indirect_call` [INFERRED]

#graphify/code #graphify/INFERRED #community/payload
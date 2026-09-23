---
source_file: "mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_card_verification_records.py"
type: "code"
community: "Community 43"
location: "L27"
tags:
  - graphify/code
  - graphify/INFERRED
  - community/Community_43
---

# card()

## Connections
- [[WbCardItem]] - `calls` [EXTRACTED]
- [[WbCardResponse]] - `calls` [EXTRACTED]
- [[test_ambiguous_or_wrong_record_never_verifies_price()]] - `indirect_call` [INFERRED]
- [[test_detmir_canonical_url_dispatches_requested_id()]] - `indirect_call` [INFERRED]
- [[test_detmir_fixture_product_is_unwrapped_for_price_and_identity()]] - `indirect_call` [INFERRED]
- [[test_invalid_observed_price_stays_unknown()]] - `indirect_call` [INFERRED]
- [[test_mcp_rejects_nonfinite_expected_price_before_querying_source()]] - `indirect_call` [INFERRED]
- [[test_missing_requested_wb_row_does_not_use_another_price()]] - `indirect_call` [INFERRED]
- [[test_ozon_verifies_regular_price_not_card_discount()]] - `indirect_call` [INFERRED]
- [[test_wb_price_and_identity_use_the_same_requested_fixture_row()]] - `indirect_call` [INFERRED]
- [[test_yandex_matching_variant_can_verify_price()]] - `indirect_call` [INFERRED]
- [[test_yandex_variant_mismatch_is_rejected_before_price_delta()]] - `indirect_call` [INFERRED]

#graphify/code #graphify/INFERRED #community/Community_43
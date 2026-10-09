---
source_file: "mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_source_warnings.py"
type: "code"
community: "aliexpress_card"
location: "L90"
tags:
  - graphify/code
  - graphify/INFERRED
  - community/aliexpress_card
---

# test_coupon_warning_keeps_regular_price_and_does_not_claim_failure()

## Connections
- [[AliSearchItemOut]] - `uses` [INFERRED]
- [[AliSearchResponse]] - `uses` [INFERRED]
- [[search()_1]] - `contains` [EXTRACTED]
- [[search()_2]] - `indirect_call` [INFERRED]
- [[test_source_warnings.py]] - `contains` [EXTRACTED]

#graphify/code #graphify/INFERRED #community/aliexpress_card
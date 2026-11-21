---
source_file: "mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_source_warnings.py"
type: "code"
community: "aliexpress_connector/server.py"
location: "L90"
tags:
  - graphify/code
  - graphify/INFERRED
  - community/aliexpress_connector/serverpy
---

# test_coupon_warning_keeps_regular_price_and_does_not_claim_failure()

## Connections
- [[AliSearchItemOut]] - `uses` [INFERRED]
- [[AliSearchResponse]] - `uses` [INFERRED]
- [[search()]] - `contains` [EXTRACTED]
- [[search()_4]] - `indirect_call` [INFERRED]
- [[test_source_warnings.py]] - `contains` [EXTRACTED]

#graphify/code #graphify/INFERRED #community/aliexpress_connector/serverpy
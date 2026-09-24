---
source_file: "mcp-servers/ru-marketplace-mcp/packages/yandex-connector/tests/test_ssr.py"
type: "rationale"
community: "test_number_coercion_never_returns_or_raises_on_non_finite_values"
location: "L421"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/test_number_coercion_never_returns_or_raises_on_non_finite_values
---

# Yandex SSR embeds raw JSON-LD, and json.loads admits NaN/Infinity by default,…

## Connections
- [[test_number_coercion_never_returns_or_raises_on_non_finite_values()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/test_number_coercion_never_returns_or_raises_on_non_finite_values
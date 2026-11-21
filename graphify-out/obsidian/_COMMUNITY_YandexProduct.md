---
type: community
cohesion: 0.29
members: 10
---

# YandexProduct

**Cohesion:** 0.29 - loosely connected
**Members:** 10 nodes

## Members
- [[BaseModel_9]] - code
- [[Full detail for one product, including its rating breakdown and reviews.]] - rationale - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/src/yandex_connector/models_output.py
- [[One Yandex Market product as it appears in search results. A row describes the…]] - rationale - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/src/yandex_connector/models_output.py
- [[YandexCardResponse]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/src/yandex_connector/models_output.py
- [[YandexProduct]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/src/yandex_connector/models_output.py
- [[YandexSearchResponse]] - code - mcp-servers/ru-marketplace-mcp/packages/yandex-connector/src/yandex_connector/models_output.py
- [[search()_7]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_card_verification_records.py
- [[test_yandex_adapter_keeps_the_subscriber_price_out_of_ranking()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py
- [[test_yandex_live_fixture_variant_survives_comparison()]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_card_verification_records.py
- [[yandex_search()_1]] - code - mcp-servers/ru-marketplace-mcp/packages/compare-connector/tests/test_server.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/YandexProduct
SORT file.name ASC
```

## Connections to other communities
- 7 edges to [[_COMMUNITY_json]]
- 4 edges to [[_COMMUNITY_yandex_card]]
- 1 edge to [[_COMMUNITY__FakeResponse_1]]
- 1 edge to [[_COMMUNITY_test_card_verification_records.py]]
- 1 edge to [[_COMMUNITY_compare-connectorteststest_server.py]]

## Top bridge nodes
- [[YandexProduct]] - degree 10, connects to 2 communities
- [[YandexSearchResponse]] - degree 6, connects to 2 communities
- [[YandexCardResponse]] - degree 5, connects to 2 communities
- [[test_yandex_live_fixture_variant_survives_comparison()]] - degree 4, connects to 1 community
- [[BaseModel_9]] - degree 4, connects to 1 community
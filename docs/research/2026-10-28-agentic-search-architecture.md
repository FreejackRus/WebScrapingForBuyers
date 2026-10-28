# Архитектурные приёмы агентных систем поиска и сравнения цен — что взять в Price Radar

Дата: 2026-10-28. Запрос владельца: изучить подобные агентные системы поиска/сравнения/закупок
(не менее 50 источников), выбрать оптимальные для Price Radar решения.

Метод: 18 тематических веб-поисков (≈170 ссылок), выборочное чтение первоисточников
(Rufus, WebMall, Proof-Carrying Numbers, TGN Data), затем сверка каждого приёма с текущим
кодом (`apps/search`, `apps/analysis`). Ниже — 70 источников, на которые опираются выводы.
Маркетинговые обзоры использованы только как перечень практик, цифры из них не переносились.

## 1. Что уже совпадает с лучшими практиками

| Практика в отрасли | Где у нас |
|---|---|
| Детерминированный отбор, LLM только объясняет (Rufus [2], Elastic [64], verification layer [65]) | `procurementRank`, `validateGroundedNarration` |
| Сопоставление сначала по идентификатору (GTIN/MPN), потом по атрибутам [1][6][7] | `offer-assessment.ts` (`identity: "article"`), `catalog-article.ts` |
| Варианты как жёсткие ограничения (цвет, ёмкость, комплект) [6] | `marketplace-relevance.ts`, `consumable-parts.ts`, шаблон артикула `*` |
| Fan-out по источникам с частичными результатами (scatter-gather) [49][52] | SSE в `search-service.ts` |
| Охлаждение источника после блокировки (circuit breaker с half-open пробой) [49] | `BlockedSourceCooldownAdapter` |
| Кэш результата с явным возрастом [53][54] | `searchCacheMs`, поле `cachedAt` |
| Проверка карточки перед выводом (цена/наличие) [23] | `offer-verification.ts` (`PRICE_TOLERANCE`) |
| Ценовые аномалии и история [23] | `price-anomaly.ts`, `price-history.ts` |
| Регулярная оценка качества по эталонным запросам [44] | `quality-eval.ts` |
| Workflow, а не свободный агент, там где шаги известны [63] | диалог: детерминированные интенты → нарратор |

Вывод: каркас верный. Проблемы, видимые на проде, лежат в четырёх местах: сухие ответы
«Сравни», нет группировки предложений по модели, цены сравниваются без учёта комплекта,
и нет внятного «почему источник ничего не нашёл».

## 2. Выбранные приёмы (по убыванию пользы)

### 2.1 Проверка фактов в тексте модели вместо сверки целых предложений — главный выигрыш
Источники: Proof-Carrying Numbers [24], CaLM [26], citation-grounded comprehension [25],
self-verification [27], grounded generation [28], faithfulness scoring [29].

Сейчас `validateGroundedNarration` принимает текст, только если каждое предложение совпадает с
белым списком фраз — ответ модели почти всегда отбраковывается, и менеджер видит шаблон
(«Сравни» → «лучший вариант … Отобрано предложений: 5»). В отрасли делают иначе: текст
свободный, но **каждое число, источник и модель в нём механически сверяются с отобранными
строками**. Предлагаемое правило:
- числа с ₽ — только цены переданных строк или разница/минимум, посчитанные кодом и переданные в промпт;
- названия источников/продавцов — только из переданных строк;
- «в наличии», «новый» — только если у строки это поле подтверждено;
- сроки доставки, гарантии, скидки, которых нет в данных, — отказ;
- провал проверки — как сейчас, детерминированный ответ (fail-closed сохраняется).

Гарантия «LLM не выдумывает цифры» остаётся, а ответ становится связным. Нужно решение
владельца: это меняет политику от 12.10.

### 2.2 Карточка модели: группировка предложений по артикулу
Источники: Яндекс Маркет [37][38][39], Google Shopping Graph [14][15][17], near-duplicate
кластеризация [16], same-product cluster [10], TGN Data [6], Plott [7].

Агрегаторы показывают не 70 строк, а модели × лучшие предложения по каждой. Для нас: после
`assessOffer` строить ключ модели (нормализованный MPN/артикул, иначе бренд+модель); в таблице —
группа «C13T67324A — 6 предложений, от 135 ₽». Особенно нужно для поиска со звёздочкой
(группа = цвет) и для «Сравни» (лучшее в каждой группе). Детерминированно, в
`apps/search/src/domain`; в контракте — новое поле `modelKey` у `Offer`.

### 2.3 Цена за единицу и комплектность
Источники: Ficstar [40], dev.to unit-normalization [42], Apify [41], PromptCloud [43], TGN Data [6].

`procurementRank` штрафует «упаковку» по заголовку, но цену сравнивает как есть: набор из
4 картриджей проигрывает одиночному. Извлекать количество («комплект 4 шт», «x2», «набор
6 цветов») в `quantity`, показывать «за шт.» и сортировать по цене за штуку только при
уверенном распознавании; иначе ничего не менять.

### 2.4 Уточняющий вопрос из статистики кандидатов
Источники: ProductAgent [33][34], AGENT-CQ [35], query understanding in CIS [36], [32].

ProductAgent спрашивает не «что вы имели в виду», а по признаку с наибольшим разбросом среди
найденных кандидатов. Для нас: если отобранные строки делятся на 2–5 моделей (п. 2.2) без
явного лидера — чипы «K380 / K380s / K400» вместо смешанного списка. Без LLM.

### 2.5 Причина «0 найдено» по каждому источнику
Источники: scraper KPI [22], context.dev [21], altune [48], ezchain [49], Apex Logic [20], [19].

Сейчас менеджер видит «Servermall 0», «СРВТрейд fetch failed» — без различия «нет товара» /
«источник не ответил» / «всё отфильтровано». Кодировать причину: `empty`, `filtered(n)`,
`timeout`, `blocked`, `error`. Менеджеру — без техники: «ничего не продаёт», «найдено 38,
не подходят по артикулу», «временно недоступен». `source-monitor` получает те же коды и
перестаёт путать «нет товара» со сбоем. Ожидание в лимите не должно открывать охлаждение [48].

### 2.6 Эталонный набор для диалога, а не только для поиска
Источники: WebMall [44][45], ComboShoppingBench [46], ShopGym [47], EComAgentBench [50],
environment-grounded verification [51], MMShopBench [62], LLM-as-recommender bias [5], Rufus [2].

WebMall: даже лучшие агенты решают «найти самое дешёвое» лишь на 54–63 %, сравнение цен
заметно сложнее точного поиска. `quality-eval.ts` меряет поиск; добавить 15–20 диалоговых
кейсов («Сравни», «почему он», «что в наличии») с проверкой фактов (п. 2.1) и долей ответов,
ушедших в шаблон. По этой метрике можно безопасно ослаблять проверку из 2.1.

## 3. Рассмотрено и отклонено (сейчас)

| Приём | Почему не сейчас |
|---|---|
| Эмбеддинги/CLIP/pgvector для матчинга [1][3] | ИТ-товары с артикулами: идентификатор + правила точнее; БД нет |
| LLM-агент, сам ходящий по сайтам [44][8][13] | 25–50 шагов на задачу, недетерминированно; обход антибота запрещён |
| Фиды мерчантов, протоколы агентной торговли [11][12][18] | У поставщиков их нет; API дистрибьюторов (OCS, MERLION) — уже аналог фида |
| Хеджированные запросы [52] | Дубль запроса удвоит риск блокировки источника |
| Stale-while-revalidate с фоновым обновлением [53][54][55] | Для закупки цена/наличие должны быть свежими; кэш с `cachedAt` + «Обновить» достаточен |
| Маршрутизация по моделям, как у Rufus [2][70] | Одна GPU, одна модель |
| RL-обучение матчера [9][68] | Нет размеченных данных |
| Автономные RFQ/переговоры (Fairmarkit, Zip, Coupa, Globality) [56]–[61] | Другой масштаб процесса; идея «цена + срок + риск» учтена в 2.2–2.3 |
| Многоагентная релевантность [69], верификатор-LLM [65][67] | «Налог верификатора»: дорого и медленно; у нас верификатор — код |

## 4. План

1. 2.5 (коды причин) и 2.2 (группировка) — без внешних решений, можно делать сразу.
2. 2.3 (цена за штуку) — после 2.2, на тех же ключах.
3. 2.6 (диалоговый эталон) — до 2.1, чтобы измерить эффект.
4. 2.1 — после решения владельца о смене политики проверки текста.
5. 2.4 — когда 2.2 покажет, как часто результат распадается на несколько моделей.

## 5. Источники

Сопоставление товаров и сравнение цен
1. Kanopy Labs — AI price comparison engine (2026): https://kanopylabs.com/blog/how-to-build-an-ai-price-comparison-engine
2. ZenML LLMOps DB — Rufus, 250M users: https://www.zenml.io/llmops-database/scaling-an-ai-powered-conversational-shopping-assistant-to-250-million-users
3. AgentOps Dispatch — price comparison agent accuracy across retailer schemas: https://agentopsdispatch.com/posts/price-comparison-agent-accuracy-across-retailer-schemas
4. Claro — matching supplier products without GTIN: https://getclaro.ai/resources/guides/how-to-match-supplier-products-without-gtin/
5. Is your LLM-as-a-Recommender agent trustable? (arXiv 2603.17417): https://arxiv.org/pdf/2603.17417
6. TGN Data — how product matching works in price monitoring: https://tgndata.com/how-product-matching-works-in-price-monitoring
7. Plott Data — marketplace product matching: https://plottdata.com/blogs/product-matching-across-marketplaces
8. Perplexity Shopping — 2026 retailer guide: https://ucphub.ai/perplexity-ai-shopping-agent-the-complete-2026-guide-for-retailers/
9. EPM-RL — RL for product mapping: https://awesomepapers.io/reinforcement-learning/papers/2604.23993
10. Generative retrieval with same-product cluster (2608.30606): https://www.alphaxiv.org/abs/2608.30606
11. ChatGPT shopping leans on product feeds: https://www.relevantaudience.com/ecommerce-marketing/chatgpt-shopping-product-feeds-profound-research/
12. Opascope — agentic commerce protocols 2026: https://opascope.com/insights/ai-shopping-assistant-guide-2026-agentic-commerce-protocols/
13. ChatGPT Shopping deep dive (2026): https://stellagent.ai/insights/chatgpt-shopping-feature-deep-dive
14. Anglera — Google Shopping Graph: https://www.anglera.com/glossary/google-shopping-graph
15. FeedOps — Shopping Graph explained: https://feedops.com/google-shopping-graph-explained/
16. US 9607331 — near-duplicate filtering in shopping SERP: https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/9607331
17. PPC Land — explaining Shopping Graph: https://ppc.land/shopping-graph/
18. Claro — schema.org Product structured data: https://getclaro.ai/resources/glossary/schema-org-product/

Сбор данных, свежесть, надёжность
19. ShoppingScraper — data freshness: https://shoppingscraper.com/blog/how-to-ensure-data-freshness-in-web-scraping
20. Apex Logic — scalable scraping architecture: https://www.apex-logic.net/news/web-scraping-architecture-2026
21. context.dev — debugging 403/429/timeouts/empty: https://www.context.dev/blog/debugging-web-scraper-failures
22. scraper.page — scraper performance KPIs: https://scraper.page/performance-metrics-for-scrapers-measuring-effectiveness-and
23. Trawl — price monitoring playbook 2026: https://blog.trawl.me/web-scraping-for-price-monitoring-the-2026-playbook/

Заземление ответа LLM
24. Proof-Carrying Numbers (arXiv 2509.06902): https://arxiv.org/pdf/2509.06902
25. Citation-grounded code comprehension (arXiv 2512.12117): https://arxiv.org/html/2512.12117v1
26. CaLM — verifying grounded generation (arXiv 2406.05365): https://arxiv.org/pdf/2406.05365
27. Multi-stage self-verification (arXiv 2509.05741): https://arxiv.org/pdf/2509.05741
28. ZeroEntropy — grounded generation: https://zeroentropy.dev/concepts/grounded-generation/
29. GMI Cloud — reducing hallucinations in production: https://www.gmicloud.ai/en/blog/reducing-hallucination-in-production-llm-apps-grounding-citations-and-faithfulness-scoring
30. CiteCheck (arXiv 2605.27700): https://arxiv.org/html/2605.27700v1

Понимание запроса и уточнение
31. Explicit attribute extraction in e-commerce search (ECNLP 2024): https://aclanthology.org/2024.ecnlp-1.13.pdf
32. LLM-based semantic search for conversational e-commerce (arXiv 2601.16492): https://arxiv.org/pdf/2601.16492
33. ProductAgent (arXiv 2407.00942): https://arxiv.org/abs/2407.00942
34. ProductAgent, EMNLP Industry 2025: https://aclanthology.org/2025.emnlp-industry.25/
35. AGENT-CQ (arXiv 2410.19692): https://arxiv.org/pdf/2410.19692
36. Query understanding in LLM-based CIS (arXiv 2504.06356): https://arxiv.org/pdf/2504.06356

Российский рынок: карточка модели
37. Яндекс Crowd Solutions — матчинг товаров для Маркета: https://crowdsolutions.yandex.ru/customers/yandex-market
38. SelSup — «Все предложения» на Яндекс Маркете: https://selsup.ru/blog/kak-popast-vo-vse-predlozheniya-na-yandeks-markete/
39. Betapro — ранжирование на Яндекс Маркете: https://betapro.ru/blog/vyshe-konkurentov-kak-ustroen-algoritm-ranzhirovaniya-tovarov-na-yandeks-markete/

Комплектность и цена за единицу
40. Ficstar — pack size chaos: https://ficstar.medium.com/pack-size-chaos-why-competitor-price-comparison-fails-without-unit-normalization-1c24eac7004e
41. Apify — comparable product offers: https://apify.com/gregory-brydon/comparable-product-offers
42. dev.to — price comparison is a unit-normalization problem: https://dev.to/dipen_bhuva_4c9f47712fd32/comparing-prices-across-retailers-is-a-unit-normalization-problem-not-a-scraping-problem-3hnp
43. PromptCloud — variants, prices and stock: https://dev.to/promptcloud_services/scraping-e-commerce-product-data-variants-prices-and-stock-without-losing-accuracy-1ge4

Оценка агентов покупок
44. WebMall (arXiv 2508.13024): https://arxiv.org/html/2508.13024v3
45. WebMall на SIGIR 2026 (Univ. Mannheim): https://www.uni-mannheim.de/dws/news/paper-on-benchmark-for-web-shopping-agents-accepted-at-sigir-2026/
46. ComboShoppingBench (arXiv 2608.09282): https://arxiv.org/html/2608.09282v1
47. ShopGym (arXiv 2605.16116): https://arxiv.org/pdf/2605.16116
50. EComAgentBench (arXiv 2606.17698): https://arxiv.org/pdf/2606.17698
51. Environment-grounded verification of e-commerce agents (arXiv 2609.16093): https://arxiv.org/pdf/2609.16093
62. MMShopBench (arXiv 2607.29002): https://arxiv.org/pdf/2607.29002

Отказоустойчивость fan-out и кэш
48. altune #1105 — ожидание лимита ≠ сбой провайдера: https://github.com/aleburrascano/altune/issues/1105
49. ezchain #121 — дедлайн + circuit breaker для fan-out: https://github.com/0xJ1nn/ezchain/issues/121
52. Scatter-gather с хеджированными запросами: https://github.com/tejas-k3/system_design_playground/issues/10
53. Stale-while-revalidate: https://blog.paulserban.eu/post/stale-while-revalidate-the-caching-pattern-that-balances-speed-and-freshness/
54. TTL strategies (hard, soft, jittered): https://www.vetoralabs.com/system-design/concepts/caching/ttl-strategies
55. Single-flight + SWR для ценового оракула: https://github.com/Stellar-Unified-Price-Oracle/-Stellar-Unified-Price-Oracle-Aggregator-API-Backend/issues/532

Агентные закупки (B2B)
56. Procurement Magazine — AI in procurement vendors: https://procurementmag.com/news/ai-in-procurement-the-industry-leading-vendors
57. Rework — 14 AI agents for procurement 2026: https://resources.rework.com/tools/ai-agents/best-ai-agents-for-procurement-2026
58. AI Tool Lab — Zip vs Coupa vs Fairmarkit vs GEP: https://www.aitoolbox.hk/articles/best-ai-procurement-software-2026-zip-vs-coupa-vs-fairmarkit-vs-gep/
59. Procurement AI vendor landscape 2026: https://procurementaiagents.com/reports/procurement-ai-vendor-landscape-market-map-2026
60. XLR8 — AI sourcing automation platforms: https://tryxlr8.ai/blogs/best-ai-procurement-sourcing-automation-platforms
61. Elsai — procurement AI agent providers: https://www.elsai.ai/blog/top-procurement-ai-agent-providers

Архитектура агентов
63. Anthropic «Building effective agents» — карта паттернов: https://agentpatterns.ai/patterns/agent-design/anthropic-effective-agents-framework/
64. Elastic — agentic search with deterministic guardrail: https://www.elastic.co/search-labs/blog/agentic-ai-search-deterministic-guardrail-query-execution
65. Verification as an architectural layer for LLM agents (arXiv 2609.31937): https://arxiv.org/html/2609.31937v1
66. Secure plan-then-execute agents (arXiv 2509.08646): https://arxiv.org/pdf/2509.08646
67. The verifier tax (arXiv 2603.19328): https://arxiv.org/pdf/2603.19328
68. Survey: RL-based agentic search (arXiv 2510.16724): https://arxiv.org/pdf/2510.16724
69. Case-driven multi-agent framework for e-commerce relevance (arXiv 2605.05991): https://arxiv.org/pdf/2605.05991
70. Hashmeta — inside Amazon Rufus: https://www.hashmeta.ai/en/blog/inside-amazon-rufus-architecture-patterns-behind-bedrock-scale-conversational-commerce

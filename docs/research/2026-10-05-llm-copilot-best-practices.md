# Локальная LLM для копайлота Price Radar: модель и практики

*2026-10-05 · методика ECC `deep-research` (без firecrawl/exa — встроенный веб-поиск) · ~60 источников · уверенность: средняя*

## Итог

1. Плохие ответы в чате («ты меня обманул» → снова «лучший — Авито за 50 ₽») вызваны кодом, а не моделью:
   всё нераспознанное уходило в сценарий «пересказать отбор», модели запрещалось вести диалог,
   фильтра «в наличии» не было, истории диалога нет. Исправлено в коде (см. PROJECT_CONTEXT 2026-10-05).
2. В 2×RTX 4090 (48 GB) из моделей 2026 года реально помещаются: **Gemma 4 26B A4B** (текущая),
   **Gemma 4 31B** и **Qwen 3.8 27B**. Флагманы 2026 (Kimi K3, DeepSeek V4, GLM-5.3, MiMo-V2.6,
   Qwen 3.8-Max/Flash-Next, Mistral Small 4 / Medium 3.5) — от 74 GB и выше, не помещаются.
3. Под нашу задачу (короткий русский текст, строгий JSON, без кода) по источникам сильнее всего
   **Gemma 4 31B** (лучшая строгость схемы и следование инструкциям), Qwen 3.8 27B сильнее в коде и агентных задачах.
   Решение — только по A/B на наших данных (`apps/analysis/scripts/compare-models.ts`).

## Кандидаты под 48 GB

| Модель | Вышла | Тип | Ollama q8 | Скорость RTX 4090* | Сильное | Слабое |
|---|---|---|---|---|---|---|
| Gemma 4 26B A4B | 2026-04 | MoE, 3.8B акт. | 28 GB | ~150–190 t/s | скорость, длинный контекст | слабее 31B в IF |
| Gemma 4 31B | 2026-04 | плотная | ~34 GB | ~45 t/s (Q4) | IF 91.5, MMMLU 88.4, JSON 30/30 multi-step | медленнее в 4 раза |
| Qwen 3.8 27B | 2026-08 | плотная | 30 GB | ~49–123 t/s (Q4) | код 12/12, LiveCodeBench 90.3 | JSON 28/30, thinking включён по умолчанию |

\* одна 4090, Q4; на Q8 и двух картах медленнее, своих замеров нет.

## Практики (54)

### Выбор модели и инференс
1. Выбирать по A/B на своих данных, бенчмарки — только для шорт-листа ([Kingy](https://kingy.ai/blog/qwen3-8-27b-vs-qwen3-6-27b-vs-gemma-4-31b/), [BenchLM](https://benchlm.ai/compare/gemma-4-31b-vs-qwen3-6-27b)).
2. Для строгого JSON — модель с лучшей схемной дисциплиной, а не с лучшим кодом ([BetterClaw](https://www.betterclaw.io/blog/gemma-4-27b-vs-qwen-3-6-27b)).
3. MoE с малым числом активных параметров — для задержки; плотная — для точности ([Regolo](https://regolo.ai/gemma-4-31b-vs-qwen3-6-35b-a3b-when-to-use-which/)).
4. Q8 вместо Q4, если влезает: потери почти нет ([Ollama qwen3.6](https://ollama.com/library/qwen3.6:27b-q8_0)).
5. Не брать модели, которые не помещаются целиком в VRAM: CPU-offload даёт 5–10 t/s ([Mistral Small 4 hardware](https://dev.to/jovan_chan_9500711396d4e6/mistral-small-4-for-local-ai-in-2026-the-119b-moe-hardware-reality-16la)).
6. Thinking/reasoning выключать для коротких строгих ответов: он ухудшает точное соблюдение формата ([arXiv 2606.09662](https://arxiv.org/html/2606.09662), [arXiv 2505.11423](https://arxiv.org/pdf/2505.11423), [nullmirror](https://nullmirror.com/en/blog/2026-05-09-fast-llm-judging-no-think-mode/), [Хабр](https://habr.com/ru/articles/1033808/)).
7. У Qwen 3.8 thinking включён по умолчанию — явно `think: false` ([Ollama qwen3.8](https://ollama.com/library/qwen3.8:27b-q8_0)).
8. Низкая температура (≈0.1) для ответов строго по данным ([Towards Data Science](https://towardsdatascience.com/grounding-your-llm-a-practical-guide-to-rag-for-enterprise-knowledge-bases/)).
9. `OLLAMA_FLASH_ATTENTION=1` и `OLLAMA_KV_CACHE_TYPE=q8_0` — экономия 30–50% VRAM на кэше ([eastondev](https://eastondev.com/blog/en/posts/ai/20260410-ollama-performance-optimization/)).
10. `num_ctx` 4–8K для чата, не максимальный ([computingforgeeks](https://computingforgeeks.com/ollama-models-cheat-sheet/)).
11. `keep_alive` не 0: перезагрузка модели убивает задержку ([glukhov](https://www.glukhov.org/llm-performance/ollama/how-ollama-handles-parallel-requests/)).
12. `OLLAMA_NUM_PARALLEL` × контекст = резерв KV — считать бюджет VRAM ([markaicode](https://markaicode.com/architecture/ollama-local-ai-architecture/)).
13. `OLLAMA_MAX_LOADED_MODELS` ограничить, чтобы A/B не вытеснял прод ([markaicode](https://markaicode.com/architecture/ollama-local-ai-architecture/)).
14. Закреплять тег модели и версию Ollama, менять только через A/B.
15. Оставлять предыдущую модель на диске для отката.

### Структурированный вывод
16. JSON Schema в `format`, а не `format: "json"` — constrained decoding гарантирует структуру ([Ollama blog](https://ollama.com/blog/structured-outputs)).
17. Constrained decoding ускоряет ответ (до 6×) — меньше «болтовни» ([jangwook](https://jangwook.net/en/blog/en/ollama-structured-outputs-pydantic-local-llm-guide-2026/)).
18. Схема плоская, вложенность ≤ 2–3 уровней ([markaicode](https://markaicode.com/ollama-structured-outputs-json-schema-validation/)).
19. Строгий формат стоит точности рассуждения (до −27 п.п.) — «constraint tax» ([arXiv 2605.26128](https://arxiv.org/pdf/2605.26128), [JSONSchemaBench](https://arxiv.org/pdf/2501.10868)).
20. Порядок полей важен: сначала поле для рассуждения/черновика, потом ответ ([dev.to](https://dev.to/ji_ai/why-json-schema-field-order-breaks-structured-output-accuracy-2985)).
21. Или два шага: свободный ответ → извлечение в схему ([techinterview](https://www.techinterview.org/post/3233477302/structured-output-constrained-decoding-interview/)).
22. Всё равно валидировать ответ кодом и повторять при ошибке ([dev.to](https://dev.to/syed_anzar/your-llm-returns-json-that-isnt-json-a-robust-structured-output-pipeline-for-local-models-2pm9)).
23. Проверять `done_reason=stop`: обрезанный JSON — не ответ (у нас уже есть).
24. Для 1–2 плоских полей хватает схемы без ретраев ([llmconfigurator](https://llmconfigurator.com/en/guides/llm-json-structured-output)).

### Маршрутизация намерений
25. Гибрид: правила/regex для однозначного, LLM — для остального ([forasoft](https://www.forasoft.com/blog/article/natural-language-understanding-customer-service-bots), [Botpress](https://botpress.com/blog/ai-agent-routing)).
26. Три уровня по цене: regex → семантическое сходство → LLM-роутер ([dev.to wonderlab](https://dev.to/wonderlab/agent-series-5-intent-recognition-and-routing-making-agents-actually-understand-users-3174)).
27. Обязателен класс «нет намерения / вне сценариев» с отдельным ответом ([arXiv 2608.02415](https://arxiv.org/pdf/2608.02415), [Medium semantic router](https://medium.com/@talon8080/mastering-rag-chabots-semantic-router-user-intents-ef3dea01afbc)).
28. Нераспознанное не превращать в «самое частое действие» — это и был наш баг.
29. LLM-роутер даёт 85–95% F1 против 40–50% у ключевых слов ([forasoft](https://www.forasoft.com/blog/article/natural-language-understanding-customer-service-bots)).
30. Логировать решения роутера и пересматривать промахи ([123ofai](https://123ofai.com/articles/blocks/agent-router)).
31. Порог уверенности: при сомнении — уточняющий вопрос, а не догадка ([irisagent](https://irisagent.com/blog/building-chatbots-with-intent-detection-guide/)).

### Ответы по данным (grounding)
32. Факты (цены, наличие, «лучший») считает код; модель только формулирует ([tinyfn](https://tinyfn.io/blog/prevent-llm-hallucinations-mcp), [arXiv 2607.12650](https://arxiv.org/html/2607.12650v1)).
33. Явно сказать модели: отвечать только по переданному контексту ([Towards Data Science](https://towardsdatascience.com/grounding-your-llm-a-practical-guide-to-rag-for-enterprise-knowledge-bases/)).
34. Дать честный fallback «в данных этого нет» вместо догадки ([Botpress](https://botpress.com/blog/ai-agent-routing)).
35. Передавать модели готовые факты-строки, а не сырую таблицу ([arXiv 2402.17944](https://arxiv.org/pdf/2402.17944)).
36. Ссылки рисует клиент из кода, модель URL не пишет (у нас так и есть).
37. Модель должна честно говорить о своих ограничениях: не открывает сайты, не видит наличие сверх данных.
38. Модели всё равно «галлюцинируют на границе инструмента» — проверять числа в ответе кодом ([arXiv 2607.12650](https://arxiv.org/pdf/2607.12650)).
39. Слои защиты: валидация контекста, детерминированные проверки, промпт, проверка ответа ([arXiv 2607.01457](https://arxiv.org/html/2607.01457v1)).

### Диалог и память
40. Хранить историю на сервере и подмешивать последние N реплик ([dasroot](https://dasroot.net/posts/2026/04/building-ai-chatbots-memory-context-management/)).
41. Длинную историю сжимать в бегущее резюме ([generalcompute](https://www.generalcompute.com/blog/multi-turn-conversations-llm-apis-best-practices-agents)).
42. Модели «теряются» в многоходовом диалоге — переформулировать состояние явно ([arXiv 2604.08782](https://arxiv.org/pdf/2604.08782)).
43. Активное состояние (фильтры таблицы, выбор) передавать структурой, а не надеяться на историю ([getmaxim](https://www.getmaxim.ai/articles/how-to-ensure-consistency-in-multi-turn-ai-conversations/)).
44. Не повторять один и тот же ответ: при повторе вопроса — сказать, что изменилось или не изменилось.
45. Реагировать на недовольство: признать, объяснить основание, предложить шаг.

### Промпты
46. Системный промпт: роль, неизменные правила, формат; задача — в user-сообщении ([getmaxim](https://www.getmaxim.ai/articles/a-practitioners-guide-to-prompt-engineering-in-2025/)).
47. 3–5 примеров (few-shot) на типовые и краевые случаи, одинаковой структуры ([Comet](https://www.comet.com/site/blog/few-shot-prompting/)).
48. Для малых моделей: роль → формат входа → инструкции → классы → примеры ([arXiv 2509.10010](https://arxiv.org/pdf/2509.10010), [arXiv 2607.24801](https://arxiv.org/pdf/2607.24801)).
49. Запреты формулировать вместе с тем, что делать вместо этого.
50. Не перегружать промпт: сложность промпта размывает рассуждение ([arXiv 2603.13351](https://arxiv.org/pdf/2603.13351)).

### Оценка
51. Золотой набор реальных диалогов как регрессия перед сменой модели или промпта ([FutureAGI](https://futureagi.com/blog/llm-evaluation-2025/)).
52. Детерминированные проверки (code-based graders) там, где возможно; LLM-судья — для открытых ответов ([ECC eval-harness], [Comet](https://www.comet.com/site/blog/llm-as-a-judge/)).
53. Метрики многоходового диалога: связность, удержание контекста, выполнение задачи ([cekura](https://www.cekura.ai/blogs/chatbot-evaluation-methods-metrics)).
54. Четыре слоя: офлайн-бенчмарк → CI-регрессия → guardrail в рантайме → наблюдение в проде ([FutureAGI](https://futureagi.com/blog/llm-evaluation-2025/)).

## Пробелы

- MERA (русский бенчмарк) не публикует сравнимые цифры для Gemma 4 / Qwen 3.8 — качество русского проверяем своим A/B.
- Нет замеров скорости Q8 на двух 4090 — нужен свой замер.
- Сравнения Gemma 4 31B и Qwen 3.8 27B по следованию инструкциям противоречат друг другу (BenchLM 91.5 vs «примерно равны» у BetterClaw) — помечено как непроверенное.

## Источники (дополнительно к ссылкам выше)

[SiliconFlow](https://www.siliconflow.com/articles/en/best-open-source-LLM-for-Russian) · [BentoML](https://www.bentoml.com/blog/navigating-the-world-of-open-source-large-language-models) · [MorphLLM](https://www.morphllm.com/best-open-source-llm) · [ThunderCompute](https://www.thundercompute.com/blog/best-open-source-llms) · [MERA](https://mera.a-ai.ru/en/code) · [Vellum](https://www.vellum.ai/open-llm-leaderboard) · [Techsy](https://techsy.io/en/blog/best-open-source-llms-2026) · [Codersera Qwen 3.8](https://codersera.com/blog/qwen-3-8-model-lineup-2026/) · [YottaLabs Qwen 3.8 27B](https://www.yottalabs.ai/post/qwen-3-8-27b-specs-hardware-requirements-how-to-run-2026) · [Unsloth Qwen3.8](https://unsloth.ai/docs/models/qwen3.8) · [Wikipedia Qwen](https://en.wikipedia.org/wiki/Qwen) · [LLM Releases](https://www.llm-releases.com/) · [geotoolbox](https://geotoolbox.ai/blog/best-open-source-llms) · [DeepSeek V4](https://deepseek.ai/deepseek-v4) · [Mistral Medium 3.5](https://docs.mistral.ai/models/model-cards/mistral-medium-3-5-26-04) · [GLM-5](https://artificialanalysis.ai/articles/glm-5-everything-you-need-to-know) · [GLM-5.3 hardware](https://runaihome.com/blog/glm-5-3-open-weights-live-hardware-guide-2026/) · [llm-stats Gemma 4 31B vs Qwen 3.8](https://llm-stats.com/models/compare/gemma-4-31b-it-vs-qwen3.8-27b) · [harborclerk PR #710](https://github.com/r0shi/harborclerk/pull/710) · [Tim Harbakon RTX 4090](https://timharbakon.com/qwen3-8-27b-vs-gemma4-26b-rtx-4090-benchmark/) · [markaicode Gemma 4](https://markaicode.com/benchmarks/gemma-4-ollama-benchmark/) · [T-pro 2.0](https://arxiv.org/html/2512.10430) · [Vikhr](https://arxiv.org/abs/2405.13929) · [promptquorum](https://www.promptquorum.com/local-llms/multi-gpu-local-llms) · [Rasa](https://rasa.com/blog/llm-chatbot-architecture) · [ITMO](https://ai.itmo.ru/blog/lokalnye-llm-modeli-instrumenty).

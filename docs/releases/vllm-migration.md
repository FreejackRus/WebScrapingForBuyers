# Переход Price Radar на vLLM

## Контур

Analysis использует `AI_PROVIDER=vllm`, `VLLM_BASE_URL=http://vllm:8000/v1`,
`VLLM_MODEL=procurement-qwen3.8-27b`, необязательный `VLLM_API_KEY`.
Маршруты чата, детерминированные действия, grounding и обработка ошибок сохранены.
Ollama остаётся доступным вариантом через `AI_PROVIDER=ollama` и прежние переменные.

GPU service включается явно: профиль `vllm` исключает его из обычного запуска.
API не публикуется на хосте. Образ 0.31.0 закреплён digest, официальный checkpoint
Qwen3.8-27B-FP8 — revision. Это та же модель в другой квантизации, не идентичные
веса прежнего GGUF Q8_0; качество проверяется отдельно. Контекст 8192, TP2,
4 одновременных последовательности, text-only без vision encoder.

## Порядок выпуска

1. Загрузить образ и pinned weights в volume `webscrapingforbuyers_vllm-models`.
2. Сохранить текущие переменные Ollama и создать случайный `VLLM_API_KEY` только
   в закрытой `.env.production`; секрет не печатать и не коммитить.
3. Перед запуском vLLM освободить GPU от системной Ollama. Другие приложения
   не останавливать. На время переключения AI использует фактический fallback;
   явный поиск и фильтры продолжают работать.
4. Из committed ref запустить `bash scripts/deploy.sh <ref> vllm`. Проверить
   `/health` внутри контейнера и `/v1/models` с ключом из закрытого окружения.
5. Пройти `evaluate-procurement.ts` с AI_PROVIDER=vllm. Это фиксированные
   синтетические цены, не live данные. Требуется принятое объяснение модели,
   не только успешные детерминированные команды.
6. Только после успешной проверки установить AI_PROVIDER=vllm в закрытой
   конфигурации и выполнить `bash scripts/deploy.sh <ref> analysis`.
7. Проверить public health и авторизованные чат/analysis на live NETLAB snapshot.

Откат: остановить только сервис vllm, запустить системную Ollama, вернуть
AI_PROVIDER=ollama и выполнить scripts/deploy.sh с предыдущим committed ref
для analysis. Chrome и его volume не пересоздаются.

## Проверки

- RED 74a194b6 → GREEN 4e11831b: OpenAI-compatible transport/config,
  bounded response, timeout, completed assistant response, проверка ID.
- Review выявил несовместимое `uniqueItems`: RED 968b5729, 8 focused GREEN.
  Ключ убирается только из wire schema, повторные ID по-прежнему отклоняются.
- Compose проверяется через `docker compose ... --profile vllm config --quiet`
  с тестовыми секретами. CLI flags проверены на фактическом образе с GPU.
- Не обещаем ускорение относительно Ollama без сопоставимого замера; FP8,
  контекст, cold/warm запуск и параллельность влияют на результаты.

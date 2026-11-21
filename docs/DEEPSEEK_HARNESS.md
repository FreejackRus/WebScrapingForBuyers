# DeepSeek Harness в копайлоте Price Radar

## Контур

`Gateway → Analysis → DeepSeek Harness → vLLM → локальная Qwen`.
Gateway сохраняет cookie-сессию и RBAC, Search — сбор и оценку предложений,
Analysis — детерминированный отбор и проверку объяснения. Codex продолжает
работать через собственный native harness.

Используются официальные MIT-пакеты `@deepseek-ai/dsh-*` версии
`0.2.2-rc.5` и `@deepseek-ai/cordis` `4.1.0`, закреплённые в lock-файле.
Это developer preview, не прошедший security audit у автора. Подключена
ограниченная композиция, а не стандартный coding-agent профиль.

Первый контур выполняет одну генерацию через официальный `AgentLoop`.
Собственный адаптер передаёт только текст в существующий JSON-транспорт vLLM;
прежние схемы, лимиты ответа, выключенный thinking и grounding сохранены.
Для каждого обращения создаётся отдельная сессия в памяти, которая закрывается
после ответа или ошибки. История пользователя поступает только из прежнего
ограниченного контекста приложения; Harness не сохраняет её на диск.

Многошаговый выбор инструментов пока не подключён. В композиции нет shell,
файловой системы, загрузчика плагинов, MCP-клиента, фоновых задач или
удалённых провайдеров. Ни Pi, ни `pi-ai`, ни платный DeepSeek API не требуются.
Модель не получает права самостоятельно менять цены, выбирать доступные
пользователю данные или запускать процессы.

## Включение и откат

В среде Analysis:

```dotenv
AI_PROVIDER=vllm
AI_HARNESS=deepseek
VLLM_MODEL=procurement-qwen3.8-27b
```

`VLLM_BASE_URL` должен указывать на существующий приватный vLLM API.
Ключ, если он нужен локальному серверу, передаётся через `VLLM_API_KEY`
вне Git. В Compose приватный URL уже задан. Дополнительный публичный порт
для inference не нужен. Не задавайте endpoint платного провайдера.

Node.js требуется версии 24.9 или новее. Docker-stage `analysis` использует
Node 24; базовые образы остальных сервисов эта интеграция не меняет.
`AI_HARNESS=direct` либо отсутствие настройки сохраняет прежний транспорт.
Неизвестное значение и сочетание Harness с Ollama отклоняются при запуске.

Обычный выпуск выполняется из committed ref через `scripts/deploy.sh` только
для `analysis`. Для отката достаточно `AI_HARNESS=direct` в защищённом
production environment и повторного выпуска Analysis; модель и Chrome
пересоздавать не требуется. Старый контейнерный образ сохраняется до проверки.

## Проверка

```bash
npm run test -w @peremena/analysis
npm run typecheck
npm run build
semgrep scan --config p/security-audit --metrics off apps/analysis/src/app.ts apps/analysis/src/infrastructure/deepseek-harness-narrator.ts apps/analysis/src/infrastructure/vllm-analysis-narrator.ts
```

Внутренний `/health` показывает выбранный движок. Ответ API для менеджера
по-прежнему скрывает название модели и инфраструктуру. Успешный health
подтверждает конфигурацию, но не заменяет живую генерацию. Новая модель,
изменение prompt/schema и расширение набора инструментов требуют отдельной
проверки качества и границ доступа.

Исходные контракты:
[адаптер LLM](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/cookbook/adding-an-llm-adapter.md),
[AgentLoop](https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/core/agent-loop/README.md),
[ограничения безопасности](https://github.com/deepseek-ai/deepseek-harness/blob/master/SAFETY.md).

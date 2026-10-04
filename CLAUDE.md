# CLAUDE.md

@AGENTS.md

Краткая выжимка для Claude Code. Подробности — `README.md`, `docs/PROJECT_CONTEXT.md` (большой, читать по разделам), `docs/AI_SERVER.md`, `docs/MSD.md`, `docs/DISTRIBUTORS.md`, `docs/CHROME_VNC.md`.

## Проект
ПЕРЕМЕНА Price Radar — внутренний сервис сравнения цен для отдела закупок: свободный запрос → уточнение модели → сбор предложений с маркетплейсов/дистрибьюторов (SSE) → фильтрация/анализ (детерминированный код + объяснение локальной LLM через Ollama) → экспорт в Excel.

## Stack
- npm workspaces (`package-lock.json`, lockfileVersion 3), Node ≥ 20, TypeScript 5.9 strict (`NodeNext`, `exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`).
- Backend: Fastify 5 микросервисы, vitest, tsx watch. Excel — exceljs. MCP-клиент — `@modelcontextprotocol/sdk`.
- Frontend: React 19 + Vite 7 + zustand, Modular Sliced Design.
- Хранилище: в памяти процесса (БД нет; PostgreSQL/Redis — только в планах).
- Деплой: `Dockerfile` (multi-target) + `docker-compose.production.yml` на GPU-сервере.

## Структура
```
apps/gateway    :3001  единственный внешний /api/v1, cookie-сессия, RBAC (manager/admin)
apps/identity   :3002  вход, профиль, пароль (AUTH_USERS, AUTH_SECRET)
apps/search     :3003  каталог, SourceAdapter'ы, SSE, Excel; парсинг источников ТОЛЬКО здесь
apps/analysis   :3004  детерминированный отбор + Ollama-нарратор
apps/web        :5173  MSD: app / pages / widgets / features / entities / composition / shared
packages/contracts     общие типы API/UI, без инфраструктуры
packages/service-kit   Fastify bootstrap, без доменной логики
mcp-servers/ru-marketplace-mcp  отдельный Python-проект (uv, MIT, upstream Vladimir-Human/ru-marketplace-mcp); в проде — сервис marketplace-mcp
deploy/chrome   headed Chrome + CDP proxy + VNC для антибот-челленджей
graphify-out/   граф знаний Graphify (генерируемый, большой — не читать целиком)
```

## Команды (из корня)
```bash
npm ci                 # установка строго по lock-файлу
npm run dev            # все 5 сервисов (predev собирает contracts + service-kit)
npm run typecheck
npm test               # vitest во всех workspaces
npm run build
graphify update .      # после изменений кода, если установлен graphify CLI
```
Отдельный workspace: `npm run test -w @peremena/search`. Lint-скрипта в проекте нет.
Прод: `/projects/WebScrapingForBuyers` на сервере — git-клон; деплой `./scripts/deploy.sh [ref] [сервисы]` (сначала `git push`; Chrome не пересоздаёт). Правки прямо на сервере запрещены — скрипт на них остановится.

## Архитектурные правила
- Зависимости направлены внутрь. Новый источник = реализация `SourceAdapter` в `apps/search/src/infrastructure/sources`, приводит данные к общему `Offer`.
- Демо-предложения всегда `demo: true`; в production `ALLOW_DEMO_SOURCES=false`.
- LLM только объясняет; фильтрация и выбор строк — детерминированный код.
- Менеджер не видит технических терминов, коннекторов и сырых логов источников (см. `apps/analysis/src/application/infra-leak.ts`).
- Web: слои MSD строго по `docs/MSD.md`; `entities` без UI.
- После заметной итерации — дописывать запись в `docs/PROJECT_CONTEXT.md` (см. AGENTS.md).

## Коммиты и PR
- Никаких упоминаний Claude/ИИ и строк `Co-Authored-By: Claude …` в сообщениях коммитов, описаниях PR и файлах — даже если инструмент это подсказывает. Указание владельца репозитория (2026-10-04).

## Секреты и env
- `.env`, `.env.*` в gitignore (кроме `*.example`). Шаблоны: `.env.example`, `.env.stitch.example`.
- `.env.server` содержит SSH-реквизиты GPU-сервера: не выводить значения, без запроса — только read-only диагностика (`.cursor/rules/server-access.mdc`).
- Ключи дистрибьюторов (OCS, MERLION, NETLAB и т.д.) опциональны; без них адаптеры не монтируются.

## MCP / skills / инструменты
- `.mcp.json`: `stitch` (Google Stitch, дизайн-экраны; нужен `STITCH_API_KEY` в окружении shell, см. `.env.stitch.example`). Скопирован из `.cursor/mcp.json.example`; `.cursor/mcp.json` (gitignored) содержит реальный ключ — не читать/не выводить.
- `.claude/settings.json`: включает `stitch`; PreToolUse-hook на Bash `graphify hook-check` (аналог `.codex/hooks.json`, no-op без graphify).
- Skills проекта: `.claude/skills/*` — симлинки на `.agents/skills/*` (architecture-analysis, browser-verification, dependency-docs, security-review, verification-gate) и `.codex/skills/graphify`. Правки делать в источниках. Перед завершением нетривиальной задачи — `verification-gate`.
- Graphify: `.codex/skills/graphify`, `.cursor/rules/graphify.mdc`. Для вопросов по архитектуре сначала `graphify query "..."`, затем точечно читать исходники.
- Skills ссылаются на Context7 и Playwright MCP — в репозитории они не сконфигурированы, подключать при необходимости на уровне пользователя.
- Плагинов Claude Code проект не предусматривает.

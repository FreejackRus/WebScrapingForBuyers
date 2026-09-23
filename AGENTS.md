## Graphify

This project has a knowledge graph at `graphify-out/` with god nodes, community structure, and cross-file relationships.

When the user types `/graphify`, use the installed Graphify skill or instructions before doing anything else.

- For codebase questions, first run `graphify query "<question>"` when `graphify-out/graph.json` exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts.
- Dirty `graphify-out/` files are expected after hooks or incremental updates; dirty graph files are not a reason to skip Graphify.
- If `graphify-out/wiki/index.md` exists, use it for broad navigation instead of raw source browsing.
- Read `graphify-out/GRAPH_REPORT.md` only for broad architecture review or when query/path/explain do not surface enough context.
- Confirm graph-derived conclusions by inspecting exact source files and, when useful, runtime behavior or tests.
- After modifying code, run `graphify update .` to keep the graph current.

## Tool routing

For internal architecture and dependency analysis, use Graphify first, then inspect the exact source files.

For third-party libraries, frameworks, SDKs, APIs, configuration syntax, migrations, and version-specific behavior, always use Context7 when it is applicable and available. Match the documentation to the dependency version actually used by this repository. Do not use Context7 instead of inspecting this repository's own source code.

For OpenAI products and APIs, use the official OpenAI Developer Docs MCP.

For browser-visible behavior, use Playwright for verification when the application can reasonably be run.

For security-sensitive changes, run relevant tests and Semgrep Community Edition.

Before declaring a non-trivial implementation complete, run the `verification-gate` skill.

Do not invoke every tool for every task. Use the smallest set of tools that produces reliable evidence. Repository source code and executable verification remain the final source of truth. Do not fabricate tool output or test results.

## Project-specific supplement

Перед изменениями прочитайте `README.md`, `docs/AI_SERVER.md` и `docs/PROJECT_CONTEXT.md`. После каждой заметной итерации допишите запись в `docs/PROJECT_CONTEXT.md` без секретов.

### Архитектурные границы

- `packages/contracts` — общий контракт API/UI, без инфраструктурных зависимостей.
- `packages/service-kit` — Fastify bootstrap без доменной логики.
- `apps/gateway` — единственная внешняя точка `/api/v1`, cookie-сессия, RBAC.
- `apps/identity` — вход, профиль, пароль.
- `apps/search` — каталог, сбор, SSE, Excel. Парсинг сайта только здесь, в `SourceAdapter`.
- `apps/analysis` — детерминированный отбор и объяснение LLM.
- `apps/web` — Modular Sliced Design по `docs/MSD.md`: `app`, `pages`, `widgets`, `features`, `entities` (без UI), `composition`, `shared`. Страницы собирают только виджеты. Расчёт закупки во фронте не живёт.

Новый источник реализует `SourceAdapter` в `apps/search`. Демо-цены всегда `demo: true`.

### Инференс

GPU-сервер и выбранные кандидаты модели описаны в `docs/AI_SERVER.md`. Секреты в репозитории не хранить. LLM только объясняет; ранжирование детерминированное.

### Проверка проекта

После изменений запускайте релевантные команды:

```bash
npm run typecheck
npm test
npm run build
graphify update .
```

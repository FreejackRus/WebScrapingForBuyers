## Graphify

This project has a knowledge graph at `graphify-out/` with god nodes, community structure, and cross-file relationships.

When the user types `/graphify`, use the installed Graphify skill or instructions before doing anything else.

- For codebase questions, first run `graphify query "<question>"` when `graphify-out/graph.json` exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts.
- Dirty `graphify-out/` files are expected after hooks or incremental updates; dirty graph files are not a reason to skip Graphify.
- If `graphify-out/wiki/index.md` exists, use it for broad navigation instead of raw source browsing.
- Read `graphify-out/GRAPH_REPORT.md` only for broad architecture review or when query/path/explain do not surface enough context.
- Confirm graph-derived conclusions by inspecting exact source files and, when useful, runtime behavior or tests.
- After modifying code, run `graphify update .` to keep the graph current.

## Жёсткое правило: плагины, skills и MCP (обязательно)

Это правило сильнее «минимального набора инструментов» ниже. Нарушение — ошибка процесса.

0. **Сначала окружение, потом работа.** Любой skill, MCP-сервер или плагин, который нужен задаче, должен быть **настроен и реально работать до первой правки кода**. Если инструмент не отвечает, не активирован, без языкового сервера, без авторизации или установлен частично, сначала чиним его (или честно сообщаем пользователю, что без него нельзя), и только потом приступаем к задаче. Нельзя «обойтись без него» молча. Проверка: `bash scripts/check-env.sh`.
   Известные особенности Windows-окружения:
   - Serena: `activate_project` → `get_symbols_overview` на `.ts` должен вернуть символы; для этого в `.serena/project.yml` в `language_servers` стоит `typescript`.
   - Graphify: если `graphify` из `~/.local/bin` не стартует (кириллица в пути профиля), запускать через `python -m graphify <команда>` из `uv tool` (`%APPDATA%\uv\tools\graphifyy\Scripts\python.exe`).
   - Проектные skills в `.claude/skills/` — симлинки на `.agents/skills`; нужен `git config core.symlinks true` и пересоздание (`git checkout -- .claude/skills`), иначе это текстовые заглушки и skills не загружаются.

1. **До первой правки кода** в любой нетривиальной задаче: `graphify query/explain/path` (если есть `graphify-out/graph.json`), затем загрузить подходящие skills через Skill. Если skill подходит под задачу, его нельзя пропускать, даже если «и так понятно».
2. **Обязательные соответствия:**
   - реализация или багфикс → `tdd-workflow` (сначала красный тест);
   - UI/UX → `frontend-design-direction`, `frontend-a11y`, `make-interfaces-feel-better`; тесты компонентов → `react-testing`;
   - навигация по символам → Serena MCP (`find_symbol`, `get_symbols_overview`) вместо слепого чтения больших файлов;
   - сторонние библиотеки и API → Context7 (`docs-lookup`);
   - поведение в браузере → Playwright / встроенный браузер, проверка на живом приложении;
   - безопасность → `security-review` + Semgrep;
   - перед сообщением «готово» → `verification-gate` / `verification-loop`.
3. **Подключённые плагины и MCP** (ecc, serena, chrome-devtools, figma и др.) сначала проверяются на пригодность через ToolSearch/SearchSkills; «не знал, что есть» не причина.
4. **Отчёт.** В финальном ответе перечислить, какие skills и MCP использованы. Если подходящий не использован, указать причину (недоступен, не применим). Не заявлять использование того, что не вызывалось.
5. После правок кода: `graphify update .`.

## Tool routing

For internal architecture and dependency analysis, use Graphify first, then inspect the exact source files.

For third-party libraries, frameworks, SDKs, APIs, configuration syntax, migrations, and version-specific behavior, always use Context7 when it is applicable and available. Match the documentation to the dependency version actually used by this repository. Do not use Context7 instead of inspecting this repository's own source code.

For OpenAI products and APIs, use the official OpenAI Developer Docs MCP.

For browser-visible behavior, use Playwright for verification when the application can reasonably be run.

For security-sensitive changes, run relevant tests and Semgrep Community Edition.

Before declaring a non-trivial implementation complete, run the `verification-gate` skill.

Не вызывайте инструменты ради галочки: набор выбирается по задаче, но обязательные соответствия из жёсткого правила выше выполняются всегда. Use the smallest set of tools that produces reliable evidence. Repository source code and executable verification remain the final source of truth. Do not fabricate tool output or test results.

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

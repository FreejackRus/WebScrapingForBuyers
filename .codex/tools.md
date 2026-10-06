# Skills, MCP и инструменты

## Ворота до первой правки кода

Выполните `bash scripts/check-env.sh`, но требуемый skill/MCP/plugin проверьте
реальным вызовом: скрипт не доказывает сеть, авторизацию и пригодность. При
`/graphify` сначала выполните инструкции Graphify skill до любых других действий.
Любой вопрос о кодовой базе при `graphify-out/graph.json` начинайте с
`graphify query "<вопрос>"`, затем полностью читайте подходящие skills. ECC,
Serena, Context7, browser/DevTools, Figma и прочие
capabilities сначала обнаружьте через ToolSearch/SearchSkills (или фактический
каталог текущей среды, если эти инструменты не предоставлены) и проверьте вызовом.

Если обязательный capability сломан или установлен частично, сначала исправьте
его. Если нельзя — остановите зависящую работу и сообщите блокер. `rg`, память
модели или другой агент не являются тихим fallback.

## Обязательная матрица

- Реализация/багфикс: `tdd-workflow`, сначала красный содержательный тест.
- UI/UX: `frontend-design-direction`, `frontend-a11y`,
  `make-interfaces-feel-better`; компоненты — `react-testing`.
- Motion/mobile: применимый `animate`, `emil-design-eng`, `apple-design`,
  `mobile-native`, `review-animations` или `break-ui`.
- Символы: Serena `get_symbols_overview`, `find_symbol`,
  `find_referencing_symbols` вместо слепого чтения больших файлов.
- Библиотеки/SDK/API/config: Context7 и `docs-lookup` по фактической версии;
  OpenAI — официальный OpenAI Developer Docs MCP.
- Browser-visible поведение: Playwright/встроенный браузер на живом приложении.
- Security: `security-review`, ECC reviewer, профильные тесты и Semgrep CE.
- Перед «готово»: `verification-gate` или ECC `verification-loop`.

Ищите актуальные project skills в `.agents/skills`; не ограничивайтесь старым
каталогом. Отсутствующий обязательный skill нельзя просто пропустить.

## Graphify и Serena

Используйте `graphify query "<вопрос>"`, для связи — `graphify path "<A>" "<B>"`,
для концепта — `graphify explain "<концепт>"`. Для обзора сначала wiki; полный
GRAPH_REPORT — если точечных команд мало. Точный путь к wiki —
`graphify-out/wiki/index.md`. Граф направляет исследование, выводы подтверждайте
кодом/проверкой. Dirty graph не откатывайте и не считайте причиной пропустить
Graphify. После кода —
`graphify update .`, после docs-only — нет.

В Serena активируйте фактический root, прочитайте `initial_instructions`; языки
TypeScript и Python. На Windows рабочий сервер — `serena-local`: проверьте
`activate_project` и overview на `.ts`. Timeout plugin-копии не доказывает отказ.
Dashboard обычно `127.0.0.1:24283`, порт ищите по активному проекту. На Windows
Context7 подключён как connector claude.ai: `resolve-library-id`, `query-docs`.
Для Graphify при кириллице запускайте `python -m graphify` интерпретатором
`%APPDATA%\uv\tools\graphifyy\Scripts\python.exe`.
`.claude/skills` — symlink на `.agents/skills`; нужны `core.symlinks=true` и
восстановление без уничтожения локальных правок. Windows-пути не применяйте в Linux.

## Точные команды

Корень, Node >=20, npm workspaces; root lint-скрипта нет:

```bash
npm ci
npm run dev
npm run typecheck
npm test
npm run test -w @peremena/search
npm run build
graphify update .
```

Python MCP, из `mcp-servers/ru-marketplace-mcp`, Python >=3.12:

```bash
uv sync --all-packages
uv run pytest -q -m "not live and not cdp"
uv run pytest -q scripts
uv run ruff check .
uv run ruff format --check .
uv run mypy
```

Live/CDP-тесты запускайте осознанно. MCP marketplace не доказывает live-данные.
Не читайте `.cursor/mcp.json`; Stitch лишь указан в метаданных. Не утверждайте,
что Figma, OpenAI Docs, Context7 или Playwright подключены без реального вызова.

# Проверка и review

Готовность требует доказательств по риску. Начинайте с узкого красного
теста/репродукции, затем unit/integration, typecheck, build, static analysis, API
или браузер. Не заявляйте проверку, которую не запускали.

## Независимое review

Существенное изменение проверяет отдельный исполнитель или специалист:
TypeScript — `ecc:typescript-reviewer`, React/a11y — `ecc:react-reviewer`,
security — `ecc:security-reviewer`, build — `ecc:build-error-resolver`. Astra
принимает результат по diff и доказательствам. Preamble/footer из
`orchestration.md` обязательны; отчёт без них не принимается.

Проверяйте корректность, регрессии, границы, типы, ошибки, edge cases,
безопасность, дублирование, совместимость API/данных, тесты и поддержку. Для auth,
RBAC, секретов, shell, uploads и untrusted input проверяйте validation, injection,
access control, unsafe defaults и sensitive logs; используйте skill, тесты и
Semgrep. Перед API/contract change проследите callers и сериализацию.

## Definition of Done

Для TypeScript-кода обычно:

```bash
npm run typecheck
npm test
npm run build
graphify update .
```

Для Python MCP — pytest/ruff/mypy из `tools.md`. UI требует живого браузера,
security — Semgrep и профильных тестов. Перед финалом нетривиальной реализации
примените `verification-gate` или ECC `verification-loop`.

Docs-only требует `git diff`, `git diff --check`, проверки локальных ссылок,
точных команд/файлов и записи в `docs/PROJECT_CONTEXT.md`. Runtime-тесты и
Graphify update не нужны, если исполняемая конфигурация не менялась; сообщите, что
они не запускались.

## Проектные инварианты

- contracts без инфраструктуры, service-kit без домена, gateway — единственная
  публичная `/api/v1` точка.
- Новый источник проходит через `SourceAdapter`; MCP parser не протекает наружу.
- Fixture/cache/stub/demo не называется live; demo имеет `demo: true`.
- Ранжирование и фильтрация детерминированы, LLM только объясняет.
- Менеджеру не видны connector state, VNC/CDP и raw errors.
- MSD соблюдён, `entities` без UI, страницы собирают виджеты, расчёт не во web.
- Секреты и внутренние адреса не попали в diff, journal, prompt или logs.
- Прод использует committed ref и `scripts/deploy.sh`; `chrome-headed` сохранён.
- Commit/PR/files не содержат AI/Claude attribution или AI `Co-Authored-By`;
  техническое описание модели допустимо.

Финальный отчёт называет файлы, реальные команды, результаты, риски, skills и MCP.
Подходящий пропуск объясняется; недоступный обязательный инструмент — блокер.


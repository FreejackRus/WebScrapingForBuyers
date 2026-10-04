#!/usr/bin/env bash
# Проверка окружения агента: skills, MCP и инструменты должны работать ДО правок кода.
# Запуск: bash scripts/check-env.sh   (код выхода 1, если что-то не готово)
cd "$(dirname "$0")/.." || exit 1
fail=0
ok()  { printf '  [ok]   %s\n' "$1"; }
bad() { printf '  [FAIL] %s\n         -> %s\n' "$1" "$2"; fail=1; }

echo "Окружение Price Radar"

node_major="$(node -p 'process.versions.node.split(".")[0]' 2>/dev/null || echo 0)"
[ "$node_major" -ge 20 ] && ok "node $(node -v)" || bad "node >= 20" "установите Node 20+"

# Graphify: обычный запуск, затем python -m (кириллица в пути профиля ломает обёртку).
graphify_py="${GRAPHIFY_PYTHON:-${APPDATA:-}/uv/tools/graphifyy/Scripts/python.exe}"
# query работает и через сломанную обёртку, а update нет, поэтому проверяем именно update.
if graphify update --help >/dev/null 2>&1; then
  ok "graphify (CLI)"
elif [ -x "$graphify_py" ] && "$graphify_py" -m graphify update --help >/dev/null 2>&1; then
  ok "graphify (python -m graphify; GRAPHIFY_PYTHON=$graphify_py)"
else
  bad "graphify" "uv tool install graphifyy; либо задайте GRAPHIFY_PYTHON"
fi
[ -f graphify-out/graph.json ] && ok "graphify-out/graph.json" || bad "граф не построен" "python -m graphify update ."

command -v semgrep >/dev/null 2>&1 && ok "semgrep $(semgrep --version 2>/dev/null | tail -1)" || bad "semgrep" "pip install semgrep"

# Проектные skills: симлинки должны быть настоящими, а не текстовыми заглушками.
broken=0
for skill in .claude/skills/*; do
  [ -f "$skill/SKILL.md" ] || { broken=1; printf '         не загружается: %s\n' "$skill"; }
done
[ "$broken" -eq 0 ] && ok "проектные skills (.claude/skills)" \
  || bad "симлинки skills сломаны" "git config core.symlinks true && rm -f .claude/skills/* && git checkout -- .claude/skills"

# Serena: TypeScript должен быть в языковых серверах проекта.
if [ -f .serena/project.yml ] && grep -qE '^- typescript' .serena/project.yml; then
  ok "serena: typescript в .serena/project.yml"
else
  bad "serena без typescript" "в .serena/project.yml: language_servers: [typescript, python], затем activate_project"
fi

echo
[ "$fail" -eq 0 ] && echo "Окружение готово." || echo "Окружение НЕ готово: исправьте пункты выше до начала работы."
exit "$fail"

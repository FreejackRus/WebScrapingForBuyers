#!/usr/bin/env bash
# Деплой на сервере из git: ./scripts/deploy.sh [ref] [сервис ...]
#   ref      — ветка, тег или коммит (по умолчанию origin/main)
#   сервисы  — что пересобрать (по умолчанию всё, кроме chrome)
# Chrome не пересоздаётся: в его профиле живут прогретые антибот-сессии.
# .env.production и прочие секреты не в git и не трогаются.
set -euo pipefail

cd "$(dirname "$0")/.."
REF="${1:-origin/main}"
shift || true
SERVICES=("$@")
if [ ${#SERVICES[@]} -eq 0 ]; then
  SERVICES=(identity search analysis gateway web marketplace-mcp)
fi

if [ -n "$(git status --porcelain --untracked-files=no)" ]; then
  echo "На сервере есть незакоммиченные правки в отслеживаемых файлах:" >&2
  git status --short --untracked-files=no >&2
  echo "Закоммитьте их в репозиторий или сбросьте, затем повторите." >&2
  exit 1
fi

git fetch --prune origin
PREV="$(git rev-parse --short HEAD)"
git checkout --detach "$REF"
NEXT="$(git rev-parse --short HEAD)"
echo "Деплой ${PREV} -> ${NEXT}: ${SERVICES[*]}"

docker compose --env-file .env.production -f docker-compose.production.yml \
  up -d --no-deps --build "${SERVICES[@]}"

echo "$(date -Is) ${NEXT} ${SERVICES[*]}" >> .deploy-log
docker compose --env-file .env.production -f docker-compose.production.yml ps

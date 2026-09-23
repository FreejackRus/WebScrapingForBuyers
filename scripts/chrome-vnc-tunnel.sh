#!/usr/bin/env bash
# Open a local VNC tunnel to headed Chrome. Does not print secrets.
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
env_file="${root}/.env.server"
if [[ ! -f "${env_file}" ]]; then
  echo "Missing ${env_file}" >&2
  exit 1
fi

set -a
# shellcheck disable=SC1090
source "${env_file}"
set +a

host="${AI_SERVER_HOST:?Set AI_SERVER_HOST in .env.server}"
user="${AI_SERVER_USER:?Set AI_SERVER_USER in .env.server}"

echo "VNC: 127.0.0.1:5901 → ${user}@${host} (headed Chrome)."
echo "Open avito.ru ozon.ru dns-shop.ru citilink.ru market.yandex.ru megamarket.ru"
echo "See docs/CHROME_VNC.md"

ssh_opts=(-L 5901:127.0.0.1:5901 -N -o ExitOnForwardFailure=yes)
if [[ -n "${AI_SERVER_PORT:-}" ]]; then
  ssh_opts+=(-p "${AI_SERVER_PORT}")
fi

if [[ -n "${AI_SERVER_PASSWORD:-}" ]]; then
  if command -v sshpass >/dev/null 2>&1; then
    exec sshpass -e ssh "${ssh_opts[@]}" "${user}@${host}"
  fi
  echo "sshpass not found; SSH will prompt if a key is not enough." >&2
fi

exec ssh "${ssh_opts[@]}" "${user}@${host}"

#!/usr/bin/env python3
"""Capture Price Radar JSON state or restore it into an empty staging directory."""

import argparse
import hashlib
import json
import os
from pathlib import Path
import subprocess
import tempfile
from zipfile import ZIP_DEFLATED, ZipFile


FILES = {
    "gateway": ("search-history.json", "watchlist.json", "basket.json"),
    "search": ("price-history.json", "source-monitor.json", "quality.json"),
}
PATHS = {f"{service}/{name}" for service, names in FILES.items() for name in names}
COMPOSE = ["docker", "compose", "--env-file", ".env.production", "-f", "docker-compose.production.yml"]
READ_STATE = """
const fs = require('node:fs');
const result = {};
for (const name of process.argv.slice(1)) {
  try { result[name] = JSON.parse(fs.readFileSync('/data/' + name, 'utf8')); }
  catch (error) { if (error.code !== 'ENOENT') throw Error('Cannot read state file: ' + name); }
}
process.stdout.write(JSON.stringify(result));
"""


def checksum(data):
    return hashlib.sha256(data).hexdigest()


def capture(destination):
    records = {}
    for service, names in FILES.items():
        output = subprocess.check_output(
            [*COMPOSE, "exec", "-T", service, "node", "-e", READ_STATE, *names], timeout=30
        )
        for name, value in json.loads(output).items():
            if name not in names or not isinstance(value, (dict, list)):
                raise ValueError("Неожиданная структура данных")
            records[f"{service}/{name}"] = json.dumps(value, ensure_ascii=False).encode("utf-8")
    if not records:
        raise ValueError("В обоих сервисах отсутствуют файлы данных")
    manifest = {"schema": 1, "files": {name: checksum(data) for name, data in records.items()}}
    with tempfile.TemporaryFile() as temporary:
        with ZipFile(temporary, "w", ZIP_DEFLATED) as archive:
            archive.writestr("manifest.json", json.dumps(manifest))
            for name, data in records.items():
                archive.writestr(name, data)
        temporary.seek(0)
        verified(temporary)
        temporary.seek(0)
        with os.fdopen(os.open(destination, os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o600), "wb") as target:
            target.write(temporary.read())
    print(f"Архив проверен. Файлов: {len(records)}. Отсутствовали: {', '.join(sorted(PATHS - records.keys())) or 'нет'}")


def verified(source):
    with ZipFile(source) as archive:
        manifest = json.loads(archive.read("manifest.json"))
        hashes = manifest["files"]
        if not hashes or manifest["schema"] != 1 or not hashes.keys() <= PATHS:
            raise ValueError("Неизвестный формат архива")
        names = archive.namelist()
        if len(names) != len(hashes) + 1 or set(names) != {"manifest.json", *hashes}:
            raise ValueError("Содержимое архива не совпадает с манифестом")
        records = {}
        for name, expected in hashes.items():
            data = archive.read(name)
            if checksum(data) != expected or not isinstance(json.loads(data), (dict, list)):
                raise ValueError(f"Файл не прошёл проверку: {name}")
            records[name] = data
        return records


def restore(source, destination):
    records = verified(source)
    destination.mkdir(mode=0o700, exist_ok=False)
    for name, data in records.items():
        target = destination / name
        target.parent.mkdir(mode=0o700, exist_ok=True)
        with os.fdopen(os.open(target, os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o600), "wb") as output:
            output.write(data)
    print(f"Восстановлено в отдельный каталог: {len(records)} файлов")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    subcommands = parser.add_subparsers(dest="command", required=True)
    for command in ("capture", "verify", "restore"):
        subcommand = subcommands.add_parser(command)
        subcommand.add_argument("archive", type=Path)
        if command == "restore":
            subcommand.add_argument("destination", type=Path)
    args = parser.parse_args()
    if args.command == "capture":
        capture(args.archive)
    elif args.command == "restore":
        restore(args.archive, args.destination)
    else:
        print(f"Проверено файлов: {len(verified(args.archive))}")


if __name__ == "__main__":
    main()

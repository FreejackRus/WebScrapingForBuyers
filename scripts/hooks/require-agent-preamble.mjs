#!/usr/bin/env node
// PreToolUse hook for the Agent tool: refuse to launch a subagent whose prompt does not carry the
// mandatory skills/MCP/Graphify block from docs/AGENT_PREAMBLE.md. Exit code 2 blocks the call and
// feeds stderr back to the model; any other tool passes untouched.
import { readFileSync } from "node:fs";

const MARKER = "[ОБЯЗАТЕЛЬНЫЕ ИНСТРУМЕНТЫ]";

let payload = {};
try {
  payload = JSON.parse(readFileSync(0, "utf8"));
} catch {
  // Unreadable input: do not block unrelated work.
  process.exit(0);
}

const tool = payload.tool_name ?? "";
if (tool !== "Agent" && tool !== "Task") process.exit(0);

const prompt = String(payload.tool_input?.prompt ?? "");
if (prompt.includes(MARKER)) process.exit(0);

process.stderr.write(
  [
    "Запуск агента заблокирован: в prompt нет блока " + MARKER + ".",
    "Правило: AGENTS.md, раздел «Жёсткое правило для агентов и субагентов».",
    "Вставьте первым в prompt блок из docs/AGENT_PREAMBLE.md и повторите вызов.",
  ].join("\n") + "\n",
);
process.exit(2);

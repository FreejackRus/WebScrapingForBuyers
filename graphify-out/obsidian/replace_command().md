---
source_file: "mcp-servers/ru-marketplace-mcp/scripts/test_stdio_probe.py"
type: "code"
community: "test_stdio_probe.py"
location: "L146"
tags:
  - graphify/code
  - graphify/EXTRACTED
  - community/test_stdio_probepy
---

# replace_command()

## Connections
- [[MonkeyPatch]] - `references` [EXTRACTED]
- [[StdioProbe]] - `calls` [EXTRACTED]
- [[run()_3]] - `indirect_call` [INFERRED]
- [[start()]] - `indirect_call` [INFERRED]
- [[test_all_probe_entrypoints_check_protocol()]] - `calls` [EXTRACTED]
- [[test_all_probe_entrypoints_fail_on_silence()]] - `calls` [EXTRACTED]
- [[test_docker_probe_rejects_call_errors()]] - `calls` [EXTRACTED]
- [[test_docker_probe_rejects_wrong_or_missing_versions()]] - `calls` [EXTRACTED]
- [[test_docker_probe_requires_expected_version_before_starting()]] - `calls` [EXTRACTED]
- [[test_docker_timeout_attempts_container_removal()]] - `calls` [EXTRACTED]
- [[test_stdio_probe.py]] - `contains` [EXTRACTED]

#graphify/code #graphify/EXTRACTED #community/test_stdio_probepy
---
name: dependency-docs
description: Use current, version-matched documentation when changing or debugging third-party SDKs, frameworks, libraries, or their configuration.
---

# Dependency documentation

1. Determine the dependency version actually installed or locked by the repository.
2. Use Context7 to retrieve documentation for the specific API, behavior, configuration, or migration in question.
3. Match the documentation to the installed version and the project's code.
4. Do not use APIs unavailable in that version.
5. After changes, run the relevant build, tests, and type checks.

For OpenAI products and APIs, use the official OpenAI Developer Docs MCP instead of third-party documentation. Do not use Context7 to analyze this repository's own source code.

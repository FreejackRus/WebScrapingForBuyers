---
name: architecture-analysis
description: Analyze the architecture, dependencies, and impact of a large or unfamiliar area of this repository with Graphify, then confirm conclusions in source code.
---

# Architecture analysis

1. Define the area or question to investigate.
2. Use Graphify queries and relationship traversal to find relevant nodes, dependency chains, callers, and callees.
3. Reduce the result to the smallest useful set of files.
4. Read the exact source files before reaching conclusions.
5. Confirm important behavior with runtime evidence or tests when useful.
6. Clearly distinguish graph-derived observations from facts confirmed in source or execution.

Do not read the entire repository without a concrete reason. Graphify guides source inspection; it does not replace it.

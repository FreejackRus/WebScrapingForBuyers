---
name: security-review
description: Review security-sensitive changes involving trust boundaries, identity, permissions, secrets, dangerous APIs, or untrusted input.
---

# Security review

1. Inspect the diff and identify changed trust boundaries.
2. Review input handling, authentication, authorization, secrets, and dangerous APIs.
3. Run relevant tests.
4. Run Semgrep Community Edition on the affected source or repository.
5. Validate each relevant finding against the source code and execution context.

Do not claim a vulnerability without sufficient evidence. Pay particular attention to sessions, SQL, uploads, process execution, deserialization, network access, cryptography, and permission checks.

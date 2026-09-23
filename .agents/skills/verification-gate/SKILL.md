---
name: verification-gate
description: Perform the final evidence-based verification before declaring a non-trivial engineering implementation complete.
---

# Verification gate

Before declaring completion:

1. Review `git diff` and confirm every change belongs to the task.
2. Run the relevant formatter, lint, type check, unit tests, integration tests, and build.
3. For UI changes, use the browser-verification skill.
4. For security-sensitive changes, use the security-review skill.
5. Check for accidentally modified files.
6. Report exactly what ran and clearly list anything not verified.

Never claim a test or check ran when it did not.

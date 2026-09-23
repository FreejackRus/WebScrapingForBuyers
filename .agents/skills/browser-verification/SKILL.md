---
name: browser-verification
description: Verify browser-visible changes and user flows with Playwright when the application can reasonably be run locally.
---

# Browser verification

1. Determine how to run the application and start it.
2. Use Playwright MCP to exercise the changed user scenario.
3. Check rendering, navigation, controls, validation, console errors, network errors, and the expected outcome.
4. Fix any issue found and repeat the verification.
5. Stop temporary processes when they are no longer needed.

Prefer deterministic unit or integration tests when browser automation would add no useful evidence.

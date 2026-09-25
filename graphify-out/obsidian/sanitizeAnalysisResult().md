---
source_file: "apps/analysis/src/application/infra-leak.ts"
type: "code"
community: "infra-leak.ts"
location: "L58"
tags:
  - graphify/code
  - graphify/EXTRACTED
  - community/infra-leakts
---

# sanitizeAnalysisResult()

## Connections
- [[analyze.ts]] - `imports` [EXTRACTED]
- [[analyzeSnapshot()]] - `calls` [EXTRACTED]
- [[answerCopilot()]] - `calls` [EXTRACTED]
- [[hasInfraLeak()]] - `calls` [EXTRACTED]
- [[infra-leak.test.ts]] - `imports` [EXTRACTED]
- [[infra-leak.ts]] - `contains` [EXTRACTED]
- [[sanitizeCitation()]] - `indirect_call` [INFERRED]
- [[sanitizeUserFacingText()]] - `calls` [EXTRACTED]

#graphify/code #graphify/EXTRACTED #community/infra-leakts
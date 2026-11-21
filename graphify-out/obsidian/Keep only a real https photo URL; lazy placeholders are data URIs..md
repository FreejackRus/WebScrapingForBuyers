---
source_file: "mcp-servers/ru-marketplace-mcp/packages/aliexpress-connector/src/aliexpress_connector/server.py"
type: "rationale"
community: "aliexpress_connector/server.py"
location: "L365"
tags:
  - graphify/rationale
  - graphify/EXTRACTED
  - community/aliexpress_connector/serverpy
---

# Keep only a real https photo URL; lazy placeholders are data: URIs.

## Connections
- [[_https_image_url()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/EXTRACTED #community/aliexpress_connector/serverpy
import { listenService } from "@peremena/service-kit";

import { buildIdentityApp } from "./app.js";

await listenService(buildIdentityApp({ logger: true }), 3002);

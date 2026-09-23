import { listenService } from "@peremena/service-kit";

import { buildAnalysisApp } from "./app.js";

await listenService(buildAnalysisApp({ logger: true }), 3004);

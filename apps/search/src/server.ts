import { listenService } from "@peremena/service-kit";

import { buildSearchApp } from "./app.js";

await listenService(buildSearchApp({ logger: true }), 3003);

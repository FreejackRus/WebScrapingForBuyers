import { listenService } from "@peremena/service-kit";

import { buildGatewayApp } from "./app.js";

await listenService(buildGatewayApp({ logger: true }), 3001);

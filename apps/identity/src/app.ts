import { createService } from "@peremena/service-kit";

import type { AuthStore } from "./domain/auth-store.js";
import { identityRoutes } from "./http/routes.js";
import { MemoryAuthStore } from "./infrastructure/memory-auth-store.js";

export function buildIdentityApp(options: { authStore?: AuthStore; logger?: boolean } = {}) {
  const app = createService({ logger: options.logger ?? false, cookies: true });
  const authStore = options.authStore ?? MemoryAuthStore.fromEnv();
  void app.register(identityRoutes, { authStore });
  return app;
}

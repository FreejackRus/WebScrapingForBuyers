import type { FastifyPluginAsync } from "fastify";

import type { QualityEvaluator } from "../application/quality-eval.js";
import type { SourceMonitor } from "../application/source-monitor.js";

/** Internal monitoring routes; the gateway exposes them to admins only. */
export const reliabilityRoutes: FastifyPluginAsync<{ monitor: SourceMonitor; quality: QualityEvaluator }> = async (
  app,
  { monitor, quality },
) => {
  app.get("/health/sources", async () => monitor.report());
  app.get("/quality", async () => quality.report());
  app.post("/quality/run", async (_request, reply) => {
    const started = quality.trigger();
    return reply.code(started ? 202 : 409).send({ started, ...(await quality.report()) });
  });
};

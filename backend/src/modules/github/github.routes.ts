import type { FastifyInstance } from "fastify";
import { importGithubRepository } from "./github.service.js";

export async function githubRoutes(app: FastifyInstance) {
  app.post("/api/github/import", async (request, reply) => {
    const body = request.body as { url?: string };

    if (!body?.url || typeof body.url !== "string") {
      return reply.code(400).send({ error: "url is required" });
    }

    try {
      return await importGithubRepository(body.url);
    } catch (error) {
      request.log.error(error);
      const status = (error as Error & { status?: number }).status;

      if (status === 404) return reply.code(404).send({ error: "GitHub repository not found" });
      if (status === 401 || status === 403) {
        return reply.code(503).send({ error: "GitHub access denied. Configure GITHUB_TOKEN for private repositories." });
      }
      if (error instanceof Error && error.message.includes("Invalid")) {
        return reply.code(400).send({ error: error.message });
      }
      return reply.code(502).send({ error: "GitHub import failed" });
    }
  });
}

import type { FastifyInstance } from "fastify";
import { importGithubRepository, uploadProjectImage } from "./github.service.js";

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

  app.post("/api/github/upload", async (request, reply) => {
    const uploadSecret = process.env.GITHUB_UPLOAD_SECRET;

    if (!uploadSecret) {
      request.log.error("GITHUB_UPLOAD_SECRET is not configured");
      return reply.code(503).send({ error: "GitHub upload is not configured" });
    }

    const providedSecret = request.headers["x-github-upload-secret"];
    if (providedSecret !== uploadSecret) {
      return reply.code(401).send({ error: "Unauthorized" });
    }

    const contentType = request.headers["content-type"];
    if (!contentType?.toLowerCase().startsWith("multipart/form-data")) {
      return reply.code(400).send({ error: "Content-Type must be multipart/form-data" });
    }

    try {
      const file = await request.file();

      if (!file) {
        return reply.code(400).send({ error: "Image file is required" });
      }

      const buffer = await file.toBuffer();
      const result = await uploadProjectImage({
        fileName: file.filename,
        contentType: file.mimetype,
        buffer,
      });

      return reply.code(201).send(result);
    } catch (error) {
      request.log.error(error);
      const status = (error as Error & { status?: number }).status;

      if (status === 401 || status === 403) {
        return reply.code(503).send({ error: "GitHub access denied" });
      }

      if (error instanceof Error) {
        const validationErrors = [
          "Invalid image filename",
          "Unsupported image type",
          "Image extension does not match",
          "Image file is empty",
          "Image is too large",
          "GITHUB_TOKEN is not configured",
        ];

        if (validationErrors.some((message) => error.message.includes(message))) {
          return reply.code(400).send({ error: error.message });
        }
      }

      return reply.code(502).send({ error: "GitHub image upload failed" });
    }
  });
}

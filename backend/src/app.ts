import cors from "@fastify/cors";
import Fastify from "fastify";
import { projectRoutes } from "./modules/projects/project.routes.js";

export function buildApp() {
  const app = Fastify({ logger: true });

  app.register(cors, {
    origin: true,
  });

  app.get("/health", async () => ({
    status: "ok",
    service: "portfolio-platform-backend",
  }));

  app.register(projectRoutes);

  return app;
}

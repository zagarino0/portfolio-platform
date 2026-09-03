import cors from "@fastify/cors";

import Fastify from "fastify";

import { githubRoutes } from "./modules/github/github.routes.js";

import { projectRoutes } from "./modules/projects/project.routes.js";

export function buildApp() {
  const app = Fastify({
    logger: true,
  });

  app.register(cors, {
  origin: process.env.CORS_ORIGIN ?? "http://localhost:5173",
  methods: [
    "GET",
    "POST",
    "PATCH",
    "PUT",
    "DELETE",
    "OPTIONS",
  ],
});

  app.get("/health", async () => ({
    status: "ok",
    service: "portfolio-platform-backend",
  }));

  app.register(projectRoutes);

  app.register(githubRoutes);

  return app;
}
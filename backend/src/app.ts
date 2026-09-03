import cors from "@fastify/cors";

import Fastify from "fastify";

import { githubRoutes } from "./modules/github/github.routes.js";

import { projectRoutes } from "./modules/projects/project.routes.js";

export function buildApp() {
  const app = Fastify({
    logger: true,
  });

const allowedOrigins = (
  process.env.CORS_ORIGIN ?? "http://localhost:5173"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.register(cors, {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error("Origin not allowed"), false);
  },
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
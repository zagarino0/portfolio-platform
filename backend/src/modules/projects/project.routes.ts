import type { FastifyInstance } from "fastify";
import { ProjectStatus, ProjectType } from "@prisma/client";
import {
  createProject,
  deleteProject,
  getProjectById,
  getProjectBySlug,
  listProjects,
  setFeatured,
  setPublished,
  updateProject,
} from "./project.service.js";
import type { CreateProjectInput, UpdateProjectInput } from "./project.types.js";

const projectStatuses = new Set(Object.values(ProjectStatus));
const projectTypes = new Set(Object.values(ProjectType));

function validateProjectInput(body: Partial<CreateProjectInput>, partial = false) {
  const required = ["slug", "title", "category", "description", "role", "problem", "solution", "results", "technologies", "type"] as const;

  if (!partial) {
    for (const field of required) {
      if (body[field] === undefined || body[field] === null || body[field] === "") {
        return `Missing required field: ${field}`;
      }
    }
  }

  if (body.type !== undefined && !projectTypes.has(body.type)) {
    return `Invalid type: ${body.type}`;
  }

  if (body.status !== undefined && !projectStatuses.has(body.status)) {
    return `Invalid status: ${body.status}`;
  }

  if (body.results !== undefined && !Array.isArray(body.results)) {
    return "results must be an array";
  }

  if (body.technologies !== undefined && !Array.isArray(body.technologies)) {
    return "technologies must be an array";
  }

  return null;
}

export async function projectRoutes(app: FastifyInstance) {
  app.get("/api/projects", async (request) => {
    const query = request.query as { published?: string };
    return listProjects({ publishedOnly: query.published === "true" });
  });

  app.get("/api/projects/:slug", async (request, reply) => {
    const { slug } = request.params as { slug: string };
    const query = request.query as { published?: string };
    const project = await getProjectBySlug(slug, query.published === "true");

    if (!project) {
      return reply.code(404).send({ error: "Project not found" });
    }

    return project;
  });

  app.post("/api/projects", async (request, reply) => {
    const body = request.body as CreateProjectInput;
    const validationError = validateProjectInput(body);

    if (validationError) {
      return reply.code(400).send({ error: validationError });
    }

    try {
      return reply.code(201).send(await createProject(body));
    } catch (error) {
      request.log.error(error);
      return reply.code(409).send({ error: "Could not create project. Slug may already exist." });
    }
  });

  app.patch("/api/projects/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const body = request.body as UpdateProjectInput;
    const validationError = validateProjectInput(body, true);

    if (validationError) {
      return reply.code(400).send({ error: validationError });
    }

    const existing = await getProjectById(id);
    if (!existing) {
      return reply.code(404).send({ error: "Project not found" });
    }

    try {
      return await updateProject(id, body);
    } catch (error) {
      request.log.error(error);
      return reply.code(409).send({ error: "Could not update project." });
    }
  });

  app.delete("/api/projects/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const existing = await getProjectById(id);

    if (!existing) {
      return reply.code(404).send({ error: "Project not found" });
    }

    await deleteProject(id);
    return reply.code(204).send();
  });

  app.patch("/api/projects/:id/publish", async (request, reply) => {
    const { id } = request.params as { id: string };
    const body = request.body as { published?: boolean };

    if (typeof body.published !== "boolean") {
      return reply.code(400).send({ error: "published must be a boolean" });
    }

    const existing = await getProjectById(id);
    if (!existing) return reply.code(404).send({ error: "Project not found" });

    return setPublished(id, body.published);
  });

  app.patch("/api/projects/:id/featured", async (request, reply) => {
    const { id } = request.params as { id: string };
    const body = request.body as { featured?: boolean };

    if (typeof body.featured !== "boolean") {
      return reply.code(400).send({ error: "featured must be a boolean" });
    }

    const existing = await getProjectById(id);
    if (!existing) return reply.code(404).send({ error: "Project not found" });

    return setFeatured(id, body.featured);
  });
}

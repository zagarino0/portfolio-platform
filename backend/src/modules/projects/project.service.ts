import { prisma } from "../../lib/prisma.js";

import type {
  CreateProjectInput,
  UpdateProjectInput,
} from "./project.types.js";

export async function listProjects(options?: {
  publishedOnly?: boolean;
}) {
  return prisma.project.findMany({
    where: options?.publishedOnly
      ? { published: true }
      : undefined,
    orderBy: [
      { featured: "desc" },
      { updatedAt: "desc" },
    ],
  });
}

export async function getProjectBySlug(
  slug: string,
  publishedOnly = false,
) {
  return prisma.project.findFirst({
    where: {
      slug,
      ...(publishedOnly
        ? { published: true }
        : {}),
    },
  });
}

export async function getProjectById(id: string) {
  return prisma.project.findUnique({
    where: { id },
  });
}

export async function createProject(
  data: CreateProjectInput,
) {
  return prisma.project.create({
    data,
  });
}

export async function updateProject(
  id: string,
  data: UpdateProjectInput,
) {
  return prisma.project.update({
    where: { id },
    data,
  });
}

export async function deleteProject(id: string) {
  return prisma.project.delete({
    where: { id },
  });
}

export async function setPublished(
  id: string,
  published: boolean,
) {
  return prisma.project.update({
    where: { id },
    data: { published },
  });
}

export async function setFeatured(
  id: string,
  featured: boolean,
) {
  return prisma.project.update({
    where: { id },
    data: { featured },
  });
}
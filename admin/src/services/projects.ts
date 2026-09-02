import { api } from "./api";
import type { Project } from "../types/project";

export function getProjects() {
  return api<Project[]>("/api/projects");
}

export function getProjectBySlug(slug: string) {
  return api<Project>(`/api/projects/${slug}`);
}

export function createProject(project: Project) {
  return api<Project>("/api/projects", {
    method: "POST",
    body: JSON.stringify(project),
  });
}

export function updateProject(
  id: string,
  project: Partial<Project>,
) {
  return api<Project>(`/api/projects/${id}`, {
    method: "PATCH",
    body: JSON.stringify(project),
  });
}

export function deleteProject(id: string) {
  return api<void>(`/api/projects/${id}`, {
    method: "DELETE",
  });
}

export function setProjectPublished(
  id: string,
  published: boolean,
) {
  return api<void>(
    `/api/projects/${id}/publish`,
    {
      method: "PATCH",
      body: JSON.stringify({ published }),
    },
  );
}

export function setProjectFeatured(
  id: string,
  featured: boolean,
) {
  return api<Project>(
    `/api/projects/${id}/featured`,
    {
      method: "PATCH",
      body: JSON.stringify({ featured }),
    },
  );
}

const API_URL =
  import.meta.env.VITE_API_URL ??
  "http://localhost:4000";

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  role: string;
  type: string;
  status: string;
  problem: string;
  solution: string;
  results: string[];
  technologies: string[];
  image?: string | null;
  liveUrl?: string | null;
  githubUrl?: string | null;
  githubOwner?: string | null;
  githubRepository?: string | null;
  githubBranch?: string | null;
  featured: boolean;
  published: boolean;
}

export async function getPublishedProjects(): Promise<Project[]> {
  const response = await fetch(
    `${API_URL}/api/projects?published=true`,
  );

  if (!response.ok) {
    throw new Error(
      `Impossible de charger les projets : ${response.status}`,
    );
  }

  return response.json();
}

export async function getPublishedProjectBySlug(
  slug: string,
): Promise<Project> {
  const response = await fetch(
    `${API_URL}/api/projects/${encodeURIComponent(slug)}?published=true`,
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Projet introuvable.");
    }

    throw new Error(
      `Impossible de charger le projet : ${response.status}`,
    );
  }

  return response.json();
}


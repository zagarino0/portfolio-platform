import type { ProjectStatus, ProjectType } from "@prisma/client";

export interface CreateProjectInput {
  slug: string;
  title: string;
  category: string;
  description: string;
  role: string;
  type: ProjectType;
  status?: ProjectStatus;
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
  featured?: boolean;
  published?: boolean;
}

export type UpdateProjectInput = Partial<CreateProjectInput>;

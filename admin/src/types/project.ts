export type ProjectStatus =
  | "IN_PROGRESS"
  | "COMPLETED"
  | "PRODUCTION"
  | "ARCHIVED";

export type ProjectType =
  | "WEBSITE"
  | "WEB_APP"
  | "MOBILE"
  | "BACKEND"
  | "OTHER";

export interface Project {
  id?: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  role: string;
  type: ProjectType;
  status: ProjectStatus;
  problem: string;
  solution: string;
  results: string[];
  technologies: string[];
  image: string | null;
  liveUrl: string | null;
  githubUrl: string | null;
  githubOwner: string | null;
  githubRepository: string | null;
  githubBranch: string | null;
  featured: boolean;
  published: boolean;
}
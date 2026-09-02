import { api } from "./api";
import type { Project } from "../types/project";

export interface GithubImportResponse {
  repository: {
    owner: string;
    name: string;
    url: string;
    description: string | null;
    defaultBranch: string;
    language: string | null;
    languages: string[];
    topics: string[];
    stars: number;
    forks: number;
    license: string | null;
    createdAt: string;
    updatedAt: string;
  };
  readme: string;
  project: Project;
}

export function importGithubRepository(url: string) {
  return api<GithubImportResponse>("/api/github/import", {
    method: "POST",
    body: JSON.stringify({ url }),
  });
}
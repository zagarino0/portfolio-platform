import type { GithubImportResult } from "./github.types.js";

const GITHUB_API = "https://api.github.com";

type GithubRepository = {
  name: string;
  html_url: string;
  description: string | null;
  default_branch: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics?: string[];
  license?: { spdx_id?: string | null } | null;
  created_at: string;
  updated_at: string;
};

type GithubApiError = Error & { status?: number };

function githubHeaders(): Record<string, string> {
  const token = process.env.GITHUB_TOKEN;
  return {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

function parseRepositoryUrl(rawUrl: string) {
  let url: URL;
  try { url = new URL(rawUrl); } catch { throw new Error("Invalid GitHub URL"); }
  if (url.protocol !== "https:" || url.hostname !== "github.com") throw new Error("URL must point to https://github.com");
  const parts = url.pathname.split("/").filter(Boolean);
  if (parts.length < 2) throw new Error("Invalid GitHub repository URL");
  const owner = parts[0];
  const repository = parts[1].replace(/\.git$/, "");
  if (!/^[A-Za-z0-9_.-]+$/.test(owner) || !/^[A-Za-z0-9_.-]+$/.test(repository)) throw new Error("Invalid GitHub repository");
  return { owner, repository };
}

async function githubGet<T>(path: string): Promise<T> {
  const response = await fetch(`${GITHUB_API}${path}`, { headers: githubHeaders() });
  if (!response.ok) {
    const error = new Error(`GitHub API returned ${response.status}`) as GithubApiError;
    error.status = response.status;
    throw error;
  }
  return response.json() as Promise<T>;
}

function toSlug(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

async function fetchReadme(owner: string, repository: string) {
  const response = await fetch(`${GITHUB_API}/repos/${owner}/${repository}/readme`, {
    headers: { ...githubHeaders(), Accept: "application/vnd.github.raw+json" },
  });
  if (!response.ok) return "";
  return response.text();
}

export async function importGithubRepository(rawUrl: string): Promise<GithubImportResult> {
  const { owner, repository } = parseRepositoryUrl(rawUrl);
  const repo = await githubGet<GithubRepository>(`/repos/${owner}/${repository}`);
  const languages = await githubGet<Record<string, number>>(`/repos/${owner}/${repository}/languages`);
  const topics = await githubGet<{ names: string[] }>(`/repos/${owner}/${repository}/topics`);
  const readme = await fetchReadme(owner, repository);
  const technologies = Object.keys(languages);

  return {
    repository: {
      owner, name: repo.name, url: repo.html_url, description: repo.description,
      defaultBranch: repo.default_branch, language: repo.language, languages: technologies,
      topics: topics.names ?? [], stars: repo.stargazers_count, forks: repo.forks_count,
      license: repo.license?.spdx_id ?? null, createdAt: repo.created_at, updatedAt: repo.updated_at,
    },
    readme,
    project: {
      slug: toSlug(repo.name), title: repo.name, category: "", description: repo.description ?? "",
      role: "", type: "OTHER", status: "IN_PROGRESS", problem: "", solution: "", results: [],
      technologies, image: null, liveUrl: null, githubUrl: repo.html_url, githubOwner: owner,
      githubRepository: repo.name, githubBranch: repo.default_branch, featured: false, published: false,
    },
  };
}

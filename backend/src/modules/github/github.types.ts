export interface GithubRepositoryMetadata {
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
}

export interface GithubImportResult {
  repository: GithubRepositoryMetadata;
  readme: string;
  project: {
    slug: string;
    title: string;
    category: string;
    description: string;
    role: string;
    type: "OTHER";
    status: "IN_PROGRESS";
    problem: string;
    solution: string;
    results: string[];
    technologies: string[];
    image: null;
    liveUrl: null;
    githubUrl: string;
    githubOwner: string;
    githubRepository: string;
    githubBranch: string;
    featured: false;
    published: false;
  };
}

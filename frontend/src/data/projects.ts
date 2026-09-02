export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  problem: string;
  solution: string;
  results: string[];
  technologies: string[];
  role: string;
  type: string;
  status: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "digital-work",
    title: "Digital Work",
    category: "Plateforme digitale",
    description:
      "Application web pensée pour centraliser les opérations, automatiser les tâches répétitives et améliorer la visibilité sur l'activité.",
    problem:
      "Des informations et processus dispersés compliquent le pilotage et augmentent les manipulations manuelles.",
    solution:
      "Une plateforme structurée autour des flux métier, avec une architecture extensible pour les automatisations et les intégrations IA.",
    results: [
      "Moins de tâches manuelles",
      "Données mieux centralisées",
      "Architecture prête à évoluer",
    ],
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "API", "IA"],
    role: "Conception · Développement",
    type: "Application Web",
    status: "Production",
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
];

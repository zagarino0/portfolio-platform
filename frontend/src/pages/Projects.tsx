import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getPublishedProjects,
  type Project,
} from "../services/projects";

export function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadProjects() {
      try {
        setLoading(true);
        setError("");

        const data = await getPublishedProjects();

        if (mounted) {
          setProjects(data);
        }
      } catch (err) {
        console.error("PROJECTS PAGE ERROR:", err);

        if (mounted) {
          setError(
            err instanceof Error
              ? err.message
              : "Impossible de charger les projets.",
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadProjects();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main className="section projects-page">
      <div className="container">
        <header className="section-heading">
          <span className="eyebrow">
            01 / Projets
          </span>

          <h1>
            Tous les projets
            <br />
            publiés.
          </h1>

          <p>
            Une sélection de produits numériques conçus,
            développés et déployés avec une approche orientée
            produit.
          </p>
        </header>

        {loading && (
          <div className="projects-grid">
            <div className="project-card project-card--loading">
              <span className="eyebrow">Chargement</span>
              <p>Chargement des projets...</p>
            </div>
          </div>
        )}

        {!loading && error && (
          <div className="projects-grid">
            <div className="project-card project-card--error">
              <span className="eyebrow">Erreur</span>
              <p>{error}</p>
            </div>
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div className="projects-grid">
            <div className="project-card">
              <span className="eyebrow">Portfolio</span>
              <p>
                Aucun projet publié pour le moment.
              </p>
            </div>
          </div>
        )}

        {!loading && !error && projects.length > 0 && (
          <div className="projects-grid projects-page__grid">
            {projects.map((project) => (
              <article
                key={project.id}
                className={`project-card ${
                  project.featured
                    ? "project-card--featured"
                    : ""
                }`}
              >
                <div className="project-card__top">
                  <div className="project-card__badges">
                    <span className="project-card__badge">
                      {project.category}
                    </span>

                    {project.featured && (
                      <span className="project-card__badge project-card__badge--featured">
                        Featured
                      </span>
                    )}
                  </div>
                </div>

                {project.image && (
                  <div className="project-card__image">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                    />
                  </div>
                )}

                <div className="project-card__content">
                  <h2>{project.title}</h2>

                  {project.description && (
                    <p>{project.description}</p>
                  )}
                </div>

                {project.technologies?.length > 0 && (
                  <div className="project-card__technologies">
                    {project.technologies.map(
                      (technology) => (
                        <span key={technology}>
                          {technology}
                        </span>
                      ),
                    )}
                  </div>
                )}

                <Link
                  className="project-card__link"
                  to={`/projets/${project.slug}`}
                >
                  Voir le projet
                  <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
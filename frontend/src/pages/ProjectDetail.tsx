
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  getPublishedProjectBySlug,
  type Project,
} from "../services/projects";

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadProject() {
      try {
        setLoading(true);
        setError("");

        if (!slug) {
          throw new Error("Projet introuvable.");
        }

        const data = await getPublishedProjectBySlug(slug);

        if (mounted) {
          setProject(data);
        }
      } catch (err) {
        console.error(
          "Erreur lors du chargement du projet :",
          err,
        );

        if (mounted) {
          setError(
            err instanceof Error
              ? err.message
              : "Impossible de charger le projet.",
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadProject();

    return () => {
      mounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <main className="section">
        <div className="container">
          <div className="project-detail-state">
            <span className="eyebrow">Projet / Chargement</span>
            <strong>Chargement du projet…</strong>
            <span>
              Récupération des informations du projet.
            </span>
          </div>
        </div>
      </main>
    );
  }

  if (error || !project) {
    return (
      <main className="section">
        <div className="container">
          <div className="project-detail-state">
            <span className="eyebrow">Projet / 404</span>

            <strong>
              {error || "Projet introuvable."}
            </strong>

            <Link className="project-detail__back" to="/projets">
              ← Retour aux projets
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="section project-detail-page">
      <div className="container">
        <Link className="project-detail__back" to="/projets">
          ← Tous les projets
        </Link>

        <article className="project-detail">
          <div className="project-detail__information">
            <header className="project-detail__header">
              <div className="project-detail__badges">
                <span className="project-detail__badge">
                  {project.category}
                </span>

                {project.featured && (
                  <span className="project-detail__badge project-detail__badge--dark">
                    Featured
                  </span>
                )}
              </div>

              <span className="eyebrow">
                Projet / {project.type}
              </span>

              <h1>{project.title}</h1>

              {project.description && (
                <p className="project-detail__description">
                  {project.description}
                </p>
              )}
            </header>

            <div className="project-detail__metadata">
              <div>
                <span className="eyebrow">Rôle</span>
                <strong>{project.role}</strong>
              </div>

              <div>
                <span className="eyebrow">Type</span>
                <strong>{project.type}</strong>
              </div>

              <div>
                <span className="eyebrow">Statut</span>
                <strong>{project.status}</strong>
              </div>
            </div>

            <div className="project-detail__sections">
              <section className="project-detail__section">
                <span className="eyebrow">
                  01 / Problème
                </span>

                <p>{project.problem}</p>
              </section>

              <section className="project-detail__section">
                <span className="eyebrow">
                  02 / Solution
                </span>

                <p>{project.solution}</p>
              </section>

              {project.results?.length > 0 && (
                <section className="project-detail__section">
                  <span className="eyebrow">
                    03 / Résultats
                  </span>

                  <ul className="project-detail__results">
                    {project.results.map((result) => (
                      <li key={result}>{result}</li>
                    ))}
                  </ul>
                </section>
              )}

              {project.technologies?.length > 0 && (
                <section className="project-detail__section">
                  <span className="eyebrow">
                    Technologies
                  </span>

                  <div className="project-detail__technologies">
                    {project.technologies.map(
                      (technology) => (
                        <span key={technology}>
                          {technology}
                        </span>
                      ),
                    )}
                  </div>
                </section>
              )}
            </div>

            {(project.liveUrl || project.githubUrl) && (
              <div className="project-detail__links">
                {project.liveUrl && (
                  <a
                    className="project-detail__button"
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Voir le projet en ligne
                    <span aria-hidden="true">→</span>
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    className="project-detail__button project-detail__button--outline"
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Voir le repository
                    <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            )}
          </div>

          <div className="project-detail__visual">
            {project.image ? (
              <div className="project-detail__image">
                <img
                  src={project.image}
                  alt={project.title}
                />
              </div>
            ) : (
              <div className="project-detail__image project-detail__image--empty">
                <span className="eyebrow">
                  Aperçu du projet
                </span>
              </div>
            )}
          </div>
        </article>
      </div>
    </main>
  );
}

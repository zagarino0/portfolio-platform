
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FolderKanban,
  GitBranch,
  Plus,
  Star,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getProjects } from "../services/projects";
import type { Project } from "../types/project";

export function Dashboard() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true);
        setError("");

        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        console.error(
          "Erreur lors du chargement des projets :",
          err,
        );

        setError(
          err instanceof Error
            ? err.message
            : "Impossible de charger les projets.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  const statistics = useMemo(() => {
    const total = projects.length;

    const published = projects.filter(
      (project) => project.published,
    ).length;

    const featured = projects.filter(
      (project) => project.featured,
    ).length;

    const drafts = projects.filter(
      (project) => !project.published,
    ).length;

    return {
      total,
      published,
      featured,
      drafts,
    };
  }, [projects]);

  const recentProjects = useMemo(() => {
    return [...projects].slice(0, 5);
  }, [projects]);

  function handleProjectClick(project: Project) {
    if (!project.slug) {
      return;
    }

    navigate(`/projects/${project.slug}/edit`);
  }

  return (
    <section className="page-section dashboard-page">
      <header className="page-heading dashboard-heading">
        <div>
          <span className="admin-eyebrow">
            OVERVIEW
          </span>

          <h2>Tableau de bord</h2>

          <p>
            Une vue synthétique de votre portfolio et de
            l’état actuel de vos projets.
          </p>
        </div>
      </header>

      {error && (
        <div className="form-error">
          {error}
        </div>
      )}

      <div className="dashboard-stats">
        <article className="dashboard-stat-card">
          <div className="dashboard-stat-header">
            <span>PROJETS</span>
            <FolderKanban size={17} />
          </div>

          <strong>
            {loading ? "—" : statistics.total}
          </strong>

          <p>Total des projets enregistrés</p>
        </article>

        <article className="dashboard-stat-card">
          <div className="dashboard-stat-header">
            <span>PUBLIÉS</span>
            <CheckCircle2 size={17} />
          </div>

          <strong>
            {loading ? "—" : statistics.published}
          </strong>

          <p>Projets actuellement visibles</p>
        </article>

        <article className="dashboard-stat-card">
          <div className="dashboard-stat-header">
            <span>FEATURED</span>
            <Star size={17} />
          </div>

          <strong>
            {loading ? "—" : statistics.featured}
          </strong>

          <p>Projets mis en avant</p>
        </article>

        <article className="dashboard-stat-card">
          <div className="dashboard-stat-header">
            <span>BROUILLONS</span>
            <Clock3 size={17} />
          </div>

          <strong>
            {loading ? "—" : statistics.drafts}
          </strong>

          <p>Projets non publiés</p>
        </article>
      </div>

      <div className="dashboard-layout">
        <section className="dashboard-panel dashboard-projects">
          <div className="dashboard-panel-header">
            <div>
              <span className="section-label">
                PROJETS
              </span>

              <h3>Dernières modifications</h3>
            </div>

            <button
              type="button"
              className="dashboard-link"
              onClick={() => navigate("/projects")}
            >
              Voir tous
              <ArrowRight size={14} />
            </button>
          </div>

          {loading ? (
            <div className="dashboard-empty">
              <span>Chargement des projets…</span>
            </div>
          ) : recentProjects.length === 0 ? (
            <div className="dashboard-empty">
              <FolderKanban size={20} />

              <strong>
                Aucun projet pour le moment.
              </strong>

              <span>
                Commencez par créer votre premier projet.
              </span>

              <button
                type="button"
                className="secondary-button"
                onClick={() =>
                  navigate("/projects/new")
                }
              >
                <Plus size={15} />
                Créer un projet
              </button>
            </div>
          ) : (
            <div className="dashboard-project-list">
              {recentProjects.map((project) => (
                <button
                  key={project.id ?? project.slug}
                  type="button"
                  className="dashboard-project-row"
                  onClick={() =>
                    handleProjectClick(project)
                  }
                >
                  <div className="dashboard-project-main">
                    <span className="dashboard-project-category">
                      {project.category}
                    </span>

                    <strong>
                      {project.title}
                    </strong>

                    <span className="dashboard-project-slug">
                      /{project.slug}
                    </span>
                  </div>

                  <div className="dashboard-project-status">
                    {project.featured && (
                      <span>Featured</span>
                    )}

                    <span
                      className={
                        project.published
                          ? "is-published"
                          : "is-draft"
                      }
                    >
                      {project.published
                        ? "Publié"
                        : "Brouillon"}
                    </span>

                    <ArrowRight size={15} />
                  </div>
                </button>
              ))}
            </div>
          )}
        </section>

        <aside className="dashboard-panel dashboard-actions">
          <div className="dashboard-panel-header">
            <div>
              <span className="section-label">
                ACTIONS
              </span>

              <h3>Accès rapides</h3>
            </div>
          </div>

          <div className="dashboard-action-list">
            <button
              type="button"
              className="dashboard-action"
              onClick={() =>
                navigate("/projects/new")
              }
            >
              <span className="dashboard-action-icon">
                <Plus size={17} />
              </span>

              <span>
                <strong>Nouveau projet</strong>
                <small>
                  Ajouter une réalisation au portfolio
                </small>
              </span>

              <ArrowRight size={15} />
            </button>

            <button
              type="button"
              className="dashboard-action"
              onClick={() => navigate("/projects")}
            >
              <span className="dashboard-action-icon">
                <FolderKanban size={17} />
              </span>

              <span>
                <strong>Gérer les projets</strong>
                <small>
                  Modifier, publier ou mettre en avant
                </small>
              </span>

              <ArrowRight size={15} />
            </button>

            <button
              type="button"
              className="dashboard-action"
              onClick={() =>
                navigate("/projects/import/github")
              }
            >
              <span className="dashboard-action-icon">
                <GitBranch size={17} />
              </span>

              <span>
                <strong>Importer depuis GitHub</strong>
                <small>
                  Créer un projet à partir d'un dépôt
                </small>
              </span>

              <ArrowRight size={15} />
            </button>
          </div>
        </aside>
      </div>

      {!loading && projects.length > 0 && (
        <div className="dashboard-footer">
          <span>
            {statistics.published} projet
            {statistics.published > 1 ? "s" : ""} publié
            {statistics.published > 1 ? "s" : ""}
          </span>

          <span>·</span>

          <span>
            {statistics.featured} mis
            {statistics.featured > 1 ? "s" : ""} en avant
          </span>

          <span>·</span>

          <span>
            {statistics.drafts} brouillon
            {statistics.drafts > 1 ? "s" : ""}
          </span>
        </div>
      )}
    </section>
  );
}


import { useEffect, useState } from "react";

import { Pencil, Trash2 } from "lucide-react";

import { useNavigate } from "react-router-dom";

import {
  deleteProject,
  getProjects,
  setProjectFeatured,
  setProjectPublished,
} from "../services/projects";

import type { Project } from "../types/project";

export function Projects() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadProjects() {
      try {
        setLoading(true);
        setError("");

        const data = await getProjects();

        if (mounted) {
          setProjects(data);
        }
      } catch (err) {
        console.error(
          "Erreur lors du chargement des projets :",
          err,
        );

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

  function handleEdit(project: Project) {
    navigate(`/projects/${project.slug}/edit`);
  }

  async function handleDelete(project: Project) {
    if (!project.id) {
      setError(
        "Impossible de supprimer ce projet : identifiant manquant.",
      );
      return;
    }

    const confirmed = window.confirm(
      `Voulez-vous vraiment supprimer le projet « ${project.title} » ?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await deleteProject(project.id);

      setProjects((currentProjects) =>
        currentProjects.filter(
          (currentProject) =>
            currentProject.id !== project.id,
        ),
      );
    } catch (err) {
      console.error(
        "Erreur lors de la suppression du projet :",
        err,
      );

      setError(
        err instanceof Error
          ? err.message
          : "Impossible de supprimer le projet.",
      );
    }
  }
 async function handleTogglePublished(project: Project) {
  if (!project.id) {
    setError(
      "Impossible de modifier la publication : identifiant manquant.",
    );
    return;
  }

  try {
    setError("");

    const published = !project.published;

    

    await setProjectPublished(
      project.id,
      published,
    );



    setProjects((currentProjects) =>
      currentProjects.map((currentProject) =>
        currentProject.id === project.id
          ? {
              ...currentProject,
              published,
            }
          : currentProject,
      ),
    );

  } catch (err) {
    console.error("PUBLISH ERROR:", err);

    setError(
      err instanceof Error
        ? err.message
        : "Impossible de modifier la publication du projet.",
    );
  }
}

async function handleToggleFeatured(project: Project) {
  if (!project.id) {
    setError(
      "Impossible de modifier le statut Featured : identifiant manquant.",
    );
    return;
  }

  try {
    setError("");

    const updatedProject = await setProjectFeatured(
      project.id,
      !project.featured,
    );

    setProjects((currentProjects) =>
      currentProjects.map((currentProject) =>
        currentProject.id === project.id
          ? updatedProject
          : currentProject,
      ),
    );
  } catch (err) {
    console.error(
      "Erreur lors de la modification du statut Featured :",
      err,
    );

    setError(
      err instanceof Error
        ? err.message
        : "Impossible de modifier le statut Featured du projet.",
    );
  }
}

  return (
    <section className="page-section">
      <div className="page-heading">
        <span className="admin-eyebrow">
          CONTENT
        </span>

        <h2>Projets</h2>

        <p>
          Gérez les projets présentés sur votre
          portfolio.
        </p>
      </div>

      {loading && (
        <div className="empty-state">
          <strong>
            Chargement des projets…
          </strong>

          <span>
            Récupération des projets depuis le
            serveur.
          </span>
        </div>
      )}

      {!loading && error && (
        <div className="empty-state">
          <strong>
            Impossible de charger les projets
          </strong>

          <span>{error}</span>
        </div>
      )}

      {!loading &&
        !error &&
        projects.length === 0 && (
          <div className="empty-state">
            <strong>
              Aucun projet chargé
            </strong>

            <span>
              L'import GitHub permettra de créer
              rapidement votre premier projet.
            </span>
          </div>
        )}

      {!loading &&
        !error &&
        projects.length > 0 && (
          <div className="projects-list">
            {projects.map((project) => (
              <article
                key={
                  project.id ?? project.slug
                }
                className="project-card"
              >
                <div className="project-card-content">
                  <span className="admin-eyebrow">
                    {project.category}
                  </span>

                  <h3>{project.title}</h3>

                  <p>
                    {project.description}
                  </p>

                  <div className="project-card-meta">
                    <span>
                      Type : {project.type}
                    </span>

                    <span>
                      Statut : {project.status}
                    </span>

                    <span>
                      Slug : {project.slug}
                    </span>
                  </div>
                </div>

                <div className="project-card-status">
                  {project.featured && (
                    <span>Featured</span>
                  )}

                  {project.published && (
                    <span>Publié</span>
                  )}
                </div>
<div className="project-card-actions">
  <button
    type="button"
    className="secondary-button"
    onClick={() =>
      handleTogglePublished(project)
    }
  >
    {project.published
      ? "Dépublier"
      : "Publier"}
  </button>

  <button
    type="button"
    className="secondary-button"
    onClick={() =>
      handleToggleFeatured(project)
    }
  >
    {project.featured
      ? "Retirer des favoris"
      : "Mettre en avant"}
  </button>

  <button
    type="button"
    className="secondary-button"
    onClick={() =>
      handleEdit(project)
    }
  >
    <Pencil size={15} />
    Modifier
  </button>

  <button
    type="button"
    className="secondary-button"
    onClick={() =>
      handleDelete(project)
    }
  >
    <Trash2 size={15} />
    Supprimer
  </button>
</div>
              </article>
            ))}
          </div>
        )}
    </section>
  );
}
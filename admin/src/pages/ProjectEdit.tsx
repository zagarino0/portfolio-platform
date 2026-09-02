import { useEffect, useState } from "react";

import type { FormEvent } from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  ArrowLeft,
  Plus,
  Save,
  X,
} from "lucide-react";

import {
  getProjectBySlug,
  updateProject,
} from "../services/projects";

import type {
  Project,
  ProjectStatus,
  ProjectType,
} from "../types/project";

const statusOptions: ProjectStatus[] = [
  "IN_PROGRESS",
  "COMPLETED",
  "PRODUCTION",
  "ARCHIVED",
];

const typeOptions: ProjectType[] = [
  "WEBSITE",
  "WEB_APP",
  "MOBILE",
  "BACKEND",
  "OTHER",
];

export default function ProjectEdit() {
  const navigate = useNavigate();

  const { slug } = useParams<{
    slug: string;
  }>();

  const [form, setForm] =
    useState<Project | null>(null);

  const [
    technologyInput,
    setTechnologyInput,
  ] = useState("");

  const [
    resultInput,
    setResultInput,
  ] = useState("");

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");
useEffect(() => {
  if (!slug) {
    setError("Slug du projet introuvable.");
    setLoading(false);
    return;
  }

  const projectSlug = slug;

  let mounted = true;

  async function loadProject() {
    try {
      setLoading(true);
      setError("");

      const project =
        await getProjectBySlug(projectSlug);

      if (mounted) {
        setForm(project);
      }
    } catch (err) {
      console.error(
        "LOAD PROJECT ERROR",
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

  function updateField<
    K extends keyof Project
  >(
    field: K,
    value: Project[K],
  ) {
    setForm((current) => {
      if (!current) {
        return current;
      }

      return {
        ...current,
        [field]: value,
      };
    });
  }

  function addTechnology() {
    if (!form) {
      return;
    }

    const technology =
      technologyInput.trim();

    if (!technology) {
      return;
    }

    const alreadyExists =
      form.technologies.some(
        (item) =>
          item.toLowerCase() ===
          technology.toLowerCase(),
      );

    if (alreadyExists) {
      setTechnologyInput("");
      return;
    }

    updateField("technologies", [
      ...form.technologies,
      technology,
    ]);

    setTechnologyInput("");
  }

  function removeTechnology(
    technology: string,
  ) {
    if (!form) {
      return;
    }

    updateField(
      "technologies",
      form.technologies.filter(
        (item) => item !== technology,
      ),
    );
  }

  function addResult() {
    if (!form) {
      return;
    }

    const result =
      resultInput.trim();

    if (!result) {
      return;
    }

    updateField("results", [
      ...form.results,
      result,
    ]);

    setResultInput("");
  }

  function removeResult(index: number) {
    if (!form) {
      return;
    }

    updateField(
      "results",
      form.results.filter(
        (_, resultIndex) =>
          resultIndex !== index,
      ),
    );
  }

  function handleTechnologyKeyDown(
    event: React.KeyboardEvent<HTMLInputElement>,
  ) {
    if (event.key === "Enter") {
      event.preventDefault();

      addTechnology();
    }
  }

  function handleResultKeyDown(
    event: React.KeyboardEvent<HTMLInputElement>,
  ) {
    if (event.key === "Enter") {
      event.preventDefault();

      addResult();
    }
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!form) {
      return;
    }

    setError("");

    if (!form.id) {
      setError(
        "Identifiant du projet introuvable.",
      );

      return;
    }

    if (!form.title.trim()) {
      setError(
        "Le titre du projet est obligatoire.",
      );

      return;
    }

    if (!form.slug.trim()) {
      setError(
        "Le slug du projet est obligatoire.",
      );

      return;
    }

    if (!form.category.trim()) {
      setError(
        "La catégorie est obligatoire.",
      );

      return;
    }

    if (!form.description.trim()) {
      setError(
        "La description est obligatoire.",
      );

      return;
    }

    if (saving) {
      return;
    }

    setSaving(true);

    try {
      const updatedProject =
        await updateProject(
          form.id,
          {
            title: form.title.trim(),

            slug: form.slug.trim(),

            category:
              form.category.trim(),

            description:
              form.description.trim(),

            role: form.role.trim(),

            type: form.type,

            status: form.status,

            problem:
              form.problem.trim(),

            solution:
              form.solution.trim(),

            technologies:
              form.technologies.filter(
                Boolean,
              ),

            results:
              form.results.filter(
                Boolean,
              ),

            image: form.image,

            liveUrl: form.liveUrl,

            githubUrl:
              form.githubUrl,

            githubOwner:
              form.githubOwner,

            githubRepository:
              form.githubRepository,

            githubBranch:
              form.githubBranch,

            featured:
              form.featured,

            published:
              form.published,
          },
        );

      console.log(
        "PROJECT UPDATED",
        updatedProject,
      );

      navigate("/projects", {
        replace: true,
      });
    } catch (err) {
      console.error(
        "UPDATE PROJECT ERROR",
        err,
      );

      setError(
        err instanceof Error
          ? err.message
          : "Impossible de modifier le projet.",
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="admin-page project-create-page">
        <div className="page-header">
          <button
            type="button"
            className="back-button"
            onClick={() =>
              navigate("/projects")
            }
          >
            <ArrowLeft size={16} />
            Retour aux projets
          </button>

          <div className="eyebrow">
            PROJET
          </div>

          <h1>
            Chargement du projet...
          </h1>

          <p>
            Récupération des informations
            du projet.
          </p>
        </div>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="admin-page project-create-page">
        <div className="page-header">
          <button
            type="button"
            className="back-button"
            onClick={() =>
              navigate("/projects")
            }
          >
            <ArrowLeft size={16} />
            Retour aux projets
          </button>

          <div className="eyebrow">
            PROJET
          </div>

          <h1>
            Projet introuvable
          </h1>

          <p>
            {error ||
              "Impossible de récupérer ce projet."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page project-create-page">
      <div className="page-header">
        <div>
          <button
            type="button"
            className="back-button"
            onClick={() =>
              navigate("/projects")
            }
          >
            <ArrowLeft size={16} />
            Retour aux projets
          </button>

          <div className="eyebrow">
            PROJET
          </div>

          <h1>
            Modifier le projet
          </h1>

          <p>
            Modifiez les informations de{" "}
            <strong>
              {form.title}
            </strong>
            .
          </p>
        </div>
      </div>

      {error && (
        <div className="form-error">
          {error}
        </div>
      )}

      <form
        className="project-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <section className="form-section">
          <div className="section-heading">
            <span className="section-number">
              01
            </span>

            <div>
              <h2>
                Informations générales
              </h2>

              <p>
                Les informations principales
                du projet.
              </p>
            </div>
          </div>

          <div className="form-grid">
            <label className="field field-full">
              <span>Titre *</span>

              <input
                type="text"
                value={form.title}
                onChange={(event) =>
                  updateField(
                    "title",
                    event.target.value,
                  )
                }
              />
            </label>

            <label className="field">
              <span>Slug *</span>

              <input
                type="text"
                value={form.slug}
                onChange={(event) =>
                  updateField(
                    "slug",
                    event.target.value
                      .toLowerCase()
                      .replace(
                        /\s+/g,
                        "-",
                      ),
                  )
                }
              />
            </label>

            <label className="field">
              <span>
                Catégorie *
              </span>

              <input
                type="text"
                value={form.category}
                onChange={(event) =>
                  updateField(
                    "category",
                    event.target.value,
                  )
                }
              />
            </label>

            <label className="field">
              <span>Rôle</span>

              <input
                type="text"
                value={form.role}
                onChange={(event) =>
                  updateField(
                    "role",
                    event.target.value,
                  )
                }
              />
            </label>

            <label className="field">
              <span>Type</span>

              <select
                value={form.type}
                onChange={(event) =>
                  updateField(
                    "type",
                    event.target
                      .value as ProjectType,
                  )
                }
              >
                {typeOptions.map(
                  (type) => (
                    <option
                      key={type}
                      value={type}
                    >
                      {type}
                    </option>
                  ),
                )}
              </select>
            </label>

            <label className="field">
              <span>Statut</span>

              <select
                value={form.status}
                onChange={(event) =>
                  updateField(
                    "status",
                    event.target
                      .value as ProjectStatus,
                  )
                }
              >
                {statusOptions.map(
                  (status) => (
                    <option
                      key={status}
                      value={status}
                    >
                      {status}
                    </option>
                  ),
                )}
              </select>
            </label>

            <label className="field field-full">
              <span>
                Description *
              </span>

              <textarea
                rows={6}
                value={form.description}
                onChange={(event) =>
                  updateField(
                    "description",
                    event.target.value,
                  )
                }
              />
            </label>
          </div>
        </section>

        <section className="form-section">
          <div className="section-heading">
            <span className="section-number">
              02
            </span>

            <div>
              <h2>
                Conception du projet
              </h2>

              <p>
                Le problème traité et la
                solution mise en place.
              </p>
            </div>
          </div>

          <div className="form-grid">
            <label className="field field-full">
              <span>
                Problème
              </span>

              <textarea
                rows={5}
                value={form.problem}
                onChange={(event) =>
                  updateField(
                    "problem",
                    event.target.value,
                  )
                }
              />
            </label>

            <label className="field field-full">
              <span>
                Solution
              </span>

              <textarea
                rows={5}
                value={form.solution}
                onChange={(event) =>
                  updateField(
                    "solution",
                    event.target.value,
                  )
                }
              />
            </label>
          </div>
        </section>

        <section className="form-section">
          <div className="section-heading">
            <span className="section-number">
              03
            </span>

            <div>
              <h2>
                Technologies
              </h2>

              <p>
                Gérez les technologies du
                projet.
              </p>
            </div>
          </div>

          <div className="technology-editor">
            <div className="tag-list">
              {form.technologies.map(
                (technology) => (
                  <span
                    className="tag"
                    key={technology}
                  >
                    {technology}

                    <button
                      type="button"
                      onClick={() =>
                        removeTechnology(
                          technology,
                        )
                      }
                      aria-label={`Supprimer ${technology}`}
                    >
                      <X size={13} />
                    </button>
                  </span>
                ),
              )}

              {!form.technologies.length && (
                <span className="empty-tags">
                  Aucune technologie.
                </span>
              )}
            </div>

            <div className="inline-input">
              <input
                type="text"
                value={technologyInput}
                onChange={(event) =>
                  setTechnologyInput(
                    event.target.value,
                  )
                }
                onKeyDown={
                  handleTechnologyKeyDown
                }
                placeholder="Ajouter une technologie..."
              />

              <button
                type="button"
                className="secondary-button"
                onClick={
                  addTechnology
                }
              >
                <Plus size={16} />
                Ajouter
              </button>
            </div>
          </div>
        </section>

        <section className="form-section">
          <div className="section-heading">
            <span className="section-number">
              04
            </span>

            <div>
              <h2>
                Résultats
              </h2>

              <p>
                Résultats ou bénéfices
                obtenus.
              </p>
            </div>
          </div>

          <div className="result-editor">
            {form.results.length >
              0 && (
              <ol className="result-list">
                {form.results.map(
                  (
                    result,
                    index,
                  ) => (
                    <li
                      key={`${result}-${index}`}
                    >
                      <span>
                        {result}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          removeResult(
                            index,
                          )
                        }
                        aria-label="Supprimer le résultat"
                      >
                        <X size={14} />
                      </button>
                    </li>
                  ),
                )}
              </ol>
            )}

            <div className="inline-input">
              <input
                type="text"
                value={resultInput}
                onChange={(event) =>
                  setResultInput(
                    event.target.value,
                  )
                }
                onKeyDown={
                  handleResultKeyDown
                }
                placeholder="Ajouter un résultat..."
              />

              <button
                type="button"
                className="secondary-button"
                onClick={addResult}
              >
                <Plus size={16} />
                Ajouter
              </button>
            </div>
          </div>
        </section>

        <section className="form-section">
          <div className="section-heading">
            <span className="section-number">
              05
            </span>

            <div>
              <h2>
                Liens et publication
              </h2>

              <p>
                Déploiement et publication du
                projet.
              </p>
            </div>
          </div>

          <div className="form-grid">
            <label className="field">
              <span>
                URL du site
              </span>

              <input
                type="url"
                value={
                  form.liveUrl ?? ""
                }
                onChange={(event) =>
                  updateField(
                    "liveUrl",
                    event.target.value ||
                      null,
                  )
                }
              />
            </label>

            <label className="field">
              <span>
                URL GitHub
              </span>

              <input
                type="url"
                value={
                  form.githubUrl ?? ""
                }
                onChange={(event) =>
                  updateField(
                    "githubUrl",
                    event.target.value ||
                      null,
                  )
                }
              />
            </label>

            <label className="field">
              <span>
                Image
              </span>

              <input
                type="url"
                value={
                  form.image ?? ""
                }
                onChange={(event) =>
                  updateField(
                    "image",
                    event.target.value ||
                      null,
                  )
                }
              />
            </label>

            <label className="field">
              <span>
                Branche GitHub
              </span>

              <input
                type="text"
                value={
                  form.githubBranch ??
                  ""
                }
                onChange={(event) =>
                  updateField(
                    "githubBranch",
                    event.target.value ||
                      null,
                  )
                }
              />
            </label>
          </div>

          <div className="publication-options">
            <label className="checkbox-field">
              <input
                type="checkbox"
                checked={
                  form.featured
                }
                onChange={(event) =>
                  updateField(
                    "featured",
                    event.target.checked,
                  )
                }
              />

              <span>
                <strong>
                  Projet mis en avant
                </strong>

                <small>
                  Afficher ce projet comme
                  réalisation principale.
                </small>
              </span>
            </label>

            <label className="checkbox-field">
              <input
                type="checkbox"
                checked={
                  form.published
                }
                onChange={(event) =>
                  updateField(
                    "published",
                    event.target.checked,
                  )
                }
              />

              <span>
                <strong>
                  Projet publié
                </strong>

                <small>
                  Rendre le projet disponible
                  sur le portfolio public.
                </small>
              </span>
            </label>
          </div>
        </section>

        <div className="form-actions">
          <button
            type="button"
            className="secondary-button"
            onClick={() =>
              navigate("/projects")
            }
            disabled={saving}
          >
            Annuler
          </button>

          <button
            type="submit"
            className="primary-button"
            disabled={saving}
          >
            <Save size={17} />

            {saving
              ? "Enregistrement..."
              : "Enregistrer les modifications"}
          </button>
        </div>
      </form>
    </div>
  );
}
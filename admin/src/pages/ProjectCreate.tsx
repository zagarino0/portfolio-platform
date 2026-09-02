import { useState } from "react";
import type { FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Save, X } from "lucide-react";
import { createProject } from "../services/projects";
import type {
  Project,
  ProjectStatus,
  ProjectType,
} from "../types/project";

interface GithubRepository {
  owner: string;
  name: string;
  url: string;
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

interface GithubImportState {
  importedProject?: Project;
  github?: GithubRepository;
  readme?: string;
}

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

const emptyProject: Project = {
  slug: "",
  title: "",
  category: "",
  description: "",
  role: "",
  type: "WEB_APP",
  status: "IN_PROGRESS",
  problem: "",
  solution: "",
  results: [],
  technologies: [],
  image: null,
  liveUrl: null,
  githubUrl: null,
  githubOwner: null,
  githubRepository: null,
  githubBranch: null,
  featured: false,
  published: false,
};

export default function ProjectCreate() {
  const navigate = useNavigate();
  const location = useLocation();

 const importState = (location.state ?? {}) as GithubImportState;

const initialProject: Project = importState.importedProject
  ? {
      ...emptyProject,
      ...importState.importedProject,
      technologies:
        importState.importedProject.technologies?.length
          ? importState.importedProject.technologies
          : importState.github?.languages ?? [],
    }
  : emptyProject;

  const [form, setForm] = useState<Project>(initialProject);
  const [technologyInput, setTechnologyInput] = useState("");
  const [resultInput, setResultInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function updateField<K extends keyof Project>(
    field: K,
    value: Project[K],
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function addTechnology() {
    const technology = technologyInput.trim();

    if (!technology) {
      return;
    }

    if (
      form.technologies.some(
        (item) => item.toLowerCase() === technology.toLowerCase(),
      )
    ) {
      setTechnologyInput("");
      return;
    }

    updateField("technologies", [...form.technologies, technology]);
    setTechnologyInput("");
  }

  function removeTechnology(technology: string) {
    updateField(
      "technologies",
      form.technologies.filter((item) => item !== technology),
    );
  }

  function addResult() {
    const result = resultInput.trim();

    if (!result) {
      return;
    }

    updateField("results", [...form.results, result]);
    setResultInput("");
  }

  function removeResult(index: number) {
    updateField(
      "results",
      form.results.filter((_, resultIndex) => resultIndex !== index),
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

async function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  console.log("1. SUBMIT PROJECT");

  setError("");

  console.log("2. FORM VALIDATION", {
    title: form.title,
    slug: form.slug,
    category: form.category,
    description: form.description,
    role: form.role,
    problem: form.problem,
    solution: form.solution,
    type: form.type,
    status: form.status,
  });

  // Validation
  if (!form.title.trim()) {
    setError("Le titre du projet est obligatoire.");
    return;
  }

  if (!form.slug.trim()) {
    setError("Le slug du projet est obligatoire.");
    return;
  }

  if (!form.category.trim()) {
    setError("La catégorie est obligatoire.");
    return;
  }

  if (!form.description.trim()) {
    setError("La description est obligatoire.");
    return;
  }

  console.log("3. VALIDATION OK");

  // Protection contre les doubles soumissions
  if (loading) {
    console.log("SUBMIT IGNORÉ : requête déjà en cours");
    return;
  }

  setLoading(true);

  console.log("4. FORM DATA", form);

  try {
    console.log("5. APPEL API");

    const result = await createProject({
      ...form,
      title: form.title.trim(),
      slug: form.slug.trim(),
      category: form.category.trim(),
      description: form.description.trim(),
      role: form.role.trim(),
      problem: form.problem.trim(),
      solution: form.solution.trim(),
      technologies: form.technologies.filter(Boolean),
      results: form.results.filter(Boolean),
    });

    console.log("6. API RESPONSE", result);

    navigate("/projects", { replace: true });
  } catch (err) {
    console.error("7. CREATE PROJECT ERROR", err);

    setError(
      err instanceof Error
        ? err.message
        : "Impossible de créer le projet.",
    );
  } finally {
    console.log("8. FINISHED");
    setLoading(false);
  }
}
  return (
    <div className="admin-page project-create-page">
      <div className="page-header">
        <div>
          <button
            type="button"
            className="back-button"
            onClick={() => navigate("/projects")}
          >
            <ArrowLeft size={16} />
            Retour aux projets
          </button>

          <div className="eyebrow">PROJET</div>

          <h1>
            {importState.importedProject
              ? "Modifier les données importées"
              : "Nouveau projet"}
          </h1>

          <p>
            {importState.importedProject
              ? "Vérifiez et complétez les informations détectées depuis GitHub."
              : "Ajoutez un projet à votre portfolio."}
          </p>
        </div>
      </div>

      {importState.github && (
        <section className="import-summary">
          <div>
            <span className="section-label">GITHUB</span>
            <strong>
              {importState.github.owner}/{importState.github.name}
            </strong>
          </div>

          <div className="import-meta">
            <span>
              Branche :{" "}
              <strong>{importState.github.defaultBranch}</strong>
            </span>

            {importState.github.language && (
              <span>
                Langage principal :{" "}
                <strong>{importState.github.language}</strong>
              </span>
            )}
          </div>
        </section>
      )}

      {error && <div className="form-error">{error}</div>}

      <form
        className="project-form"
        onSubmit={handleSubmit}
            noValidate
            >
        <section className="form-section">
          <div className="section-heading">
            <span className="section-number">01</span>

            <div>
              <h2>Informations générales</h2>
              <p>Les informations principales du projet.</p>
            </div>
          </div>

          <div className="form-grid">
            <label className="field field-full">
              <span>Titre *</span>
              <input
                type="text"
                value={form.title}
                onChange={(event) =>
                  updateField("title", event.target.value)
                }
                placeholder="Portfolio Platform"
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
                      .replace(/\s+/g, "-"),
                  )
                }
                placeholder="portfolio-platform"
              />
            </label>

            <label className="field">
              <span>Catégorie *</span>
              <input
                type="text"
                value={form.category}
                onChange={(event) =>
                  updateField("category", event.target.value)
                }
                placeholder="Web Development"
              />
            </label>

            <label className="field">
              <span>Rôle</span>
              <input
                type="text"
                value={form.role}
                onChange={(event) =>
                  updateField("role", event.target.value)
                }
                placeholder="Full-stack Developer"
              />
            </label>

            <label className="field">
              <span>Type</span>
              <select
                value={form.type}
                onChange={(event) =>
                  updateField(
                    "type",
                    event.target.value as ProjectType,
                  )
                }
              >
                {typeOptions.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span>Statut</span>
              <select
                value={form.status}
                onChange={(event) =>
                  updateField(
                    "status",
                    event.target.value as ProjectStatus,
                  )
                }
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>

            <label className="field field-full">
              <span>Description *</span>
              <textarea
                rows={6}
                value={form.description}
                onChange={(event) =>
                  updateField("description", event.target.value)
                }
                placeholder="Présentez brièvement le projet..."
              />
            </label>
          </div>
        </section>

        <section className="form-section">
          <div className="section-heading">
            <span className="section-number">02</span>

            <div>
              <h2>Conception du projet</h2>
              <p>Le problème traité et la solution mise en place.</p>
            </div>
          </div>

          <div className="form-grid">
            <label className="field field-full">
              <span>Problème</span>
              <textarea
                rows={5}
                value={form.problem}
                onChange={(event) =>
                  updateField("problem", event.target.value)
                }
                placeholder="Quel problème le projet devait-il résoudre ?"
              />
            </label>

            <label className="field field-full">
              <span>Solution</span>
              <textarea
                rows={5}
                value={form.solution}
                onChange={(event) =>
                  updateField("solution", event.target.value)
                }
                placeholder="Quelle solution avez-vous conçue ?"
              />
            </label>
          </div>
        </section>

        <section className="form-section">
          <div className="section-heading">
            <span className="section-number">03</span>

            <div>
              <h2>Technologies</h2>
              <p>
                Les technologies détectées automatiquement peuvent être
                corrigées ou complétées.
              </p>
            </div>
          </div>

          <div className="technology-editor">
            <div className="tag-list">
              {form.technologies.map((technology) => (
                <span className="tag" key={technology}>
                  {technology}

                  <button
                    type="button"
                    onClick={() => removeTechnology(technology)}
                    aria-label={`Supprimer ${technology}`}
                  >
                    <X size={13} />
                  </button>
                </span>
              ))}

              {!form.technologies.length && (
                <span className="empty-tags">
                  Aucune technologie détectée.
                </span>
              )}
            </div>

            <div className="inline-input">
              <input
                type="text"
                value={technologyInput}
                onChange={(event) =>
                  setTechnologyInput(event.target.value)
                }
                onKeyDown={handleTechnologyKeyDown}
                placeholder="Ajouter une technologie..."
              />

              <button
                type="button"
                className="secondary-button"
                onClick={addTechnology}
              >
                <Plus size={16} />
                Ajouter
              </button>
            </div>
          </div>
        </section>

        <section className="form-section">
          <div className="section-heading">
            <span className="section-number">04</span>

            <div>
              <h2>Résultats</h2>
              <p>
                Ajoutez les résultats ou bénéfices obtenus grâce au projet.
              </p>
            </div>
          </div>

          <div className="result-editor">
            {form.results.length > 0 && (
              <ol className="result-list">
                {form.results.map((result, index) => (
                  <li key={`${result}-${index}`}>
                    <span>{result}</span>

                    <button
                      type="button"
                      onClick={() => removeResult(index)}
                      aria-label="Supprimer le résultat"
                    >
                      <X size={14} />
                    </button>
                  </li>
                ))}
              </ol>
            )}

            <div className="inline-input">
              <input
                type="text"
                value={resultInput}
                onChange={(event) =>
                  setResultInput(event.target.value)
                }
                onKeyDown={handleResultKeyDown}
                placeholder="Ex. Réduction du temps de traitement..."
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
            <span className="section-number">05</span>

            <div>
              <h2>Liens et publication</h2>
              <p>Les informations de déploiement et de publication.</p>
            </div>
          </div>

          <div className="form-grid">
            <label className="field">
              <span>URL du site</span>
              <input
                type="url"
                value={form.liveUrl ?? ""}
                onChange={(event) =>
                  updateField(
                    "liveUrl",
                    event.target.value || null,
                  )
                }
                placeholder="https://..."
              />
            </label>

            <label className="field">
              <span>URL GitHub</span>
              <input
                type="url"
                value={form.githubUrl ?? ""}
                onChange={(event) =>
                  updateField(
                    "githubUrl",
                    event.target.value || null,
                  )
                }
                placeholder="https://github.com/..."
              />
            </label>

            <label className="field">
              <span>Image</span>
              <input
                type="url"
                value={form.image ?? ""}
                onChange={(event) =>
                  updateField(
                    "image",
                    event.target.value || null,
                  )
                }
                placeholder="https://..."
              />
            </label>

            <label className="field">
              <span>Branche GitHub</span>
              <input
                type="text"
                value={form.githubBranch ?? ""}
                onChange={(event) =>
                  updateField(
                    "githubBranch",
                    event.target.value || null,
                  )
                }
                placeholder="main"
              />
            </label>
          </div>

          <div className="publication-options">
            <label className="checkbox-field">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(event) =>
                  updateField("featured", event.target.checked)
                }
              />
              <span>
                <strong>Projet mis en avant</strong>
                <small>
                  Afficher ce projet comme réalisation principale.
                </small>
              </span>
            </label>

            <label className="checkbox-field">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(event) =>
                  updateField("published", event.target.checked)
                }
              />
              <span>
                <strong>Publier immédiatement</strong>
                <small>
                  Rendre le projet disponible sur le portfolio public.
                </small>
              </span>
            </label>
          </div>
        </section>

        <div className="form-actions">
          <button
            type="button"
            className="secondary-button"
            onClick={() => navigate("/projects")}
            disabled={loading}
          >
            Annuler
          </button>

          <button
            type="submit"
            className="primary-button"
            disabled={loading}
          >
            <Save size={17} />

            {loading
              ? "Enregistrement..."
              : "Enregistrer le projet"}
          </button>
        </div>
      </form>
    </div>
  );
}
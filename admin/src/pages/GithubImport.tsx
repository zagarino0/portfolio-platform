import { type FormEvent, useState } from "react";
import { GitBranch, LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { importGithubRepository } from "../services/github";

export function GithubImport() {
  const navigate = useNavigate();

  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!url.trim()) {
      setError("Veuillez saisir l'URL du dépôt GitHub.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await importGithubRepository(url.trim());

      navigate("/projects/new", {
        state: {
          importedProject: result.project,
          github: result.repository,
          readme: result.readme,
        },
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Impossible d'importer le dépôt GitHub.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="page-section">
      <div className="page-heading">
        <span className="admin-eyebrow">GITHUB</span>
        <h2>Importer un projet</h2>
        <p>
          Récupérez les métadonnées d'un dépôt GitHub pour
          préremplir un projet de portfolio.
        </p>
      </div>

      <form className="github-import-card" onSubmit={handleSubmit}>
        <div className="github-icon">
          <GitBranch size={24} strokeWidth={1.5} />
        </div>

        <div className="form-field">
          <label htmlFor="github-url">URL du dépôt</label>

          <input
            id="github-url"
            type="url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="https://github.com/user/project"
            disabled={loading}
          />
        </div>

        {error && (
          <div className="form-error" role="alert">
            {error}
          </div>
        )}

        <button
          className="admin-button"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <>
              <LoaderCircle className="spin" size={17} />
              Importation…
            </>
          ) : (
            <>
              <GitBranch size={17} />
              Importer le dépôt
            </>
          )}
        </button>
      </form>
    </section>
  );
}
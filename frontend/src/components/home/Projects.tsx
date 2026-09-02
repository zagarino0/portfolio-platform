import { projects } from "../../data/projects";

export function Projects() {
  const featured = projects.find((project) => project.featured) ?? projects[0];

  return (
    <section id="projets" className="section">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">02 / 06 · Selected Work</span>
          <h2>Des projets conçus pour résoudre de vrais problèmes.</h2>
          <p>
            Une sélection de produits, applications et solutions digitales
            développés de la conception au déploiement.
          </p>
        </div>

        <article className="featured-project">
          <div className="project-preview">
            <div className="project-preview__top">digital-work / dashboard</div>
            <div className="project-preview__body">
              <aside />
              <div>
                <div className="skeleton skeleton--title" />
                <div className="skeleton-row">
                  <div className="skeleton" />
                  <div className="skeleton" />
                  <div className="skeleton" />
                </div>
                <div className="skeleton skeleton--panel" />
              </div>
            </div>
          </div>

          <div className="featured-project__info">
            <div>
              <span>{featured.category}</span>
              <h3>{featured.title}</h3>
              <p>{featured.description}</p>
            </div>
            <div className="tags">
              {featured.technologies.map((tech) => <span key={tech}>{tech}</span>)}
            </div>
            <a className="text-link" href={`/projets/${featured.slug}`}>
              Voir le projet ↗
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}

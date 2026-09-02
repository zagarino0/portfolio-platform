
export function Hero() {
  return (
    <section id="accueil" className="hero">
      <div className="container">
        <div className="hero__grid">
          <div>
            <div className="status">
              <span className="status__dot" aria-hidden="true" />
              Disponible pour de nouveaux projets
            </div>

            <span className="eyebrow">
              Développeur full-stack · Madagascar
            </span>

            <h1>
              Je construis des produits
              <span> numériques utiles.</span>
            </h1>

            <p>
              Je conçois et développe des applications web et des
              systèmes numériques pensés pour être simples à utiliser,
              fiables à maintenir et capables d’évoluer avec le projet.
            </p>

            <div className="hero__actions">
              <a className="button button--solid" href="/projets">
                Voir mes projets
              </a>

              <a className="button button--outline" href="#contact">
                Me contacter
              </a>
            </div>
          </div>

          <div className="system-card" aria-label="Environnement technique">
            <div className="system-card__bar">
              <span className="window-dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>

              <span>zagarino.dev / environment</span>
            </div>

            <pre>{`const developer = {
  role: "Full-stack Developer",
  location: "Madagascar",

  frontend: [
    "React",
    "TypeScript",
    "React Native"
  ],

  backend: [
    "Node.js",
    "API",
    "PostgreSQL"
  ],

  focus: [
    "Product",
    "Automation",
    "AI"
  ]
};`}</pre>

            <div className="system-card__meta">
              <div>
                <small>Stack</small>
                <strong>React · Node.js</strong>
              </div>

              <div>
                <small>Approche</small>
                <strong>Simple · Fiable</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


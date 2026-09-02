export function Hero() {
  return (
    <section id="accueil" className="section hero">
      <div className="container hero__grid">
        <div className="hero__content">
          <div className="status">
            <span className="status__dot" />
            Disponible pour de nouveaux projets
          </div>

          <div className="eyebrow">Développeur Web · Solutions digitales</div>

          <h1>
            Je transforme des idées en{" "}
            <span>produits digitaux.</span>
          </h1>

          <p>
            Je conçois et développe des applications web modernes,
            performantes et évolutives — de l’interface utilisateur
            jusqu’aux systèmes backend et aux intégrations IA.
          </p>

          <div className="hero__actions">
            <a className="button button--solid" href="#projets">
              Voir mes projets
            </a>
            <a className="button button--outline" href="#contact">
              Me contacter
            </a>
          </div>
        </div>

        <div className="system-card" aria-hidden="true">
          <div className="system-card__bar">
            <div className="window-dots"><i/><i/><i/></div>
            <span>portfolio/system.ts</span>
          </div>
          <pre><code>{`const system = {
  frontend: "React + TypeScript",
  backend: "Node.js",
  database: "PostgreSQL",
  ai: true,
  scalable: true
};`}</code></pre>
          <div className="system-card__meta">
            <div>
              <small>STACK</small>
              <strong>Full Stack</strong>
            </div>
            <div>
              <small>FOCUS</small>
              <strong>Digital Products</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Expertise() {
  const expertise = [
    {
      number: "01",
      title: "Applications web",
      description:
        "Des interfaces rapides, accessibles et pensées autour des besoins réels des utilisateurs.",
      technologies: "React · TypeScript · Vite",
    },
    {
      number: "02",
      title: "Backend & API",
      description:
        "Des services structurés et fiables pour connecter les interfaces, les données et les métiers.",
      technologies: "Node.js · API · PostgreSQL",
    },
    {
      number: "03",
      title: "Automatisation",
      description:
        "Des workflows qui réduisent les tâches répétitives et permettent aux équipes de gagner du temps.",
      technologies: "Node.js · Automation · Integrations",
    },
    {
      number: "04",
      title: "Intelligence artificielle",
      description:
        "Intégrer l'IA lorsqu'elle apporte une réelle valeur au produit, au processus ou à l'utilisateur.",
      technologies: "AI · APIs · Agents",
    },
  ];

  return (
    <section id="expertise" className="section expertise-section">
      <div className="container">
        <div className="section-heading expertise-heading">
          <span className="eyebrow">03 / 06 · Expertise</span>

          <h2>
            Construire des systèmes
            <br />
            qui restent simples à utiliser.
          </h2>

          <p>
            Mon approche combine design d'interface, ingénierie
            logicielle, architecture backend et automatisation pour
            créer des produits numériques cohérents et maintenables.
          </p>
        </div>

        <div className="expertise-grid">
          {expertise.map((item) => (
            <article key={item.number} className="expertise-card">
              <div className="expertise-card__top">
                <span className="expertise-card__number">
                  {item.number}
                </span>

                <span className="eyebrow">Expertise</span>
              </div>

              <div className="expertise-card__content">
                <h3>{item.title}</h3>

                <p>{item.description}</p>
              </div>

              <div className="expertise-card__technologies">
                {item.technologies}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
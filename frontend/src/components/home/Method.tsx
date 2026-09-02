export function Method() {
  const steps = [
    {
      number: "01",
      title: "Comprendre",
      description:
        "Clarifier le problème, les utilisateurs, les contraintes et les objectifs du projet.",
    },
    {
      number: "02",
      title: "Concevoir",
      description:
        "Transformer les besoins en une expérience claire et une architecture cohérente.",
    },
    {
      number: "03",
      title: "Développer",
      description:
        "Construire progressivement un produit propre, testable et suffisamment robuste.",
    },
    {
      number: "04",
      title: "Déployer",
      description:
        "Mettre le produit en production avec une infrastructure adaptée à son contexte.",
    },
    {
      number: "05",
      title: "Améliorer",
      description:
        "Observer les usages, corriger ce qui doit l'être et faire évoluer le produit.",
    },
  ];

  return (
    <section className="section method-section">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">05 / 06 · Méthode</span>

          <h2>
            Une méthode simple.
            <br />
            Des décisions utiles.
          </h2>

          <p>
            L'objectif n'est pas de complexifier un projet, mais de
            trouver le niveau de sophistication nécessaire pour
            résoudre correctement le problème.
          </p>
        </div>

        <div className="method-list">
          {steps.map((step) => (
            <article key={step.number} className="method-item">
              <span className="method-item__number">
                {step.number}
              </span>

              <h3>{step.title}</h3>

              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
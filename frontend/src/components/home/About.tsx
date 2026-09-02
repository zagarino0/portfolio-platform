
export function About() {
  return (
    <section id="a-propos" className="section about-section">
      <div className="container">
        <div className="about-grid">
          <div className="about-intro">
            <span className="eyebrow">
              04 / 06 · À propos
            </span>

            <div className="about-profile">
              <div className="about-profile__brand">
                <span>ZAGARINO RAZAFINDRAFITA</span>
              </div>

              <h2 className="about-profile__title">
                Développeur Full-stack
              </h2>

              <div className="about-profile__socials">
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                  <span aria-hidden="true">↗</span>
                </a>

                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                  <span aria-hidden="true">↗</span>
                </a>

                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Facebook
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </div>

          <div className="about-content">
            <p className="about-content__lead">
              Je conçois et développe des produits numériques avec
              une attention particulière portée à la simplicité, à
              la qualité technique et à l'utilité réelle.
            </p>

            <p>
              Un projet ne se résume pas à écrire du code. Il faut
              comprendre le problème, définir la bonne architecture,
              construire une expérience claire et mettre en place
              une base suffisamment solide pour évoluer.
            </p>

            <p>
              Je travaille principalement autour de React,
              TypeScript, Node.js et PostgreSQL, avec une attention
              particulière portée aux API, à l'automatisation et aux
              nouvelles possibilités offertes par l'intelligence
              artificielle.
            </p>

            <div className="about-facts">
              <div>
                <span className="eyebrow">Localisation</span>
                <strong>Madagascar · Remote</strong>
              </div>

              <div>
                <span className="eyebrow">Spécialité</span>
                <strong>Web · Mobile · Backend</strong>
              </div>

              <div>
                <span className="eyebrow">Focus</span>
                <strong>Produits numériques</strong>
              </div>

              <div>
                <span className="eyebrow">Approche</span>
                <strong>Simple · Fiable</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


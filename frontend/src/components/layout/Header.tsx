export function Header() {
  return (
    <header className="header">
      <div className="container header__inner">
        <a className="brand" href="#accueil" aria-label="Zagarino — Accueil">
          <span className="brand__mark">Z</span>
          <span>ZAGARINO</span>
        </a>

        <nav className="nav" aria-label="Navigation principale">
          <a href="#accueil">Accueil</a>
          <a href="#projets">Projets</a>
          <a href="#expertise">Expertise</a>
          <a href="#a-propos">À propos</a>
          <a href="#contact">Contact</a>
        </nav>

        <button className="language" type="button" aria-label="Changer de langue">
          FR / EN
        </button>
      </div>
    </header>
  );
}

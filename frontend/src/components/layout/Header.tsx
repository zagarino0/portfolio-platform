import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="header">
      <div className="container header__inner">
        {/* Brand */}
        <Link
          className="brand"
          to="/"
          aria-label="Zagarino — Accueil"
        >
          <span className="brand__mark">Z</span>
          <span>ZAGARINO</span>
        </Link>

        {/* Navigation */}
        <nav
          className="nav"
          aria-label="Navigation principale"
        >
          {/* Vraie route */}
          <Link to="/">
            Accueil
          </Link>

          {/* Vraie page */}
          <Link to="/projets">
            Projets
          </Link>

          {/* Sections homepage */}
          <a href="/#expertise">
            Expertise
          </a>

          <a href="/#a-propos">
            À propos
          </a>

          <a href="/#contact">
            Contact
          </a>
        </nav>

        {/* Language */}
        <button
          className="language"
          type="button"
          aria-label="Changer de langue"
        >
          FR / EN
        </button>
      </div>
    </header>
  );
}
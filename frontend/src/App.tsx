import "./styles/global.css";
import "./styles/components.css";
import { Header } from "./components/layout/Header";
import { Hero } from "./components/home/Hero";
import { Projects } from "./components/home/Projects";

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Projects />
        <section id="expertise" className="section section-placeholder">
          <div className="container">
            <span className="eyebrow">03 / 06 · Expertise</span>
            <h2>Construire des systèmes qui restent simples à utiliser.</h2>
          </div>
        </section>
        <section id="a-propos" className="section section-placeholder">
          <div className="container">
            <span className="eyebrow">04 / 06 · À propos</span>
            <h2>Développeur par métier. Curieux par nature.</h2>
          </div>
        </section>
        <section className="section section-placeholder">
          <div className="container">
            <span className="eyebrow">05 / 06 · Méthode</span>
            <h2>Comprendre → Concevoir → Développer → Déployer → Améliorer.</h2>
          </div>
        </section>
        <section id="contact" className="section section-placeholder">
          <div className="container">
            <span className="eyebrow">06 / 06 · Contact</span>
            <h2>Construisons quelque chose d’utile.</h2>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;

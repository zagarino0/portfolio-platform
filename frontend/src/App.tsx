import "./styles/global.css";
import "./styles/components.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProjectsPage } from "./pages/Projects";
import { About } from "./components/home/About";
import { Contact } from "./components/home/Contact";
import { Expertise } from "./components/home/Expertise";
import { Hero } from "./components/home/Hero";
import { Method } from "./components/home/Method";
import { Projects } from "./components/home/Projects";

import { Header } from "./components/layout/Header";

import { ProjectDetail } from "./pages/ProjectDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* =====================================================
            HOMEPAGE
            ===================================================== */}
        <Route
          path="/"
          element={
            <>
              <Header />

              <main>
                <Hero />

                <Projects />

                <Expertise />

                <About />

                <Method />

                <Contact />
              </main>
            </>
          }
        />

        {/* =====================================================
            PROJECT DETAIL
            ===================================================== */}
        <Route
          path="/projets/:slug"
          element={
            <>
              <Header />

              <ProjectDetail />
            </>
          }
        />
        
        <Route
  path="/projets"
  element={
    <>
      <Header />
      <ProjectsPage />
    </>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
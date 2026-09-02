
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { AdminLayout } from "./layouts/AdminLayout";

import { Dashboard } from "./pages/Dashboard";

import { GithubImport } from "./pages/GithubImport";

import ProjectCreate from "./pages/ProjectCreate";

import ProjectEdit from "./pages/ProjectEdit";

import { Projects } from "./pages/Projects";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route
            path="/"
            element={<Navigate to="/dashboard" replace />}
          />

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/projects"
            element={<Projects />}
          />

          <Route
            path="/projects/new"
            element={<ProjectCreate />}
          />

          <Route
            path="/projects/:slug/edit"
            element={<ProjectEdit />}
          />

          <Route
            path="/projects/import/github"
            element={<GithubImport />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


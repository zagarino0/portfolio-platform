import { NavLink } from "react-router-dom";
import {
  FolderKanban,
  GitBranch,
  LayoutDashboard,
  Plus,
} from "lucide-react";
const links = [
  {
    to: "/",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    to: "/projects",
    label: "Projets",
    icon: FolderKanban,
  },
  {
    to: "/projects/import/github",
    label: "Importer GitHub",
    icon: GitBranch,
  },
  {
    to: "/projects/new",
    label: "Nouveau projet",
    icon: Plus,
  },
];

export function Sidebar() {
  return (
    <aside className="admin-sidebar">
      <div className="admin-brand">
        <span className="admin-brand-mark">Z</span>

        <div>
          <strong>Portfolio</strong>
          <span>ADMIN</span>
        </div>
      </div>

      <nav className="admin-nav">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `admin-nav-link ${isActive ? "is-active" : ""}`
            }
          >
            <Icon size={17} strokeWidth={1.8} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="admin-sidebar-footer">
        Portfolio Platform
        <span>v0.1.0</span>
      </div>
    </aside>
  );
}
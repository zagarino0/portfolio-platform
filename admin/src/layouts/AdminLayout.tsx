import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/layout/Sidebar";
import { Topbar } from "../components/layout/Topbar";

export function AdminLayout() {
  return (
    <div className="admin-shell">
      <Sidebar />

      <div className="admin-main">
        <Topbar />

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
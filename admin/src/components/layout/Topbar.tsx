import { CircleUserRound } from "lucide-react";

export function Topbar() {
  return (
    <header className="admin-topbar">
      <div>
        <span className="admin-eyebrow">PORTFOLIO PLATFORM</span>
        <h1>Administration</h1>
      </div>

      <div className="admin-user">
        <CircleUserRound size={20} strokeWidth={1.6} />
        <span>Admin</span>
      </div>
    </header>
  );
}
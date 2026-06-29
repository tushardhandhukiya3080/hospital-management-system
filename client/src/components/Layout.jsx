import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import {
  IconDashboard, IconCalendar, IconPatients, IconDoctor,
  IconRx, IconBill, IconLogout, IconCross,
} from "./icons.jsx";

const NAV = [
  { to: "/", label: "Dashboard", icon: IconDashboard, exact: true },
  { to: "/appointments", label: "Appointments", icon: IconCalendar },
  { to: "/patients", label: "Patients", icon: IconPatients, roles: ["admin", "receptionist", "doctor"] },
  { to: "/doctors", label: "Doctors", icon: IconDoctor, roles: ["admin"] },
  { to: "/prescriptions", label: "Prescriptions", icon: IconRx },
  { to: "/bills", label: "Bills", icon: IconBill },
];

const TITLES = {
  "/": "Dashboard",
  "/appointments": "Appointments",
  "/patients": "Patients",
  "/doctors": "Doctors & Departments",
  "/prescriptions": "Prescriptions",
  "/bills": "Billing",
};

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const visible = NAV.filter((item) => !item.roles || item.roles.includes(user.role));
  const initials = user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="logo">
          <IconCross /> <span>Health<span className="dot">Care</span></span>
        </div>
        <nav>
          {visible.map(({ to, label, icon: Icon, exact }) => (
            <NavLink key={to} to={to} end={exact}>
              <Icon /> <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          style={{ background: "transparent", color: "#b5e8e0", display: "flex", gap: 12, alignItems: "center", padding: "11px 26px", justifyContent: "flex-start" }}
        >
          <IconLogout /> <span>Logout</span>
        </button>
        <div className="side-foot">HMS v1.0</div>
      </aside>

      <div className="main">
        <header className="topbar">
          <div className="page-title">{TITLES[location.pathname] || "Hospital Management"}</div>
          <div className="user-chip">
            <div className="meta" style={{ textAlign: "right" }}>
              <div className="name">{user.name}</div>
              <div className="role">{user.role}</div>
            </div>
            <div className="avatar">{initials}</div>
          </div>
        </header>
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

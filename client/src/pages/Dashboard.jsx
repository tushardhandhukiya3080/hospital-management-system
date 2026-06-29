import { useEffect, useState } from "react";
import api from "../api/client.js";
import { useAuth } from "../context/AuthContext.jsx";
import { IconPatients, IconDoctor, IconCalendar, IconBill } from "../components/icons.jsx";

const STAT_META = [
  { key: "patients", label: "Total Patients", icon: IconPatients },
  { key: "doctors", label: "Doctors", icon: IconDoctor },
  { key: "appointments", label: "Appointments", icon: IconCalendar },
  { key: "pendingBills", label: "Unpaid Bills", icon: IconBill },
];

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (user.role === "admin") {
      api.get("/dashboard").then((res) => setStats(res.data)).catch(() => {});
    }
  }, [user.role]);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div>
      <h1>{greeting}, {user.name.split(" ")[0]} 👋</h1>
      <p className="subtitle">
        Here's what's happening at your hospital today.
      </p>

      {user.role === "admin" && stats && (
        <div className="grid">
          {STAT_META.map(({ key, label, icon: Icon }) => (
            <div className="stat-card" key={key}>
              <div className="icon"><Icon /></div>
              <div>
                <div className="num">{stats[key]}</div>
                <div className="label">{label}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="card">
        <h3>Quick guide</h3>
        <p style={{ color: "var(--muted)", lineHeight: 1.7, fontSize: "0.92rem" }}>
          {user.role === "admin" && "Use the sidebar to manage Doctors & Departments, oversee Patients, and review Appointments and Billing."}
          {user.role === "receptionist" && "Register new Patients, book and manage Appointments, and generate Bills from the sidebar."}
          {user.role === "doctor" && "View your Appointments and write Prescriptions for your patients from the sidebar."}
          {user.role === "patient" && "Book Appointments with our specialists, and view your Prescriptions and Bills from the sidebar."}
        </p>
      </div>
    </div>
  );
}

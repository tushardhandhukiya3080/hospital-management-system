import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Appointments from "./pages/Appointments.jsx";
import Patients from "./pages/Patients.jsx";
import Doctors from "./pages/Doctors.jsx";
import Prescriptions from "./pages/Prescriptions.jsx";
import Bills from "./pages/Bills.jsx";

export default function App() {
  return (
    <Routes>
      {/* Public auth pages (no sidebar) */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Authenticated app inside the sidebar layout */}
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route
          path="/patients"
          element={
            <ProtectedRoute roles={["admin", "receptionist", "doctor"]}>
              <Patients />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctors"
          element={
            <ProtectedRoute roles={["admin"]}>
              <Doctors />
            </ProtectedRoute>
          }
        />
        <Route path="/prescriptions" element={<Prescriptions />} />
        <Route path="/bills" element={<Bills />} />
      </Route>
    </Routes>
  );
}

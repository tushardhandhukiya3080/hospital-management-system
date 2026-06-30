import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Home from "./pages/Home.jsx";
import DoctorDetail from "./pages/DoctorDetail.jsx";
import Login from "./pages/Login.jsx";
import Admin from "./pages/Admin.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors/:id" element={<DoctorDetail />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["admin"]}>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { IconCross } from "./icons.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="nav">
      <Link to="/" className="nav-brand"><IconCross /> MediFind <span>India</span></Link>
      <div className="nav-actions">
        <Link to="/">Find Doctors</Link>
        {user ? (
          <>
            <Link to="/admin">Admin Panel</Link>
            <button className="secondary sm" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login"><button className="sm">Admin Login</button></Link>
        )}
      </div>
    </nav>
  );
}

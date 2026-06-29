import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-brand">
        <div className="logo">✚ HealthCare HMS</div>
        <h2>Smart hospital management, all in one place.</h2>
        <p>
          Manage patients, appointments, prescriptions and billing from a single,
          secure dashboard — built for clinics and hospitals.
        </p>
        <ul>
          <li>Role-based access for staff &amp; patients</li>
          <li>Online appointment booking</li>
          <li>Digital prescriptions &amp; billing</li>
        </ul>
      </div>

      <div className="auth-form-side">
        <div className="auth-card">
          <h1>Welcome back</h1>
          <p className="sub">Sign in to your account to continue</p>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@hospital.com" />
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" />
            <button type="submit">Sign in</button>
          </form>
          <p className="switch">
            No account? <Link to="/register">Register as a patient</Link>
          </p>
          <div className="demo-box">
            <strong>Demo logins:</strong><br />
            Admin: <code>admin@hms.com</code> / <code>admin123</code><br />
            Doctor: <code>doctor@hms.com</code> / <code>doctor123</code><br />
            Reception: <code>reception@hms.com</code> / <code>reception123</code><br />
            Patient: <code>patient@hms.com</code> / <code>patient123</code>
          </div>
        </div>
      </div>
    </div>
  );
}

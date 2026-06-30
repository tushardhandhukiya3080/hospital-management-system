import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container">
      <div className="auth-wrap card">
        <h1>Admin Login</h1>
        <p className="sub">Sign in to manage the doctor directory</p>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit">Sign in</button>
        </form>
        <div className="demo-box">
          <strong>Demo admin:</strong><br />
          Email: <code>admin@medifind.in</code><br />
          Password: <code>admin123</code>
        </div>
      </div>
    </div>
  );
}

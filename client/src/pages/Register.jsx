import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// Public registration creates a patient account.
export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "", email: "", password: "", phone: "", age: "", gender: "male", address: "",
  });
  const [error, setError] = useState("");

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await register({ ...form, role: "patient" });
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-brand">
        <div className="logo">✚ HealthCare HMS</div>
        <h2>Your health records, always within reach.</h2>
        <p>
          Create a patient account to book appointments online, view your
          prescriptions, and track your bills — anytime, anywhere.
        </p>
        <ul>
          <li>Book appointments with specialists</li>
          <li>Access digital prescriptions</li>
          <li>View and pay bills online</li>
        </ul>
      </div>

      <div className="auth-form-side">
        <div className="auth-card">
          <h1>Create account</h1>
          <p className="sub">Register as a patient in a few seconds</p>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit}>
            <label>Full Name</label>
            <input name="name" value={form.name} onChange={update} required />
            <label>Email</label>
            <input name="email" type="email" value={form.email} onChange={update} required />
            <label>Password</label>
            <input name="password" type="password" value={form.password} onChange={update} required />
            <label>Phone</label>
            <input name="phone" value={form.phone} onChange={update} required />
            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ flex: 1 }}>
                <label>Age</label>
                <input name="age" type="number" value={form.age} onChange={update} />
              </div>
              <div style={{ flex: 1 }}>
                <label>Gender</label>
                <select name="gender" value={form.gender} onChange={update}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <label>Address</label>
            <input name="address" value={form.address} onChange={update} />
            <button type="submit">Create account</button>
          </form>
          <p className="switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

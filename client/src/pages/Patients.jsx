import { useEffect, useState } from "react";
import api from "../api/client.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Patients() {
  const { user } = useAuth();
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    name: "", email: "", password: "", phone: "", age: "", gender: "male", address: "",
  });
  const [msg, setMsg] = useState({ text: "", type: "" });

  const canManage = ["admin", "receptionist"].includes(user.role);

  const load = () => {
    api.get(`/patients?search=${search}`).then((res) => setPatients(res.data)).catch(() => {});
  };

  useEffect(() => { load(); }, [search]);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const add = async (e) => {
    e.preventDefault();
    setMsg({ text: "", type: "" });
    try {
      await api.post("/patients", form);
      setMsg({ text: "Patient registered!", type: "success" });
      setForm({ name: "", email: "", password: "", phone: "", age: "", gender: "male", address: "" });
      load();
    } catch (err) {
      setMsg({ text: err.response?.data?.message || "Failed", type: "error" });
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete this patient?")) return;
    await api.delete(`/patients/${id}`);
    load();
  };

  return (
    <div>
      <h1>Patients</h1>

      {canManage && (
        <div className="card">
          <h3>Register New Patient</h3>
          {msg.text && <p className={msg.type}>{msg.text}</p>}
          <form onSubmit={add}>
            <label>Name</label>
            <input name="name" value={form.name} onChange={update} required />
            <label>Email</label>
            <input name="email" type="email" value={form.email} onChange={update} required />
            <label>Password</label>
            <input name="password" type="password" value={form.password} onChange={update} required />
            <label>Phone</label>
            <input name="phone" value={form.phone} onChange={update} required />
            <label>Age</label>
            <input name="age" type="number" value={form.age} onChange={update} />
            <label>Gender</label>
            <select name="gender" value={form.gender} onChange={update}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <label>Address</label>
            <input name="address" value={form.address} onChange={update} />
            <button type="submit">Register Patient</button>
          </form>
        </div>
      )}

      <div className="card">
        <h3>Patient List</h3>
        <input
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <table>
          <thead>
            <tr>
              <th>Name</th><th>Email</th><th>Phone</th><th>Age</th><th>Gender</th>
              {user.role === "admin" && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p._id}>
                <td>{p.user?.name}</td>
                <td>{p.user?.email}</td>
                <td>{p.phone}</td>
                <td>{p.age}</td>
                <td>{p.gender}</td>
                {user.role === "admin" && (
                  <td><button className="danger" onClick={() => remove(p._id)}>Delete</button></td>
                )}
              </tr>
            ))}
            {patients.length === 0 && <tr><td colSpan="6">No patients found.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import api from "../api/client.js";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [docForm, setDocForm] = useState({
    name: "", email: "", password: "", departmentId: "", specialization: "", consultationFee: "",
  });
  const [deptForm, setDeptForm] = useState({ name: "", description: "" });
  const [msg, setMsg] = useState({ text: "", type: "" });

  const load = () => {
    api.get("/doctors").then((res) => setDoctors(res.data)).catch(() => {});
    api.get("/doctors/departments").then((res) => setDepartments(res.data)).catch(() => {});
  };

  useEffect(() => { load(); }, []);

  const addDept = async (e) => {
    e.preventDefault();
    try {
      await api.post("/doctors/departments", deptForm);
      setDeptForm({ name: "", description: "" });
      load();
    } catch (err) {
      setMsg({ text: err.response?.data?.message || "Failed", type: "error" });
    }
  };

  const addDoctor = async (e) => {
    e.preventDefault();
    setMsg({ text: "", type: "" });
    try {
      await api.post("/doctors", docForm);
      setMsg({ text: "Doctor added!", type: "success" });
      setDocForm({ name: "", email: "", password: "", departmentId: "", specialization: "", consultationFee: "" });
      load();
    } catch (err) {
      setMsg({ text: err.response?.data?.message || "Failed", type: "error" });
    }
  };

  const remove = async (id) => {
    if (!confirm("Remove this doctor?")) return;
    await api.delete(`/doctors/${id}`);
    load();
  };

  return (
    <div>
      <h1>Doctors & Departments</h1>

      <div className="card">
        <h3>Add Department</h3>
        <form onSubmit={addDept}>
          <label>Department Name</label>
          <input
            value={deptForm.name}
            onChange={(e) => setDeptForm({ ...deptForm, name: e.target.value })}
            required
          />
          <label>Description</label>
          <input
            value={deptForm.description}
            onChange={(e) => setDeptForm({ ...deptForm, description: e.target.value })}
          />
          <button type="submit">Add Department</button>
        </form>
      </div>

      <div className="card">
        <h3>Add Doctor</h3>
        {msg.text && <p className={msg.type}>{msg.text}</p>}
        <form onSubmit={addDoctor}>
          <label>Name</label>
          <input value={docForm.name} onChange={(e) => setDocForm({ ...docForm, name: e.target.value })} required />
          <label>Email</label>
          <input type="email" value={docForm.email} onChange={(e) => setDocForm({ ...docForm, email: e.target.value })} required />
          <label>Password</label>
          <input type="password" value={docForm.password} onChange={(e) => setDocForm({ ...docForm, password: e.target.value })} required />
          <label>Department</label>
          <select value={docForm.departmentId} onChange={(e) => setDocForm({ ...docForm, departmentId: e.target.value })} required>
            <option value="">Select department</option>
            {departments.map((d) => (
              <option key={d._id} value={d._id}>{d.name}</option>
            ))}
          </select>
          <label>Specialization</label>
          <input value={docForm.specialization} onChange={(e) => setDocForm({ ...docForm, specialization: e.target.value })} required />
          <label>Consultation Fee</label>
          <input type="number" value={docForm.consultationFee} onChange={(e) => setDocForm({ ...docForm, consultationFee: e.target.value })} />
          <button type="submit">Add Doctor</button>
        </form>
      </div>

      <div className="card">
        <h3>Doctor List</h3>
        <table>
          <thead>
            <tr><th>Name</th><th>Specialization</th><th>Department</th><th>Fee</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {doctors.map((d) => (
              <tr key={d._id}>
                <td>{d.user?.name}</td>
                <td>{d.specialization}</td>
                <td>{d.department?.name}</td>
                <td>{d.consultationFee}</td>
                <td><button className="danger" onClick={() => remove(d._id)}>Delete</button></td>
              </tr>
            ))}
            {doctors.length === 0 && <tr><td colSpan="5">No doctors yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

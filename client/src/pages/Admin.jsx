import { useEffect, useState } from "react";
import api from "../api/client.js";

const BLANK = {
  name: "", gender: "male", specialty: "", qualifications: "", experienceYears: "",
  languages: "", hospital: "", town: "", city: "", state: "", address: "",
  phone: "", email: "", consultationFee: "", rating: "", about: "",
};

// Convert a doctor record into the flat string form used by the form
const toForm = (d) => ({
  ...BLANK, ...d,
  qualifications: (d.qualifications || []).join(", "),
  languages: (d.languages || []).join(", "),
});

export default function Admin() {
  const [doctors, setDoctors] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(BLANK);
  const [msg, setMsg] = useState({ text: "", type: "" });

  const load = () => {
    api.get("/doctors", { params: { limit: 60 } }).then((res) => setDoctors(res.data.doctors)).catch(() => {});
  };
  useEffect(() => { load(); }, []);

  const openAdd = () => { setEditing(null); setForm(BLANK); setMsg({ text: "", type: "" }); setOpen(true); };
  const openEdit = (d) => { setEditing(d._id); setForm(toForm(d)); setMsg({ text: "", type: "" }); setOpen(true); };

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const save = async (e) => {
    e.preventDefault();
    setMsg({ text: "", type: "" });
    const payload = {
      ...form,
      qualifications: form.qualifications.split(",").map((s) => s.trim()).filter(Boolean),
      languages: form.languages.split(",").map((s) => s.trim()).filter(Boolean),
      experienceYears: Number(form.experienceYears) || 0,
      consultationFee: Number(form.consultationFee) || 0,
      rating: Number(form.rating) || 4.5,
    };
    try {
      if (editing) await api.put(`/doctors/${editing}`, payload);
      else await api.post("/doctors", payload);
      setOpen(false);
      load();
    } catch (err) {
      setMsg({ text: err.response?.data?.message || "Save failed", type: "error" });
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete this doctor?")) return;
    await api.delete(`/doctors/${id}`);
    load();
  };

  return (
    <div className="container admin-wrap">
      <div className="admin-head">
        <h1>Manage Doctors ({doctors.length})</h1>
        <button onClick={openAdd}>+ Add Doctor</button>
      </div>

      <table>
        <thead>
          <tr><th>Name</th><th>Specialty</th><th>Town</th><th>City</th><th>State</th><th>Phone</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {doctors.map((d) => (
            <tr key={d._id}>
              <td>{d.name}</td>
              <td>{d.specialty}</td>
              <td>{d.town}</td>
              <td>{d.city}</td>
              <td>{d.state}</td>
              <td>{d.phone}</td>
              <td style={{ whiteSpace: "nowrap" }}>
                <button className="secondary sm" onClick={() => openEdit(d)} style={{ marginRight: 6 }}>Edit</button>
                <button className="danger sm" onClick={() => remove(d._id)}>Delete</button>
              </td>
            </tr>
          ))}
          {doctors.length === 0 && <tr><td colSpan="7">No doctors yet. Add one.</td></tr>}
        </tbody>
      </table>

      {open && (
        <div className="modal-back" onClick={(e) => e.target.classList.contains("modal-back") && setOpen(false)}>
          <div className="modal">
            <h2 style={{ marginBottom: 16 }}>{editing ? "Edit Doctor" : "Add Doctor"}</h2>
            {msg.text && <p className={msg.type}>{msg.text}</p>}
            <form onSubmit={save}>
              <div className="form-grid">
                <div><label>Name</label><input name="name" value={form.name} onChange={update} required /></div>
                <div><label>Specialty</label><input name="specialty" value={form.specialty} onChange={update} required /></div>
                <div>
                  <label>Gender</label>
                  <select name="gender" value={form.gender} onChange={update}>
                    <option value="male">Male</option><option value="female">Female</option><option value="other">Other</option>
                  </select>
                </div>
                <div><label>Experience (years)</label><input name="experienceYears" type="number" value={form.experienceYears} onChange={update} /></div>
                <div className="full"><label>Qualifications (comma separated)</label><input name="qualifications" value={form.qualifications} onChange={update} placeholder="MBBS, MD" /></div>
                <div className="full"><label>Languages (comma separated)</label><input name="languages" value={form.languages} onChange={update} placeholder="English, Hindi" /></div>
                <div><label>Hospital / Clinic</label><input name="hospital" value={form.hospital} onChange={update} /></div>
                <div><label>Town / Area</label><input name="town" value={form.town} onChange={update} /></div>
                <div><label>City</label><input name="city" value={form.city} onChange={update} required /></div>
                <div><label>State</label><input name="state" value={form.state} onChange={update} required /></div>
                <div><label>Consultation Fee (₹)</label><input name="consultationFee" type="number" value={form.consultationFee} onChange={update} /></div>
                <div className="full"><label>Address</label><input name="address" value={form.address} onChange={update} /></div>
                <div><label>Phone</label><input name="phone" value={form.phone} onChange={update} /></div>
                <div><label>Email</label><input name="email" type="email" value={form.email} onChange={update} /></div>
                <div><label>Rating (0-5)</label><input name="rating" type="number" step="0.1" value={form.rating} onChange={update} /></div>
                <div className="full"><label>About</label><textarea name="about" rows="3" value={form.about} onChange={update} /></div>
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
                <button type="submit">{editing ? "Update" : "Create"}</button>
                <button type="button" className="secondary" onClick={() => setOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

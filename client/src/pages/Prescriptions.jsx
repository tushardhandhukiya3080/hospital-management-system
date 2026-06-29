import { useEffect, useState } from "react";
import api from "../api/client.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Prescriptions() {
  const { user } = useAuth();
  const [prescriptions, setPrescriptions] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({ appointmentId: "", diagnosis: "", medicines: "", notes: "" });
  const [msg, setMsg] = useState({ text: "", type: "" });

  const isDoctor = user.role === "doctor";

  const load = () => {
    api.get("/prescriptions").then((res) => setPrescriptions(res.data)).catch(() => {});
    if (isDoctor) {
      api.get("/appointments").then((res) =>
        setAppointments(res.data.filter((a) => a.status === "booked"))
      ).catch(() => {});
    }
  };

  useEffect(() => { load(); }, []);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const create = async (e) => {
    e.preventDefault();
    setMsg({ text: "", type: "" });
    try {
      await api.post("/prescriptions", form);
      setMsg({ text: "Prescription saved!", type: "success" });
      setForm({ appointmentId: "", diagnosis: "", medicines: "", notes: "" });
      load();
    } catch (err) {
      setMsg({ text: err.response?.data?.message || "Failed", type: "error" });
    }
  };

  return (
    <div>
      <h1>Prescriptions</h1>

      {isDoctor && (
        <div className="card">
          <h3>Write Prescription</h3>
          {msg.text && <p className={msg.type}>{msg.text}</p>}
          <form onSubmit={create}>
            <label>Appointment</label>
            <select name="appointmentId" value={form.appointmentId} onChange={update} required>
              <option value="">Select appointment</option>
              {appointments.map((a) => (
                <option key={a._id} value={a._id}>
                  {a.patient?.user?.name} — {a.date} {a.timeSlot}
                </option>
              ))}
            </select>
            <label>Diagnosis</label>
            <input name="diagnosis" value={form.diagnosis} onChange={update} required />
            <label>Medicines</label>
            <textarea name="medicines" rows="3" value={form.medicines} onChange={update} required />
            <label>Notes</label>
            <textarea name="notes" rows="2" value={form.notes} onChange={update} />
            <button type="submit">Save Prescription</button>
          </form>
        </div>
      )}

      <div className="card">
        <h3>Prescription Records</h3>
        <table>
          <thead>
            <tr><th>Patient</th><th>Doctor</th><th>Diagnosis</th><th>Medicines</th><th>Notes</th></tr>
          </thead>
          <tbody>
            {prescriptions.map((p) => (
              <tr key={p._id}>
                <td>{p.patient?.user?.name}</td>
                <td>{p.doctor?.user?.name}</td>
                <td>{p.diagnosis}</td>
                <td>{p.medicines}</td>
                <td>{p.notes}</td>
              </tr>
            ))}
            {prescriptions.length === 0 && <tr><td colSpan="5">No prescriptions yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

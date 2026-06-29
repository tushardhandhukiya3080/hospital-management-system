import { useEffect, useState } from "react";
import api from "../api/client.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Appointments() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({ doctorId: "", patientId: "", date: "", timeSlot: "", reason: "" });
  const [msg, setMsg] = useState({ text: "", type: "" });

  const canBook = ["patient", "receptionist", "admin"].includes(user.role);
  const needsPatientSelect = ["receptionist", "admin"].includes(user.role);

  const load = () => {
    api.get("/appointments").then((res) => setAppointments(res.data)).catch(() => {});
  };

  useEffect(() => {
    load();
    if (canBook) api.get("/doctors").then((res) => setDoctors(res.data)).catch(() => {});
    if (needsPatientSelect) api.get("/patients").then((res) => setPatients(res.data)).catch(() => {});
  }, []);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const book = async (e) => {
    e.preventDefault();
    setMsg({ text: "", type: "" });
    try {
      await api.post("/appointments", form);
      setMsg({ text: "Appointment booked!", type: "success" });
      setForm({ doctorId: "", patientId: "", date: "", timeSlot: "", reason: "" });
      load();
    } catch (err) {
      setMsg({ text: err.response?.data?.message || "Booking failed", type: "error" });
    }
  };

  const cancel = async (id) => {
    await api.patch(`/appointments/${id}/cancel`);
    load();
  };

  const complete = async (id) => {
    await api.patch(`/appointments/${id}/complete`);
    load();
  };

  return (
    <div>
      <h1>Appointments</h1>

      {canBook && (
        <div className="card">
          <h3>Book an Appointment</h3>
          {msg.text && <p className={msg.type}>{msg.text}</p>}
          <form onSubmit={book}>
            {needsPatientSelect && (
              <>
                <label>Patient</label>
                <select name="patientId" value={form.patientId} onChange={update} required>
                  <option value="">Select patient</option>
                  {patients.map((p) => (
                    <option key={p._id} value={p._id}>{p.user?.name}</option>
                  ))}
                </select>
              </>
            )}
            <label>Doctor</label>
            <select name="doctorId" value={form.doctorId} onChange={update} required>
              <option value="">Select doctor</option>
              {doctors.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.user?.name} — {d.specialization}
                </option>
              ))}
            </select>
            <label>Date</label>
            <input name="date" type="date" value={form.date} onChange={update} required />
            <label>Time Slot</label>
            <input name="timeSlot" placeholder="e.g. 10:00-10:30" value={form.timeSlot} onChange={update} required />
            <label>Reason</label>
            <input name="reason" value={form.reason} onChange={update} />
            <button type="submit">Book</button>
          </form>
        </div>
      )}

      <div className="card">
        <h3>My Appointments</h3>
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Slot</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a) => (
              <tr key={a._id}>
                <td>{a.patient?.user?.name}</td>
                <td>{a.doctor?.user?.name}</td>
                <td>{a.date}</td>
                <td>{a.timeSlot}</td>
                <td><span className={`badge ${a.status}`}>{a.status}</span></td>
                <td>
                  {a.status === "booked" && (
                    <>
                      {user.role === "doctor" && (
                        <button onClick={() => complete(a._id)} style={{ marginRight: 6 }}>
                          Complete
                        </button>
                      )}
                      {["patient", "receptionist", "admin"].includes(user.role) && (
                        <button className="danger" onClick={() => cancel(a._id)}>Cancel</button>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))}
            {appointments.length === 0 && (
              <tr><td colSpan="6">No appointments yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

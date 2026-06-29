import { useEffect, useState } from "react";
import api from "../api/client.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Bills() {
  const { user } = useAuth();
  const [bills, setBills] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({
    appointmentId: "",
    items: [{ description: "Consultation", amount: "" }],
  });
  const [msg, setMsg] = useState({ text: "", type: "" });

  const canManage = ["receptionist", "admin"].includes(user.role);

  const load = () => {
    api.get("/bills").then((res) => setBills(res.data)).catch(() => {});
    if (canManage) api.get("/appointments").then((res) => setAppointments(res.data)).catch(() => {});
  };

  useEffect(() => { load(); }, []);

  const updateItem = (i, field, value) => {
    const items = [...form.items];
    items[i][field] = value;
    setForm({ ...form, items });
  };

  const addItemRow = () =>
    setForm({ ...form, items: [...form.items, { description: "", amount: "" }] });

  const create = async (e) => {
    e.preventDefault();
    setMsg({ text: "", type: "" });
    try {
      const items = form.items
        .filter((it) => it.description && it.amount)
        .map((it) => ({ description: it.description, amount: Number(it.amount) }));
      await api.post("/bills", { appointmentId: form.appointmentId, items });
      setMsg({ text: "Bill generated!", type: "success" });
      setForm({ appointmentId: "", items: [{ description: "Consultation", amount: "" }] });
      load();
    } catch (err) {
      setMsg({ text: err.response?.data?.message || "Failed", type: "error" });
    }
  };

  const pay = async (id) => {
    await api.patch(`/bills/${id}/pay`);
    load();
  };

  return (
    <div>
      <h1>Bills</h1>

      {canManage && (
        <div className="card">
          <h3>Generate Bill</h3>
          {msg.text && <p className={msg.type}>{msg.text}</p>}
          <form onSubmit={create}>
            <label>Appointment</label>
            <select
              value={form.appointmentId}
              onChange={(e) => setForm({ ...form, appointmentId: e.target.value })}
              required
            >
              <option value="">Select appointment</option>
              {appointments.map((a) => (
                <option key={a._id} value={a._id}>
                  {a.patient?.user?.name} — {a.date} {a.timeSlot}
                </option>
              ))}
            </select>

            <label>Items</label>
            {form.items.map((it, i) => (
              <div key={i} style={{ display: "flex", gap: 8 }}>
                <input
                  placeholder="Description"
                  value={it.description}
                  onChange={(e) => updateItem(i, "description", e.target.value)}
                />
                <input
                  placeholder="Amount"
                  type="number"
                  value={it.amount}
                  onChange={(e) => updateItem(i, "amount", e.target.value)}
                />
              </div>
            ))}
            <button type="button" className="secondary" onClick={addItemRow} style={{ marginBottom: 12 }}>
              + Add Item
            </button>
            <br />
            <button type="submit">Generate Bill</button>
          </form>
        </div>
      )}

      <div className="card">
        <h3>Bill Records</h3>
        <table>
          <thead>
            <tr><th>Patient</th><th>Items</th><th>Total</th><th>Status</th>{canManage && <th>Action</th>}</tr>
          </thead>
          <tbody>
            {bills.map((b) => (
              <tr key={b._id}>
                <td>{b.patient?.user?.name}</td>
                <td>{b.items.map((it) => `${it.description} (${it.amount})`).join(", ")}</td>
                <td>{b.totalAmount}</td>
                <td><span className={`badge ${b.status === "paid" ? "completed" : "cancelled"}`}>{b.status}</span></td>
                {canManage && (
                  <td>
                    {b.status === "unpaid" && <button onClick={() => pay(b._id)}>Mark Paid</button>}
                  </td>
                )}
              </tr>
            ))}
            {bills.length === 0 && <tr><td colSpan="5">No bills yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

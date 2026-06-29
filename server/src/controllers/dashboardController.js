import Patient from "../models/Patient.js";
import Doctor from "../models/Doctor.js";
import Appointment from "../models/Appointment.js";
import Bill from "../models/Bill.js";

// GET /api/dashboard  (admin) — FR-24
export const getStats = async (_req, res) => {
  try {
    const [patients, doctors, appointments, pendingBills] = await Promise.all([
      Patient.countDocuments(),
      Doctor.countDocuments(),
      Appointment.countDocuments(),
      Bill.countDocuments({ status: "unpaid" }),
    ]);
    res.json({ patients, doctors, appointments, pendingBills });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

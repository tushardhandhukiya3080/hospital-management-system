import Bill from "../models/Bill.js";
import Appointment from "../models/Appointment.js";
import Patient from "../models/Patient.js";

// POST /api/bills  (receptionist/admin)
export const createBill = async (req, res) => {
  try {
    const { appointmentId, items } = req.body;
    if (!appointmentId || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "appointmentId and items[] required" });
    }

    const appt = await Appointment.findById(appointmentId);
    if (!appt) return res.status(404).json({ message: "Appointment not found" });

    const totalAmount = items.reduce((sum, it) => sum + Number(it.amount || 0), 0);

    const bill = await Bill.create({
      appointment: appt._id,
      patient: appt.patient,
      items,
      totalAmount,
    });
    res.status(201).json(bill);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/bills  (filtered by role)
export const getBills = async (req, res) => {
  try {
    const filter = {};
    if (req.user.role === "patient") {
      const patient = await Patient.findOne({ user: req.user.id });
      filter.patient = patient?._id;
    }
    const bills = await Bill.find(filter)
      .populate({ path: "patient", populate: { path: "user", select: "name" } })
      .sort({ createdAt: -1 });
    res.json(bills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH /api/bills/:id/pay  (receptionist/admin)
export const markPaid = async (req, res) => {
  try {
    const bill = await Bill.findByIdAndUpdate(req.params.id, { status: "paid" }, { new: true });
    if (!bill) return res.status(404).json({ message: "Bill not found" });
    res.json(bill);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

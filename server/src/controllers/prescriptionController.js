import Prescription from "../models/Prescription.js";
import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";

// POST /api/prescriptions  (doctor)
export const createPrescription = async (req, res) => {
  try {
    const { appointmentId, diagnosis, medicines, notes } = req.body;
    if (!appointmentId || !diagnosis || !medicines) {
      return res.status(400).json({ message: "appointmentId, diagnosis, medicines required" });
    }

    const appt = await Appointment.findById(appointmentId);
    if (!appt) return res.status(404).json({ message: "Appointment not found" });

    const prescription = await Prescription.create({
      appointment: appt._id,
      patient: appt.patient,
      doctor: appt.doctor,
      diagnosis,
      medicines,
      notes,
    });

    // Mark the appointment completed (UC-7)
    appt.status = "completed";
    await appt.save();

    res.status(201).json(prescription);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/prescriptions  (filtered by role)
export const getPrescriptions = async (req, res) => {
  try {
    const filter = {};
    if (req.user.role === "patient") {
      const patient = await Patient.findOne({ user: req.user.id });
      filter.patient = patient?._id;
    } else if (req.user.role === "doctor") {
      const doctor = await Doctor.findOne({ user: req.user.id });
      filter.doctor = doctor?._id;
    }

    const prescriptions = await Prescription.find(filter)
      .populate({ path: "patient", populate: { path: "user", select: "name" } })
      .populate({ path: "doctor", populate: { path: "user", select: "name" } })
      .sort({ createdAt: -1 });

    res.json(prescriptions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

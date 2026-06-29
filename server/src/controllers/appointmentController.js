import Appointment from "../models/Appointment.js";
import Patient from "../models/Patient.js";
import Doctor from "../models/Doctor.js";

// Helper: resolve the Patient document for the logged-in patient user
const getOwnPatient = (userId) => Patient.findOne({ user: userId });

// POST /api/appointments
export const createAppointment = async (req, res) => {
  try {
    let { patientId, doctorId, date, timeSlot, reason } = req.body;

    // If a patient is booking for themselves, derive their patientId
    if (req.user.role === "patient") {
      const patient = await getOwnPatient(req.user.id);
      if (!patient) return res.status(400).json({ message: "Patient profile not found" });
      patientId = patient._id;
    }

    if (!patientId || !doctorId || !date || !timeSlot) {
      return res.status(400).json({ message: "patientId, doctorId, date, timeSlot required" });
    }

    const appointment = await Appointment.create({
      patient: patientId,
      doctor: doctorId,
      date,
      timeSlot,
      reason,
    });
    res.status(201).json(appointment);
  } catch (err) {
    // Duplicate key from the unique index => slot already taken (FR-14)
    if (err.code === 11000) {
      return res.status(409).json({ message: "That time slot is already booked" });
    }
    res.status(500).json({ message: err.message });
  }
};

// GET /api/appointments  (filtered by role)
export const getAppointments = async (req, res) => {
  try {
    const filter = {};

    if (req.user.role === "patient") {
      const patient = await getOwnPatient(req.user.id);
      filter.patient = patient?._id;
    } else if (req.user.role === "doctor") {
      const doctor = await Doctor.findOne({ user: req.user.id });
      filter.doctor = doctor?._id;
    }
    // admin & receptionist see all

    const appointments = await Appointment.find(filter)
      .populate({ path: "patient", populate: { path: "user", select: "name email" } })
      .populate({ path: "doctor", populate: { path: "user", select: "name email" } })
      .sort({ date: -1 });

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH /api/appointments/:id/cancel
export const cancelAppointment = async (req, res) => {
  try {
    const appt = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: "cancelled" },
      { new: true }
    );
    if (!appt) return res.status(404).json({ message: "Appointment not found" });
    res.json(appt);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH /api/appointments/:id/complete  (doctor)
export const completeAppointment = async (req, res) => {
  try {
    const appt = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: "completed" },
      { new: true }
    );
    if (!appt) return res.status(404).json({ message: "Appointment not found" });
    res.json(appt);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

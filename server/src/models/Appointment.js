import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
    date: { type: String, required: true }, // "YYYY-MM-DD"
    timeSlot: { type: String, required: true }, // e.g. "10:00-10:30"
    status: {
      type: String,
      enum: ["booked", "completed", "cancelled"],
      default: "booked",
    },
    reason: { type: String, default: "" },
  },
  { timestamps: true }
);

// Enforce FR-14: a doctor cannot be double-booked for the same date + slot.
// Partial index so cancelled appointments don't block re-booking the slot.
appointmentSchema.index(
  { doctor: 1, date: 1, timeSlot: 1 },
  { unique: true, partialFilterExpression: { status: { $in: ["booked", "completed"] } } }
);

export default mongoose.model("Appointment", appointmentSchema);

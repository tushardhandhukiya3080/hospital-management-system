import mongoose from "mongoose";

// A standalone directory entry for a doctor (not tied to a user account).
const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    gender: { type: String, enum: ["male", "female", "other"], default: "other" },
    specialty: { type: String, required: true, trim: true }, // e.g. "Cardiologist"
    qualifications: { type: [String], default: [] },         // e.g. ["MBBS", "MD"]
    experienceYears: { type: Number, default: 0, min: 0 },
    languages: { type: [String], default: [] },

    // Location
    hospital: { type: String, default: "" },   // clinic / hospital name
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    address: { type: String, default: "" },

    // Contact
    phone: { type: String, default: "" },
    email: { type: String, default: "" },

    consultationFee: { type: Number, default: 0, min: 0 },
    rating: { type: Number, default: 4.5, min: 0, max: 5 },
    about: { type: String, default: "" },
  },
  { timestamps: true }
);

// Text index so a single search box can match name / specialty / hospital
doctorSchema.index({ name: "text", specialty: "text", hospital: "text", city: "text", state: "text" });

export default mongoose.model("Doctor", doctorSchema);

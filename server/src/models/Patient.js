import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    age: { type: Number, min: 0 },
    gender: { type: String, enum: ["male", "female", "other"] },
    phone: { type: String, required: true },
    address: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Patient", patientSchema);

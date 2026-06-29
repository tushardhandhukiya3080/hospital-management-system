import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: "Department", required: true },
    specialization: { type: String, required: true },
    consultationFee: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Doctor", doctorSchema);

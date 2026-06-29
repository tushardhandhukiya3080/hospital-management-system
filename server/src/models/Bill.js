import mongoose from "mongoose";

const billItemSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    amount: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const billSchema = new mongoose.Schema(
  {
    appointment: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment", required: true },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
    items: { type: [billItemSchema], default: [] },
    totalAmount: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ["paid", "unpaid"], default: "unpaid" },
  },
  { timestamps: true }
);

export default mongoose.model("Bill", billSchema);

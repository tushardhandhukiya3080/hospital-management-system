// Seed script: creates an admin, a department, a doctor, a receptionist, and a patient.
// Run with:  npm run seed
import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import User from "./models/User.js";
import Department from "./models/Department.js";
import Doctor from "./models/Doctor.js";
import Patient from "./models/Patient.js";

const makeUser = async (name, email, password, role) => {
  const u = new User({ name, email, role });
  await u.setPassword(password);
  await u.save();
  return u;
};

const run = async () => {
  await connectDB();

  console.log("Clearing existing data...");
  await Promise.all([
    User.deleteMany({}),
    Department.deleteMany({}),
    Doctor.deleteMany({}),
    Patient.deleteMany({}),
  ]);

  // Admin
  await makeUser("Admin", "admin@hms.com", "admin123", "admin");

  // Receptionist
  await makeUser("Reception Desk", "reception@hms.com", "reception123", "receptionist");

  // Department + Doctor
  const cardiology = await Department.create({
    name: "Cardiology",
    description: "Heart and blood vessels",
  });
  const docUser = await makeUser("Dr. Smith", "doctor@hms.com", "doctor123", "doctor");
  await Doctor.create({
    user: docUser._id,
    department: cardiology._id,
    specialization: "Cardiologist",
    consultationFee: 500,
  });

  // Patient
  const patUser = await makeUser("John Doe", "patient@hms.com", "patient123", "patient");
  await Patient.create({
    user: patUser._id,
    age: 30,
    gender: "male",
    phone: "9999999999",
    address: "123 Main St",
  });

  console.log("\n✅ Seed complete. Login credentials:");
  console.table([
    { role: "admin", email: "admin@hms.com", password: "admin123" },
    { role: "receptionist", email: "reception@hms.com", password: "reception123" },
    { role: "doctor", email: "doctor@hms.com", password: "doctor123" },
    { role: "patient", email: "patient@hms.com", password: "patient123" },
  ]);

  await mongoose.connection.close();
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

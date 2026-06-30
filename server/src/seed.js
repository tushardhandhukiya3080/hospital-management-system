// Seed script: creates one admin + a broad set of FICTIONAL sample doctors
// across many Indian states, cities and specialties.
// All names, phone numbers and emails are made up (example domains / placeholder
// numbers) — they do not refer to real people.
// Run with:  npm run seed
import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import User from "./models/User.js";
import Doctor from "./models/Doctor.js";

// --- building blocks ---
const CITIES = [
  { city: "Mumbai", state: "Maharashtra" },
  { city: "Pune", state: "Maharashtra" },
  { city: "New Delhi", state: "Delhi" },
  { city: "Bengaluru", state: "Karnataka" },
  { city: "Chennai", state: "Tamil Nadu" },
  { city: "Kolkata", state: "West Bengal" },
  { city: "Hyderabad", state: "Telangana" },
  { city: "Ahmedabad", state: "Gujarat" },
  { city: "Jaipur", state: "Rajasthan" },
  { city: "Lucknow", state: "Uttar Pradesh" },
  { city: "Kochi", state: "Kerala" },
  { city: "Chandigarh", state: "Punjab" },
  { city: "Bhopal", state: "Madhya Pradesh" },
  { city: "Patna", state: "Bihar" },
];

const SPECIALTIES = [
  { name: "Cardiologist", quals: ["MBBS", "MD", "DM (Cardiology)"] },
  { name: "Dermatologist", quals: ["MBBS", "MD (Dermatology)"] },
  { name: "Pediatrician", quals: ["MBBS", "MD (Pediatrics)"] },
  { name: "Orthopedic Surgeon", quals: ["MBBS", "MS (Orthopedics)"] },
  { name: "Gynecologist", quals: ["MBBS", "MS (OBG)"] },
  { name: "Neurologist", quals: ["MBBS", "MD", "DM (Neurology)"] },
  { name: "ENT Specialist", quals: ["MBBS", "MS (ENT)"] },
  { name: "Ophthalmologist", quals: ["MBBS", "MS (Ophthalmology)"] },
  { name: "Psychiatrist", quals: ["MBBS", "MD (Psychiatry)"] },
  { name: "General Physician", quals: ["MBBS", "MD (General Medicine)"] },
  { name: "Dentist", quals: ["BDS", "MDS"] },
  { name: "Gastroenterologist", quals: ["MBBS", "MD", "DM (Gastroenterology)"] },
  { name: "Urologist", quals: ["MBBS", "MS", "MCh (Urology)"] },
  { name: "Oncologist", quals: ["MBBS", "MD", "DM (Oncology)"] },
  { name: "Pulmonologist", quals: ["MBBS", "MD (Pulmonology)"] },
  { name: "Endocrinologist", quals: ["MBBS", "MD", "DM (Endocrinology)"] },
  { name: "Nephrologist", quals: ["MBBS", "MD", "DM (Nephrology)"] },
  { name: "Diabetologist", quals: ["MBBS", "MD", "Fellowship (Diabetology)"] },
];

const FIRST = ["Aarav", "Vivaan", "Ananya", "Diya", "Rohan", "Isha", "Kabir", "Meera",
  "Arjun", "Sneha", "Aditya", "Pooja", "Karan", "Riya", "Nikhil", "Tara",
  "Rahul", "Priya", "Sanjay", "Neha", "Vikram", "Anjali", "Manish", "Kavya",
  "Suresh", "Divya", "Rajesh", "Shreya", "Amit", "Nisha"];
const LAST = ["Sharma", "Verma", "Patel", "Reddy", "Nair", "Iyer", "Gupta", "Singh",
  "Mehta", "Joshi", "Rao", "Das", "Bose", "Kulkarni", "Menon", "Chopra",
  "Bhat", "Shetty", "Pillai", "Banerjee"];
const LANGS = ["English", "Hindi", "Marathi", "Tamil", "Telugu", "Kannada", "Bengali", "Gujarati", "Malayalam", "Punjabi"];

const pick = (arr, i) => arr[i % arr.length];

const buildDoctors = (count) => {
  const docs = [];
  for (let i = 0; i < count; i++) {
    const spec = pick(SPECIALTIES, i);
    const loc = pick(CITIES, Math.floor(i / 2) + i);
    const first = pick(FIRST, i * 3 + 1);
    const last = pick(LAST, i * 2 + 3);
    const gender = i % 2 === 0 ? "male" : "female";
    const exp = 5 + ((i * 3) % 26); // 5..30 years
    const fee = 300 + ((i % 9) * 100); // 300..1100
    const rating = (4.2 + ((i % 8) * 0.1)).toFixed(1); // 4.2..4.9
    const langs = [LANGS[0], LANGS[1], pick(LANGS, i + 2)].filter((v, idx, a) => a.indexOf(v) === idx);

    docs.push({
      name: `Dr. ${first} ${last}`,
      gender,
      specialty: spec.name,
      qualifications: spec.quals,
      experienceYears: exp,
      languages: langs,
      hospital: `${loc.city} ${pick(["Care Hospital", "Multispeciality Clinic", "Medical Centre", "Health Institute"], i)}`,
      city: loc.city,
      state: loc.state,
      address: `${100 + i}, ${pick(["MG Road", "Park Street", "Ring Road", "Civil Lines", "Sector 12"], i)}, ${loc.city}`,
      // Clearly fictional placeholder contact details:
      phone: `+91 90000 ${String(10000 + i).slice(-5)}`,
      email: `${first}.${last}`.toLowerCase() + `${i}@example-clinic.in`,
      consultationFee: fee,
      rating: Number(rating),
      about: `${spec.name} with ${exp} years of experience, practising in ${loc.city}, ${loc.state}. Special interest in patient-centred care and preventive health.`,
    });
  }
  return docs;
};

const run = async () => {
  await connectDB();

  console.log("Clearing existing data...");
  await Promise.all([User.deleteMany({}), Doctor.deleteMany({})]);

  // Admin account
  const admin = new User({ name: "Site Admin", email: "admin@medifind.in", role: "admin" });
  await admin.setPassword("admin123");
  await admin.save();

  const doctors = buildDoctors(54);
  await Doctor.insertMany(doctors);

  const states = [...new Set(doctors.map((d) => d.state))];
  const specs = [...new Set(doctors.map((d) => d.specialty))];

  console.log(`\n✅ Seed complete.`);
  console.log(`   Doctors: ${doctors.length}`);
  console.log(`   States covered: ${states.length}`);
  console.log(`   Specialties covered: ${specs.length}`);
  console.log(`\n   Admin login -> email: admin@medifind.in | password: admin123`);

  await mongoose.connection.close();
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

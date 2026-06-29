import User from "../models/User.js";
import Patient from "../models/Patient.js";

// POST /api/patients  (admin/receptionist) — register a patient + account
export const createPatient = async (req, res) => {
  try {
    const { name, email, password, age, gender, phone, address } = req.body;
    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: "name, email, password, phone required" });
    }

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already in use" });

    const user = new User({ name, email, role: "patient" });
    await user.setPassword(password);
    await user.save();

    const patient = await Patient.create({ user: user._id, age, gender, phone, address });
    res.status(201).json(patient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/patients?search=name  (admin/receptionist/doctor)
export const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find().populate("user", "name email");
    const search = (req.query.search || "").toLowerCase();
    const result = search
      ? patients.filter((p) => p.user?.name?.toLowerCase().includes(search))
      : patients;
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/patients/me  (patient views own profile)
export const getMyProfile = async (req, res) => {
  const patient = await Patient.findOne({ user: req.user.id }).populate("user", "name email");
  if (!patient) return res.status(404).json({ message: "Profile not found" });
  res.json(patient);
};

// PUT /api/patients/:id  (admin/receptionist)
export const updatePatient = async (req, res) => {
  try {
    const { age, gender, phone, address } = req.body;
    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      { age, gender, phone, address },
      { new: true }
    );
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/patients/:id  (admin)
export const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    await User.findByIdAndDelete(patient.user);
    res.json({ message: "Patient removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

import User from "../models/User.js";
import Doctor from "../models/Doctor.js";
import Department from "../models/Department.js";

// POST /api/doctors  (admin) — creates the user account + doctor profile
export const createDoctor = async (req, res) => {
  try {
    const { name, email, password, departmentId, specialization, consultationFee } = req.body;
    if (!name || !email || !password || !departmentId || !specialization) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already in use" });

    const user = new User({ name, email, role: "doctor" });
    await user.setPassword(password);
    await user.save();

    const doctor = await Doctor.create({
      user: user._id,
      department: departmentId,
      specialization,
      consultationFee: consultationFee || 0,
    });

    res.status(201).json(doctor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/doctors  (optionally ?department=ID)
export const getDoctors = async (req, res) => {
  try {
    const filter = {};
    if (req.query.department) filter.department = req.query.department;

    const doctors = await Doctor.find(filter)
      .populate("user", "name email")
      .populate("department", "name");
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/doctors/:id  (admin)
export const updateDoctor = async (req, res) => {
  try {
    const { specialization, consultationFee, departmentId } = req.body;
    const update = {};
    if (specialization !== undefined) update.specialization = specialization;
    if (consultationFee !== undefined) update.consultationFee = consultationFee;
    if (departmentId !== undefined) update.department = departmentId;

    const doctor = await Doctor.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/doctors/:id  (admin)
export const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    await User.findByIdAndDelete(doctor.user);
    res.json({ message: "Doctor removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---- Departments ----

// POST /api/departments (admin)
export const createDepartment = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ message: "name is required" });
    const dept = await Department.create({ name, description });
    res.status(201).json(dept);
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ message: "Department already exists" });
    res.status(500).json({ message: err.message });
  }
};

// GET /api/departments
export const getDepartments = async (_req, res) => {
  const departments = await Department.find().sort({ name: 1 });
  res.json(departments);
};

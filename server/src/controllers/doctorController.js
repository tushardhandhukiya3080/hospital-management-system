import Doctor from "../models/Doctor.js";

// GET /api/doctors?search=&state=&city=&specialty=&page=&limit=
// Public listing with search + filters + pagination.
export const getDoctors = async (req, res) => {
  try {
    const { search = "", state = "", city = "", town = "", specialty = "" } = req.query;
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit) || 12, 60);

    const filter = {};
    if (state) filter.state = state;
    if (city) filter.city = city;
    if (town) filter.town = town;
    if (specialty) filter.specialty = specialty;
    if (search.trim()) {
      const rx = new RegExp(search.trim(), "i");
      filter.$or = [{ name: rx }, { specialty: rx }, { hospital: rx }, { town: rx }, { city: rx }, { state: rx }];
    }

    const [total, doctors] = await Promise.all([
      Doctor.countDocuments(filter),
      Doctor.find(filter).sort({ rating: -1, name: 1 }).skip((page - 1) * limit).limit(limit),
    ]);

    res.json({ total, page, pages: Math.ceil(total / limit), doctors });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/doctors/meta — distinct values for filter dropdowns + counts
export const getMeta = async (_req, res) => {
  try {
    const [states, cities, towns, specialties, total] = await Promise.all([
      Doctor.distinct("state"),
      Doctor.distinct("city"),
      Doctor.distinct("town"),
      Doctor.distinct("specialty"),
      Doctor.countDocuments(),
    ]);
    res.json({
      states: states.sort(),
      cities: cities.sort(),
      towns: towns.filter(Boolean).sort(),
      specialties: specialties.sort(),
      total,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/doctors/:id
export const getDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/doctors  (admin)
export const createDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);
    res.status(201).json(doctor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT /api/doctors/:id  (admin)
export const updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json(doctor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE /api/doctors/:id  (admin)
export const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json({ message: "Doctor removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

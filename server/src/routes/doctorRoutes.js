import { Router } from "express";
import {
  createDoctor,
  getDoctors,
  updateDoctor,
  deleteDoctor,
  createDepartment,
  getDepartments,
} from "../controllers/doctorController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = Router();

// Departments
router.get("/departments", protect, getDepartments);
router.post("/departments", protect, authorize("admin"), createDepartment);

// Doctors
router.get("/", protect, getDoctors);
router.post("/", protect, authorize("admin"), createDoctor);
router.put("/:id", protect, authorize("admin"), updateDoctor);
router.delete("/:id", protect, authorize("admin"), deleteDoctor);

export default router;

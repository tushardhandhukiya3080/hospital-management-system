import { Router } from "express";
import {
  getDoctors,
  getMeta,
  getDoctor,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from "../controllers/doctorController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = Router();

// Public
router.get("/", getDoctors);
router.get("/meta", getMeta);
router.get("/:id", getDoctor);

// Admin only
router.post("/", protect, authorize("admin"), createDoctor);
router.put("/:id", protect, authorize("admin"), updateDoctor);
router.delete("/:id", protect, authorize("admin"), deleteDoctor);

export default router;

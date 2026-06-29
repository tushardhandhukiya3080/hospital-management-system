import { Router } from "express";
import {
  createPatient,
  getPatients,
  getMyProfile,
  updatePatient,
  deletePatient,
} from "../controllers/patientController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = Router();

router.get("/me", protect, authorize("patient"), getMyProfile);
router.get("/", protect, authorize("admin", "receptionist", "doctor"), getPatients);
router.post("/", protect, authorize("admin", "receptionist"), createPatient);
router.put("/:id", protect, authorize("admin", "receptionist"), updatePatient);
router.delete("/:id", protect, authorize("admin"), deletePatient);

export default router;

import { Router } from "express";
import {
  createPrescription,
  getPrescriptions,
} from "../controllers/prescriptionController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = Router();

router.get("/", protect, getPrescriptions);
router.post("/", protect, authorize("doctor"), createPrescription);

export default router;

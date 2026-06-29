import { Router } from "express";
import {
  createAppointment,
  getAppointments,
  cancelAppointment,
  completeAppointment,
} from "../controllers/appointmentController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = Router();

router.get("/", protect, getAppointments);
router.post("/", protect, authorize("patient", "receptionist", "admin"), createAppointment);
router.patch("/:id/cancel", protect, authorize("patient", "receptionist", "admin"), cancelAppointment);
router.patch("/:id/complete", protect, authorize("doctor", "admin"), completeAppointment);

export default router;

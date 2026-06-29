import { Router } from "express";
import { createBill, getBills, markPaid } from "../controllers/billController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = Router();

router.get("/", protect, getBills);
router.post("/", protect, authorize("receptionist", "admin"), createBill);
router.patch("/:id/pay", protect, authorize("receptionist", "admin"), markPaid);

export default router;

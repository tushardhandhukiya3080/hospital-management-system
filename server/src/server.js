import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || "*" }));
app.use(express.json());

// Health check
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);

// 404 fallback
app.use((_req, res) => res.status(404).json({ message: "Route not found" }));

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
});

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import roomRoutes from "./routes/roomRoutes.js";
import scanRoutes from "./routes/scanRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/rooms", roomRoutes);
app.use("/api/scan", scanRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("SpaceMate backend running...");
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(5000, () => console.log("🚀 Server running on port 5000"));
  })
  .catch((err) => console.error("MongoDB connection error:", err));

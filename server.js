// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// Routes
import userRoutes from "./routes/userRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import hrRoutes from "./routes/hrRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import checklistRoutes from "./routes/checklistRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

// Initialize environment variables
dotenv.config();

// Display current auth mode on startup
if (process.env.FREE_MODE === "true") {
  console.log(" Server running in FREE MODE — authentication is disabled!");
} else {
  console.log(" Server running in SECURE MODE — authentication is required.");
}


// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Body parser for JSON

// Mount API routes
app.use("/api/users", userRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/hr", hrRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/checklists", checklistRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/messages", messageRoutes);

// Default route for testing
app.get("/", (req, res) => {
  res.send("Capstone Project HR API is running...");
});

// 404 handler for unknown routes
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Server error" });
});

// Start server
const PORT = process.env.PORT || 3000; // Use Render's assigned port if available
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import User from "./Model/userModel.js";  //admin seeding
import bcrypt from "bcryptjs";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/capstone_hr";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/events", eventRoutes);
app.use("/uploads", express.static("uploads"));


app.get("/", (req, res) => {
  res.send("Welcome to the HR Capstone Project API");
});

//MongoDB connection
mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected successfully");

    //AUTO ADMIN SEEDING LOGIC 
    const existingAdmin = await User.findOne({ role: "hr" });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("Admin@123", 10);
      const adminUser = new User({
        name: "System Admin",
        email: "admin@hr.com",
        password: "Admin@123",
        role: "hr", // HR = Admin
        department: "HR",
      });
      await adminUser.save();
      console.log("Default Admin created:");
      console.log("Email: admin@hr.com");
      console.log("Password: Admin@123");
    } else {
      console.log("Admin already exists, skipping seeding.");
    }
  })
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

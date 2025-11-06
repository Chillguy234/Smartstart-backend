import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./Model/userModel.js";

dotenv.config();

mongoose.connect("mongodb://127.0.0.1:27017/capstone_hr")
     .then(async () => {
         console.log("MongoDB connected");

    const existingAdmin = await User.findOne({ email: "admin@hr.com" });
          if (existingAdmin) {
             console.log("Admin already exists:", existingAdmin.email);
                 process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("Admin123!", 10);
         const admin = new User({
             name: "System Admin",
                 email: "admin@hr.com",
                     password: hashedPassword,
                         role: "hr", 
    });

    await admin.save();
          console.log("Admin user created successfully");
              console.log("Email:", admin.email);
                  console.log("Password: Admin123!");

                     process.exit(0);
  })
                          .catch((err) => {
                             console.error(err);
                                   process.exit(1);
  });

import jwt from "jsonwebtoken";
import User from "../model/userModel.js"; // adjust path if needed

export const protect = async (req, res, next) => {
  try {
    // ✅ Free Mode: skip authentication but set a dummy user
    if (process.env.FREE_MODE === "true") {
      console.log("🟢 Free Mode active: skipping authentication");
      req.user = { id: "guest", name: "Public User", role: "admin" };
      return next();
    }

    // 🔒 Secure Mode: enforce JWT authentication
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        if (!req.user) {
          return res.status(401).json({ message: "User not found" });
        }
        return next();
      } catch (err) {
        console.error("Token verification failed:", err.message);
        return res.status(401).json({ message: "Not authorized, token failed" });
      }
    }

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }
  } catch (error) {
    console.error("Protect middleware error:", error);
    res.status(500).json({ message: "Server error in authentication middleware" });
  }
};

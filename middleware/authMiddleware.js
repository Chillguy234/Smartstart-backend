import jwt from "jsonwebtoken";
import User from "../Model/userModel.js";


export const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied: insufficient privileges",
      });
    }
    next();
  };
};

export const protect = async (req, res, next) => {
  let token;

  // Check for Bearer token in headers
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Extract token
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to request, exclude password
            req.user = await User.findById(decoded.id).select("-password");

            next(); // Proceed to route handler
    } catch (error) {
            res.status(401).json({ success: false, message: "Not authorized, token failed" });
    }
  }

  if (!token) {
     res.status(401).json({ success: false, message: "Not authorized, no token" });
  }
};

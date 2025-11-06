import express from "express";
import { addProgress, getProgressByTask } from "../Controllers/progressController.js";
import { protect } from "../middleware/authMiddleware.js"; 

const router = express.Router();

router.post("/", protect, addProgress); // POST /api/progress

//Get all progress updates for a specific task 
router.get("/:taskId", protect, getProgressByTask); // GET /api/progress/:taskId

export default router;

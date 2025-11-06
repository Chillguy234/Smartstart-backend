import express from "express";
import {
        createTask,
         getTasksByEmployee,
            updateTaskStatus,
             addChecklistItem,
               toggleChecklistItem,
                  deleteChecklistItem,
} from "../controllers/taskController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

      router.post("/", protect, createTask);
       router.get("/:employeeId", protect, getTasksByEmployee);
          router.put("/:id", protect, updateTaskStatus);

//Checklist Operations
      router.post("/:taskId/checklist", protect, addChecklistItem); 
        router.put("/:taskId/checklist/:itemId", protect, toggleChecklistItem); 
         router.delete("/:taskId/checklist/:itemId", protect, deleteChecklistItem); 

export default router;

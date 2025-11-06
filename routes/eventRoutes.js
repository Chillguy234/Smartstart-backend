import express from "express";
import {
     createEvent,
         getEvents,
              updateEvent,
                 deleteEvent,
} from "../Controllers/eventController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

 const router = express.Router();

// HR/Admin creates event
      router.post("/", protect, createEvent);

// HR & Employees view events
          router.get("/", protect, getEvents);

// HR/Admin updates or deletes event
             router.put("/:id", protect, updateEvent);
                 router.delete("/:id", protect, deleteEvent);

export default router;

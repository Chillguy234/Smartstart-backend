import express from "express";
import {
         createUser,
             loginUser,
                 getAllUsers,
                      getUserById,
                           updateUser,
                              deleteUser,
} from "../Controllers/userController.js"; 
import { protect } from "../middleware/authMiddleware.js";

            const router = express.Router();

                    router.post("/", createUser);        // POST /api/users      -> register / create user
                     router.post("/login", loginUser);    // POST /api/users/login -> login (returns JWT)

                         router.get("/", protect, getAllUsers);        // GET /api/users
                              router.get("/:id", protect, getUserById);     // GET /api/users/:id
                                   router.put("/:id", protect, updateUser);      // PUT /api/users/:id
                                      router.delete("/:id", protect, deleteUser);   // DELETE /api/users/:id

export default router;

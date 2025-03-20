// backend/routes/userRoutes.js
import express from "express";
import { getUsers, updateUser } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const userRoutes = express.Router();

// Admin-only routes
userRoutes.get("/", authMiddleware, roleMiddleware(["admin"]), getUsers);
userRoutes.put("/:id", authMiddleware, roleMiddleware(["admin"]), updateUser);

export default userRoutes;

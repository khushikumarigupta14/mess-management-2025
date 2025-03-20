// backend/routes/authRoutes.js
import express from "express";
import { login, register } from "../controllers/authController.js";

const authRoutes = express.Router();

// Login route
authRoutes.post("/login", login);
authRoutes.post("/register", register);
export default authRoutes;

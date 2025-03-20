// backend/routes/mealRoutes.js
import express from "express";
import {
  getMeals,
  addMeal,
  updateMeal,
} from "../controllers/mealController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const mealRoutes = express.Router();

// Public route
mealRoutes.get("/", getMeals);

// Admin-only routes
mealRoutes.post("/", authMiddleware, roleMiddleware(["admin"]), addMeal);
mealRoutes.put("/:id", authMiddleware, roleMiddleware(["admin"]), updateMeal);

export default mealRoutes;

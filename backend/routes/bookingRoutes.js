import express from "express";
import {
  getBookings,
  bookMeal,
  cancelBooking,
} from "../controllers/bookingController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js"; // Assuming you have a roleMiddleware

const bookingRoutes = express.Router();

// Protected routes
bookingRoutes.get(
  "/",
  authMiddleware,
  roleMiddleware(["admin", "manager"]),
  getBookings
);
bookingRoutes.post("/", authMiddleware, roleMiddleware(["user"]), bookMeal);
bookingRoutes.put(
  "/:id/cancel",
  authMiddleware,
  roleMiddleware(["user"]),
  cancelBooking
);

export default bookingRoutes;

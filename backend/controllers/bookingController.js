import Booking from "../models/BookingModel.js";
import { validationResult } from "express-validator"; // Assuming you use express-validator for validation

// Get all bookings (Manager and Admin)
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId", "name email")
      .populate("mealId", "name price");
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res
      .status(500)
      .json({ message: "Error fetching bookings", error: error.message });
  }
};

// Book a meal (User only)
const bookMeal = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { mealId } = req.body;
  const userId = req.user.userId;

  try {
    const booking = new Booking({ userId, mealId, date: new Date() });
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    console.error("Error booking meal:", error);
    res
      .status(500)
      .json({ message: "Error booking meal", error: error.message });
  }
};

// Cancel a booking (User only)
const cancelBooking = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findByIdAndUpdate(
      id,
      { status: "cancelled" },
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json(booking);
  } catch (error) {
    console.error("Error cancelling booking:", error);
    res
      .status(500)
      .json({ message: "Error cancelling booking", error: error.message });
  }
};

export { getBookings, bookMeal, cancelBooking };

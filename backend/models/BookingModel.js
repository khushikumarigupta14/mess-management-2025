import mongoose from "mongoose";
const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  mealId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MealPlan",
    required: true,
  },
  date: { type: Date, required: true },
  status: { type: String, enum: ["booked", "cancelled"], default: "booked" },
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;

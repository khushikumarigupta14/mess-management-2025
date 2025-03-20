// backend/models/Meal.js
import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  available: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

const Meal = mongoose.model("Meal", mealSchema);

export default Meal;

// backend/controllers/mealController.js
import Meal from "../models/MealModel.js";

// Get all meals
const getMeals = async (req, res) => {
  try {
    const meals = await Meal.find();
    res.json(meals);
  } catch (error) {
    res.status(500).json({ message: "Error fetching meals", error });
  }
};

// Add a new meal (Admin only)
const addMeal = async (req, res) => {
  const { name, description, price } = req.body;

  try {
    const meal = new Meal({ name, description, price });
    await meal.save();
    res.status(201).json(meal);
  } catch (error) {
    res.status(500).json({ message: "Error adding meal", error });
  }
};

// Update meal details (Admin only)
const updateMeal = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, available } = req.body;

  try {
    const meal = await Meal.findByIdAndUpdate(
      id,
      { name, description, price, available },
      { new: true }
    );
    if (!meal) {
      return res.status(404).json({ message: "Meal not found" });
    }
    res.json(meal);
  } catch (error) {
    res.status(500).json({ message: "Error updating meal", error });
  }
};

export { getMeals, addMeal, updateMeal };

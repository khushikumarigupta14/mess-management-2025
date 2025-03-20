// backend/controllers/userController.js
import User from "../models/userModel.js";
// import { roleMiddleware } from "../middleware/roleMiddleware.js";

// Get all users (Admin only)
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

// Update user role or balance (Admin only)
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { role, balance } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { role, balance },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};

export { getUsers, updateUser };

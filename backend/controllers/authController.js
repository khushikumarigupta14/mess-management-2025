import jwt from "jsonwebtoken";
import { default as admin } from "firebase-admin";
import User from "../models/userModel.js";
import serviceAccount from "../config/serviceAccountKey.json" assert { type: "json" };

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Login with Firebase and MongoDB
const login = async (req, res) => {
  const { token } = req.body;

  try {
    // Verify the Firebase token
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { email, uid } = decodedToken;

    // Fetch user from MongoDB
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a JWT for the user
    const jwtToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token: jwtToken, role: user.role });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Register with Firebase and MongoDB
const register = async (req, res) => {
  const { token, role } = req.body;

  try {
    // Verify the Firebase token
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { email, uid, name } = decodedToken;

    // Check if user already exists in MongoDB
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user in MongoDB
    const newUser = new User({ email, name, role: role || "user" });
    await newUser.save();

    // Generate a JWT for the user
    const jwtToken = jwt.sign(
      { userId: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({ token: jwtToken, role: newUser.role });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { login, register };

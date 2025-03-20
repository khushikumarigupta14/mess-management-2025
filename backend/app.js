import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
// import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import mealRoutes from "./routes/mealRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
// backend/app.js
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const authRoutes = require("./routes/authRoutes");
// const userRoutes = require("./routes/userRoutes");
// const mealRoutes = require("./routes/mealRoutes");
dotenv.config();
const app = express();

// Middleware
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/meals", mealRoutes);
app.use("/api/bookings", bookingRoutes);

dotenv.config();
// const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
// app.use("/api/users", userRoutes);

export default app;

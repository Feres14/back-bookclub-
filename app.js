import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./Roots/userRoutes.js";
import bookRoutes from "./Roots/bookRoutes.js";

import 'dotenv/config';

// Connect to the database
connectDB();

// initialize the app
const app = express();

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Routes
app.use("/api/auth", userRoutes);
app.use("/api/books", bookRoutes)

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
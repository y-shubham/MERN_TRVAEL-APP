import express from "express";
import mongoose from "mongoose";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import packageRoute from "./routes/package.route.js";
import ratingRoute from "./routes/rating.route.js";
import bookingRoute from "./routes/booking.route.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => console.log(err));

// Middleware
app.use(
  cors({
    origin: process.env.SERVER_URL, // Adjust this to your frontend URL
  })
);
app.use(express.json());
app.use(cookieParser());

// API routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/package", packageRoute);
app.use("/api/rating", ratingRoute);
app.use("/api/booking", bookingRoute);

// Start server on Vercel's PORT or fallback to 8000
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const couponRoutes = require("./routes/couponRoutes");

dotenv.config();
connectDB();

const app = express();

// ✅ Allow requests from Vercel frontend
app.use(
  cors({
    origin: "https://coupon-frontend-five.vercel.app", // Vercel URL
    credentials: true, // Allow cookies & authentication headers
  })
);

app.use(express.json());
app.use(cookieParser());

//  Set Headers for CORS (Extra safety)
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://coupon-frontend-five.vercel.app"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

//  Routes
app.use("/api/coupons", couponRoutes);

//  Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

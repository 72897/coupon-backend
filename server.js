const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const couponRoutes = require("./routes/couponRoutes");

dotenv.config();
connectDB();

const app = express();
//  Enable CORS for frontend URL
app.use(
  cors({
    origin: "https://coupon-frontend-five.vercel.app", // Vercel frontend URL
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

//  Allow CORS for all routes
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://coupon-frontend-five.vercel.app"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Routes
app.use("/api/coupons", couponRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

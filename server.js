const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const couponRoutes = require("./routes/couponRoutes");

dotenv.config();
connectDB();

const app = express();

// ✅ Enable CORS for frontend URL
app.use(
  cors({
    origin: "https://coupon-frontend-five.vercel.app", // Replace with your Vercel frontend URL
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/coupons", couponRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

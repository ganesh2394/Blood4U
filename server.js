const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoute");
const inventoryRoutes = require("./routes/inventoryRoutes");
const path = require("path");

dotenv.config();
const app = express();
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/inventory", inventoryRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", function (req, res) {
    res.send("API is running...");
  });
}

const PORT = process.env.PORT || 8080;
const DEV_MODE = process.env.DEV_MODE;
app.listen(PORT, () =>
  console.log(
    `Server running in ${DEV_MODE} mode on port ${PORT} `.bgBlue.white
  )
);

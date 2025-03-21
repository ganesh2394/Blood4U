const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const testRoutes = require("./routes/testRoute");
const authRoutes = require("./routes/authRoute");
const inventoryRoutes = require("./routes/inventoryRoutes");

dotenv.config();
const app = express();

connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.get("/", function (req, res) {
  res.send("Hello World");
});

app.use("/api/test", testRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/inventory", inventoryRoutes);

const PORT = process.env.PORT || 8080;
const DEV_MODE = process.env.DEV_MODE;
app.listen(PORT, () =>
  console.log(
    `Server running in ${DEV_MODE} mode on port ${PORT} `.bgBlue.white
  )
);

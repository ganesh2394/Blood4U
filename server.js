const dotenv = require("dotenv");
const colors = require("colors");
const connectDB = require("./config/db");
const app = require("./app");

dotenv.config();

connectDB();

const PORT = process.env.PORT || 8080;
const DEV_MODE = process.env.DEV_MODE || "development";

app.listen(PORT, () => {
  console.log(
    `Server running in ${DEV_MODE} mode on port ${PORT}`.bgBlue.white
  );
});

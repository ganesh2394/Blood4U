const express = require("express");
const {
  registerUser,
  loginUser,
  getCurrentUser,
  ForgetUserPassword,
  ResetPassword,
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

// Register Route
router.post("/register", registerUser);

// Login Route
router.post("/login", loginUser);

// Forget Password Route
router.post("/forgot-password", ForgetUserPassword);

// Reset Password
router.post("/reset-password/:token", ResetPassword);

// Get Current User Route
router.get("/current-user", authMiddleware, getCurrentUser);
module.exports = router;

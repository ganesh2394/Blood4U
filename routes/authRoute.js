const express = require("express");
const {
  registerUser,
  loginUser,
  getCurrentUser,
  ForgetUserPassword,
  ResetPassword,
  getAllUsers,
  updateUser,
  deleteUser,
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
router.post("/reset-password", ResetPassword);

// Get Current User Route
router.get("/current-user", authMiddleware, getCurrentUser);

// Get All Users
router.get("/users",getAllUsers )

// Delete User
router.delete("/users/delete/:id", deleteUser);

// Update User
router.put("/users/update/:id", updateUser);

module.exports = router;

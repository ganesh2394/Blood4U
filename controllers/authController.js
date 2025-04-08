const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const nodemailer = require("nodemailer");

require("dotenv").config();
// Register User
const registerUser = async (req, res) => {
  try {
    const {
      role,
      name,
      organizationName,
      hospitalName,
      email,
      password,
      address,
      phone,
      website,
      bloodType,
    } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Build user object
    const userData = {
      role,
      name,
      organizationName,
      hospitalName,
      email,
      password: hashedPassword,
      address,
      phone,
      website,
    };

    // Only add bloodType if role is donor and it's not an empty string
    if (role === "donor" && bloodType && bloodType.trim() !== "") {
      userData.bloodType = bloodType;
    }

    // Create user instance
    const user = new User(userData);

    // Save user
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // check role
    if (user.role !== role) {
      return res.status(403).json({
        success: false,
        message: "Access denied: Role mismatch",
      });
    }

    // Compare password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Remove password from response for security reasons
    const { password: _, ...userData } = user.toObject();

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: userData,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error in login API",
      error: error.message,
    });
  }
};

// get Current User
const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      user,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({
      success: false,
      message: "Error retrieving user data",
      error,
    });
  }
};

// Send reset link
const ForgetUserPassword = async (req, res) => {
  const { email, role } = req.body;
  if (!email || !role) {
    return res.status(400).json({ message: "Email and role are required." });
  }
  try {
    const user = await User.findOne({ email, role }); // Check email & role in DB
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found with this email and role." });
    }
    // TODO: Generate reset token and send an email (optional)
    res
      .status(200)
      .json({ message: "Password reset link sent to your email." });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Reset Password
const ResetPassword = async (req, res) => {
  const { email, role, password } = req.body;

  if (!email || !role || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const user = await User.findOne({ email, role });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password has been reset successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Get All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    await User.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete User Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // Check if user exists
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // If user is not a donor, prevent bloodType update
    if (user.role !== "donor" && "bloodType" in updatedData) {
      delete updatedData.bloodType;
    }

    // If bloodType is empty string, remove it
    if (
      user.role === "donor" &&
      "bloodType" in updatedData &&
      updatedData.bloodType.trim() === ""
    ) {
      delete updatedData.bloodType;
    }

    // Update user data
    const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update User Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

module.exports = {
  deleteUser,
  registerUser,
  loginUser,
  getCurrentUser,
  ForgetUserPassword,
  ResetPassword,
  getAllUsers,
  updateUser,
};

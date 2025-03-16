const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const registerUser = async (req, res) => {
  try {
    const {
      role,
      name,
      organisationName,
      hospitalName,
      email,
      password,
      address,
      phone,
      website,
    } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user object
    const user = new User({
      role,
      name,
      organisationName,
      hospitalName,
      email,
      password: hashedPassword,
      address,
      phone,
      website,
    });

    // Save user
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

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

const ForgetUserPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ message: "User not found" });

  const token = jwt.sign({ id: user._id }, "secretKey", { expiresIn: "1h" });

  // Send Email
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: { user: "your-email@gmail.com", pass: "your-password" },
  });

  const mailOptions = {
    from: "your-email@gmail.com",
    to: user.email,
    subject: "Password Reset",
    html: `<p>Click <a href="http://localhost:3000/reset-password/${token}">here</a> to reset your password.</p>`,
  };

  await transporter.sendMail(mailOptions);
  res.json({ message: "Password reset link sent to your email" });
};

// Reset Password
const ResetPassword = async (req, res) => {
  try {
    const decoded = jwt.verify(req.params.token, "secretKey");
    const user = await User.findById(decoded.id);
    if (!user) return res.status(400).json({ message: "Invalid token" });

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password successfully reset" });
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  ForgetUserPassword,
  ResetPassword,
};

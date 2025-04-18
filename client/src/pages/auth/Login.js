import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react"; // optional: eye icon for toggle

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    role: "",
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    const savedRole = localStorage.getItem("rememberedRole");
    const isRemembered = localStorage.getItem("rememberMe") === "true";

    if (isRemembered && savedEmail && savedRole) {
      setFormData((prev) => ({
        ...prev,
        email: savedEmail,
        role: savedRole,
      }));
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRememberMe = (e) => {
    setRememberMe(e.target.checked);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.role) {
      toast.error("Please select a role.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + "/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login Failed");
      }

      const data = await response.json();
      const userRole = data?.user?.role || "guest";
      const userId = data?.user?._id || "";

      localStorage.setItem("authToken", data.token);
      localStorage.setItem("role", userRole);
      localStorage.setItem("userId", userId);

      if (userRole === "organization") {
        localStorage.setItem("organizationId", userId);
      } else {
        localStorage.removeItem("organizationId");
      }

      if (rememberMe) {
        localStorage.setItem("rememberedEmail", formData.email);
        localStorage.setItem("rememberedRole", userRole);
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberedEmail");
        localStorage.removeItem("rememberedRole");
        localStorage.removeItem("rememberMe");
      }

      toast.success("Login Successfully");

      setTimeout(() => {
        switch (userRole) {
          case "admin":
            navigate("/admin-dashboard");
            break;
          case "organization":
            navigate("/org-dashboard");
            break;
          case "donor":
            navigate("/donor-dashboard");
            break;
          case "hospital":
            navigate("/hospital-dashboard");
            break;
          default:
            navigate("/");
        }
      }, 1000);
    } catch (error) {
      console.error("Error:", error.message);
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat flex justify-center items-center"
      style={{
        backgroundImage: "url('/assets/images/background1.png')",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-lg"></div>

      <div className="z-10 w-full max-w-3xl mx-4 sm:mx-auto flex bg-white shadow-2xl rounded-lg overflow-hidden">
        <div className="w-1/2 hidden md:block">
          <img
            src="/assets/images/auth-image.png"
            alt="Auth Illustration"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center relative">
          {/* Go to Home Link at Top Left */}
          <Link
            to="/"
            className="absolute top-4 left-4 text-blue-600 font-normal hover:underline flex items-center space-x-2"
          >
            <span>Back to Home</span>
          </Link>

          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 mt-3">
            Login
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Role */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role <span className="text-red-500">*</span>
              </label>
              <select
                name="role"
                required
                className="w-full border p-2 rounded"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="organization">Organization</option>
                <option value="donor">Donor</option>
                <option value="hospital">Hospital</option>
              </select>
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full border p-2 rounded"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Password with toggle */}
            <div className="mb-4 relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                className="w-full border p-2 rounded pr-10"
                value={formData.password}
                onChange={handleChange}
              />
              <div
                className="absolute top-9 right-3 cursor-pointer text-gray-500"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>

            {/* Remember Me + Forgot Password */}
            <div className="mb-4 flex justify-between items-center">
              <label className="flex items-center text-sm text-gray-700">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={rememberMe}
                  onChange={handleRememberMe}
                />
                Remember Me
              </label>
              <Link
                to="/forgot-password"
                className="text-blue-600 text-sm hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Signup */}
          <p className="text-center mt-4 text-sm text-gray-700">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    role: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        const userRole = data?.user?.role || "guest";
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("role", userRole);
        alert("Login Successful");

        switch (data.user.role) {
          case "admin":
            navigate("/admin-dashboard");
            break;
          case "organisation":
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
      } else {
        alert(data.message || "Login Failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat flex justify-center items-center"
      style={{
        backgroundImage: "url('/assets/images/background1.png')",
        backgroundSize: "cover",
      }}
    >
      {/* Overlay for Blur Effect */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-lg"></div>

      {/* Login Form */}
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center ">
        {/* Container for Image & Login Form */}
        <div className="w-full max-w-4xl flex bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Left Side - Image */}
          <div className="w-1/2 hidden md:block">
            <img
              src="/assets/images/auth-image.png"
              alt="Auth Illustration"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
            <form onSubmit={handleSubmit}>
              {/* Role Selection */}
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Role
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
                  <option value="organisation">Organisation</option>
                  <option value="donor">Donor</option>
                  <option value="hospital">Hospital</option>
                </select>
              </div>

              {/* Email */}
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Email
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

              {/* Password */}
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  className="w-full border p-2 rounded"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
              >
                Login
              </button>
            </form>

            {/* SignUp Link */}
            <p className="text-center mt-3 text-sm text-gray-700">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

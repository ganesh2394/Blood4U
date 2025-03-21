import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    role: "",
    name: "",
    organisationName: "",
    hospitalName: "",
    email: "",
    password: "",
    website: "",
    address: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Registration Successful");
        navigate("/login");
      } else {
        alert(data.message || "Registration Failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div
      className=" fixed top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat flex justify-center items-center"
      style={{
        backgroundImage: "url('/assets/images/background1.png')",
      }}
    >
      {/* Overlay for Blur Effect */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-lg"></div>

      {/* Container for Image & Form */}
      <div className="relative bg-white bg-opacity-90 p-6 rounded-lg shadow-md max-w-4xl w-full flex z-10 min-h-[500px] h-full">
        {/* Left Side - Image */}
        <div className="hidden md:flex w-1/2 h-full">
          <img
            src="/assets/images/register-illustration.png"
            alt="Register"
            className="w-full h-full object-cover rounded-l-lg"
          />
        </div>

        {/* Right Side - Registration Form */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between h-full">
          <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
            Register
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col h-full">
            {/* Role Selection */}
            <div className="mb-3">
              <label className="block text-xm font-medium text-gray-700">
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

            {/* Name */}
            {(formData.role === "admin" || formData.role === "donor") && (
              <div className="mb-3">
                <label className="block text-xm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full border p-2 rounded"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            )}

            {/* Organisation Name (Only for Organisations) */}
            {formData.role === "organisation" && (
              <div className="mb-3">
                <label className="block text-xm font-medium text-gray-700">
                  Organisation Name
                </label>
                <input
                  type="text"
                  name="organisationName"
                  required
                  className="w-full border p-2 rounded"
                  value={formData.organisationName}
                  onChange={handleChange}
                />
              </div>
            )}

            {/* Hospital Name (Only for Hospitals) */}
            {formData.role === "hospital" && (
              <div className="mb-3">
                <label className="block text-xm font-medium text-gray-700">
                  Hospital Name
                </label>
                <input
                  type="text"
                  name="hospitalName"
                  required
                  className="w-full border p-2 rounded"
                  value={formData.hospitalName}
                  onChange={handleChange}
                />
              </div>
            )}

            {/* Email */}
            <div className="mb-3">
              <label className="block text-xm font-medium text-gray-700">
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
              <label className="block text-xm font-medium text-gray-700">
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

            {/* Website (Optional) */}
            <div className="mb-3">
              <label className="block text-xm font-medium">
                Website (Optional)
              </label>
              <input
                type="text"
                name="website"
                className="w-full border p-2 rounded"
                value={formData.website}
                onChange={handleChange}
              />
            </div>

            {/* Address */}
            <div className="mb-3">
              <label className="block text-xm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                name="address"
                required
                className="w-full border p-2 rounded"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            {/* Phone */}
            <div className="mb-3">
              <label className="block text-xm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                required
                className="w-full border p-2 rounded"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
            >
              Register
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center mt-3 text-sm text-gray-700">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

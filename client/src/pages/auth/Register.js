import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    role: "",
    name: "",
    organizationName: "",
    hospitalName: "",
    email: "",
    password: "",
    website: "",
    address: "",
    phone: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { email, phone, password } = formData;

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    if (!/^\d{10}$/.test(phone)) {
      toast.error("Phone number must be 10 digits");
      return false;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + "/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Registration successful!");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        toast.error(data.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat flex justify-center items-center"
      style={{ backgroundImage: "url('/assets/images/background1.png')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />

      <div className="relative bg-white bg-opacity-90 p-6 rounded-2xl shadow-lg max-w-4xl w-full flex z-10 min-h-[550px] h-fit">
        <div className="hidden md:flex w-1/2 h-full">
          <img
            src="/assets/images/register-illustration.png"
            alt="Register"
            className="w-full h-full object-cover rounded-l-2xl"
          />
        </div>

        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
          <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
            Create an Account
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div>
              <label className="block font-medium text-gray-700 mb-1">
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

            {(formData.role === "admin" || formData.role === "donor") && (
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full border p-2 rounded outline-none hover:border-blue-600"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            )}

            {formData.role === "organization" && (
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Organization Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="organizationName"
                  required
                  className="w-full border p-2 rounded outline-none hover:border-blue-600"
                  value={formData.organizationName}
                  onChange={handleChange}
                />
              </div>
            )}

            {formData.role === "hospital" && (
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Hospital Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="hospitalName"
                  required
                  className="w-full border p-2 rounded outline-none hover:border-blue-600"
                  value={formData.hospitalName}
                  onChange={handleChange}
                />
              </div>
            )}

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full border p-2 rounded outline-none hover:border-blue-600"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="relative">
              <label className="block font-medium text-gray-700 mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                className="w-full border p-2 rounded pr-10 outline-none hover:border-blue-600"
                value={formData.password}
                onChange={handleChange}
              />
              <div
                className="absolute right-3 top-9 cursor-pointer text-gray-600"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>

            <div>
              <label className="block font-medium">Website (Optional)</label>
              <input
                type="text"
                name="website"
                className="w-full border p-2 rounded outline-none hover:border-blue-600"
                value={formData.website}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="address"
                required
                className="w-full border p-2 rounded outline-none hover:border-blue-600"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="phone"
                required
                className="w-full border p-2 rounded outline-none hover:border-blue-600"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className={`w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300 ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="text-center mt-4 text-sm text-gray-700">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
          <div className="text-center mb-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-blue-600 font-normal hover:underline transition duration-200"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

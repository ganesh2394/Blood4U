import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email.trim() || role === "user") {
      setMessage("Please enter a valid email and select a role.");
      return;
    }
    try {
      // Call the API to check if email & role exist
      const response = await axios.post(
        "http://localhost:8080/api/auth/forgot-password",
        {
          email,
          role,
        }
      );

      console.log(response.data.message);
      localStorage.setItem("resetEmail", email);
      localStorage.setItem("resetRole", role);

      navigate("/reset-password"); // Redirect to reset password page
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-96">
      <h2 className="text-2xl font-bold text-center mb-4">Forgot Password</h2>
      {message && <p className="text-center text-red-500">{message}</p>}
      <form onSubmit={handleForgotPassword}>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <select
          className="w-full p-2 border border-gray-300 rounded mb-3"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user" disabled>
            Select Role
          </option>
          <option value="admin">Admin</option>
          <option value="donor">Donor</option>
          <option value="hospital">Hospital</option>
          <option value="organization">Organization</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;

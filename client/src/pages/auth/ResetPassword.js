import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const [email] = useState(localStorage.getItem("resetEmail") || ""); // Auto-filled email
  const [role] = useState(localStorage.getItem("resetRole") || "user"); // Auto-filled role
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/reset-password",
        {
          email,
          role,
          password,
        }
      );

      console.log(response.data.message);
      alert("Password reset successfully.");
      setTimeout(() => navigate("/login"), 2000); // Redirect to login after success
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>
      {message && <p className="text-center text-red-500">{message}</p>}
      <form onSubmit={handleResetPassword}>
        <input
          type="email"
          value={email}
          className="w-full p-2 border border-gray-300 rounded mb-3"
          disabled
        />
        <input
          type="text"
          value={role}
          className="w-full p-2 border border-gray-300 rounded mb-3"
          disabled
        />
        <input
          type="password"
          placeholder="New Password"
          className="w-full p-2 border border-gray-300 rounded mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-2 border border-gray-300 rounded mb-3"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user session (token, user data, etc.)
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    // Redirect to login page after logout
    navigate("/");
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <h2 className="text-xl font-bold">Logging out...</h2>
    </div>
  );
};

export default Logout;

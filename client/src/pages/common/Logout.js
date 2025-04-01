import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

const Logout = () => {
  const navigate = useNavigate();
  const hasLoggedOut = useRef(false);

  useEffect(() => {
    if (!hasLoggedOut.current) {
      hasLoggedOut.current = true;
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      localStorage.removeItem("role");
      toast.success("You have been logged out successfully");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  }, [navigate]);

  return (
    <div className="flex flex-col justify-center items-center h-screen text-center">
      <Toaster />
      <div className="text-xl font-bold mb-4">Logging out...</div>
      <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
    </div>
  );
};

export default Logout;

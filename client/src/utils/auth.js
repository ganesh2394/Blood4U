import { useNavigate } from "react-router-dom";

export const logoutUser = (navigate) => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
  navigate("/login"); // Redirect to Login page
};

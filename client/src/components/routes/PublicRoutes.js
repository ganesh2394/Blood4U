import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = () => {
  const isAuthenticated = localStorage.getItem("authToken");
  const userRole = localStorage.getItem("role");

  if (isAuthenticated) {
    switch (userRole) {
      case "admin":
        return <Navigate to="/admin-dashboard" />;
      case "organisation":
        return <Navigate to="/org-dashboard" />;
      case "donor":
        return <Navigate to="/donor-dashboard" />;
      case "hospital":
        return <Navigate to="/hospital-dashboard" />;
      default:
        return <Navigate to="/" />; // If no valid role, redirect to home
    }
  }

  return <Outlet />;
};

export default PublicRoutes;

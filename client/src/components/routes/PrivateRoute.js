import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ allowedRoles }) => {
  const userRole = localStorage.getItem("role")?.trim();
  const authToken = localStorage.getItem("authToken");

  // Check if token exists and role is allowed
  if (!authToken || !allowedRoles.includes(userRole)) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;

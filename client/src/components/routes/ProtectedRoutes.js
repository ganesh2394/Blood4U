import React from "react";
import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoutes = () => {
  const isAuthenticated = localStorage.getItem("authToken");
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  } else {
    return <Outlet />;
  }
};

export default ProtectedRoutes;

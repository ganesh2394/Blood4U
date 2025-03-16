import React from "react";
import { Navigate, Outlet } from "react-router-dom";
const PublicRoutes = () => {
  const isAuthenticated = localStorage.getItem("authToken");
  if (isAuthenticated) {
    return <Navigate to={"/dashbord"} />;
  } else {
    return <Outlet />;
  }
};

export default PublicRoutes;

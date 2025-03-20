import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");

    if (!storedRole) {
      navigate("/login");
    } else {
      setRole(storedRole);
    }

    setLoading(false);
  }, [navigate]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  return (
    <div className="flex h-screen">
      {/* Sidebar with Role */}
      {role && <Sidebar role={role} />}

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <main className="p-2 bg-gray-100 flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    <div className="flex h-screen overflow-hidden">
      {/* Toggle Button (Top-Right) */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? (
            <X className="w-6 h-6 text-gray-800" />
          ) : (
            <Menu className="w-6 h-6 text-gray-800" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 transform bg-white shadow-lg transition-transform duration-200 ease-in-out md:relative md:translate-x-0 md:flex ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {role && (
          <div className="w-64">
            {" "}
            {/* padding to avoid button overlap */}
            <Sidebar role={role} />
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 w-full h-full overflow-auto bg-gray-100 p-2">
        <main className="flex-1 overflow-auto mt-10 md:mt-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

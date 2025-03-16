import React from "react";
import Sidebar from "../shared/Sidebar";
import Navbar from "../shared/Navbar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="p-6 bg-gray-100 flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

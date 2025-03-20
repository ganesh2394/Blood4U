import React from "react";
import { Link } from "react-router-dom";
import { FaHospital, FaTint, FaCalendarCheck, FaBox } from "react-icons/fa";
import SidebarCommon from "../SidebarCommon";

const HospitalSidebar = () => {
  return (
    <div className="h-screen w-64 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-lg fixed p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-6 text-red-600 dark:text-red-400">
        Blood4U - Hospital
      </h2>
      <ul className="space-y-3">
        <li className="flex items-center">
          <FaHospital className="mr-3" />
          <Link to="/hospital-dashboard">Dashboard</Link>
        </li>
        <li className="flex items-center">
          <FaTint className="mr-3" />
          <Link to="/hospital-dashboard/request-blood">Request Blood</Link>
        </li>
        <li className="flex items-center">
          <FaCalendarCheck className="mr-3" />
          <Link to="/hospital-dashboard/manage-appointments">Manage Appointments</Link>
        </li>
        <li className="flex items-center">
          <FaBox className="mr-3" />
          <Link to="/hospital-dashboard/manage-blood-inventory">Inventory</Link>
        </li>
      </ul>
      <div className="mt-auto">
        <SidebarCommon />
      </div>
    </div>
  );
};

export default HospitalSidebar;

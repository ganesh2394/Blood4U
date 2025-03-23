import React from "react";
import { Link } from "react-router-dom";
import {
  FaBox,
  FaClock,
  FaHeart,
  FaHistory,
  FaTachometerAlt,
} from "react-icons/fa";
import SidebarCommon from "../SidebarCommon";

const DonorSidebar = () => {
  return (
    <div className="h-screen w-64 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-lg fixed p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-6 text-red-600 dark:text-red-400">
        Blood4U - Donor
      </h2>
      <ul className="space-y-3">
        <li className="flex items-center">
          <FaTachometerAlt className="mr-3" />
          <Link to="/donor-dashboard">Dashboard</Link>
        </li>

        <li className="flex items-center">
          <FaHeart className="mr-3" />
          <Link to="/donor-dashboard/find-center">Find a Center</Link>
        </li>
        <li className="flex items-center">
          <FaClock className="mr-3" />
          <Link to="/donor-dashboard/schedule">Schedule a Donation</Link>
        </li>
        <li className="flex items-center">
          <FaHistory className="mr-3" />
          <Link to="/donor-dashboard/history">Donation History</Link>
        </li>
        <li className="flex items-center">
          <FaBox className="mr-3" />
          <Link to="/donor-dashboard/inventory">Inventory</Link>
        </li>
      </ul>
      <div className="mt-auto">
        <SidebarCommon />
      </div>
    </div>
  );
};

export default DonorSidebar;

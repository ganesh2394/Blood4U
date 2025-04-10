import React from "react";
import { Link } from "react-router-dom";
import {
  FaUsers,
  FaTachometerAlt,
  FaClipboardList,
  FaHandHoldingHeart,
  FaBox,
  FaChartBar,
} from "react-icons/fa";
import SidebarCommon from "../SidebarCommon";

const AdminSidebar = () => {
  return (
    <div className="h-screen w-64 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-lg fixed p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-6 text-red-600 dark:text-red-400">
        Blood4U - Admin
      </h2>
      <ul className="space-y-4">
        <li className="flex items-center">
          <FaTachometerAlt className="mr-3" />
          <Link to="/admin-dashboard">Dashboard</Link>
        </li>
        <li className="flex items-center">
          <FaUsers className="mr-3" />
          <Link to="/admin-dashboard/manage-users">Manage Users</Link>
        </li>
        <li className="flex items-center">
          <FaClipboardList className="mr-3" />
          <Link to="/admin-dashboard/reports">Reports</Link>
        </li>
        <li className="flex items-center">
          <FaHandHoldingHeart className="mr-3" />
          <Link to="/admin-dashboard/manage-donations">Manage Donations</Link>
        </li>
        <li className="flex items-center">
          <FaBox className="mr-3" />
          <Link to="/admin-dashboard/inventory">Manage Inventory</Link>
        </li>
        <li className="flex items-center">
          <FaChartBar className="mr-3" />
          <Link to="/admin-dashboard/analytics">Analytics</Link>
        </li>
      </ul>
      <div className="mt-4">
        <SidebarCommon />
      </div>
    </div>
  );
};

export default AdminSidebar;

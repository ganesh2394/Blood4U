import React from "react";
import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBullhorn,
  FaHandsHelping,
  FaCalendarAlt,
  FaChartBar,
  FaBox,
} from "react-icons/fa";
import SidebarCommon from "../SidebarCommon";

const OrganizationSidebar = () => {
  return (
    <div className="h-screen w-64 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-lg fixed p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-6 text-red-600 dark:text-red-400">
        Blood4U - Organization
      </h2>
      <ul className="space-y-4">
        <li className="flex items-center ">
          <FaTachometerAlt className="mr-3" />
          <Link to="/org-dashboard">Dashboard</Link>
        </li>
        <li className="flex items-center ">
          <FaBullhorn className="mr-3" />
          <Link to="/org-dashboard/awareness-campaigns">
            Awareness Campaigns
          </Link>
        </li>
        <li className="flex items-center ">
          <FaHandsHelping className="mr-3" />
          <Link to="/org-dashboard/volunteers">Volunteers</Link>
        </li>
        <li className="flex items-center ">
          <FaCalendarAlt className="mr-3" />
          <Link to="/org-dashboard/organize-drive">Organize Drives</Link>
        </li>
        <li className="flex items-center ">
          <FaChartBar className="mr-3" />
          <Link to="/org-dashboard/donation-statistics">
            Donation Statistics
          </Link>
        </li>
        <li className="flex items-center">
          <FaBox className="mr-3" />
          <Link to="/org-dashboard/inventory">Manage Inventory</Link>
        </li>
      </ul>
      <div className="mt-4">
        <SidebarCommon />
      </div>
    </div>
  );
};

export default OrganizationSidebar;

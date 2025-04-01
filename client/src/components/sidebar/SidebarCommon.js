import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaQuestionCircle,
  FaEnvelope,
  FaCog,
  FaSignOutAlt,
  FaInfoCircle,
  FaShieldAlt,
  FaFileContract,
  FaUser,
} from "react-icons/fa";

const SidebarCommon = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/logout");
  };

  return (
    <div className="mt-auto">
      <ul className="space-y-3">
        <li className="flex items-center">
          <FaUser className="mr-2" />
          <Link to="/profile">Profile</Link>
        </li>
        <li className="flex items-center">
          <FaQuestionCircle className="mr-2" />
          <Link to="/faq">FAQ</Link>
        </li>
        <li className="flex items-center">
          <FaEnvelope className="mr-2" />
          <Link to="/contact-support">Contact Support</Link>
        </li>
        <li className="flex items-center">
          <FaCog className="mr-2" />
          <Link to="/settings">Settings</Link>
        </li>
        <li className="flex items-center">
          <FaInfoCircle className="mr-2" />
          <Link to="/about-us">About Us</Link>
        </li>
        <li className="flex items-center">
          <FaShieldAlt className="mr-2" />
          <Link to="/privacy-policy">Privacy Policy</Link>
        </li>
        <li className="flex items-center">
          <FaFileContract className="mr-2" />
          <Link to="/terms-of-service">Terms of Service</Link>
        </li>
        <li
          className="flex items-center text-red-500 cursor-pointer"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="mr-2" />
          <span>Logout</span>
        </li>
      </ul>
    </div>
  );
};

export default SidebarCommon;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBuilding,
  FaHospital,
  FaGlobe,
} from "react-icons/fa";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          message.error("Unauthorized: No token provided");
          navigate("/login");
          return;
        }

        const response = await axios.get(
          "http://localhost:8080/api/auth/current-user",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data.success) {
          setUser(response.data.user);
        } else {
          throw new Error("Failed to retrieve user data.");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        message.error(
          error.response?.data?.message || "Failed to fetch user data."
        );
      }
    };

    fetchUserData();
  }, [navigate]);

  if (!user) {
    return (
      <p className="text-center text-lg font-semibold mt-10">Loading...</p>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        {/* Profile Image */}
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-4xl font-bold">
            {user.name[0] || user.hospitalName[0] || user.organizationName[0]}
          </div>
        </div>

        {/* User Info */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mt-4">
          {user.name}
        </h2>
        <p className="text-center text-gray-500">{user.role.toUpperCase()}</p>

        {/* Details Section */}
        <div className="mt-6">
          <div className="space-y-4">
            <p className="flex items-center gap-2 text-gray-600">
              <FaEnvelope className="text-blue-500" />
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            {user.phone && (
              <p className="flex items-center gap-2 text-gray-600">
                <FaPhone className="text-green-500" />
                <span className="font-semibold">Phone:</span> {user.phone}
              </p>
            )}
            {user.address && (
              <p className="flex items-center gap-2 text-gray-600">
                <FaMapMarkerAlt className="text-red-500" />
                <span className="font-semibold">Address:</span> {user.address}
              </p>
            )}
            {user.organizationName && (
              <p className="flex items-center gap-2 text-gray-600">
                <FaBuilding className="text-yellow-500" />
                <span className="font-semibold">Organization:</span>{" "}
                {user.organizationName || "N/A"}
              </p>
            )}
            {user.hospitalName && (
              <p className="flex items-center gap-2 text-gray-600">
                <FaHospital className="text-indigo-500" />
                <span className="font-semibold">Hospital:</span>{" "}
                {user.hospitalName || "N/A"}
              </p>
            )}
            {user.website && (
              <p className="flex items-center gap-2 text-gray-600">
                <FaGlobe className="text-blue-500" />
                <span className="font-semibold">Website:</span>
                <a
                  href={user.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline hover:text-blue-700"
                >
                  {user.website}
                </a>
              </p>
            )}
          </div>
        </div>

        {/* Edit Profile Button */}
        <div className="mt-6 flex justify-center">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

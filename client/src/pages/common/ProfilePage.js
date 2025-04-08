import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaSignOutAlt,
  FaUserEdit,
  FaTimes,
  FaSave,
  FaTint,
} from "react-icons/fa";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    toast.success("You have been logged out successfully.");
    setTimeout(() => navigate("/"), 1000);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          toast.error("Unauthorized: No token found");
          navigate("/login");
          return;
        }

        const response = await axios.get(
          "http://localhost:8080/api/auth/current-user",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.success) {
          setUser(response.data.user);
          setFormData(response.data.user);
        } else {
          throw new Error("Failed to retrieve user data.");
        }
      } catch (error) {
        toast.error("Error fetching user data.");
      }
    };
    fetchUserData();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        `http://localhost:8080/api/auth/users/update/${user._id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(response.data.user);
      setEditMode(false);
      toast.success(" Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile.");
    }
  };

  if (!user) {
    return (
      <div className="text-center text-lg font-semibold mt-20">
        <p>Loading your profile... </p>
      </div>
    );
  }

  const getInitials = (name = "") => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 p-6">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl border-t-4 border-blue-500">
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-400 to-indigo-500 text-white flex items-center justify-center text-4xl font-bold shadow-md">
            {getInitials(
              editMode
                ? formData.name ||
                    formData.hospitalName ||
                    formData.organizationName ||
                    ""
                : user.name || user.hospitalName || user.organizationName || ""
            )}
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800 mt-4">
          {editMode ? (
            <input
              type="text"
              name="name"
              value={
                formData.name ||
                formData.hospitalName ||
                formData.organizationName ||
                ""
              }
              onChange={handleChange}
              className="border rounded px-3 py-1 w-full text-center"
            />
          ) : (
            user.name || user.hospitalName || user.organizationName
          )}
        </h2>
        <p className="text-center text-indigo-600 font-medium mt-1">
          {user.role.toUpperCase()}
        </p>

        <div className="mt-6 space-y-4 text-gray-700">
          {user.role === "donor" && (
            <div className="flex items-center gap-2">
              <FaTint className="text-red-400" />
              <span className="font-semibold">Blood Type:</span>
              {editMode ? (
                <input
                  type="text"
                  name="bloodType"
                  value={formData.bloodType || ""}
                  onChange={handleChange}
                  className="border rounded px-2 py-1 w-full"
                />
              ) : (
                user.bloodType || "N/A"
              )}
            </div>
          )}

          <div className="flex items-center gap-2">
            <FaEnvelope className="text-blue-500" />
            <span className="font-semibold">Email:</span> {user.email}
          </div>
          {user.phone && (
            <div className="flex items-center gap-2">
              <FaPhone className="text-green-500" />
              <span className="font-semibold">Phone:</span>
              {editMode ? (
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="border rounded px-2 py-1 w-full"
                />
              ) : (
                user.phone
              )}
            </div>
          )}
          {user.address && (
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-red-500" />
              <span className="font-semibold">Address:</span>
              {editMode ? (
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="border rounded px-2 py-1 w-full"
                />
              ) : (
                user.address
              )}
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-between items-center">
          {editMode ? (
            <>
              <button
                onClick={handleUpdate}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow flex items-center gap-2 transition duration-200"
              >
                <FaSave /> Save
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg shadow flex items-center gap-2 transition duration-200"
              >
                <FaTimes /> Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setEditMode(true)}
                className="text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-2"
              >
                <FaUserEdit /> Edit Profile
              </button>
              <button
                onClick={logout}
                className="text-red-600 hover:text-red-800 hover:underline flex items-center gap-2"
              >
                <FaSignOutAlt /> Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

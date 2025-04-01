import React, { useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

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
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

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
          setFormData(response.data.user);
        } else {
          throw new Error("Failed to retrieve user data.");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        toast.error("Failed to fetch user data.");
      }
    };
    fetchUserData();
  }, [navigate]);

  if (!user) {
    return (
      <p className="text-center text-lg font-semibold mt-10">Loading...</p>
    );
  }

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
      toast.success("Profile updated successfully! 🎉");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full outline outline-blue-500 bg-gray-300 flex items-center justify-center text-gray-600 text-4xl font-bold">
            {user.name[0] || user.hospitalName[0] || user.organizationName[0]}
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800 mt-4">
          {editMode ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border rounded p-1 w-full"
            />
          ) : (
            user.name
          )}
        </h2>
        <p className="text-center text-indigo-700">{user.role.toUpperCase()}</p>

        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-2 text-gray-600">
            <FaEnvelope className="text-blue-500" />
            <span className="font-semibold">Email:</span> {user.email}
          </div>
          {user.phone && (
            <div className="flex items-center gap-2 text-gray-600">
              <FaPhone className="text-green-500" />
              <span className="font-semibold">Phone:</span>
              {editMode ? (
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="border rounded p-1 w-full"
                />
              ) : (
                user.phone
              )}
            </div>
          )}
          {user.address && (
            <div className="flex items-center gap-2 text-gray-600">
              <FaMapMarkerAlt className="text-red-500" />
              <span className="font-semibold">Address:</span>
              {editMode ? (
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="border rounded p-1 w-full"
                />
              ) : (
                user.address
              )}
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-between">
          {editMode ? (
            <>
              <button
                onClick={handleUpdate}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setEditMode(true)}
                className="text-blue-500 hover:underline"
              >
                Edit Profile
              </button>
              <button onClick={logout} className="text-red-500 hover:underline">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

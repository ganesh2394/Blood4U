import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DonorDashboard = () => {
  const [donationHistory, setDonationHistory] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [formData, setFormData] = useState({ quantity: "", organization: "" });
  const [loading, setLoading] = useState(false);
  const [username, setUserName] = useState();

  const token = localStorage.getItem("authToken");

  // Get User Deteails
  const getUserDetails = async () => {
    try {
      const res = await axios(`http://localhost:8080/api/auth/current-user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserName(res.data?.user?.name);
    } catch (error) {}
  };
  // Fetch donation history
  const getDonationHistory = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8080/api/inventory/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const donorDonations = res.data.inventory.filter(
        (entry) => entry.inventoryType === "in"
      );
      setDonationHistory(donorDonations);
    } catch (err) {
      toast.error("Failed to fetch donation history");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch organizations
  const getOrganizations = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/inventory/organizations",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrganizations(res.data.organizations);
    } catch (err) {
      toast.error("Failed to fetch organizations");
      console.error(err);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.quantity || !formData.organization) {
      return toast.warn("Please fill all fields");
    }

    if (!window.confirm("Are you sure you want to submit this donation?")) {
      return;
    }

    try {
      await axios.post(
        "http://localhost:8080/api/inventory/create-in",
        {
          ...formData,
          inventoryType: "in",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Donation recorded successfully!");
      setFormData({ quantity: "", organization: "" });
      getDonationHistory();
    } catch (err) {
      toast.error("Error creating donation record");
      console.error(err);
    }
  };

  useEffect(() => {
    getDonationHistory();
    getOrganizations();
    getUserDetails();
  }, []);

  const totalQuantity = donationHistory.reduce(
    (sum, entry) => sum + Number(entry.quantity),
    0
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Welcome Donor 👋</h1>
        <div className="font-mono text-gray-600 text-lg">
          <span className="text-purple-700 font-semibold">{username}</span>
        </div>
      </div>
      {/* Summary */}
      <div className="bg-green-100 border border-green-400 text-green-700 p-3 rounded mb-4">
        <strong>Total Blood Donated:</strong> {totalQuantity} ml
      </div>

      {/* Donation Form */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-3">Donate Blood</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block mb-1 font-medium">Quantity (ml)</label>
            <input
              type="number"
              className="w-full border p-2 rounded"
              placeholder="Eg: 350"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({ ...formData, quantity: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Select Organization
            </label>
            <select
              className="w-full border p-2 rounded"
              value={formData.organization}
              onChange={(e) =>
                setFormData({ ...formData, organization: e.target.value })
              }
              required
            >
              <option value="">-- Select --</option>
              {organizations.map((org) => (
                <option key={org._id} value={org._id}>
                  {org.organizationName}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Donate
          </button>
        </form>
      </div>

      {/* Donation History */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-3">Your Donation History</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-2">Date</th>
                <th className="p-2">Organization</th>
                <th className="p-2">Quantity (ml)</th>
              </tr>
            </thead>
            <tbody>
              {donationHistory.length > 0 ? (
                donationHistory.map((entry) => (
                  <tr key={entry._id} className="border-b">
                    <td className="p-2">
                      {new Date(entry.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-2">
                      {entry.organization?.organizationName || "N/A"}
                    </td>
                    <td className="p-2">{entry.quantity}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="p-2 text-center text-gray-500">
                    No donations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DonorDashboard;

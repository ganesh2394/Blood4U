import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTint, FaListAlt, FaHospital } from "react-icons/fa";
const HospitalDashboard = () => {
  const [formData, setFormData] = useState({
    quantity: "",
    bloodGroup: "",
    organization: "",
  });
  const [organizations, setOrganizations] = useState([]);
  const [requests, setRequests] = useState([]);
  const [inventory, setInventory] = useState([]);

  const token = localStorage.getItem("authToken");

  // Fetch allowed organizations for this hospital
  const fetchOrganizations = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/inventory/organizations/hospital",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrganizations(res.data.organizations);
    } catch (err) {
      console.error("Error fetching organizations", err);
    }
  };

  // Fetch hospital requests
  const fetchHospitalRequests = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/inventory/hospital-requests",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRequests(res.data?.requests || []);
    } catch (err) {
      console.error("Error fetching hospital requests", err);
    }
  };

  // Fetch inventory of hospital
  const fetchHospitalInventory = async () => {
    try {
      const hospitalId = localStorage.getItem("userId");

      const response = await axios.post(
        "http://localhost:8080/api/inventory/hospital-inventory",
        {
          hospitalId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setInventory(response.data.inventory);
    } catch (error) {
      console.error(
        "Error fetching hospital inventory",
        error.response?.data || error.message
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8080/api/inventory/create-out",
        {
          ...formData,
          inventoryType: "out",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Blood request created successfully!");
      setFormData({ quantity: "", bloodGroup: "", organization: "" });
      fetchHospitalRequests();
      fetchHospitalInventory();
    } catch (err) {
      alert("Error creating blood request.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrganizations();
    fetchHospitalRequests();
    fetchHospitalInventory();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">
        🏥 Welcome, Hospital
      </h1>

      {/* Request Blood Form */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-red-600">
          <FaTint /> Request Blood
        </h2>
        <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1 font-medium">Quantity (ml)</label>
            <input
              type="number"
              className="w-full border p-2 rounded"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({ ...formData, quantity: e.target.value })
              }
              required
              placeholder="Enter quantity"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Blood Group</label>
            <select
              className="w-full border p-2 rounded"
              value={formData.bloodGroup}
              onChange={(e) =>
                setFormData({ ...formData, bloodGroup: e.target.value })
              }
              required
            >
              <option value="">-- Select --</option>
              {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((bg) => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </select>
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
                  {org.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-3 text-right">
            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
            >
              Request Blood
            </button>
          </div>
        </form>
      </div>

      {/* Requests Table */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-purple-700">
          <FaListAlt /> Your Blood Requests
        </h2>
        <div className="overflow-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Date</th>
                <th className="p-3">Blood Group</th>
                <th className="p-3">Quantity</th>
                <th className="p-3">Organization</th>
              </tr>
            </thead>
            <tbody>
              {requests.length > 0 ? (
                requests.map((r) => (
                  <tr
                    key={r._id}
                    className="hover:bg-gray-50 transition border-b"
                  >
                    <td className="p-3">
                      {new Date(r.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3">{r.bloodGroup}</td>
                    <td className="p-3">{r.quantity}</td>
                    <td className="p-3">
                      {r.organization?.organizationName || "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-3 text-center text-gray-500">
                    No requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Hospital Inventory */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-green-700">
          <FaHospital /> Hospital Inventory
        </h2>
        <div className="overflow-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Type</th>
                <th className="p-3">Blood Group</th>
                <th className="p-3">Quantity</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {inventory.length > 0 ? (
                inventory.map((i) => (
                  <tr
                    key={i._id}
                    className="hover:bg-gray-50 transition border-b"
                  >
                    <td className="p-3 capitalize">{i.inventoryType}</td>
                    <td className="p-3">{i.bloodGroup}</td>
                    <td className="p-3">{i.quantity}</td>
                    <td className="p-3">
                      {new Date(i.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-3 text-center text-gray-500">
                    No inventory records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HospitalDashboard;

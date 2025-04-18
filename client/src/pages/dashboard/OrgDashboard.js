import React, { useEffect, useState } from "react";
import axios from "axios";

const OrgDashboard = () => {
  const [inventory, setInventory] = useState([]);
  const [donors, setDonors] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [formData, setFormData] = useState({
    inventoryType: "in",
    bloodGroup: "",
    quantity: "",
  });

  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  const token = localStorage.getItem("authToken");
  const headers = { Authorization: `Bearer ${token}` };

  const fetchInventory = async () => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_API_URL + "/api/inventory/recent",
        { headers }
      );
      setInventory(res.data.inventory);
    } catch (err) {
      console.error("Failed to fetch inventory", err);
    }
  };

  const fetchDonors = async () => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_API_URL + "/api/inventory/donors",
        { headers }
      );
      setDonors(res.data.donors);
    } catch (err) {
      console.error("Failed to fetch donors", err);
    }
  };

  const fetchHospitals = async () => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_API_URL + "/api/inventory/hospitals",
        { headers }
      );
      setHospitals(res.data.hospitals);
    } catch (err) {
      console.error("Failed to fetch hospitals", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        process.env.REACT_APP_API_URL + "/api/inventory/create",
        formData
      );
      alert("Inventory created successfully!");
      fetchInventory();
      setFormData({ inventoryType: "in", bloodGroup: "", quantity: "" });
    } catch (err) {
      alert("Error creating inventory!");
    }
  };

  useEffect(() => {
    fetchInventory();
    fetchDonors();
    fetchHospitals();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        🏢 Organization Dashboard
      </h1>

      {/* Inventory Form */}
      <div className="bg-white p-5 rounded shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">🩸 Add Inventory</h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div>
            <label className="block mb-1 font-medium">Type</label>
            <select
              className="w-full border p-2 rounded"
              value={formData.inventoryType}
              onChange={(e) =>
                setFormData({ ...formData, inventoryType: e.target.value })
              }
              required
            >
              <option value="in">IN (Received)</option>
              <option value="out">OUT (Distributed)</option>
            </select>
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
              {bloodGroups.map((bg) => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Quantity (ml)</label>
            <input
              type="number"
              placeholder="Eg: 500"
              min={1}
              max={1000}
              className="w-full border p-2 rounded"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({ ...formData, quantity: e.target.value })
              }
              required
            />
          </div>

          <div className="col-span-full text-right">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* Inventory Records */}
      <div className="bg-white p-5 rounded shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">
          📋 Recent Inventory Records
        </h2>
        <table className="w-full text-sm border-collapse table-auto">
          <thead>
            <tr className="border-b bg-gray-100 text-left">
              <th className="p-2">Type</th>
              <th className="p-2">Blood Group</th>
              <th className="p-2">Quantity (ml)</th>
              <th className="p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {inventory.length > 0 ? (
              inventory.map((item) => (
                <tr key={item._id} className="border-b hover:bg-gray-50">
                  <td className="p-2 capitalize">{item.inventoryType}</td>
                  <td className="p-2">{item.bloodGroup}</td>
                  <td className="p-2">{item.quantity}</td>
                  <td className="p-2">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-gray-500 py-4">
                  No inventory records found. Start adding now!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Donors and Hospitals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Donors */}
        <div className="bg-white p-5 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">🧑‍🦰 Registered Donors</h2>
          <ul className="space-y-2 max-h-60 overflow-auto">
            {Array.isArray(donors) && donors.length > 0 ? (
              donors.map((donor) => (
                <li key={donor._id} className="border-b pb-2">
                  <span className="font-medium">{donor.name}</span> -{" "}
                  <span className="text-sm text-gray-600">{donor.email}</span>
                </li>
              ))
            ) : (
              <li className="text-gray-500">No donors registered yet.</li>
            )}
          </ul>
        </div>

        {/* Hospitals */}
        <div className="bg-white p-5 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">
            🏥 Associated Hospitals
          </h2>
          <ul className="space-y-2 max-h-60 overflow-auto">
            {Array.isArray(hospitals) && hospitals.length > 0 ? (
              hospitals.map((hospital) => (
                <li key={hospital._id} className="border-b pb-2">
                  <span className="font-medium">{hospital.hospitalName}</span> -{" "}
                  <span className="text-sm text-gray-600">
                    {hospital.email}
                  </span>
                </li>
              ))
            ) : (
              <li className="text-gray-500">No hospitals associated yet.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OrgDashboard;
